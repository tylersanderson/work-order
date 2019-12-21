import React from 'react';
import Order from './order';

const OrderList = ({orderArray, loadOrders}) => {
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
					ordernumber={orderArray[i].ordernumber} 
					address={orderArray[i].address}
					description={orderArray[i].description}
					ordernotes={orderArray[i].ordernotes}
					orderlat={orderArray[i].orderlat}
					orderlong={orderArray[i].orderlong}
					loadOrders={loadOrders}
				/>
			)
		})	
	}
	</div>
	) 
}

export default OrderList;