/***
* contributors
* @Inateno -> http://inabook.fr
***/

define( [ 'DREAM_ENGINE' ],
function( DE )
{
  DE.Socket_io = function( IP, port, protocol, onReady, onError )
  {
    var _self = this;
    this.IP    = IP;
    this.port  = port;
    this.protocol  = protocol;
    this.socket  = null;
    
    this.isLocal= false;
    this.inited = false;
    
    var script = document.createElement( "script" );
      script.type = "text/javascript";
      script.src = this.protocol + '://' + this.IP + ':' + this.port + '/socket.io/socket.io.js';
    document.body.appendChild( script );
    script.onload = function(){ _self.init(); };
    setTimeout( function(){ _self.init( true ); }, 30000 );
    
    this.init = function( failed )
    {
		console.log("Init socket");
		if ( this.inited )
			return;
		this.inited = true;
		
		if ( failed )
		{
			console.log("Error init socket");
			onError();
			return;
		}
		
		console.log("Socket inited");
		this.socket = io.connect( this.protocol + '://' + this.IP + ':' + this.port );
		onReady( this.socket );
    }
  }
} );