import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { DOMAIN } from '../constants/ActionTypes.js'

// 为什么有时候用 .update 会出现 updater is not a function 的错误 ？？？
import { is, fromJS, Map, List } from 'immutable'

import { Modal, Button, Select } from 'antd'

const Option = Select.Option;

import '../../css/searchbar.scss'


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: Map({
                    confirmLoading: false,
                    visible: false,
                    value: '',
                    optionLists: List(),
                })
        }
    }

    componentDidUpdate() {
        if (document.querySelector(".ant-select-search__field")) {
            document.querySelector(".ant-select-search__field")
            .onkeydown = (e) => {
                if (e.keyCode == 13) {
                    console.log(e)
                    this.handleOk()
                }
            }
        }
    }

    fetchData = (url, requestQuery, callback) => {
        fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: requestQuery,
                    credentials: 'include'
                }).then(
                    response => response.json()
                ).then(
                    json => callback(json)
                )
    }

    handleChange = (value) => {
        this.setState(({data}) => ({
            data: data.update('value', v => value)
        }))
        this.timeoutFunc(this.methodFunc, null, 500, value)
    }

    // 函数节流
    timeoutFunc = (method, context, time, value) => {
        clearTimeout(method.tId)
        method.tId = setTimeout(function() {
            method.call(context, value)
        }, time)
    }

    methodFunc = (value) => {
        let url = DOMAIN + '/api/search'
        let requestQuery = `content=${value}`
        this.fetchData(url, requestQuery, (responseData) => {
            this.setState(({data}) => ({
                data: data.update('optionLists', list => List(responseData))
            }))
        })
    }

    handleOk = () => {
        this.setState(({data}) => ({
            data: data
            .set('confirmLoading', true)
            .set('value', '')
        }))
        this.props.callbackParent({
            confirmLoading: true,
            visible: this.state.data.get('visible')
        })
        setTimeout(function() {
            this.setState(({data}) => ({
                data: data
                .set('visible', false)
                .set('confirmLoading', false)
            }))
            // 这个将运行在 2s 之内，而不是 2s 之后
            this.props.callbackParent({
                confirmLoading: false,
                visible: false
            })
        }.bind(this), 2000)
    }

    handleCancel = () => {
        this.setState(({data}) => ({
            data: data
            .set('visible', false)
            .set('value', '')
        }))
        this.props.callbackParent({
            confirmLoading: this.state.data.get('confirmLoading'),
            visible: false
        })
    }

    onKeyDown = (e) => {
        if (e.keyCode == 13) {
            console.log(e)
        }
    }

    strLength = (str) => {
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                len+=2;
            }
        }
        return len;
    }

    // 用了 nextProps 与 this.props 的对比之后，这个已经不需要了
    shouldReloadPage = (href, loc) => {
        let hrefPath = href.split('/')[1]
        let searchBarLocationPath = loc.pathname.split('/')[1]
        if (hrefPath === searchBarLocationPath) {
            // window.location.reload()
        }
    }

    render() {
        var data = this.state.data
        const options = data.get('optionLists').size > 0 ? data.get('optionLists').map((value, index) => {
            return (
                <Option key={index}>
                    {
                        this.strLength(value.content) <= 70  ?
                        <a href={'/#' + value.url}
                        className="option-a-link"
                        onClick={() => {
                            this.handleCancel()
                        }}
                        >
                            {value.type + ':' + value.content}
                        </a> :
                        <a href={'/#' + value.url}
                        className="option-a-link"
                        onClick={() => {
                            this.handleCancel()
                        }}
                        >
                            {value.type + ':' + value.content.substring(0, 35)}
                        </a>
                    }
                </Option>
            )
        }) : <Option key="javascript">没有搜索结果</Option>
        
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    closable={false}
                    onOk={this.handleOk}
                    confirmLoading={this.props.confirmLoading}
                    onCancel={this.handleCancel}
                    okText="搜索"
                    footer={null}
                >
                    <Select
                        style={{width: "100%"}}
                        mode="combobox"
                        value={this.props.visible ? data.get('value') : ''}
                        notFoundContent=""
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        placeholder={"搜索博文，用户或评论"}
                        onChange={(e) => {
                            this.handleChange(e)
                        }}
                    >
                        {options}
                    </Select>
                </Modal>
            </div>
        )
  }

}

export default connect()(SearchBar)