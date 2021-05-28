require('module-alias/register')
const expressService = require('./expressInit')

const path = require('path');

const app = expressService.createNewExpressApp([
	{'route': '/v1/sshUtil', 'service': require('@src/sshService/sshUtilEndpoints')},
	{'route': '/*/*', 'service': function(req, res) {res.sendStatus(404)}},
	{'route': '/*', 'service': function(req, res) {res.sendFile(path.resolve('publicFiles/html/base.html'))}}
]);
app.listen(80, function () {console.log('app launched on port: 80')})
