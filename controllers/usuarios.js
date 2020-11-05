const response = require('express');
const conString = require('../database/config');
const sql = require('mssql');

const getUsuarios = async(req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(res);
    });

    sql.connect(conString).then(pool => {
        return pool.request().execute('stp_usuarios_getall');
    }).then(result => {
        res.json({
            ok: true,
            usuarios: result.recordset
        });
    }).catch(err => {
        res.json(err);
    });
}

const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    sql.on('error', err => {
        console.log(err);
        res.json(res);
    });
    //Comprobar si existe el correo

    //Agregar usuario
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', nombre)
            .input('email', email)
            .input('password', password)
            .execute('stp_usuarios_add');
    }).then(result => {
        res.json({
            ok: true,
            usuario: result.recordset[0]
        });
    }).catch(err => {
        res.json(err);
    });
}



module.exports = {
    getUsuarios,
    addUsuario
};