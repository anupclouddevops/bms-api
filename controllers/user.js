const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/user');
const mongoose = require('mongoose');

const signup = (req, res, next) => {

    User.find({email: req.body.email}).exec()
    .then((user) => {
        if(user.length > 0) {
            return res.status(409).json({
                message: 'User already exists in the application'
            })
        } else {
            bcrypt.hash(req.body.password, 10 , (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
        
                    user.save()
                    .then((result) => {
                        console.log(result)
                        res.status(200).json({
                            message: `New User created ${result}`
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(500).json({
                            message: `User creation unsuccessful`
                        })
                    })
        
                }
            })
        }
    })
}

const login = (req, res, next) => {

    User.find({email: req.body.email})
    .exec()
    .then((user) => {
        if (user.length < 1 ) {
            return res.status(401).json({
                message: 'Authentication Failure'
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({
                    message: 'Authentication Failure'
                })
            }
            
            if(result) {

                const token = jwt.sign({
                    email: user[0].email,
                    uid: user[0]._id
                }, 
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1h"
                })

                res.status(200).json({
                    message: 'Authentication Successful',
                    token: token
                })
            }
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: `User login unsuccessful`
        })
    })
}

const deleteUser = (req, res, next) => {

    User.findByIdAndRemove(req.params.userID, (err, doc) => {

        if (err) {
            console.log(err)
            res.status(500).json({
                message: `UserID: ${req.params.userID} can not be deleted`,
                error: err
            })
        }

        if (doc) {
            res.status(200).json({
                message: `UserID: ${doc.email} has been deleted successfully`
            })
        } else {
            res.status(409).json({
                message: `UserID: ${req.params.userID} doesn't exists in the application`
            })
        }

    })
}

module.exports = {
    signup,
    login,
    deleteUser
}