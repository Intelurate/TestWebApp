import Promise from 'bluebird';

const importFile = (collection, path, db, cb,) => {
    const { spawn } = require('child_process');
    var file = `${path}${collection}.json`;
    const im = spawn('mongoimport', [ '--host', 'localhost', '--db', db, '--drop', '--file', file ]);
    im.stdout.on('data', (data) => {       
    });
    im.stderr.on('data', (data) => {
    });
    im.on('close', (exitCode) => {
        cb();
    });
}


const runImports = async (array, path, db) => {

    return new Promise((resolve, reject)=>{
        var counter = 0;
        array.forEach((v,i)=>{
            importFile(v, path, db, d=>{
                counter++;
                if(counter == array.length){
                    resolve();
                }
            });
        })
    })
}


export default runImports;