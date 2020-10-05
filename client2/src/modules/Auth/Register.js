import React, { Component } from 'react'

import axios from 'axios'

class Quotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quotes: null
        }
    }

    render = () => {
        const { quotes } = this.state
        return (
            <div className="quotes_container">
            {quotes && (
                <div className="quotes">
                    <h3 className="quotes_content"><i>{quotes.content}</i></h3>
                    <small className="quote_originator">- {quotes.originator.name} <a href={quotes.originator.url} target="_blank" rel="noopener noreferrer">Source</a></small>
                </div>
            )}
            {!quotes && (
                <div className="quotes_loading">
                    <p>Loading quotes</p>
                </div>
            )}
            </div>
        )
    }

    getData = () => {
        axios.get("https://quotes15.p.rapidapi.com/quotes/random/", {
            query: {
                "language_code": "en"
            },
            headers: {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": "3f33a7e76bmshfc8dad3656a14fep1c2023jsn0b29a122316b",
                "useQueryString": true
            }
        }).then(response => {
            console.log(response.data)
            this.setState({quotes: response.data})
        }).catch(err => {
            console.error(err)
        })
    }

    componentDidMount = () => {
        this.getData()
    }
}

export default Quotes