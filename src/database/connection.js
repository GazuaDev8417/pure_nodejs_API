import mysql from 'mysql2'
import { config } from 'dotenv'

config()

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
})

con.connect(error=>{
    if(error){
        console.log(`Erro ao conectar banco de dados: ${error}`)
    }else{
        console.log('Conectado ao banco')
    }
})

export default con