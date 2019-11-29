import React from 'react';
import Order from './order';

const OrderList = ({orderArray, toggleOrderModal}) => {
/*	if (true) {
		throw new Error('NOOOOO!');
	}*/
	return (
		<div className='flex flex-column items-center'>
		{
			orderArray.map((order, i) => {
			return (
				<Order
					key={i}
					id={orderArray[i].id} 
					orderNumber={orderArray[i].orderNumber} 
					address={orderArray[i].address}
					description={orderArray[i].description}
					toggleOrderModal={toggleOrderModal}
					/>
			)
		})	
	}
	</div>
	) 
}

export default OrderList;