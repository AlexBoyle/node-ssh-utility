(function() {
	'use strict';

	// Dependencies
	const ConMgr = require('./ConnectionManager');
	const connectionObjects  = require('./Connections');
	const fs = require('fs');

	// Simplification
	const stdin = process.stdin;
	const stdout = process.stdout;
	const args = process.argv;
	const version  = '21.03.30.01';

	// Setup
	if (!process.stdin.setRawMode) {
		stdout.write('\nCommand does not support this use\n\n')
		process.exit();
	}
	process.stdin.setRawMode(true)
	stdin.setEncoding('utf8');

	// Print help
	let printHelp  = function()  {
		stdout.write('\nTags:\n');
		stdout.write(' -c	Connect to server alias\n');
		stdout.write(' -e	Run local script\n');
		stdout.write(' -l	Server alias list\n');
		stdout.write(' -r   Run script\n');
		stdout.write(' -h	help\n');
		stdout.write(' -v	version\n');
		stdout.write('\n');
	}

	// Print script verson
	let printVersion = function() {
		stdout.write('Version: v' + version + '\n');
	}

	// Open  connection to server and push script to input
	let runScript = function(connectionString, scriptPath, scriptText) {
		if (connectionObjects[connectionString] !=  undefined) {
			if(scriptPath != null) {
				fs.readFile(scriptPath, (err, script) => {
					if (err) {
						stdout.write('\nFailed while reading file "' + scriptPath + '" with error:\n' + err + '\n\n');
						return;
					}
					ConMgr.runScript(connectionObjects[connectionString],  script).then((result) => {
						console.log(result)
					})
				})
			}
			else if(scriptText != null ){
				ConMgr.runScript(connectionObjects[connectionString],  scriptText).then((result) => {
					console.log(result)
				})
			}
		} else {
			stdout.write('\nCould not find server alias\n\n');
		}
	}

	let connectTo = function(connectionString) {
		if (connectionObjects[connectionString] !=  undefined) {
			ConMgr.startConnection(connectionObjects[connectionString]);
		} else {
			stdout.write('\nCould not find server alias\n\n');
		}
	}

	let listConnections = function() {
		stdout.write('List of Connections:\n');
		for (const connection in connectionObjects) {
			stdout.write('    - ' + connection + '\n');
		}
		stdout.write('\n');
	}

	Driver:
	try {
		let serverAlias = null;
		let scriptPath = null;
		let scriptText = null;

		ArgParse:
		for(var i = 0; i  < args.length; i++) {
			switch(args[i]) {
				case '-c':
					i++;
					serverAlias = args[i];
					break;
				case '-e':
					i++;
					scriptPath = args[i];
					break;
				case '-l':
					listConnections();
					break Driver;
				case '-v':
					printVersion();
					break Driver;
				case '-r':
					i++;
					scriptText = args[i];
					break ;
				case '-h':
					printHelp();
					break Driver;
			}
		}

		if(serverAlias == null && scriptPath == null && scriptText == null) { printHelp(); }
		else if (scriptPath == null && scriptText == null) { connectTo(serverAlias) }
		else { runScript(serverAlias, scriptPath, scriptText) }

	} catch(e) {
		stdout.write('\nFailed with exception: \n' + e + '\n\n');
	}
})();