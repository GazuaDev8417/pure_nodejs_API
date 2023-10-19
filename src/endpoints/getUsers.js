import con from "../database/connection.js"


export async function getUsers(req, res){
    if(req.method === 'GET' && req.url === '/users'){
    try{
        const [rows] = await con.promise().query('SELECT * FROM gazuadev')

        if(rows.length === 0){
            throw new Error('Ainda não há usuários cadastrados.')
        }
        
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(rows))
        res.end()
    }catch(e){
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(`Erro ao buscar usuaŕios: ${e}`))
        res.end()
    }
    }
}