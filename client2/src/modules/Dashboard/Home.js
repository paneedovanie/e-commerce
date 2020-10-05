import React, { Component } from 'react'

import axios from 'axios'

import Quotes from './partials/Quotes'


class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            //
        }
    }

    render () {
        return (
            <div>
                <Quotes />
            </div>
        )
    }
}

export default App; 