const express = require('express');
const cors = require('cors');
require('dotenv').config();
class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.middlewares();
        this.routes();
        this.app.listen(this.port);
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo:
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/user.routes'))
    }

}

module.exports = Server;