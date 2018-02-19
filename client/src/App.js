import React, {
    Component
} from 'react';
import './App.scss';

import TopNav from './components/topnav';
import Results from './components/results/Results';
import Header from './components/header/Header';
import {
    BpkLargeSpinner,
    BpkExtraLargeSpinner
} from 'bpk-component-spinner';
import {
    colors
} from 'bpk-tokens/tokens/base.es6';

class App extends Component {

    state = {
        originplace: "EDI", //default origin
        destinationplace: "LHR", //default destination
        outbounddate: "2018-04-10", //default outbound date
        inbounddate: "2018-04-11", //default inbound date
        currency: "GBP",
        adults: 1,
        cabinclass: "Economy",
        Itineraries: [],
        Legs: [],
        Segments: [],
        Agents: [],
        Carriers: [],
        Places: []
    }

    componentWillMount = () => {
        fetch(`http://localhost:4000/api/search?&country=UK&currency=${this.state.currency}&adults=${this.state.adults}&cabinclass=${this.state.cabinclass}&locale=en-GB&locationSchema=iata&originplace=${this.state.originplace}&destinationplace=${this.state.destinationplace}&outbounddate=${this.state.outbounddate}&inbounddate=${this.state.inbounddate}`)
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                this.refs.loader.classList.toggle("loading-hidden");

                var jsonObj = JSON.parse(JSON.stringify(results));
                // console.log(JSON.stringify(results));

                let {
                    Itineraries,
                    Legs,
                    Segments,
                    Agents,
                    Carriers,
                    Places,
                    originplace,
                    destinationplace,
                    currency
                } = this.state;

                // **** Itineraries:
                for (let itinerary of jsonObj.Itineraries) {
                    Itineraries.push(itinerary);
                    this.setState({
                        Itineraries: Itineraries
                    });
                }

                // **** Legs:
                for (let leg of jsonObj.Legs) {
                    Legs.push(leg);
                    this.setState({
                        Legs: Legs
                    });
                }

                // **** Segments:
                for (let segment of jsonObj.Segments) {
                    // console.log('Itineraries >>>>>> ',segment)
                    Segments.push(segment);
                    this.setState({
                        Segments: Segments
                    });
                }

                // **** Agents:
                for (let agent of jsonObj.Agents) {
                    Agents.push(agent);
                    this.setState({
                        Agents: Agents
                    });
                }

                // **** Carriers:
                for (let carrier of jsonObj.Carriers) {
                    Carriers.push(carrier);
                    this.setState({
                        Carriers: Carriers
                    });
                }

                // **** Places:
                for (let place of jsonObj.Places) {
                    Places.push(place);
                    this.setState({
                        Places: Places
                    });
                }

                // **** Currency:
                for (let currencySymbol of jsonObj.Currencies) {
                    if (currencySymbol.Code === this.state.currency) {
                        this.setState({
                            currency: currencySymbol.Symbol
                        });
                    }
                }

            })
            .catch(console.error);
    }

    render() {
        return ( <
            div className = "App" >
            <
            TopNav / >
            <
            Header originplace = {
                this.state.originplace
            }
            destinationplace = {
                this.state.destinationplace
            }
            cabinclass = {
                this.state.cabinclass
            }
            travellers = {
                this.state.adults
            }
            /> <
            div className = "loading"
            ref = "loader" > < BpkLargeSpinner fill = {
                colors.colorGray700
            }
            /></div >
            <
            Results originplace = {
                this.state.originplace
            }
            destinationplace = {
                this.state.destinationplace
            }
            legs = {
                this.state.Legs
            }
            segments = {
                this.state.Segments
            }
            itineraries = {
                this.state.Itineraries
            }
            places = {
                this.state.Places
            }
            agents = {
                this.state.Agents
            }
            carriers = {
                this.state.Carriers
            }
            currency = {
                this.state.currency
            }
            /> <
            /div>
        );
    }
}

console.log('fetching results from server...');



export default App;