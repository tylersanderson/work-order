import React from 'react';

class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderNumber: this.props.orderNumber,
		}
	}
	
/*const Order = (props) => {*/
	render() {
		return(
		<div className='bg-light-yellow dib br3 pa2 mb3 grow bw2 shadow-5 w-75 pointer'
			 onClick={this.props.toggleOrderModal}>
			<img 
				className='pa2 fl w-30'
				alt='workorder' 
				src={`https://library.kissclipart.com/20180925/yhw/kissclipart-icono-programacion-clipart-computer-icons-clip-art-ee6a30d3ae899386.png`} 
				style={{
		/*			height: 200,*/
					width: 100,
				}}
				/>
			<div className='tl ml2 self-start'>
				<h2>{this.props.orderNumber}</h2>
				<h5>{this.props.address}</h5>
				<p>{this.props.description}</p>
			</div>
			
		</div>
		)
	};
}


export default Order;
