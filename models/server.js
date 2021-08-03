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
            res.json({
                msg:'get Gucci'
            });
        });
        this.app.post('/api', (req, res) => {
            res.json({
                msg:'post Gucci'
            });
        });
        this.app.delete('/api', (req, res) => {
            res.json({
                msg:'delete Gucci'
            });
        });

    }

}

module.exports = Server;