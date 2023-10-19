import crypto from 'crypto'
import { config } from 'dotenv'

config()

const secretKey = process.env.SECRET_KEY
const algorithm = 'aes-256-cbc'
const iv = process.env.IV



export function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'))
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
}

export function decrypt(text){
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'))
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}