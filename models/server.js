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
        this.app.get('/api', (req, res) => {
            
            /*
            res.json({
                msg:'peticion JSON realizada'
            });
            */

            res.status(403).json({
                msg:'oopsie'
            })

        });
    }

}

module.exports = Server;