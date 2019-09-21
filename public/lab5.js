
//npm init -y para generar un package.json
//> npm install --save socket.io 
const moment = require('moment');
var os = require('os');
var express = require('express'), // npm install --save express
    path = require('path');
var app = express()
var http = require('http').createServer(app); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http);//require socket.io module and pass the http object (server)
                                    //> npm install --save socket.io  

var publicDir = require('path').join(__dirname,'/programlab');
console.log(publicDir);

app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/programlab/programlab.html');
  
    //res.sendFile(__dirname + '/public/index_client.html');
});

//importante hace publica la carpeta imagenes o la public en general
app.use(express.static(path.join(__dirname, 'programlab')));


http.listen(8090, function() {
	console.log('Server Program Robot on port 8090');
});

/*
//guarda en un archivo txt local los email
function registrar_usuario(email,zona,navegador) {
    let archivo = "./usuario_registrados.txt";

    let currentDate = moment().format('DD-MM-YYYY');
    let currentTime = moment().format('HH:mm:ss');
    var sAux = "{'usuario':{'email':'" + email + "', 'fecha':'" + currentDate + " " + currentTime +  "', 'zona':'" + zona +  "', 'navegador':'" + navegador+"'}}" ;

    fs.open(archivo, 'a', 666, function( e, id ) {
    fs.write( id, sAux + os.EOL, null, 'utf8', function(){
        fs.close(id, function(){
          console.log("Usuario %s registrado correctamente!",sAux);
        });
      });
    });

*/

// WebSocket Connection
// administra los usuario por el nombre y el id de socket
users =[]; 
io.sockets.on('connection', function (socket) {// WebSocket Connection
    
    socket.on('username', (userName) => {
         var aux = {
          userName : userName,
          id : socket.id,
         };
         users.push(aux);
          
         let len = users.length;
         len--;

        // socket.emit('userList',users,users[len].id,users[len].userName); 
         console.log('userList',users,users[len].id,users[len].userName);
      });

      socket.on('getMsg', (data) => {
          socket.broadcast.to(data.toid).emit('sendMsg',{
              msg:data.msg,
              name:data.name
          });
      });

      socket.on('disconnect',()=>{
          for(let i=0; i < users.length; i++){
              
              if(users[i].id === socket.id){
                  users.splice(i,1); 
              }
          }
         // socket.emit('exit',users); 
          console.log('exit',users);
      });

    // envia el mensaje recibido de una interface de control a todas las pizarras  
    socket.on('mensaje_control', function(robot_mac,accion) {
        //numRobots--;
        console.log("Control> robot_mac: " + robot_mac + " accion: "+ accion)
        socket.emit("mensaje_server","1","Dato Recivido");
        socket.broadcast.emit('mensaje_pizarra', "1","Hola mensaje para pizarra"); 
    });    

});






