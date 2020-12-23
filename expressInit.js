module.exports = (new function() {
	this.createNewExpressApp = function(initObj) {
	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	const app = express();

	app.use(express.static('publicFiles'));
	app.use( bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use('/v1/sshUtil', require('@src/sshService/sshUtilEndpoints'))
	app.get('/*/*',function(req, res) {res.sendStatus(404)})
	app.get('/*',function(req, res) {res.sendFile(path.resolve('publicFiles/html/base.html'))});

	return app;
	}
})
