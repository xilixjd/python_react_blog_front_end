import React, {Component} from 'react'

import '../../css/notfoundpage.scss'

export default class NotFoundPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="notFound">
                404
            </div>
        )
    }
}