import con from "../database/connection.js"


export async function deleteUser(req, res){
    if(req.method === 'DELETE' && req.url.startsWith('/user/')){
        try{
            const userId = req.url.substring(6)
            const checkUser = 'SELECT * FROM gazuadev WHERE id = ?'
            const sql = 'DELETE FROM gazuadev WHERE id = ?'
            const values = [userId]
            const [rows] = await con.promise().query(checkUser, userId)

            if(rows.length === 0){
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify('Usuário não encontrado.'))
                res.end()
            }else{
                await con.promise().query(sql, values)
    
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify('Usuário deletado.'))
                res.end()
            }
        }catch(e){
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(`Erro ao deletar usuário: ${e}`))
            res.end()
        }
    }
}