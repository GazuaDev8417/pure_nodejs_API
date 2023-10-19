import con from "../database/connection.js"


export async function updateUser(req, res){
    if(req.method === 'PUT' && req.url.startsWith('/user/')){
        try{
            const userId = req.url.substring(6)
            let body = ''

            req.on('data', chunk=>{
                body += chunk.toString()
            })

            req.on('end', async()=>{
                const user = JSON.parse(body)
                const checkUser = 'SELECT * FROM gazuadev WHERE id = ?'
                const sql = `
                    UPDATE gazuadev SET name = ?, email = ?, password = ?
                    WHERE id = ?
                `
                const values = [user.name, user.email, user.password, userId]
                const [rows] = await con.promise().query(checkUser, userId)
                
                if(rows.length === 0){
                    req.statusCode = 404
                    res.setHeader('Content-Type', 'application/json')
                    res.write(JSON.stringify('Usuário não encontrado.'))
                    res.end()
                }else{
                    await con.promise().query(sql, values)
    
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.write(JSON.stringify('Usuário atualizado.'))
                    res.end()
                }
            })
        }catch(e){
            req.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(`Erro ao alterar usuário: ${e}`))
            res.end()
        }
    }
}