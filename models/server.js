const express = require('express');
const cors = require('cors');
const { dbC } = require('../db/config');
require('dotenv').config();
class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios:   '/api/usuario',
            auth:       '/api/auth',
            categorias: '/api/categorias',
        }
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
        this.app.use(this.paths.usuarios,require('../routes/user.routes'))
        this.app.use(this.paths.auth,require('../routes/auth.routes'));
        this.app.use(this.paths.categorias,require('../routes/categorias.routes'));
    }

    async conectarDB(){
        await dbC();
    }

}

module.exports = Server;