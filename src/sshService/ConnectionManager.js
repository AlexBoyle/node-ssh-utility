(function() {
	'use strict';
	const Client = require('ssh2').Client;
	module.exports = new (function() {
		this.runScript  = function(connectionDetails, script) {
			if(script !=  undefined)  {
				return new Promise((resolve, reject) => {
					let result = '';
					let connection = new Client();
					connection.on('ready', () => {
						connection.shell((err, stream) => {
							let hasReachedFilter = false;
							if (err) {
								stream.end();
								connection.end();
								stdout.write(err);
							}
							stream
								.on('close', ()  => {
									stream.end();
									connection.end();
									resolve(result);
								})
								.on('data', (output) => {
									output.toString().split('\n').forEach(line =>{
										if(!hasReachedFilter && line.startsWith(connectionDetails.filter)) {
											hasReachedFilter = true
										}
										else if(hasReachedFilter && !output.toString().startsWith(connectionDetails.filter)) {
											result += line + '\n';
										}

									})
								})
							stream.write(script + '\nexit\n');
						});
					}).connect(connectionDetails);
				})
			}
		}
	})
})()