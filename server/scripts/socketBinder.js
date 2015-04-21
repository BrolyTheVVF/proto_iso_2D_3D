define( [ 'colors', 'scripts/socketEvents' ],
function( colors, socketEvents )
{
  function socketBinder( socket )
  {
    //console.log( "bind socket for", socket );
    var listeners = "";
    for ( var i = socket.previousAccess; i < socket.access; ++i )
    {
		// console.myLog( "sock_prev : " + socket.previousAccess + " - sock_acc : " + socket.access
                  // , colors.info, 1 );
      var events = socketEvents[ i + 1 ];
      var fst = true;
      for ( var n in events )
      {
        if( !fst )
          listeners += " - ";
        else
          fst = false;

        listeners += n;
        socket.on( n, events[ n ] );
        //console.log( events[ n ].toString() )
      }
      //console.log( socket );
      
    }
    console.myLog( socket.request.connection.remoteAddress + " get access to : " + listeners
                  , colors.info, 1 );
    
    if ( socket.previousAccess > socket.access )
    {
      console.myLog( "Downgrading access - remove listeners", colors.warn );
    }
    
    socket.setAccess = function( newAccess )
    {
      this.previousAccess = this.access;
      this.access = newAccess;
      socketBinder( this );
    }
  }

  return socketBinder;
} );