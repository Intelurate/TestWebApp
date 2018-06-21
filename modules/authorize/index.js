var jwt = require('jsonwebtoken');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/BurnDownTracker', ['users','variances']);

var _ = require('lodash');

module.exports = function (method, permissions) {
    return function (req, res, next) {

        if (req.method !== method) {
            return next();
        }

        var baseUrlLength = req.baseUrl.split(/\//g).length;
        var originalUrlLength = req.originalUrl.split(/\//g).length;

        if(baseUrlLength != originalUrlLength) {
            return next();
        }

        jwt.verify(req.cookies["UserToken"], 'e8vh745v9o875w9v', function (err, decoded) {
            if (decoded) {
                db.users.findOne({ _id: mongojs.ObjectId(decoded.userId) }, { permissions: 1, email: 1, firstName: 1, lastName: 1 }, function (err, user) {
                    if (!user) {
                        return res.redirect('/login');
                    }

                    if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
                        
                        if (req.body.ForgeryToken && req.body.ForgeryToken === decoded.ForgeryToken) {

                            if(permissions){
                                hasPermissions(user.permissions, permissions, (access) => {
                                    if (access) {
                                        return next();
                                    } else {
                                        return res.status(403).send({ message: 'No Permission' });
                                    }
                                });
                            }else{
                                return next();
                            }

                        } else {
                            return res.status(403).send({ message: 'No Security Token' });
                        }

                    } else {

                            if(permissions){
                                hasPermissions(user.permissions, permissions, (access) => {
                                    if (access) {
                                        return next();
                                    } else {
                                        return res.status(403).send({ message: 'No Permission' });
                                    }
                                });
                            }else{
                                return next();
                            }
                    }

                });

            } else {
                return res.redirect('/login');
            }
        });

    };
};

function hasPermissions(userPermissions, permissions, callback) {

    if (permissions) {
        callback(_.isMatch(userPermissions, permissions));
    } else {
        callback(true);
    }
}