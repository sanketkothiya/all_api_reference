const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Refresh = require('../models/refresh')

router.post('/', (req, res) => {
    if (!req.body.token) {
        return res.status(401).json({ error: "Not valid token" })

    }
    Refresh.findOne({ token: req.body.token }).then(document => {
        if (document) {
            jwt.verify(req.body.token, process.env.REFRESH_SECRET, (err, user) => {
                if (err) {
                    return res.status(403)
                }
                //  JWT
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                    process.env.JWT_SECRET, { expiresIn: '1h' }

                );
                return res.json({ accessToken: accessToken, type: 'Bearer' })


            })

        }
        return res.status(401).json({ error: "Not valid token" })

    }).catch((err) => {
        throw err

    })

})

module.exports = router;