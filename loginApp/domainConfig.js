// let domain = 'http://30685756.ngrok.io';
//let domain = 'https://c50c169e.ngrok.io';
let domain = 'http://localhost:5757';

export default {
    /**************************************************************************************************************************************************************** 
    ** ACTION FILE       ** FXN NAME                        ** ENDPOINT                                                 **  PARAMS                      ** ACTION **    
    ****************************************************************************************************************************************************************/
    /* LOGIN */
                        loadWorkcentersAsync:               domain + '/api/workcenters/',                               // {}                           // GET
                        loginAsync:                         domain + '/api/login/'                                      // {}                           // GET
    
};
