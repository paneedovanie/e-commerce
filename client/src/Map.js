import React, { Component } from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    onMarkerClick () {
        alert('a')
    }

    render () {
        const containerStyle = {
            position: 'fixed',
            width: '100%',
            height: '100vh',
            top: 0,
            left: 0
        }

        return (
            <Map 
                containerStyle={containerStyle} 
                google={this.props.google} 
                zoom={14}
                center={this.props.latlng}
            >
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
        
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{`this.state.selectedPlace.name`}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
  )

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDa6d5tNUc-rLtV6wT6YDZfE1RG_GMqr0c',
    LoadingContainer: LoadingContainer
})(MapContainer);