define( [ 'colors', 'scripts/sharedDatas', 'scripts/accounts', 'scripts/bdd', 'scripts/tools' ],
function( colors, sharedDatas, accounts, bdd, tools )
{
  var database = new function()
  {
    
    this.register = function( login, passwd )
    {
      console.myLog( "Attempt to register : Log - " + login + " --- pass - " + passwd, colors.data );
      account = tools.findWhereIn( { 'login': login }, accounts );
      if( account == null || account == [] || account.player == null )
      {
        console.myLog( "Registering...", colors.warn );
        bdd.query('INSERT INTO proto.accounts ( login, passwd ) VALUES ( "' + login + '", "' + passwd + '" )', function(err, rows) {
            if(err){
                console.log( "Error on query : " + err );
                return { "error": err };
                //return { "error": "Error on request database" };
            }
            
        });
        return true;
      }
      else
      {
        return { "error": "Account already exists" };
      }
    }

    this.accAddPlayer = function( login )
    {
      bdd.query('SELECT * FROM proto.accounts WHERE login = "' + login + '" ', function(err, rows) {
          if(err){
              console.log( "Error on query : " );
              console.log( err );
              return err;
          }
          for(i = 0; i < rows.length; i++)
          {
              id = rows[i].id;
              login = rows[i].login;
              passwd = rows[i].passwd;
              access = rows[i].access;
              accounts[id] = {'id': id, 'login': login, 'passwd': passwd, 'access': access, 'player': {"nick": "iam"+login, "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48} };
              //console.log(accounts[id]);
              //console.log(login+"-------------------------------------");
          }
      });
    }
    
  };
  
  return database;
} );