import React, { Component } from 'react';
import { Router, Route, IndexRoute, useRouterHistory, browserHistory } from 'react-router';
import { createHashHistory } from 'history';
import {CONFIG} from '../constants/Config.js';
import NProgress from 'nprogress';

import Menu from '../components/Menu.js';
import App from '../containers/App.js'

import '../../css/reset.scss';
import '../../css/fonts.scss';
import '../../css/index.scss';
import '../../css/list.scss';
import '../../css/nprogress.scss';
import '../../css/antd.scss'

//以下代码可以解决以上问题，不依赖jq
setTimeout(function () {
    //利用iframe的onload事件刷新页面
    document.title = CONFIG.title;
    var iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 0);
    };
    document.body.appendChild(iframe);
}, 0);

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

var All = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/All.js').default);
    }, 'all');
};

// var Archive = (location, cb) => {
//     document.title = CONFIG.titleLoad;
//     NProgress.start();
//     require.ensure([], require => {
//         cb(null, require('../containers/Archive.js').default);
//     }, 'archive');
// };

var Tags = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/Tags.js').default);
    }, 'tags');
};

var Tag = (location, cb) => {
    document.title = CONFIG.titleLoad
    NProgress.start()
    require.ensure([], require => {
        cb(null, require('../containers/Tag.js').default)
    }, 'tag')
}

var Article = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/Article.js').default);
    }, 'post');
};

var Antd = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/Antd.js').default);
    }, 'antd')
}

var Todo = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../components/TodoTimeLine.js').default);
    }, 'todo')
}

var Message = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/Message.js').default);
    }, 'message')
}

var AntMotion = (location, cb) => {
    document.title = CONFIG.titleLoad;
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/AntMotion.js').default);
    }, 'motion')
}

var AntMotion2 = (location, cb) => {
    document.title = CONFIG.titleLoad;
    // NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/AntMotion2.js').default);
    }, 'motion')
}

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Menu}/>
        <Route path="/all" getComponent={All}/>
        {/*<Route path="archive" getComponent={Archive} />*/}
        <Route path="/tags" getComponent={Tags}/>
        <Route path="/tag/:id" getComponent={Tag}/>
        <Route path="/post/:id" getComponent={Article}/>
        <Route path="/antd" getComponent={Antd}/>
        <Route path="/todo" getComponent={Todo}/>
        <Route path="/message" getComponent={Message}/>
        <Route path="/motion" getComponent={AntMotion}/>
        <Route path="/motion2" getComponent={AntMotion2}/>
    </Route>
)

export default class Root extends Component {
    render() {
        return <Router history={appHistory} routes={routes}/>
    }
}