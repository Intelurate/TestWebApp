import _ from 'underscore';

import request from 'supertest';

import { Auth } from '../authorize/';

function Route(method, route, auth, permissions){
    return (target, prop, descriptor) => {        
        let fn = descriptor.value;
        
        descriptor.enumerable = true;
        descriptor.value = (app) =>{

            if(auth){
                Auth(app, method, route, permissions);
            }
            app[method](route, (req, res)=>{
                fn.call(target, req, res);
            });

            return { className: target.constructor.name, prop: prop, method: method, route: route } 

        }
    }
}


function Get(route, auth, permissions){
    return Route('get', route, auth, permissions);
}
function Post(route, auth, permissions){
    return Route('post', route, auth, permissions);
}
function Put(route, auth, permissions){
    return Route('put', route, auth, permissions);
}
function Delete(route, auth, permissions){
    return Route('delete', route, auth, permissions);
}


class ExpressApi{

    static run(app, controllers, unitTest) {

        let UnitTest = {}
        controllers = controllers.forEach((Controller, i)=>{

            let d = Object.create(Controller.prototype);

            var Descriptors = Object.getOwnPropertyDescriptors(Controller.prototype);

            let Keys =  _.keys(Descriptors);            
            Keys.forEach((v,i)=>{
                
                if(Descriptors[v].enumerable === true) {                

                    let forTesting = d[v].call(Controller, app);

                    if(unitTest) {

                        Controller[forTesting.prop] = {}
                        Controller[forTesting.prop].request = (params) => {

                            forTesting.route = forTesting.route.split("/").map((v,i)=>{
                                if(v.indexOf(":") !== -1) {
                                    let param = v.split(":")[1]; 
                                    let optional = false;                                   
                                    if(param.indexOf("?") !== -1) {
                                        optional = true;
                                        param = param.replace("?", "");
                                    }
                                    if(params){
                                        v = params[param];
                                    }else{
                                        if(optional === false) {
                                            throw "Non Optiona Param is Needed"
                                        }else{
                                            v = "";
                                        }
                                    }
                                }

                                if(v !== "") {
                                    return `/${v}`;
                                } else {
                                    return "";
                                }

                            }).join('');

                            return request(app)[forTesting.method](forTesting.route);
                        }
                    }
                }            
            })
        
            return Controller;

        });
    }
}

export { Post, Get, Put, Delete, Route, ExpressApi }