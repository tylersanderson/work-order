import React from 'react';

const Order = (props) => {
	console.log(props)
	return (
		<div className='bg-light-yellow dib br3 pa2 mb3 grow bw2 shadow-5 w-75'>
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
				<h2>{props.orderNumber}</h2>
				<h5>{props.address}</h5>
				<p>{props.description}</p>
			</div>
		</div>
	);
}



export default Order;
