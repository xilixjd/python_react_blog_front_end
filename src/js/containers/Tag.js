/**
 * Created by xilixjd on 17/3/7.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { receiveIssues, fetchIssuesIfNeeded } from '../actions/index.js'
import CellView from '../components/CellView.js'
import { INIT_ISSUES } from '../constants/ActionTypes.js'

import { Spin } from 'antd'

import Animate from 'rc-animate'


class Tag extends Component {
    componentWillMount() {
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssuesIfNeeded('tags', this.props.params.id, ''))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            const { dispatch } = nextProps
            dispatch(fetchIssuesIfNeeded('tags', nextProps.params.id, ''))
        }
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
        let tagName
        const tagId = this.props.params.id
        const tagsArray = this.props.tagsArray
        if (tagsArray.length > 0) {
            for (let i = 0; i < tagsArray.length; i++) {
                if (tagsArray[i].id == tagId) {
                    tagName = tagsArray[i].title
                    break
                }
            }
        }
        return (
            <div className="list">
                <Animate
                    transitionName="fade"
                    transitionAppear
                >
                    <CellView title="全部" items={this.props.items}/>
                </Animate>
            </div>
        );
    }
}
;

function mapStateToProps(state) {
    const { postIssues, getTags } = state
    const {
        isFetching,
        items
    } = postIssues || {
        isFetching: true,
        items: []
    }
    const tagsArray = getTags.items

    return {
        isFetching,
        items,
        tagsArray
    }
}

export default connect(mapStateToProps)(Tag)
