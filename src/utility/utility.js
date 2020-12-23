module.exports = (new function(){
	this.serviceWrapper = function(genServices) {
		const express = require('express'),router = express.Router();
		// Begin Endpoint Definitions
		genServices(router)
		// End Endpoint Definitions
		router.get('/*',function(req, res) {res.sendStatus(404)})
		return router;
	}
}())