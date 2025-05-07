const express       = require('express');
const app           = express();
const path          = require('path');
const bodyParser    = require('body-parser');
const { engine }	= require('express-handlebars');

app.disable('etag');
app.disable('x-powered-by');

app.engine('hbs', engine({
	defaultLayout: 'main',
    extname: '.hbs',
	helpers: {
		section: function(name, options) { 
		  if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this); 
			return null;
		  }
	}
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.resolve('static')));

app.use(require('./routes/index'));
app.use('/api',require('./routes/api'));

app.all('*', (req, res) => {
	return res.status(404).send({
		message: '404 page not found'
	});
});

app.listen(1337, '0.0.0.0', () => console.log('Listening on port 1337'));