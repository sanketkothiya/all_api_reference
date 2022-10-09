const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Refresh = require('../models/refresh')

router.delete('/', (req, res) => {
    Refresh.deleteOne({ token: req.body.token }).then(() => {
        return res.sendStatus(200).json({ ok: "delete token" })
    }).catch((err) => {
        throw err
    })
})

module.exports = router