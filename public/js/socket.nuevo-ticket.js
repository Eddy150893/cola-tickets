//Comando para establecer la conexion

var socket=io();
var label=$('#lblNuevoTicket');

socket.on('connect',function(){
    console.log("Conectado al servidor")
});

socket.on('disconnect',function(){
    console.log("Desconectado del servidor");
});
socket.on('estadoActual',function(resp){
    label.text(resp.actual);
});
//Cuando generan un nuevo ticket actualiza el ultimo en todos los clientes
socket.on('nuevoEstado',function(resp){
    label.text(resp.actual);
})
$('button').on('click',function(){
    //segundo parametro null por que no le enviamos nada
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    });
});