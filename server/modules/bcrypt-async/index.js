import bcrypt from 'bcrypt';

class BcryptAsync {

    constructor(){

    }

    static init(){
        return new BcryptAsync();
    }

    async compare(value, encryptedValue){

        return new Promise((resolve, reject) => {
            bcrypt.compare(value, encryptedValue)
            .then(bool=>{
                resolve(bool);
            })    
            .catch(err=>{
                reject(err);
            })
        })

    }

    async genSalt(number){
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(5)
            .then(salt=>{
                resolve(salt);
            })    
            .catch(err=>{
                reject(err);
            })
        })

    }

    async hash(value, salt){
        return new Promise((resolve, reject) => {
            bcrypt.hash(value, salt) 
            .then(hash=>{
                resolve(hash);
            })    
            .catch(err=>{
                reject(err);
            })
        })

    }

}

export { BcryptAsync }