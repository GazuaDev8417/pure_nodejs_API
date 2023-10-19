import mysql from 'mysql2'


const con = mysql.createConnection({
    host: '35.226.146.116',
    user: '2147335-flamarion-silva',
    password: 'MjxyWqJsw2kqMP9LS9dh',
    database: 'lovelace-2147335-flamarion-silva'
})

con.connect(error=>{
    if(error){
        console.log(`Erro ao conectar banco de dados: ${error}`)
    }else{
        console.log('Conectado ao banco')
    }
})

export default con