const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;

    this.marcadores = new Marcadores();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente Conectado");

      socket.emit("marcadores-activos", this.marcadores.activos);

      socket.on("marcador-nuevo", (marcador) => {
        this.marcadores.agregarMarcador(marcador);

        //Con broadcast envias un msg a todos los clientes conectados execto al que lo emitio
        socket.broadcast.emit("marcador-nuevo", marcador);
      });
    });
  }
}

module.exports = Sockets;
