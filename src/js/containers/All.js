import React, {Component} from 'react';
import {connect} from 'react-redux';
import { receiveIssues, fetchIssuesIfNeeded } from '../actions/index.js'
import { INIT_ISSUES } from '../constants/ActionTypes.js'
import CellView from '../components/CellView.js'

import { Spin } from 'antd'


class All extends Component {
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

    render() {
        if (this.props.isFetching) {
            return (
                <div style={{textAlign: 'center'}}>
                    <Spin size="large" />
                </div>
            )
        }
        return (
            <div className="list">
                <CellView title="全部" items={this.props.items}/>
            </div>
        );
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

export default connect(mapStateToProps)(All)
