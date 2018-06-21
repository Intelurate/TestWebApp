let domain = 'http://localhost:5757';

export default {
    /**************************************************************************************************************************************************************** 
    ** ACTION FILE      ** FXN NAME                             ** ENDPOINT                                                        **  PARAMS          ** ACTION **    
    *****************************************************************************************************************************************************************/
    /* USER */             
                        loadUsersAsync:                         domain + '/api/users/',                                             // {}               // GET
                        loadUserAsync:                          domain + '/api/user',                                               // {}               // GET                        
                        loadUserCounterAsync:                   domain + '/api/users/loadWorkcenterCounter',                        // {}               // GET
                        saveUserAsync:                          domain + '/api/user/',                                              // {}               // POST
                        updateUserAsync:                        domain + '/api/user',                                               // {id}             // PUT
                        deleteUserAsync:                        domain + '/api/user/delete',                                        // {id}             // PUT
                        loadPermissionsModelAsync:              domain + '/api/user/permissions',                                   // {}               // GET

    /* EVENT */
                        addEventRequestAsync:                   domain + '/api/event/addEventRequest',                         // {}               // POST
                        loadEventRequestAsync:                  domain + '/api/event/loadEventRequest',                        // {}               // GET
                        
    /* Events */
                        getEventsAsync:                         domain + '/api/event/getEvents',                                    // {}               // GET
                        getEventDetailsAsync:                   domain + '/api/event/getEventDetails',                              // {id}             // GET
                        sendJoinEventRequestAsync:              domain + '/api/event/sendJoinEventRequest',                         // {}               // POST
};
