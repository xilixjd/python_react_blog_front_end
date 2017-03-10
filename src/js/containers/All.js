import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/index.js'
import CellView from '../components/CellView.js'


class All extends Component {
    componentWillMount() {

    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchIssuesIfNeeded('all', 10000, 'postIssues'))
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        if (this.props.isFetching) {
            return null;
        }
        return (
            <div className="list">
                <CellView title="全部" items={this.props.items}/>
            </div>
        );
    }
}
;

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
