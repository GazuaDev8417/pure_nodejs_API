import http from 'http'
import { createUser } from './endpoints/createUser.js'
import { getUsers } from './endpoints/getUsers.js'
import { updateUser } from './endpoints/updateUser.js'
import { deleteUser } from './endpoints/deleteUser.js'


const server = http.createServer((req, res)=>{
    if(req.method === 'POST' && req.url === '/user'){
        createUser(req, res)
    }

    if(req.method === 'POST' && req.url === '/login'){
        login(req, res)
    }

    if(req.method === 'GET' && req.url === '/users'){
        getUsers(req, res)
    }

    if(req.method === 'PUT' && req.url.startsWith('/user/')){
        updateUser(req, res)
    }

    if(req.method === 'DELETE' && req.url.startsWith('/user/')){
        deleteUser(req, res)
    }
})


server.listen(3003, ()=>{
    console.log('Servidor rondando na porta 3003')
})