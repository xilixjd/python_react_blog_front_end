/**
 * Created by xiejunda_sx on 2017/3/22.
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { CONFIG } from '../constants/Config.js'

import { Timeline } from 'antd'

import NProgress from 'nprogress'

import Animate from 'rc-animate'

import '../../css/todo.scss'

export default class TodoTimeLine extends React.Component {

    componentDidUpdate() {
        NProgress.done()
        document.title = CONFIG.title
    }

    render() {
        return (
            <Animate
                transitionName="fade"
                transitionAppear
            >
                <div className="todoDiv">
                    <Timeline pending={<a href="">See more</a>}>
                        <Timeline.Item color="green">文章 markdown，登录注册，注册邮件，评论，回复</Timeline.Item>
                        <Timeline.Item color="green">在回复，评论框 @用户，并发送消息</Timeline.Item>
                        <Timeline.Item color="green">未读提醒，根据 socketio 来获取新消息</Timeline.Item>
                        <Timeline.Item>后端还有很多细节和功能可以实现（如flask-security，redis缓存，admin，高并发，邮件，消息队列）</Timeline.Item>
                        <Timeline.Item>测试了一下，200 并发量的时候，网站几乎就不能访问了。。</Timeline.Item>
                        <Timeline.Item>docker, fabric, supervise</Timeline.Item>
                        <Timeline.Item>加载页面</Timeline.Item>
                        <Timeline.Item>后台处理</Timeline.Item>
                    </Timeline>
                </div>
            </Animate>
        )
    }
}