module.exports = (new function(){
	const ConMgr = require('./ConnectionManager');
	const connectionObjects  = require('./Connections');
	const Convert = require('ansi-to-html');
    var convert = new Convert();

	this.runScript = function(req, res) {
		if(req.query != null && req.query.run != null && typeof req.query.run == "string") {
			ConMgr.runScript(connectionObjects.local, req.query.run).then((result) => {
				res.json(convert.toHtml(result))
			})
		} else {
			res.json(convert.toHtml(""))
		}
	}

	this.getConnectionObjs = function(req, res) {
		res.json(Object.keys(connectionObjects))
	}
}())