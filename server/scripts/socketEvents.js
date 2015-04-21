define( [ 'colors', 'scripts/accounts', 'scripts/tools', 'scripts/mapDatas', 'scripts/Player', 'scripts/sharedDatas', 'scripts/dataBase' ],
function( colors, accounts, tools, mapDatas, Player, sharedDatas, dataBase )
{
  var socketEvents = [];
  
  // public users
  socketEvents[ 0 ] = {
    'connection': function( login, passwd )
    {
      console.log( "Console log on account in socketEvent : " );
      if( accounts != null )
      {
        console.myLog( "Attempt to connect : Log - " + login + " --- pass - " + passwd, colors.warn );
        account = tools.findWhereIn( { 'login': login, 'passwd': passwd }, accounts );
        console.log( account );
        if ( account != null && account != [] && account.player != null )
        {
          console.myLog( "Hello " + login + " using IP: " + this.IP + ", successfully logged with access " + account.access
                        , colors.info );
          this.account = account;
          this.setAccess( account.access );
          if ( !sharedDatas.players[ account.id ] )
            this.player = new Player( account.id, account.player );
          else
            this.player = sharedDatas.players[ account.id ];
          
          this.player.socket = this;
          sharedDatas.players[ account.id ] = this.player;
          sharedDatas.playersLinkName[ this.player.nick ] = account.id;
          var datas = {};
          datas.myIndex = this.player.index;
          
          // TODO - get only players in the same area, and friends, and guilds
          datas.players = tools.toJSON( sharedDatas.players, null, this.player.index );
          
          sharedDatas.nPlayers = 0;
          for ( var i in sharedDatas.players )
          {
            if ( sharedDatas.players[ i ].formatDatas )
              ++sharedDatas.nPlayers;
          }
          
          console.myLog( sharedDatas.nPlayers + " players connected", colors.data, 5 )
          // TODO - get a method to get only datas for given area and for world datas
          datas.chunksSizes = { "x": 30, "y": 30, "z": 4 };
          datas.mapDatas = mapDatas;
          //datas.worldEntities = entities;
          
          /*this.manager.sockets.emit( 'playerJoin', this.player.index, this.player.toJSON() );*/ //I don't know what the hell is this :D
          this.emit( 'logged', datas );
        }
        else
        {
          console.myLog( login + " fail connect", colors.error );
          this.emit( 'failConnect', 'Check password and login' );
        }
      }
      else
      {
        console.myLog( "Fail to load account datas", colors.error );
        this.emit( 'failConnect', 'Fatal server error, plz try again later' );
      }
    }
    
    , 'register': function( login, passwd, email, token )//What is the token? u_u
    {
      var reg = dataBase.register( login, passwd );
      if( reg === true )
      {
        dataBase.accAddPlayer( login );
        console.myLog( "Registration can be done now.", colors.info );
        this.emit( 'register', { "done": "Registration can be done now."} );
      }
      else
      {
        console.myLog( "Registration Error", colors.error );
        this.emit( 'register', reg );
      }
    }
  };
  
  /*****************************************************
   *
   *
   // registered and connected users
   */
  socketEvents[ 1 ] = {
    'playerLeave': function()
    {
      //this.manager.sockets.emit( 'playerLeave', this.player.index );
      this.amit( 'playerLeave', this.player.index );
    }
    ,'changedInput': function( inputs, position )
    {
      if ( this.player.changeInputs( inputs ) )
      {
        this.player.position = position;
        // TODO - make a chunk sockets system, when we call "emit" it have to call only
        // sockets in the range area from user
        // this range is updated when players change chunk
        // store all sockets by chunks, and made a chunks.emit with propagation to chunk +1 pos
        //this.manager.sockets.emit( 'playerInputs', this.player.index, this.player.inputs, this.player.position );
        
        // TODO - attack input
        // if the player use an attack input we have to check if the delay between 2 attack is good
        // then if it is, and if the player use a non distance weapon, check if he hit something
        // and calcul + send dammage on target and player if it's the case
        //
        // if the player use a distance weapon, create a new entitie with the given speed
        // this entite will be moved by the server
        //
        // send the timestamp used to mark attack to user, he'll made the calcul client-side to know
        // when he will attack again
      }
    }
    
    /******************** social packets **
     */
      ,'msg': function( msg, channel )
      {
        // log( "msg", msg, this );
        this.manager.sockets.emit( "msg" + channel, this.player.nick + ": " + msg );
      }
      
      // ,'tradeRequest'
      // ,'tradeAccept'
      // ,'pm' // private message
      // ,'bandInvit' // invitation in the band
      // ,'bandJoin'  // user accept join band
      // ,'bandKick'  // band admin kick user
      // ,'bandLeave' // user leave band - if it's admin, promote next player to admin
      
      // ,'friendAdd' // user add a friend
      // ,'friendConfirm' // other user confirm they are friends
      // ,'friendDelete'
      
      // ,'guildCreate'
      // ,'guildInvit'
      // ,'guildKick'
      // ,'guildLeave'
    
    /******************** interactions packets **
     */
      // ,'itemPick'
      // ,'itemDrop'
  };
  
  /******************************************************
   *
   *
   // admins
   */
  socketEvents[ 5 ] = {
    'setAccess': function( playerIndex, value )
    {
      var target = tools.player.get( playerIndex, true );
      if ( !target )
      {
        this.emit( "commandError", "Can't find player index " + playerIndex );
        return;
      }
      target.access = value;
      
      var connectedTarget = tools.player.get( playerIndex );
      if ( connectedTarget )
      {
        connectedTarget.socket.setAccess( value );
        connectedTarget.socket.emit( "adminMsg", this.player.nick + " changed your access to " + value );
      }
    }
    ,'setAttr': function( playerIndex, attrName, value )
    {
      tools.player.changeAttr( playerIndex, attrName , value );
      //log( "[Admin Command] - settAttr - from admin " + this.player.nick + " on user " + target.nick + " change " + attrName + " to + " value );
    }
    ,'warpMe': function( destX, destY, destZ )
    {
      if ( !destX || !destY || !destZ )
      {
        this.emit( "commandError", "Bad command miss fields - /warpMe destX, destY, destZ" );
        return;
      }
      tools.player.warp( this, { x: destX, y: destY, z: destZ } );
      //log( "[Admin Command] - warpMe - from admin " + this.player.nick );
    }
    ,'warpTo': function( playerIndex, destX, destY, destZ )
    {
      if ( !playerIndex || !destX || !destY || !destZ )
      {
        this.emit( "commandError", "Bad command miss fields - /warpTo playerIndex, destX, destY, destZ" );
        return;
      }
      var target = tools.player.get( playerIndex );
      if ( !target )
      {
        target = tools.player.getByNick( playerIndex );
        if ( !target )
        {
          this.emit( "commandError", "Player " + playerIndex + " is not connected" );
          return;
        }
      }
      tools.player.warp( target, { x: destX, y: destY, z: destZ }, this.player );
      this.emit( "adminMsg", "You warped " + target.nick + " to " + destX + "-" + destY + "-" + destZ );
      //log( "[Admin Command] - warpTo - from admin " + this.player.nick + " on user " + target.nick );
    }
    ,'warpMeTo': function( playerIndex )
    {
      if ( !playerIndex )
      {
        this.emit( "commandError", "Bad command miss fields - /warpTo playerIndex, destX, destY, destZ" );
        return;
      }
      var target = tools.player.get( playerIndex );
      if ( !target )
      {
        target = tools.player.getByNick( playerIndex );
        if ( !target )
        {
          this.emit( "commandError", "Player " + playerIndex + " is not connected" );
          return;
        }
      }
      tools.player.warp( this, target.position );
      this.emit( "adminMsg", "You warped yourself to " + target.nick );
      //log( "[Admin Command] - warpMeTo - from admin " + this.player.nick + " to " + target.nick );
    }
    ,'warpToMe': function( playerIndex )
    {
      if ( !playerIndex )
      {
        this.emit( "commandError", "Bad command miss fields - /warpTo playerIndex, destX, destY, destZ" );
        return;
      }
      var target = tools.player.get( playerIndex );
      if ( !target )
      {
        target = tools.player.getByNick( playerIndex );
        if ( !target )
        {
          this.emit( "commandError", "Player " + playerIndex + " is not connected" );
          return;
        }
      }
      tools.player.warp( target, this.player.position, this.player );
      this.emit( "adminMsg", "You warped " + target.nick + " to you" );
      //log( "[Admin Command] - warpToMe - from admin " + this.player.nick + " to user " + target.nick );
    }
  };
  
  return socketEvents;

} );