const express = require('express');
require('dotenv').config();
class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
        this.app.listen(this.port);
    }

    middlewares(){
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
    }

}

module.exports = Server;