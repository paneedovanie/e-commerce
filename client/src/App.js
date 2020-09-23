import React, { Component } from 'react'

import Icon from '@mdi/react'
import { mdiLoading, mdiLanDisconnect, mdiBell } from '@mdi/js'
// import base64Url from 'base64url'

import './App.css'
import axios from 'axios'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            online: true,
            loading: true,
            message: null,
            errors: null,
            mood: null,
            phrase: "",
            fetching: false,
            helped: false,
            moods: []
        }
    }

    render () {
        const { online, loading, mood, phrase, fetching, errors, message, helped, moods } = this.state

        return (
            <div className="container">
                {!online && (
                    <div className="loading">

                        <Icon path={mdiLanDisconnect}
                            title="Disconnected"
                            size={3}
                            color="white"/>
                        <h1>You are disconnected from the internet</h1>
                    </div>
                )}
                {loading && (
                    <div className="loading">

                        <Icon path={mdiLoading}
                            title="Loading"
                            size={3}
                            horizontal
                            vertical
                            rotate={90}
                            color="white"
                            spin/>
                        <h1>Loading</h1>
                    </div>
                )}
                {!loading && online && (
                    <form className="form" onSubmit={this.onSubmit} disabled={fetching}>
                        <button type="button" onClick={this.requestNotifPermission} className="notif_button">
                            <Icon path={mdiBell}
                                title="Disconnected"
                                size={1}
                                />
                        </button>
                        { mood && (
                            <div className="result_container">
                                <h1 className="my_mood" hidden={mood === "none" ? true : false}>Your mood is {mood}</h1>
                                <h1 className="my_mood" hidden={mood === "none" ? false : true}>Sorry, I can't identify your mood</h1>
                                <small className="help_label">Wrong? Help me improve my service by clicking the correct answer.</small>
                                <div className="help_button_container" hidden={helped}>
                                { moods.map((e,i) => {
                                    return (
                                        <button type="button" onClick={this.helpFix.bind(this, e)} key={i} hidden={mood === e}>{e}</button>
                                    )
                                })

                                }
                                </div>
                                { errors && 
                                    errors.map(e => {
                                        return <p className="error">{e}</p>
                                    })
                                }
                                { message && (
                                    <h3 className="message">{message}</h3>
                                )}
                            </div>
                        )}
                        <label className="form_label" htmlFor="input">Tell me what are you thinking and, I'll guess your mood.</label>
                        <br />
                        <input 
                            id="input"
                            type="text" 
                            className="form_input" 
                            name="phrase" 
                            placeholder="Your thoughts" 
                            onChange={this.onChange}
                            value={phrase}
                            disabled={fetching}
                        />
                        <button type="submit" className="form_button">
                            { fetching ? (
                                <Icon path={mdiLoading}
                                title="Loading"
                                size={1}
                                horizontal
                                vertical
                                rotate={90}
                                color="white"
                                spin/>
                            ): ( "Scan" )}
                        </button>
                    </form>
                )}
            </div>
        )
    }

    componentDidMount = () => {
        this.getMoods()
        window.addEventListener("online", () => {
            this.setState({online: true})
        });
        window.addEventListener("offline", () => {
            this.setState({online: false})
        });
    }

    getMoods = async () => {
        try {
            let result = await axios.get('/api/v1/categories?type=emotion')

            let formatData = []

            result.data.forEach(element => {
                formatData.push(element.name)
            })

            this.setState({loading: false, moods: formatData})
        } catch (err) {
            this.setState({errors: err, fetching: false})
        }
    }

    onChange = (e) => {
        this.setState({mood: null, phrase: e.target.value})
    }

    onSubmit = (e) => {
        if(this.state.phrase === "") return

        e.preventDefault()
        this.setState({mood: null, message: null, errors: null, fetching: true, helped: false})
        axios.post('/api/v1/emotions/mood', { phrase: this.state.phrase })
            .then(res => {
                this.setState({mood: res.data, fetching: false})
            })
            .catch((err) => {
                this.setState({errors: err.response.data.errors, fetching: false})
            })
    }

    helpFix = (category) => {
        this.setState({message: null, errors: null, fetching: true})
        axios.post('/api/v1/emotions/', { phrase: this.state.phrase, category: category })
            .then(res => {
                this.setState({helped: true, message: 'Thank you for supporting this project! - Ed', fetching: false})
            })
            .catch(err => {
                this.setState({errors: err.response.data.errors, fetching: false})
            })
    }

    requestNotifPermission = () => {
        Notification.requestPermission().then( async function(result) {
            if(result === 'granted') {
                const status = await navigator.permissions.query({
                    name: 'periodic-background-sync',
                });

                console.log('periodic-background-sync', status.state)
                
                navigator.serviceWorker.getRegistration().then(function(reg) {
                    var options = {
                        body: 'Thank you for using Mood scan',
                        icon: 'images/logo.png',
                        vibrate: [100, 50, 100],
                        data: {
                            dateOfArrival: Date.now(),
                            primaryKey: 1
                        }
                    };
                    reg.showNotification('You may now receive notification', options);
                });
            }
        });
        this.subscribeUser()
    }

    subscribeUser = () => {

        const validKey = this.urlB64ToUint8Array('BF36b_zY1wVYfiR5AOy4xG-kQ0HLmTzCNBhTCnEqA7NvnBF1pUHVmsMshzSPBeQQB5fGLDvWLl71ra4GEeazWKU')
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(function(reg) {
                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: validKey
                }).then(function(sub) {
                    console.log('Endpoint URL: ', sub.endpoint);
                }).catch(function(e) {
                    if (Notification.permission === 'denied') {
                        console.warn('Permission for notifications was denied');
                    } else {
                        console.error('Unable to subscribe to push', e);
                    }
                });
            })
        }
    }

    urlB64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
        const rawData = atob(base64)
        const outputArray = new Uint8Array(rawData.length)
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
      }
}

export default App;