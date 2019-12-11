import React from 'react';
import Modal from '../Modal/Modal';
import OrderModal from '../OrderModal/OrderModal';
import orderIcon from './orderIcon.png';

class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOrderModalOpen: false,
		}
	}

toggleOrderModal =() => {
    console.log('toggle Order');
    this.setState(prevState => ({
      ...prevState,
      isOrderModalOpen: !prevState.isOrderModalOpen
    }))
  }

/*const Order = (props) => {*/
	render() {
		const {isOrderModalOpen} = this.state
		return(
		<div className='bg-light-yellow dib br3 pa2 mb3 grow bw2 shadow-5 w-75 pointer'>
			<div onClick={this.toggleOrderModal}>
				<img 
					className='pa2 fl w-30'
					alt='workorder' 
					src={orderIcon} 
					style={{
			/*			height: 200,*/
						width: 100,
					}}
					/>
				<div className='tl ml2 self-start'>
					<h2>{this.props.ordernumber}</h2>
					<h5>{this.props.address}</h5>
					<p>{this.props.description}</p>
				</div>
			</div>
			<div>
				{ isOrderModalOpen && 
	                <Modal>
	                  	<OrderModal 
		                    isOrderModalOpen={isOrderModalOpen} 
		                    toggleOrderModal={this.toggleOrderModal} 
		                    ordernumber={this.props.ordernumber}
		                    address={this.props.address}
		                    description={this.props.description}
		                    ordernotes={this.props.ordernotes}
		                    loadOrders={this.props.loadOrders}
		                />
	                </Modal>
	            }
	        </div>
        </div>
		)
	};
}


export default Order;
