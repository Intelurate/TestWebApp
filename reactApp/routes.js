import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'components/app';
import { HomeIndex, HomeMain } from 'components/home';
import { CalendarMain } from 'components/calendar';
import { UserRoute } from 'components/user';
import { EventDetailRoute } from 'components/e-cal/event-detail'

export default 
    <Route path = "/" component = {App} >
        { [HomeIndex, HomeMain, UserRoute, CalendarMain, EventDetailRoute ] }
    </Route>;
