import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import { HomeIndex, HomeMain } from './components/home';

export default 
    <Route path = "/" component = {App} >
        { [HomeIndex, HomeMain] }
    </Route>
;