var requirejs = require( 'requirejs' );
requirejs.config({
	nodeRequire: require
});

//var mysql	= require( 'mysql' );

requirejs( [ 'socket.io', 'scripts/socketBinder', 'colors', 'mysql' ],
function( socket_io, socketBinder, colors, mysql )
{
	console.myLog = function( txt, type, indent )
	{
	var indentation = "", indent = indent || 0;
	while( indentation.length <= indent )
		indentation += " ";
	console.log( indentation + type( txt ) );
	}

	colors.setTheme({
		silly: 'rainbow',
		input: 'grey',
		verbose: 'cyan',
		prompt: 'grey',
		info: 'green',
		data: 'grey',
		help: 'cyan',
		warn: 'yellow',
		debug: 'blue',
		error: 'red'
	});


	var port = 2310;
	var io = socket_io.listen( port );
	io.set( "log level", 1 );
	
	io.sockets.on( 'connection', function ( socket )
	{
		// socket.IP = socket.handshake.address.address;
		socket.IP = socket.request.connection.remoteAddress;
		console.myLog( "A connection appear - IP : " + socket.IP, colors.warn, 2 );
		// console.log( socket );
		socket.previousAccess = -1;
		socket.access = 0;
		socketBinder( socket );
	} );
  
} );