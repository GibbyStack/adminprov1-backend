const { response } = require('express');
const sql = require('mssql');
const conString = require('./config');

//query selects
const query = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        response.json({
            ok: false,
            message: 'Error',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recordset;
}

const querySingle = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        response.json({
            ok: false,
            message: 'Error',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recordset[0];
}

//execute los 3 faltantes
const execute = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        response.json({
            ok: false,
            message: 'Error',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.rowsAffected;
}



module.exports = {
    query,
    querySingle,
    execute
}