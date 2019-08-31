const logger = require('./logger');
const tunnel = require('./services/tunnel');

const { engine, sockets} = tunnel.io;

const CHANNELLS = {
    BUTTON_CLICK = 'button_click'
}

sockets.on('connection', function (socket) { // WebSocket Connection
  socket.on("button_click", function( robot_mac, boton, numero, valor) {
        
    g_robot_mac = robot_mac;

    logger.info(`Robot mac ${g_robot_mac} presionado: ${boton}`);
            
    var sData = "";
    switch(boton) {
      case 'btn_status':
        JSON.stringify({ 
          mac_id: g_robot_mac, 
          class: 'comando', 
          type = 'status'
        });
        break;
      case 'btn_discovery':
        clear_array_Robot_ID(); //elimina todos los elementos del array
        mqtt_publish(topic_robots_discovery,"todos digamenme su client_ID");
        break;
      case 'btn_up':
        JSON.stringify({
          mac_id = g_robot_mac,
          class: "comando",
          type: "mover",
          action: "forward",
          delay_type: "xtiempo",
          value_numeric1: "500", // valor en milisengundos del tiempo en on
          value_numeric2: "50"  // valor de la pontencia de los motores
        })
        break;
      case 'btn_down':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "comando"
        packet.type = "mover"
        packet.action = "backward"
        packet.delay_type = "xtiempo"
        packet.value_numeric1 = "200"
        packet.value_numeric2 = "50" 
        sData = packet.Armar_Json
        //sData ="/" + g_robot_mac +  '/comando/mover/-/backward/xtiempo/200/500';
        break;
      case 'btn_left':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "comando"
        packet.type = "mover"
        packet.action = "left"
        packet.delay_type = "xtiempo"
        packet.value_numeric1 = "200"
        packet.value_numeric2 = "50" 
        sData = packet.Armar_Json
        //sData = "/" + g_robot_mac + '/comando/mover/-/left/xtiempo/200/500';
        break;

      case 'btn_right':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "comando"
        packet.type = "mover"
        packet.action = "right"
        packet.delay_type = "xtiempo"
        packet.value_numeric1 = "200"
        packet.value_numeric2 = "50" 
        sData = packet.Armar_Json
        //sData = "/" + g_robot_mac + '/comando/mover/-/right/xtiempo/200/500';
        break;
      
      case 'btn_stop':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "comando"
        packet.type = "stop"
        sData = packet.Armar_Json
        //sData = "/" + g_robot_mac + '/comando/mover/-/stop/xtiempo/200/500';
        break; 

      case 'btn_led':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "actuador"
        packet.type = "led"
        packet.number = "1"
        packet.action = "on"
        packet.delay_type = "xtiempo"
        packet.value_numeric1 = "200"
        sData = packet.Armar_Json
        //sData = "/" + g_robot_mac + '/actuador/led/1/on/xtiempo/200/-';
        break;
      case 'btn_servo':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "actuador"
        packet.type = "servo"
        packet.number = "1"
        packet.value_numeric1 = "90"
        sData = packet.Armar_Json
        //sData =  "/" + g_robot_mac + '/actuador/servo/'+ numero + '/on/-/'+ valor + '/-';
        break;
      case 'btn_buzzer':
        packet.data_init
        packet.mac_id = g_robot_mac
        packet.class = "actuador"
        packet.type = "buzzer"
        packet.number = "1"
        packet.action = "on"
        packet.delay_type = "xtiempo"
        packet.value_numeric1 = "200"
        sData = packet.Armar_Json
        //sData = "/" + g_robot_mac + '/actuador/buzzer/1/on/xtiempo/200/-';
        break; 
      case 'btn_speak':
        break;
      case 'btn_query':
        break;  
    };
    console.log(sData);
    if (sData != ""){
      if(g_robot_mac!= "")
      {
        mqtt_publish(topic_robots_escuchando,    sData);
        console.log( sData + " Robot mac " + g_robot_mac + " presionado:" + boton +"\n");

      }
      else
      {
        if(boton=="btn_discovery") {   mqtt_publish(topic_robots_escuchando,    sData);  }
        else {  console.log("Robot_ID invalido");}
      }
    }
  });

});


module.exports = {
  CHANNELLS,
}