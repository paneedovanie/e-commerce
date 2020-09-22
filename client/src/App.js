import React, { Component } from 'react'

import { fetchWeather, fetchOwnerWeather } from './api/fetchWeather'

import Icon from '@mdi/react'
import { mdiMagnify, mdiCalendarToday, mdiClockOutline } from '@mdi/js'

import Map from './Map'

import './App.css'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            query: '',
            weather: {},
            latlng: null,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
        this.getMyLocation()
    }
        
    getMyLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({ latlng: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }})

                this.searchCurrent()
            });
        } else {
            console.log( "Geolocation is not supported by this browser." )
        }
    }

    groupData = (array) => {
        let currDate = ''
        let object = {}
        array.forEach(item => {
            const itemDate = item.dt_txt.substr(0, 10)
            if(currDate !== itemDate) {
                currDate = itemDate
                object = {...object, [itemDate]: [item]}
            } else {
                object[currDate] = [...object[currDate], item]
            }
        });
        
        return object;
    }

    pressedEnter = async (e) => {
        if(e.key === 'Enter') {
            this.search()
        }
    }

    search = async () => {
        const query = this.state.query
        if(query === '') return
        const data = await fetchWeather(this.state.query)
        
        this.setState({weather: data, query: '', latlng: { lat: data.city.coord.lat, lng: data.city.coord.lon}})
    }

    searchCurrent = async () => {
        const data = await fetchOwnerWeather(this.state.latlng)
        
        this.setState({weather: data, query: '', latlng: { lat: data.city.coord.lat, lng: data.city.coord.lon}})
    }

    render () {
        const query = this.state.query
        const weather = this.state.weather
        const latlng = this.state.latlng
        const months = this.state.months

        return (
            <div className="main-container">
                {latlng && (<Map latlng={latlng} />)}

                <div className="search-form">
                    <input 
                        type="text"
                        className="search"
                        placeholder="Enter city"
                        value={query}
                        onChange={(e) => this.setState({query: e.target.value})}
                        onKeyPress={this.pressedEnter}
                    />
                    <button 
                        onClick={this.search}
                        className="search-button"
                    >
                        <Icon path={mdiMagnify}
                            title="Search icon"
                            size={1}
                        />
                      </button>
                </div>
                {weather.city && (
                    <div className="city">
                        <h1 className="city-name">
                            {weather.city.name} <span>{weather.city.country}</span>
                        </h1>
                        <div className="status-container">
                            {Object.entries(this.groupData(weather.list)).map(([key, val]) => {
                                const date = new Date(key)
                                const formattedDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
                                return (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th colSpan="100%" className="text-grey">
                                                    <Icon path={mdiCalendarToday}
                                                        title="Search icon"
                                                        size={3}
                                                        />
                                                </th>
                                            </tr>
                                            <tr>
                                                <th colSpan="100%">
                                                    {formattedDate}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {val.map((item, i) => {
                                                return <Tr item={item} pkey={'r-' + i} key={i} />
                                            })}
                                        </tbody>
                                    </table>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function Tr(props) {
    return (
        <tr key={props.pkey}>
            <td>
                <Icon path={mdiClockOutline}
                    title="Time icon"
                    size={1}
                    className="text-orange"
                /><br />
                {props.item.dt_txt.substr(11, 5)}
            </td>
            <td className="city-temp">
                {Math.round(props.item.main.temp)}
                <sup>&deg;C</sup>
            </td>
            <td>
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${props.item.weather[0].icon}@2x.png`} alt={props.item.weather[0].description} />
            </td>
            <td className="city-details">{props.item.weather[0].description}</td>
        </tr>
    );
}

export default App;