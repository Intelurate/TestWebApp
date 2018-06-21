import { JWTAsync } from '../jwt-async';
import mongojs from 'mongoist';
import db from '../database';
import _ from 'lodash';

function Auth (app, method, route, permissions) {

    return app[method](route, async (req, res, next)=>{

        let jwtAsync = JWTAsync.init('e8vh745v9o875w9v');        

        let decoded;
        try{
            decoded = await jwtAsync.verify(req.cookies["UserToken"]);              
        }catch(e){
            decoded = undefined;
        }

        if (decoded) {

            let user = await db.users.findOne({ _id: mongojs.ObjectId(decoded.userId) }, { permissions: 1, email: 1, firstName: 1, lastName: 1 })
            
            if (!user) {
                return res.redirect('/login');
            }

            res.locals.user = user;

            if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
                
                if (req.body.ForgeryToken && req.body.ForgeryToken === decoded.ForgeryToken) {

                    let access = hasPermissions(user.permissions, permissions);
                    if (access) {
                        return next();
                    } else {
                        return res.status(403).send({ message: 'No Permission' });
                    }

                } else {
                    return res.status(403).send({ message: 'No Security Token' });
                }

            } else {

                if(permissions) {
                    let access = hasPermissions(user.permissions, permissions);
                    if (access) {
                        return next();
                    } else {
                        return res.status(403).send({ message: 'No Permission' });
                    }                    
                }else{
                    return next();
                }
            }

        } else {
            return res.redirect('/login');

            //return res.status(403).send({ message: 'No Permission' });
        }

    })
};

function hasPermissions(userPermissions, permissions) {
    if (permissions) {
        return _.isMatch(userPermissions, permissions);
    } else {
        return true;
    }
}

export { Auth }