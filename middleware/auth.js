
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization
    if (authHeader) {
        let token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = result
            next()
        })

    }
    else {
        res.sendStatus(422)
    }
    console.log(authHeader)
    // return res.status(422)
}

module.exports = auth;