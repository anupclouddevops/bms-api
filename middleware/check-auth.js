const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        parsedToken = req.headers.authorization.split(" ")
        if (parsedToken[0] === 'Bearer') {
            const token = parsedToken[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.userData = decoded
            next()
        } else {
            res.status(401).json({
                message: "Authentication Failure"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "Authentication Failure"
        })
    }
}