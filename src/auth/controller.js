const queries = require('./queries')
const bcrypt = require('bcrypt')
const pool = require('../../db')
const { env } = require('../../config/config')
const create_token = require('../tool/token')
const jwt = require('jsonwebtoken')


const sign_up = async (req, res) => {
    let { name, email, password} = req.body

    
    let errors = []
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    
    if (rows.length) {
        errors.push({message: 'User with this email exists!'})
    }

    if (!name || !email || !password) {
        errors.push({message: 'Please enter all fields!'})
    }

    if (password.length < 6) {
        errors.push({message: "Password should be at least 6 characters!"})
    }

    if (errors.length > 0) {
        res.send(errors)
    } else {
        let hashedPassword = await bcrypt.hash(password, 10)
        pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword], (error, _) => {
            if (error) throw error
            res.send('User registered! Login please!')
        })
    }


}


const sign_in = async (req, res) => {
    
    const info = req.body
    
    async function get_user (user) {
        const { rows } = await pool.query('SELECT id, email, password FROM users WHERE email = $1', [user.email])
        if (rows.length === 0) return 0
        
        const validPassword = await bcrypt.compare(user.password, rows[0].password)
        if (!validPassword) return 0

        return rows[0].id
    }

    const id = await get_user(info);
    

    if (id === 0) return res.status(400).send('Invalid email or password')

    const access_token = create_token(id, env.access_key, env.access_time)
    const refresh_token = create_token(id, env.refresh_key, env.refresh_time)

    return res.status(200).send({ access_token, refresh_token })

}


const refresh_token = (req, res) => {
    const auth_header = req.get('Authorization')
    const token = auth_header.split('Bearer ')[1]
    
    try {
        const decoded_data = jwt.verify(token, env.refresh_key)
        const access_token = create_token(
            decoded_data.data, env.access_key, env.access_time
        )

        return res.status(200).send(access_token)
    } catch (err) {
        console.log(err)
        return res.sendStatus(401)
    }
}


module.exports = {
    sign_up,
    sign_in,
    refresh_token
}