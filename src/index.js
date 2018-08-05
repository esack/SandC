import 'babel-polyfill';
import React from 'react';  
import { render } from 'react-dom';
import configureStore from './store/configure-store';  
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory  } from 'react-router'
import {loadProjects} from './actions/project-actions';
import routes from './routes';  

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

const store = configureStore();

//store.dispatch(loadProjects());

render(
    <Provider store={ store }>
        <Router history={hashHistory} routes={routes} />
    </Provider>, 
    document.getElementById('app')
);
