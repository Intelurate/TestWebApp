
import fs from 'fs';

function jestCreateConfig(json, filename, cb){ 
    
    fs.writeFile(filename, JSON.stringify(json), (writeErr) => {
        if(!writeErr){
            cb();
        }
    })
}


export default jestCreateConfig;
