define( ['scripts/bdd'],
function( bdd )
{
    var accounts = {0: {'id': "id", 'login': "login", 'passwd': "passwd", 'access': "access", 'player': {"nick": "iamlogin", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48} } };
    if( bdd != null )
    {
        /*var accounts = {
            3:{ "login": "guess1", "id": 3, "passwd": "imguess1", "access": 1, "player":{ "nick": "guess1", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,4:{ "login": "guess2", "id": 4, "passwd": "imguess2", "access": 1, "player":{ "nick": "guess2", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,5:{ "login": "guess3", "id": 5, "passwd": "imguess3", "access": 1, "player":{ "nick": "guess3", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,6:{ "login": "guess4", "id": 6, "passwd": "imguess4", "access": 1, "player":{ "nick": "guess4", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,7:{ "login": "guess5", "id": 7, "passwd": "imguess5", "access": 1, "player":{ "nick": "guess5", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,8:{ "login": "guess6", "id": 8, "passwd": "imguess6", "access": 1, "player":{ "nick": "guess6", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,9:{ "login": "guess7", "id": 9, "passwd": "imguess7", "access": 1, "player":{ "nick": "guess7", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,10:{ "login": "guess8", "id": 10, "passwd": "imguess8", "access": 1, "player":{ "nick": "guess8", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,11:{ "login": "guess9", "id": 11, "passwd": "imguess9", "access": 1, "player":{ "nick": "guess9", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,12:{ "login": "guess10", "id": 12, "passwd": "imguess10", "access": 1, "player":{ "nick": "guess10", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,13:{ "login": "guess11", "id": 13, "passwd": "imguess11", "access": 1, "player":{ "nick": "guess11", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 160, "z": 48 } }
            ,14:{ "login": "guess12", "id": 14, "passwd": "imguess12", "access": 1, "player":{ "nick": "guess12", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 180, "z": 48 } }
            ,15:{ "login": "guess13", "id": 15, "passwd": "imguess13", "access": 1, "player":{ "nick": "guess13", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 200, "z": 48 } }
            ,16:{ "login": "guess14", "id": 16, "passwd": "imguess14", "access": 1, "player":{ "nick": "guess14", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 220, "z": 48 } }
            ,17:{ "login": "guess15", "id": 17, "passwd": "imguess15", "access": 1, "player":{ "nick": "guess15", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 120, "z": 48 } }
            ,18:{ "login": "guess16", "id": 18, "passwd": "imguess16", "access": 1, "player":{ "nick": "guess16", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 100, "z": 48 } }
            ,19:{ "login": "guess17", "id": 19, "passwd": "imguess17", "access": 1, "player":{ "nick": "guess17", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 110, "z": 48 } }
            ,20:{ "login": "guess18", "id": 20, "passwd": "imguess18", "access": 1, "player":{ "nick": "guess18", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,21:{ "login": "guess19", "id": 21, "passwd": "imguess19", "access": 1, "player":{ "nick": "guess19", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,22:{ "login": "guess20", "id": 22, "passwd": "imguess20", "access": 1, "player":{ "nick": "guess20", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,23:{ "login": "guess21", "id": 23, "passwd": "imguess21", "access": 1, "player":{ "nick": "guess21", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,24:{ "login": "guess22", "id": 24, "passwd": "imguess22", "access": 1, "player":{ "nick": "guess22", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,25:{ "login": "guess23", "id": 25, "passwd": "imguess23", "access": 1, "player":{ "nick": "guess23", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,26:{ "login": "guess24", "id": 26, "passwd": "imguess24", "access": 1, "player":{ "nick": "guess24", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,27:{ "login": "guess25", "id": 27, "passwd": "imguess25", "access": 1, "player":{ "nick": "guess25", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,28:{ "login": "guess26", "id": 28, "passwd": "imguess26", "access": 1, "player":{ "nick": "guess26", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,29:{ "login": "guess27", "id": 29, "passwd": "imguess27", "access": 1, "player":{ "nick": "guess27", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,30:{ "login": "guess28", "id": 30, "passwd": "imguess28", "access": 1, "player":{ "nick": "guess28", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,31:{ "login": "guess29", "id": 31, "passwd": "imguess29", "access": 1, "player":{ "nick": "guess29", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
            ,32:{ "login": "guess30", "id": 32, "passwd": "imguess30", "access": 1, "player":{ "nick": "guess30", "level": 1, "hp": 100, "maxhp": 100, "strength": 2, "defense": 2, "x": 130, "y": 140, "z": 48 } }
        };*/

        console.log( "Db function inited - account, requesting database." )

        bdd.query('SELECT * FROM proto.accounts', function(err, rows) {
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
    else
    {
        console.log( "Failed to load db function." )
    }

    //console.log(accounts);

    return accounts;
} );