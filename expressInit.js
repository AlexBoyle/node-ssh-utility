module.exports = (new function() {
	this.createNewExpressApp = function(initArr) {
	const express = require('express');
	const bodyParser = require('body-parser');
	const app = express();

	app.use(express.static('publicFiles'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	initArr.forEach((val) =>{
		app.use(val.route,val.service)
	})
	return app;
	}
})
