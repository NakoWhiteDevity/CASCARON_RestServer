const express = require('express');
const cors = require('cors');
const { dbC } = require('../db/config');
const fileUpload = require('express-fileupload');
require('dotenv').config();

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios:   '/api/usuario',
            auth:       '/api/auth',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            buscar:     '/api/buscar',
            uploads:    '/api/uploads'
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

        //Carga de ficheros:
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        this.app.use(this.paths.usuarios,require('../routes/user.routes'));
        this.app.use(this.paths.buscar,require('../routes/buscar.routes'));
        this.app.use(this.paths.auth,require('../routes/auth.routes'));
        this.app.use(this.paths.categorias,require('../routes/categorias.routes'));
        this.app.use(this.paths.productos,require('../routes/productos.routes'));
        this.app.use(this.paths.uploads,require('../routes/uploads.routes'));
    }

    async conectarDB(){
        await dbC();
    }

}

module.exports = Server;