// MODULES
var express        = require('express');
var app            = express();                                 // create our app with express
var pg             = require('pg');                     
var morgan         = require('morgan');                         // log requests to the console (express)
var bodyParser     = require('body-parser');                    // pull information from HTML POST (express)
var methodOverride = require('method-override');                // simulate DELETE and PUT (express)

// DATABASE -------------------------------------------------------------------------------------------------------------------------------
var conString = "pg://postgres:@localhost:5432/postgres";       // pg://login:pwd@server:port/database

// CONFIGURATION
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// REST API W/EXPRESS --------------------------------------------------------------------------------------------------------------------	
app.route('/api/test')
.get(function(req, res) {
  res.send('GET');
})
.post(function(req, res) {
  res.send('POST');
})
.put(function(req, res) {
  res.send('PUT');
});

app.route('/api/auth')
.post(function(req, res) {
	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
		   console.error('could not connect to postgres', err);
		}
		console.log("recherche d'utilisateur..");  	 
		var query = client.query("SELECT * FROM utilisateur" +
		  			            " WHERE emailutilisateur='"+req.body.emailutilisateur
		  			          +"' AND mdputilisateur='"+req.body.mdputilisateur+"'");

		query.on("row", function (row, result) {
		// do your stuff with each row
			result.addRow(row);
		});

		query.on("end", function (result) {
		  // here you have the complete result
	  	  if(result.rows.length>0){
	  	  	  var user = JSON.stringify(result.rows[0], null, 2)
	  	  	  console.log(user);
	  	  	  client.end(); 
	  	  	  res.send(user);
	  	  }
	  	  else{
	  		  res.status(204).send(err); // no content
	  	  }
	  	});
	});
})

app.route('/api/user/:id')
.get(function(req, res) {
  res.send('Get User');
})

app.route('/api/user')
.post(function(req, res) {
  res.send('Add User');
})
.put(function(req, res) {
  res.send('Update User');
});

app.route('/api/users')
.get(function(req, res) {
	var client = new pg.Client(conString);
    client.connect(function(err) {
	  	 if(err) {
	  	    console.error('could not connect to postgres', err);
	  	 }

  		 console.log("liste des utilisateurs");  	 
	  	 var query = client.query("SELECT * FROM utilisateur");

	  	 query.on("row", function (row, result) {
	  	  	// do your stuff with each row
	  	  	result.addRow(row);
	  	 });

	  	 query.on("end", function (result) {
	  		 // here you have the complete result
	  		 var users = JSON.stringify(result.rows, null, 2);
	  	  	 console.log(users);
	  	  	 client.end();
	  	  	 res.send(users);
	  	 });	  		   	  
	 });
});

app.route('/api/events')
.get(function(req, res) {
	var client = new pg.Client(conString);
    client.connect(function(err) {
	  	  if(err) {
	  	    console.error('could not connect to postgres', err);
	  	  }

  		  console.log("liste des evenements");  	 
	  	  var query = client.query("SELECT * FROM evenement");

	  	  query.on("row", function (row, result) {
	  	  	 // do your stuff with each row
	  	  	 result.addRow(row);
	  	  });

	  	  query.on("end", function (result) {
	  	  	 // here you have the complete result
	  		 var events = JSON.stringify(result.rows, null, 2);
	  	  	 console.log(events);
	  	  	 client.end();
	  	  	 res.send(events);
	  	  });	  		   	  
	 });
});

// ANGULAR ----------------------------------------------------------------------------------------------------------------------------

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(8080);
console.log("App listening on port 8080");
