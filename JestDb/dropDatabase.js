// import mongojs from 'mongoist';
// import db from '../server/modules/database';


// async function testAs(){
//     await db.dropDatabase()
//     process.exit(0);
// }
// testAs();

const { spawn } = require('child_process');
const ls = spawn('mongod') //, ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});



