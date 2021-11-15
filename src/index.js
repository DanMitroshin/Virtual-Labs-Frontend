import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./store"
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import MainRouter from "./routers";
import ContentWrapper from "./components/ContentWrapper";


ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename={process.env.PUBLIC_URL}>
            <ContentWrapper>
                <MainRouter/>
            </ContentWrapper>
        </HashRouter>
    </Provider>
,
document.getElementById('root'));

