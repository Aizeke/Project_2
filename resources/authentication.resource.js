var crypto = require('crypto')
var _ = require('lodash')
var jwt = require('jsonwebtoken')
var models = require('../models')
module.exports = {
    _generateSalt () {
        return crypto.randomBytes(32).toString('hex')
    },
    _generateHash (salt, password) {
        return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    },
    _generateJWT (userInfo) {
        var expiry = new Date()
        expiry.setDate(expiry.getDate() + 7)
        return jwt.sign({
            userID: userInfo.id,
            email: userInfo.email,
            exp: parseInt(expiry.getTime() / 1000)
        }, process.env.JWT_SECRET)
    },
    register (userInfo) {
        var user = _.pick(userInfo, ['email'])
        user.salt = this._generateSalt()
        user.hash = this._generateHash(user.salt, userInfo.password)
        user.email = user.email.toLowerCase()
        user.displayName = user.displayName
       return models.User.create(user)
    },
    login (loginInfo) {
        var self = this
        loginInfo.email = loginInfo.email.toLowerCase()
        return new Promise(function(resolve, reject) {
            models.User.findOne({ where: 
                { email: loginInfo.email }
            })
            .then(function(foundUser) {
                if(!foundUser) return reject(new Error('Email Not Found'))
                var testHash = self._generateHash(foundUser.salt, loginInfo.password)
                if (foundUser.hash === testHash) {
                    resolve(self._generateJWT(foundUser))
                }
                else return reject(new Error('Wrong Password'))

            })
            .catch(function(err) {
                return reject(err)
            })
        })
        
    }
}
