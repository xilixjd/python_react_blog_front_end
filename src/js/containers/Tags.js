import React, { Component } from 'react';
import { connect } from 'react-redux'
import { receiveIssues, fetchIssuesIfNeeded } from '../actions/index.js'
import CellView from '../components/CellView.js';
import { INIT_ISSUES } from '../constants/ActionTypes.js'

import { Spin } from 'antd'

import Animate from 'rc-animate'


class Tags extends Component {
    constructor(props) {
        super(props);
        this.spliceJson = this.spliceJson.bind(this)
    }

    componentWillMount() {
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchIssuesIfNeeded('all', 10000, 'postIssues'))
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(receiveIssues(INIT_ISSUES, ''))
    }

    // 拼接 json
    spliceJson(items) {
        let list = items,
            articles = {};

        for (let i = 0, listLen = list.length; i < listLen; i++) {
            let labels = list[i]['tag']
            if (!labels) {
                break
            }
            labels = labels.split(',')

            for (let j = 0, labelsLen = labels.length; j < labelsLen; j++) {
                let name = labels[j];
                if (!articles.hasOwnProperty(name)) {
                    articles[name] = [];
                }
                articles[name].push(list[i]);

            }
        }

        return articles;
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div style={{textAlign: 'center'}}>
                    <Spin size="large" />
                </div>
            )
        }

        let articles = this.spliceJson(this.props.items),
            view = [];

        for (let label in articles) {
            view.push(<CellView key={label} title={label} items={articles[label]}/>)
        }

        return (
            <div className="list">
                <Animate
                    transitionName="fade"
                    transitionAppear
                >
                    {view}
                </Animate>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {postIssues} = state
    const {
        isFetching,
        items
    } = postIssues || {
        isFetching: true,
        items: []
    }

    return {
        isFetching,
        items
    }
}

export default connect(mapStateToProps)(Tags)


