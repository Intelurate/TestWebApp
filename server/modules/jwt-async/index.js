import JWT from 'jwt-async';
import Promise from 'bluebird';
 

// jwt.signAsync()
// .then(function (signed) {
// return jwt.verifyAsync(signed);
// })
// .then(function (claims) {
// console.log(claims);
// })
// .catch(JWT.JWTError, function (e) {
// console.log(e);
// });


class JWTAsync {

    constructor(secret){
        this.jwt = Promise.promisifyAll(new JWT());        
        this.jwt.setSecret(secret);
    }

    static init(secret){
        return new JWTAsync(secret);
    }

    async sign(data) {
        return new Promise((resolve, reject) => {
            this.jwt.signAsync(data)
            .then(signed => {
                resolve(signed);
            })
            .catch(e => {
              reject(e);
            });
        })
    }

    async verify(encoded) {
        return new Promise((resolve, reject) => {
            this.jwt.verifyAsync(encoded)
            .then(decoded => {
                resolve(decoded.claims);
            })
            .catch(e => {                
              reject(e);
            });
        })
    }

}

export { JWTAsync }