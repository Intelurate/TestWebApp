import http from 'http';
import { app } from  './app';

let server = http.createServer(app);
let port = 5757;

server.listen(port, () => {
    console.log(`Gulp is running the app on port ${port} (localhost:${port})`);
});