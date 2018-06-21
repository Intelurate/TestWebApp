import React from 'react';
import { render } from 'react-dom';

// import react router deps
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import routes from './routes';

const router = (
    <Provider store={store} >
        <Router history={history} routes={routes} />
    </Provider>
);

render(router, document.getElementById('main'));