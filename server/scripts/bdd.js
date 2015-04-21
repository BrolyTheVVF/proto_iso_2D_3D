define( ['mysql', 'colors'],
function( mysql, colors )
{

    var bdd       = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : ''
    });

    bdd.connect(function(err) {
        if (err) {
            console.myLog( "MySql seem to be unplug.", colors.error, 2 );
            return;
        } 
 
        console.myLog( "MySql seem to be pluged in ID : " + bdd.threadId + ".", colors.info, 2 );

    } );

    return bdd;

} );