/* This is example code. Modify it accordingly. For questions, please visit http://penguintraders.com */

//Include the node.js modules that you need. Make sure you install them first with npm install
var http = require("http");

// Server will be listening on port 8080 or the PORT environment variable if it is defined
// PORT must match the port defined in the MT4 EA or indicator.
this.PORT = process.env.PORT || 8096;

//Create the server and listening to the request
http.createServer(function onRequest(request, response) {
	request.setEncoding("utf8");
	var content = [];

	request.addListener("data", function(data) {
		content.push(data); //Collect the incoming data
	});
	

	//At the end of request call
	request.addListener("end", function() {
		//setup the response
		response.writeHead( 200, {"Content-Type": "text/plain"} );
		
		msg = content[0].toString();
		
		if(msg != "")
		{
			//console.log(msg); // Prints the message in the console
			
			var reqObj = JSON.parse(msg);	// If the incoming message is in JSON format, you can parse it as JSON.
			
			
			console.log(reqObj); 
			console.log(reqObj.ask);
			
			/*
			Here you can have the code to do what you want it to do. You can also use cluster to run a multithreaded app. Or connect to a DB or connect to external web services and collect data, etc
			*/
			
			//Create a dummy response object
			var outObj = {
				value: 1.0*reqObj.ask, //Just some random value to demonstrate
				msg: "test message",
			}
			
			response.write(JSON.stringify(outObj));	//Write the response
			response.end(); //Close the response
			console.log(outObj);
			console.log(JSON.stringify(outObj));
		}

	});

	
	
}).listen(this.PORT);

console.log("Node.js server listening on port "+ this.PORT);

