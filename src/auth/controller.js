const queries = './queries'
const bcrypt = require('bcrypt')


const sign_up = async (req, res) => {
    let { name, email, password} = req.body
    console.log(req.headers);

    let errors = []

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
        res.send(hashedPassword)
    }


}


module.exports = {
    sign_up,
}