require('module-alias/register')
const expressService = require('./expressInit')
const app = expressService.createNewExpressApp({});
app.listen(80, function () {console.log('app launched on port: 80')})
