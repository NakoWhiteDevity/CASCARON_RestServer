const express = require('express');
const cors = require('cors');
const { dbC } = require('../db/config');
require('dotenv').config();
class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.conectarDB();
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
        this.app.use(this.authPath,require('../routes/auth.routes'))
        this.app.use(this.usuariosPath,require('../routes/user.routes'));
    }

    async conectarDB(){
        await dbC();
    }

}

module.exports = Server;