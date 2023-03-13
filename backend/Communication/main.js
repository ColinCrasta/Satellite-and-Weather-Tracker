
const spawner = require('child_process').spawn;

function sendtoClient(){
	//string to pass to the server
	const data_to_pass = 'Send this to python script';
	console.log('Data send to python script:', data_to_pass);
	//initializing the child process to run the client.py file
	const python_process = spawner('python', ['./client.py', data_to_pass]);

	//when client.py uses the first print command
	python_process.stdout.on('data', (data) => {
		console.log('Data received from python script:', data.toString());

	});
}
//call the function to send a message to the client
sendtoClient();