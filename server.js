// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };
// var http = require('http');
// var express = require('express');
// var WSS = require('ws').Server;
// var app = express().use(express.static('public'));
// var server = http.createServer(app);
// server.listen(700, '127.0.0.1');
// var wss = new WSS({ port: 700 });
// var ip = process.env.OPENSHIFT_NODEJS_IP;
// var port1      = 700;
// var port2      = 701;
// // var WebSocketServer = require('ws').Server
// var uuid = require('node-uuid');
// // var wss = new WebSocketServer({ port: port1,server:ip });
// console.log("wss"+wss);
// console.log("ip"+ ip);
// var clients = {};
// var dumCounter=0;
// wss.on('connection', function connection(ws) {
//
//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//         var obj = JSON.parse(message);
//         if(obj.op == 'qrcode')
//         {
//             var uuidToken = uuid.v1();
//             clients[uuidToken] = ws;
//             var hello = { op:'qrcode',token:uuidToken};
//             ws.send(JSON.stringify(hello),{mask:false});
//         }
//         // else{
//         //     console.log(message)
//         // }
//
//     });
//
// });
//
// wss.onclose = function(event) {
//     log('Closed connection ');
// };
// // var http = require("http");
//
// http.createServer(function(request, response) {
//
//     response.writeHead(200, {"Content-Type": "text/plain","Access-Control-Allow-Origin":"*"});
//     process.on('uncaughtException', function(err) {
//         response.end("Exception");
//     });
//     if(request.method == "POST")
//     {
//         var url = request.url;
//         if(url == "/auth")
//         {
//
//             var body = '';
//             request.on('data', function(chunk)
//             {
//                 body += chunk.toString();
//             });
//
//             request.on('end', function () {
//                 var params = JSON.parse(body);
//
//                 var uuId = params.uuid;
//                 var accessToken = params.user_id;
//
//                 var msg = {'op':'authdone','userId':accessToken};
//                 if(clients[uuId] != undefined || clients[uuId] != null)
//                 {
//                     // console.log("Before "+Object.size(clients));
//                     clients[uuId].send(JSON.stringify(msg),{mask:false});
//                     delete clients[uuId];
//                     // console.log("After "+Object.size(clients));
//
//                     response.end('{"status":"OK"}');
//
//                 }
//                 else
//                 {
//                     // console.log("Recived Params: "+JSON.stringify(params));
//                     response.end('{"status":"NOK1"}');
//                 }
//
//             });
//         }
//         else
//         {
//             response.end('{"status":"NOK2"}');
//
//         }
//     }
//     else
//     {
//         response.end("NOT Supported");
//     }
//
// }).listen(port2,ip);




Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var ip = process.env.OPENSHIFT_NODEJS_IP;
var port1      = 700;
var port2      = 701;




var WebSocketServer = require('ws').Server
var uuid = require('node-uuid');
var wss = new WebSocketServer({ port: port1,server:ip });
console.log(wss);

var clients = {};
var dumCounter=0;
wss.on('connection', function connection(ws) {
    console.log(ip);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        var obj = JSON.parse(message);
        if(obj.op == 'qrcode')
        {
            var uuidToken = uuid.v1();
            clients[uuidToken] = ws;
            var hello = { op:'qrcode',token:uuidToken};
            ws.send(JSON.stringify(hello),{mask:false});
        }
        // else{
        //     console.log(message)
        // }

    });

});

wss.onclose = function(event) {
    log('Closed connection ');
};
var http = require("http");

http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain","Access-Control-Allow-Origin":"*"});
    process.on('uncaughtException', function(err) {
        response.end("Exception");
    });
    if(request.method == "POST")
    {
        var url = request.url;
        if(url == "/auth")
        {

            var body = '';
            request.on('data', function(chunk)
            {
                body += chunk.toString();
            });

            request.on('end', function () {
                var params = JSON.parse(body);

                var uuId = params.uuid;
                var accessToken = params.user_id;

                var msg = {'op':'authdone','userId':accessToken};
                if(clients[uuId] != undefined || clients[uuId] != null)
                {
                    // console.log("Before "+Object.size(clients));
                    clients[uuId].send(JSON.stringify(msg),{mask:false});
                    delete clients[uuId];
                    // console.log("After "+Object.size(clients));

                    response.end('{"status":"OK"}');

                }
                else
                {
                    // console.log("Recived Params: "+JSON.stringify(params));
                    response.end('{"status":"NOK1"}');
                }

            });
        }
        else
        {
            response.end('{"status":"NOK2"}');

        }
    }
    else
    {
        response.end("NOT Supported");
    }

}).listen(port2,ip);
// var http = require('http');
// var express = require('express');
// var WSS = require('ws').Server;
//
// var app = express().use(express.static('public'));
// var server = http.createServer(app);
// server.listen(700, '127.0.0.1');
//
// var wss = new WSS({ port: 701 });
//
// wss.on('connection', function(socket) {
//   console.log('Opened Connection');
//
//   var json = JSON.stringify({ message: 'hello', op:"qrcode" ,token : '200'});
//   socket.send(json);
//   console.log('Sent: ' + json);
//   console.log('New websocket connection from %s:%d', socket._socket.remoteAddress, socket._socket.remotePort);
//   socket.on('message', function(message) {
//     console.log('Received: ' + message);
//
//     wss.clients.forEach(function each(client) {
//       var json = JSON.stringify({ message: 'Something changed' });
//       client.send(json);
//       console.log('Sent: ' + json);
//     });
//   });
//
//   socket.on('close', function() {
//     console.log('Closed');
//   });
//
// });

