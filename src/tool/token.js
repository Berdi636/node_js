const jwt = require('jsonwebtoken')

function create_token(data, key, time) {
    return jwt.sign({ data }, key, { expiresIn: time })
}

module.exports = create_token