import React, { Component, PropTypes } from 'react';
import './results.scss';

import BpkButton from 'bpk-component-button';
import ArrowRight from 'bpk-component-icon/lg/long-arrow-right';


class Results extends Component {

	propTypes:{
		originplace:PropTypes.string,
		destinationplace:PropTypes.string,
		legs:PropTypes.array,
		segments:PropTypes.array,
		places:PropTypes.array,
		carriers:PropTypes.array,
		agents:PropTypes.array,
		itineraries:PropTypes.array,
		currency:PropTypes.string
	}

	findLegs=(id)=>{
		let hasFoundFirst = false;
		if(!hasFoundFirst){
		for(var [i, vals] of this.props.legs.entries()){	
				if(vals.Id===id){
					hasFoundFirst = true;		
					return vals;
				}
			}
		}
	}

	findAgent=(id)=>{
		let hasFoundFirst = false;
		if(!hasFoundFirst){
		for(let vals of this.props.agents){	
				if(vals.Id===id){
					hasFoundFirst = true;		
					return vals;
				}
			}
		}
	}

	findCarrier=(id)=>{
		let hasFoundFirst = false;
		if(!hasFoundFirst){
		for(let vals of this.props.carriers){	
				if(vals.Id===id){
					hasFoundFirst = true;		
					return vals;
				}
			}
		}
	}


	timeConvert=(n)=>{
 		let minutes = n%60
 		let hours = (n - minutes) / 60;
 		return hours+"h "+minutes;
	}

	getStops=(num)=>{
		const stops = {stops:num>0? num + (num>1?" stops":" stop"):"Direct", classToApply:num>0?"fly-with-stops":"fly-direct"};
		return stops;	
	}


	convertDate=(val)=>{
		const dt = new Date(val);
		const hrs = dt.getHours();
		const mins = dt.getMinutes()< 10 ? "0"+dt.getMinutes():dt.getMinutes();
		return hrs+":"+mins;	
	}

	listSetup=(vals,i)=>{
		if(i<5){

			const outboundDetails = this.findLegs(vals.OutboundLegId);//.indexOf(vals.OutboundLegId);
			const inboundDetails = this.findLegs(vals.InboundLegId);
			const agentDetails = this.findAgent(vals.PricingOptions[0].Agents[0]);
			let outBoundCarrierDetails = "";
			let inBoundCarrierDetails = "";
			// console.log(agentDetails);
			if(outboundDetails!==undefined && inboundDetails!==undefined && agentDetails!==undefined){
				outBoundCarrierDetails = this.findCarrier(outboundDetails.Carriers[0]);
				inBoundCarrierDetails = this.findCarrier(inboundDetails.Carriers[0]);
				
				if(outBoundCarrierDetails!==undefined && inBoundCarrierDetails!==undefined){
					let outBoundCarrierLogo = `https://logos.skyscnr.com/images/airlines/favicon/${outBoundCarrierDetails.Code}.png`;
					let inBoundCarrierLogo = `https://logos.skyscnr.com/images/airlines/favicon/${inBoundCarrierDetails.Code}.png`;

			        return (
			            <div className="result-box" key={i} value={vals} id={i}>
			            	<div className="result">
			            		<div className="journey-details">
			            			<div><img className="carrier-logo" src={outBoundCarrierLogo} alt={outBoundCarrierDetails.Name}/></div>
					            	<div>{this.convertDate(outboundDetails.Departure)}<br/><span className="place-name">{this.props.originplace}</span></div>
					            	<div><ArrowRight/></div>
					            	<div>{this.convertDate(outboundDetails.Arrival)}<br /><span className="place-name">{this.props.destinationplace}</span></div>
				            	</div>
				            	<div className="duration">
				            		<div>{this.timeConvert(outboundDetails.Duration)}</div>
				            		<div className={this.getStops(outboundDetails.Stops.length).classToApply}>{this.getStops(outboundDetails.Stops.length).stops}</div>
				            	</div>
			            	</div>
			            	<div className="result">
			            		<div className="journey-details">
			            			<div><img className="carrier-logo" src={inBoundCarrierLogo} alt={inBoundCarrierDetails.Name}/></div>
					            	<div>{this.convertDate(inboundDetails.Departure)}<br /><span className="place-name">{this.props.destinationplace}</span></div>
					            	<div><ArrowRight/></div>
					            	<div>{this.convertDate(inboundDetails.Arrival)}<br /><span className="place-name">{this.props.originplace}</span></div>
					            </div>	
					            <div className="duration">
					            	<div>{this.timeConvert(inboundDetails.Duration)}</div>
					            	<div className={this.getStops(inboundDetails.Stops.length).classToApply}>{this.getStops(inboundDetails.Stops.length).stops}</div>
					            </div>
				            	
			            	</div>
			            	<div className="result price">{this.props.currency}{vals.PricingOptions[0].Price}</div>
			            	<div className="result">{agentDetails.Name}</div>
			            	<BpkButton className="select">Select</BpkButton>     	
			            </div>
			        )
		    	}
	   		}
	    }
    }

	render(){

		return(
			<div>
				
				<div>
					{this.props.itineraries.map(this.listSetup)}
				</div>
			</div>
     	
		)
	
	}
}

export default Results;