
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + ipaddress + ", port " + port )
});