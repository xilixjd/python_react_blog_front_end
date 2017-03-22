/**
 * Created by xilixjd on 17/3/7.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchIssuesIfNeeded } from '../actions/index.js'
import { Link } from 'react-router'

import { Menu, Dropdown, Icon } from 'antd'


class NavTag extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssuesIfNeeded('tags', null, 'postIssues'))
    }

    render() {
        let items = this.props.items
        let tags = items.map((item, index) => {
            let href = '#/tag/' + item.id
            let title = item.title
            return (
                <Menu.Item key={item.id}>
                    <a rel="noopener noreferrer" href={href}>{title}</a>
                </Menu.Item>
            )
        })
        tags = <Menu>{tags}</Menu>
        return (
            <Dropdown overlay={tags}>
                <li className="ant-menu-item">
                    <a>标签<Icon style={{marginRight: '0'}} type="down"/></a>
                </li>
            </Dropdown>
        )
    }
}


function mapStateToProps(state) {
    const { getTags } = state
    const {
        isFetching,
        items
    } = getTags || {
        isFetching: true,
        items: []
    }

    return {
        isFetching,
        items
    }
}

export default connect(mapStateToProps)(NavTag)