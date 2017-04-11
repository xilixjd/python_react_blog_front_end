import React, {Component} from 'react'
import {Link} from 'react-router'

import Animate from 'rc-animate'


class Menu extends Component {
    render() {
        return (
            <div id="home">
                <Animate
                    transitionName="fade"
                    transitionAppear
                >
                    <div className="avatar" key="1">
                        <a href="https://github.com/xilixjd" target="_blank"></a>
                    </div>
                    <h1 key="2">xilixjd</h1>
                    <div className="link" key="3">
                        <Link to="all">全部</Link>
                        <Link to="tags">标签</Link>
                    </div>
                </Animate>
            </div>
        );
    }
}
;

export default Menu;