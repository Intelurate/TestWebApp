
import fs from 'fs';


function addVersion(file, version){ 

    fs.readFile(file, (err, data) => {
        if(!err){
            data = data.toString().replace(/__VERSION__/g, version);
            file = file.replace('.set', '');
            fs.writeFile(file, data, (writeErr) => {
                if(!writeErr){
                }
            })
        }

      });

}


export default addVersion;
