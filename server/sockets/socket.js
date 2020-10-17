const { io } = require('../server');
const {TicketControl}=require('../classes/ticket-control');

const ticketControl=new TicketControl();
io.on('connection', (client) => {
    // Escuchar el cliente
    //Crea un ticket
    client.on('siguienteTicket', (data,callback) => {
        let siguiente=ticketControl.siguiente()
        callback(siguiente);
        client.broadcast.emit('nuevoEstado',{actual:ticketControl.getUltimoTicket()});
    });
    //Muestra el ultimo ticket
    client.emit('estadoActual',{
        actual:ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4()
    });
    //Atiende el primero en cola
    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje:`El escritorio es necesario`
            })
        }

        let atenderTicket=ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4',{ultimos4:ticketControl.getUltimos4()});
        //actualizar / notificar cambios en los ULTIMOS 4
    });
});