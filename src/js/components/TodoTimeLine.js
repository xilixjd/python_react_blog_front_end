/**
 * Created by xiejunda_sx on 2017/3/22.
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Timeline } from 'antd'

import '../../css/todo.scss'

export default class TodoTimeLine extends React.Component {
    render() {
        return (
            <div className="todoDiv">
                <Timeline pending={<a href="">See more</a>}>
                    <Timeline.Item color="green">Todo</Timeline.Item>
                    <Timeline.Item>将所有提示框（提示框组件）根据返回的状态码来显示</Timeline.Item>
                    <Timeline.Item>回复和 @ 未读提醒</Timeline.Item>
                    <Timeline.Item>后端还有很多细节和功能可以实现（如flask-security，redis缓存，admin，高并发，邮件，消息队列）</Timeline.Item>
                    <Timeline.Item>docker, fabric, supervise</Timeline.Item>
                    <Timeline.Item>加载页面</Timeline.Item>
                    <Timeline.Item>后台处理</Timeline.Item>
                </Timeline>
            </div>
        )
    }
}