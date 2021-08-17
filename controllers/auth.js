const { response } = require('express');

const login = (req , res = response) => {

    const test = req.body;
    
    res.json({
        msg:'login correcto',
        test
    })
}

module.exports = {
    login
}