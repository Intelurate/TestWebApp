// import AppMod from 'app-module-path'; 
// AppMod.addPath('./modules');

import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { UsersApi } from './api/users';
import { EventsApi } from './api/eventsAPI';

import { BootstrapApi } from './api/bootstrap';
import { ExpressApi } from './modules/express-decorator';

let app = express();
app.use(cookieParser());
app.use(morgan('dev'));  // Create and display a HTTP logger middleware function
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));


['/lib/font-awesome/css/font-awesome.min.css',
'/lib/font-awesome/css/font-awesome.css'].forEach((v,i)=>{
    app.get(v, function (req, res) {                
        res.setHeader('Content-Type', 'text/css');		
        var stream = fs.createReadStream('./listo/'+v);
        stream.on("error", ()=>{
			res.send("No File")			
        })		        
        stream.pipe(res);
    });	
})


ExpressApi.run(app, [
    UsersApi,
    EventsApi,
    BootstrapApi  
], true);

export { app, UsersApi, EventsApi }