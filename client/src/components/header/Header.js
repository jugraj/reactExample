import React, { Component, PropTypes } from 'react';
import "./Header.scss";
import ArrowRight from 'bpk-component-icon/lg/long-arrow-right';
import PriceAlert from 'bpk-component-icon/sm/price-alerts';
import { colors } from 'bpk-tokens/tokens/base.es6';

class Header extends Component {

	propTypes:{
		originplace:PropTypes.string,
		destinationplace:PropTypes.string,
		travellers:PropTypes.string,
		cabinclass:PropTypes.string,
	}

	render(){
		return(
			<div>
				<div className="header-info">
					<div className="travel-details">{this.props.originplace} <ArrowRight fill={colors.colorWhite}/> {this.props.destinationplace}</div>
					<div className="travel-category">{this.props.travellers} travellers, {this.props.cabinclass}</div>
				</div>		

				<div className="filters">
					<div className="">Filter</div>
					<div className="">Sort</div>
					<div className="price-alert">
						<div className="bell"><PriceAlert fill={colors.colorBlue500}/></div>
						<div>Price Alert</div>
					</div>
				</div>		
			</div>
		)
	}
}

export default Header;