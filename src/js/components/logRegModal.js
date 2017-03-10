/**
 * Created by xilixjd on 17/3/9.
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchIssues, logModalShow } from '../actions/index.js'
import { LOGGING_SHOW, MODAL_CLOSE, LOGIN_SUBMIT, REG_SUBMIT} from '../constants/ActionTypes.js'

import { notification, Input, Icon, Button, Form } from 'antd'
const FormItem = Form.Item

import '../../css/loginingview.scss'

class LogRegModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { dispatch } = this.props
        let modalType = this.props.isShow
        modalType = modalType ? (modalType === LOGGING_SHOW ? <LoginModalConnect/> : <RegisterModalConnect/>) : modalType
        return (
            <div className="logRegModalBox" style={{display: modalType ? "block" : "none"}}>
                <div className="logRegModalBox-background"
                     onClick={
                        () => {
                            dispatch(logModalShow(MODAL_CLOSE))
                        }
                     }></div>
                { modalType }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { logModalShow } = state
    const {
        isShow,
        data
    } = logModalShow || {
        isShow: true,
        data: {}
    }

    return {
        isShow,
        data
    }
}

export default connect(mapStateToProps)(LogRegModal)

class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        })
    }

    usernameInputChange = (e) => {
        this.setState({ username: e.target.value})
    }

    passwordInputChange = (e) => {
        this.setState({ password: e.target.value })
    }

    loginSubmit() {
        const { dispatch } = this.props
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (username.length < 1) {
            this.openNotificationWithIcon('error', '登录', '用户名不能为空')
            return
        }
        let param = {
            username: username,
            password: password
        }
        dispatch(fetchIssues('logIn', param))
        this.state.username = ''
        this.state.password = ''
        this.openNotificationWithIcon('success', '登录', '登录成功')
    }

    render() {
        return (
            <div className="logreg-form-div">
                <Form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            this.loginSubmit()
                        }
                    }
                    className="login-form"
                >
                    <FormItem>
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                               placeholder="Username"
                               onChange={this.usernameInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                               placeholder="Password"
                               onChange={this.passwordInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const LoginModalConnect = connect()(LoginModal)


class RegisterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        })
    }

    usernameInputChange = (e) => {
        this.setState({ username: e.target.value})
    }

    passwordInputChange = (e) => {
        this.setState({ password: e.target.value })
    }

    registerSubmit() {
        const { dispatch } = this.props
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (username.length < 1) {
            this.openNotificationWithIcon('error', '注册', '用户名不能为空')
            return
        }
        if (password.length < 1) {
            this.openNotificationWithIcon('error', '注册', '密码不能为空')
        }
        let param = {
            username: username,
            password: password
        }
        dispatch(fetchIssues('register', param))
        this.state.username = ''
        this.state.password = ''
        this.openNotificationWithIcon('success', '注册', '注册成功')
    }

    render() {
        return (
            <div className="logreg-form-div">
                <Form
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            this.registerSubmit()
                        }
                    }
                    className="login-form"
                >
                    <FormItem>
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                               placeholder="Username"
                               onChange={this.usernameInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                               placeholder="Password"
                               onChange={this.passwordInputChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const RegisterModalConnect = connect()(RegisterModal)