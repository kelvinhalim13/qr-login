
// var socket = new WebSocket('ws://localhost:701/');
// socket.onopen = function(event) {
//     log('Opened connection ');
//     var json = JSON.stringify({ op: 'Hello' });
//     socket.send(json);
//     log('Sent: ' + json);
// }
//
// socket.onerror = function(event) {
//     log('Error: ' + JSON.stringify(event));
// }
//
// socket.onmessage = function (event) {
//     var obj = JSON.parse(event);
//
//     console.log("Receivied:" +JSON.stringify(obj));
//
//     if(obj.op == 'hello')
//     {
//         console.log("### Got hello token "+obj.token);
//     }
//     else if(obj.op == 'authdone')
//     {
//         console.log("### Got auth token "+obj.accessToken);
//         ws.close();
//     }
//     // log('Received: ' + event.data);
// }
//
// socket.onclose = function(event) {
//     log('Closed connection ');
// }
//
// document.querySelector('#close').addEventListener('click', function(event) {
//     socket.close();
//     log('Closed connection ');
// });
//
// document.querySelector('#send').addEventListener('click', function(event) {
//     var json = JSON.stringify({ message: 'Hey there' });
//     socket.send(json);
//     log('Sent: ' + json);
// });
//
// var log = function(text) {
//     var li = document.createElement('li');
//     li.innerHTML = text;
//     document.getElementById('log').appendChild(li);
// }
//
// window.addEventListener('beforeunload', function() {
//     socket.close();
// });
//Just for testing.
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:700');

ws.on('open', function open() {

    //Send hello Message to server.
    var hello = { op:'qrcode'};
    ws.send(JSON.stringify(hello));
});

ws.on('message', function(data, flags) {
    var obj = JSON.parse(data);

    console.log("Receivied:" +JSON.stringify(obj));

    if(obj.op == 'qrcode')
    {
        console.log("### Got hello token "+obj.token);
    }
    else if(obj.op == 'authdone')
    {
        console.log("### Got auth token "+obj.accessToken);
        ws.close();
    }

});
ws.onclose = function(event) {
    log('Closed connection ');
};