const express = require('express');
const createError = require('http-errors');
const path = require('path');
const configs = require('./config');
const SpeakerServices = require('./services/SpeakerServices');
const app = express();

const config = configs[app.get('env')];

const speakerService = new SpeakerServices(config.data.speakers);

app.set('view engine', 'pug'); // set pug as template engine
if(app.get('env') === 'development'){
  app.locals.pretty = true; // human readable html if in dev
}
app.set('views', path.join(__dirname, './views')); //default: views folder in application root directory
app.locals.title = config.sitename; //global variable

const routes = require('./routes'); // loads routes module
app.use(express.static('public')); // serves static files
app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(204); // No favicon, send no content handler
});

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    console.log(names);
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
})

app.use('/', routes()); // loads index from routes folder

app.use((req, res, next) => {
  return next(createError(404, 'File Not Found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; // gets error message for template
  const status = err.status || 500; // get status, if none, code 500
  res.locals.status = status; // set status for template
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // show err stack
  res.status(status); // send proper error for status
  return res.render('error');
});

app.listen(3000); // listening for port 3000

module.export = app; // export is like return
