
//import socketio from "socket.io";
import debug from "debug";
import http from "http";
import app from "../boot";
import config, {
    session
} from "../App/Config/app";

/**
 Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(config.PORT, () => debug('listening'));
server.on('error', onError);
server.on('listening', onListening);
// const io = socketio(expressServer);

// io.on('connection', (socket) => {
//     socket.emit('msgFS', {
//         data: "welcome to socket io server"
//     });
//     socket.on('newMessage', (msg) => {
//         console.log(msg);
//     });
// })




/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}