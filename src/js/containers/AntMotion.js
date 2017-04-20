/**
 * Created by xilixjd on 17/4/15.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchIssues, getImgs } from '../actions/index.js'

import NProgress from 'nprogress'

import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import Animate from 'rc-animate'

import { Icon, Spin } from 'antd';

import '../../css/motion.scss'

const textData = {
    content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
    ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
    ' Asia known as motorcycles.',
    title: 'Motorcycle',
};
let dataArray = [
    { image: 'https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png',
      content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
    ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
    ' Asia known as motorcycles.', title: 'Motorcycle' },
    { image: 'https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png',
      content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
    ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
    ' Asia known as motorcycles.', title: 'Motorcycle' },
    { image: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png',
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
        ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
        ' Asia known as motorcycles.', title: 'Motorcycle'},
    { image: 'https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png',
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
        ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
        ' Asia known as motorcycles.', title: 'Motorcycle'},
    { image: 'https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png' },
]
dataArray = dataArray.map(item => ({ ...item, ...textData }))


class PicDetailsDemo extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
    };

    static defaultProps = {
        className: 'pic-details-demo',
    };

    constructor(props) {
        super(props);
        this.state = {
            picOpen: {},
            loadingBeforeWindowHeight: 0
        };
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchIssues('getImgs', ''))
        window.onscroll = () => {
            let {windowH, contentH, scrollT} = this.getSize()
            if (windowH + scrollT + 100 > contentH) {
                this.loadMoreImgs()
            }
        }
    }

    componentDidUpdate() {
        NProgress.done()
    }

    onImgClick = (e, i) => {
        const picOpen = this.state.picOpen;
        Object.keys(picOpen).forEach((key) => {
            if (key !== i && picOpen[key]) {
                picOpen[key] = false;
            }
        });
        picOpen[i] = true;
        this.setState({
            picOpen,
        });
    };

    onClose = (e, i) => {
        const picOpen = this.state.picOpen;
        picOpen[i] = false;
        this.setState({
            picOpen,
        });
    }

    onTweenEnd = (i) => {
        const picOpen = this.state.picOpen;
        delete picOpen[i];
        this.setState({
            picOpen,
        });
    };

    getDelay = (e, imgs) => {
        const i = e.index + imgs.length % 4;
        return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
    }

    getSize = () => {
        let windowW,windowH,contentH,contentW,scrollT;
        windowH = window.innerHeight;
        windowW = window.innerWidth;
        scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        contentH = (document.documentElement.scrollHeight > document.body.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight;
        contentW = (document.documentElement.scrollWidth > document.body.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth;
        return {windowW,windowH,contentH,contentW,scrollT}
    }

    loadMoreImgs = () => {
        const { dispatch } = this.props
        const pageIdx = this.props.imgs.pageIdx
        let {windowH, contentH, scrollT} = this.getSize()
        let imgsLength = this.props.imgs.imgs.length
        // 应该显示的总高度
        let imgsHeightShould = 240 * imgsLength
        if (document.documentElement.clientWidth < 400) {
            if (!this.props.imgs.addFetching && (imgsHeightShould <= contentH + 200)) {
                dispatch(fetchIssues('addImgs', pageIdx + 1))
            }
        } else {
            if (!this.props.imgs.addFetching) {
                dispatch(fetchIssues('addImgs', pageIdx + 1))
            }
        }
    }

    getLiChildren = (imgs) => {
        const imgWidth = 110 * 2;
        const imgHeight = 76 * 2;
        const imgBoxWidth = 130;
        const imgBoxHeight = 96;
        return imgs.map((item, i) => {
            const { image, title, content } = item;
            const isEnter = typeof this.state.picOpen[i] === 'boolean';
            const isOpen = this.state.picOpen[i];

            const left = isEnter ? 0 : imgBoxWidth * (i % 4) * 2;
            const imgLeft = isEnter ? imgBoxWidth * (i % 4) * 2 : 0;
            const isRight = Math.floor((i % 4) / 2);
            const isTop = Math.floor(i / 4);
            let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
            top = isEnter ? top * 2 : imgBoxHeight * isTop * 2;
            let imgTop = isTop ? imgBoxHeight : 0;
            imgTop = isEnter ? imgTop * 2 : 0;

            const liStyle = isEnter ? { width: '100%', height: 350, zIndex: 1 } : null;
            const liAnimation = isOpen ?
                ({ boxShadow: '0 2px 8px rgba(140, 140, 140, .35)' }) :
                ({ boxShadow: '0 0px 0px rgba(140, 140, 140, 0)' });
            let aAnimation = isEnter ?
                ({
                    delay: 400,
                    ease: 'easeInOutCubic',
                    width: imgWidth,
                    height: imgHeight,
                    onComplete: this.onTweenEnd.bind(this, i),
                    left: imgBoxWidth * (i % 4)*2,
                    top: isTop ? imgBoxHeight*2 : 0,
                }) : null;
            aAnimation = isOpen ?
                ({
                    ease: 'easeInOutCubic',
                    left: isRight ? ((imgBoxWidth * 2) - 10)*2 : 0,
                    width: '50%',
                    height: 350,
                    top: 0,
                }) : aAnimation;

            // 位置 js 控制；
            return (<TweenOne
                key={i}
                style={{
                    left,
                    top,
                    ...liStyle,
                }}
                component="li"
                onClick={e => {
                    if (isOpen) {
                        return this.onClose(e, i)
                    }
                }}
                className={isOpen ? 'open' : ''}
                animation={liAnimation}
            >
                <TweenOne
                    component="a"
                    onClick={e => this.onImgClick(e, i)}
                    style={{
                        left: imgLeft,
                        top: imgTop
                    }}
                    animation={aAnimation}
                >
                    <img src={image} width="100%" height="100%" />
                </TweenOne>
                <TweenOneGroup
                    enter={[
                        { opacity: 0, duration: 0, type: 'from', delay: 400 },
                        { ease: 'easeOutCubic', type: 'from', left: isRight ? '50%' : '0%' },
                    ]}
                    leave={{ ease: 'easeInOutCubic', left: isRight ? '50%' : '0%' }}
                    component=""
                >
                    {isOpen && <div
                        className={`${this.props.className}-text-wrapper`}
                        key="text"
                        style={{
                            left: isRight ? '0%' : '50%',
                        }}
                    >
                        <h1>{title}</h1>
                        <Icon type="cross" onClick={e => this.onClose(e, i)} />
                        <em />
                        <p>{content}</p>
                    </div>}
                </TweenOneGroup>
            </TweenOne>);
        });
    };

    render() {
        let className = this.props.className
        let imgs = this.props.imgs.imgs
        let imgsLen = imgs.length
        if (imgsLen && (imgsLen % 4) != 0) {
            // 图片加载不够，取余数，余数即截取 dataArray 的数组数
            let remainderDataArray = dataArray.splice(0, imgsLen % 4)
            imgs = imgs.concat(remainderDataArray)
        }
        let isFetching = this.props.imgs.isFetching
        let addFetching = this.props.imgs.addFetching
        // 单张图片的高度
        let imgHeight = 180
        let data = []
        if (document.documentElement.clientWidth >= 400) {
            return (
                <div>
                    {isFetching ?
                        <div style={{textAlign: 'center'}}>
                            <Spin size="large"/>
                        </div>
                        :
                        <div>
                            <div className={`${this.props.className}-wrapper`} style={{height: Math.ceil(imgsLen / 4) * 180}}>
                                <div className={this.props.className}>
                                    <QueueAnim
                                        delay={e => this.getDelay(e, imgs)}
                                        component="ul"
                                        className={`${this.props.className}-image-wrapper`}
                                        interval={0}
                                        type="bottom"
                                    >
                                        {this.getLiChildren(imgs)}
                                    </QueueAnim>
                                </div>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                {addFetching ? <Spin size="large"/> : <span>下划加载更多</span>}
                            </div>
                        </div>
                    }
                </div>
            )
        } else {
            return (
                <div>
                    {isFetching ?
                        <div style={{textAlign: 'center'}}>
                            <Spin size="large"/>
                        </div>
                            :
                        <div>
                            <div className={className + '-wrapper'}>
                                <div className={className}>
                                    <QueueAnim component="ul" type={['right', 'left']} leaveReverse
                                               className={className + '-image-wrapper'}
                                    >
                                        {imgs.map((item, i) => {
                                            const isOpen = this.state.picOpen[i]
                                            const { image, title, content } = item
                                            return (
                                                <li key={i} className={className} onClick={
                                                    (e) => {
                                                        if (isOpen){
                                                            this.onClose(e, i)
                                                        }
                                                    }
                                                }>
                                                    <a onClick={(e) => this.onImgClick(e, i)}>
                                                        <img src={image}/>
                                                    </a>
                                                    {isOpen ?
                                                        <Animate
                                                            transitionAppear
                                                            component="div"
                                                            transitionName="fade"
                                                        >
                                                            <div key={i} className={className + '-text-wrapper'}>
                                                                <h1>{title}</h1>
                                                                <em></em>
                                                                <p>{content}</p>
                                                            </div>
                                                        </Animate>
                                                        : null
                                                    }
                                                </li>
                                            )
                                        })}
                                    </QueueAnim>
                                </div>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                {addFetching ? <Spin size="large"/> : <span>下划加载更多</span>}
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { imgs } = state

    return {
        imgs
    }
}

export default connect(mapStateToProps)(PicDetailsDemo)