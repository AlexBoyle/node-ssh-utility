const utility = require('@src/utility/utility')
module.exports  = utility.serviceWrapper((router) => {
	const sshUtilServices = require('@src/sshService/sshUtilServices')
	router.get('/runScript', sshUtilServices.test)
})
