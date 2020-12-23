(function() {
	'use strict';
	
	const Client = require('ssh2').Client;
	const stdin = process.stdin;
	const stdout = process.stdout;
	
	module.exports = new (function() {
		this.startConnection  = function(connectionObj, script) {
			let conn = new Client();
			conn.on('ready', () => {
				conn.shell((err, stream) => {
					if (err) {
						stdout.removeAllListeners('resize');
						stdin.removeAllListeners('data');
						stream.end();
						conn.end();
						stdout.write(err);
						process.exit();
					}
					stream.on('close', ()  => {
						stdout.removeAllListeners('resize');
						stdin.removeAllListeners('data');
						stream.end();
						conn.end();
						process.exit();
					}).on('data', (data) => { stdout.write(data) }).setWindow(stdout.rows, stdout.columns);
					stdout.on('resize', () => { stream.setWindow(stdout.rows, stdout.columns) });
					stdin.removeAllListeners('data');
					if(script !=  undefined)  {
						stream.write(script + '\n');
					}
					stdin.on('data', (key) => { stream.write(key) });
				});
			}).connect(connectionObj);
		}
	})
})()