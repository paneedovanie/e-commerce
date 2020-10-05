import React, { Component } from 'react'
import Auth from '../../../Core/Auth'

import axios from 'axios'

import Icon from '@mdi/react'
import { mdiFormatQuoteOpen } from '@mdi/js'; 

class Quotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saving: false,
            quotes: null
        }
    }

    render = () => {
        const { quotes } = this.state
        return (
            <div className="quotes_container">
            {quotes && (
                <div className="quotes">
                    <div className="quotes_actions">
                        <button onClick={this.saveQuote}>
                            <Icon path={mdiFormatQuoteOpen}
                                title="Save quote"
                                size={1.5}
                            />
                        </button>
                    </div>
                    <div className="quotes_details">
                        <h3 className="quotes_content"><i>{quotes.content}</i></h3>
                        <small className="quote_originator">- {quotes.originator.name} <a href={quotes.originator.url} target="_blank" rel="noopener noreferrer">Source</a></small>
                    </div>
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

    saveQuote = () => {
        const { quotes } = this.state

        this.setState({saving: true})

        axios.post("/api/v1/quotes", {
            user: Auth.getUser()._id,
            quote_id: quotes.id,
            content: quotes.content,
            originator: quotes.originator,
            url: quotes.url,
            tags: quotes.tags
        }).then(response => {
            console.log(response)
            this.setState({saving: false})
        }).catch(err => {
            console.error(err)
        })
    }

    componentDidMount = () => {
        this.getData()
    }
}

export default Quotes