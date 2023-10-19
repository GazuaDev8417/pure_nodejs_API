import con from '../database/connection.js'


export async function createUser(req, res){
    if(req.method === 'POST' && req.url === '/user'){
        try{
            let body = ''
    
            req.on('data', chunk=>{
                body += chunk.toString()
            })
    
            req.on('end', async()=>{
                const user = JSON.parse(body)
                const id = `${Date.now()}-${Math.random().toString(16)}`
                const sql = 'INSERT INTO gazuadev(id, name, email, password) VALUES(?, ?, ?, ?)'
                const checkUser = 'SELECT * FROM gazuadev WHERE email = ?'
                const values = [id, user.name, user.email, user.password]
                
                const [rows] = await con.promise().query(checkUser, user.email)
                
                if(rows.length > 0){
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'application/json')
                    res.write(JSON.stringify('Usuário já cadastrado.'))
                    res.end()
                }else{
                    await con.promise().query(sql, values)
    
                    res.statusCode = 201
                    res.setHeader('Content-Type', 'application/json')
                    res.write(JSON.stringify('Usuário criado com sucesso!'))
                    res.end()
                }
            })
        }catch(e){
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(`Erro ao criar usuário: ${e}`))
            res.end()
        }
    }
}