import React from 'react';
import './OrderModal.css';
import orderIcon from '../Orders/orderIcon.png';

class OrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ordernumber: this.props.ordernumber,
			ordernotes: this.props.ordernotes,
			isordercomplete: false,

		}
	}

	toggleOrderComplete =() => {
	    console.log('toggle Order Complete');
	    this.setState(prevState => ({
	      ...prevState,
	      isordercomplete: !prevState.isordercomplete
	    }))
  	}

	onFormChange = (event) => {
		switch(event.target.name) {
			case 'order-notes':
				this.setState({ordernotes: event.target.value})
				break;
			default:
				return;
		}
	}

	onOrderUpdate = (data) => {
		fetch(`http://192.168.99.100:3000/orders/${this.props.ordernumber}`, {
			method: 'post',
			headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
			body: JSON.stringify({ 
				formInput: data 
			})
		}).then(resp => {
			if (resp.status === 200 || resp.status === 304) {
				this.props.toggleOrderModal();
			}
		})
			.then(orders => {
		        if (true) {
		          fetch(`http://192.168.99.100:3000/orders/false`, {
		            method: 'get',
		            headers: {
		            'Content-Type': 'application/json',
		            'Authorization': window.sessionStorage.getItem('token')
		            }
		          })
		            .then(resp => resp.json())
		            .then(orders => {
		              if (true) {
		               // console.log(orders)
		                this.props.loadOrders(orders)
		                //this.onRouteChange('home');
		              }
		            })
		        }
		    })
		.catch(console.log)
	}

	render() {
		const { address, description } = this.props;
		const { ordernumber, isordercomplete, ordernotes } = this.state;
		return (
			<div className="orderModal-modal">
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
					<main className="pa4 black-80 w-80">
						<img
			      			src={orderIcon}
			     			className="h3 w3 dib" alt="avatar" />
				  		<h1>{ordernumber}</h1>
				  		<h4>{address}</h4>
				  		<p>{description}</p>
				  		<hr/>
				        <label className="mt2 fw6" htmlFor="user-name">Order Notes:</label>
				        <textarea
				        	onChange={this.onFormChange}
				        	className="pa2 ba w-100" 
				        	defaultValue={ordernotes}
				        	style={{height: '100px'}}
				        	type="text" 
				        	name="order-notes"  
				        	id="ordernotes" 
				        	//onChange={this.onNameChange}
				        />
				        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
				        <button className={(!isordercomplete && 'b pa2 grow pointer hover-white w-60 bg-blue b--black-20') || 'b pa2 pointer w-60 bg-green b--black-20 i'}
				        		onClick={ this.toggleOrderComplete }>
				        		Order Complete
				        </button>
				        </div>
				        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
				        	<button 
				        		onClick={() => this.onOrderUpdate( {isordercomplete, ordernotes, ordernumber} )}
				        		className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
				        		Save
				        	</button>
				        	<button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
				        		onClick={this.props.toggleOrderModal}>
				        		Cancel
				        	</button>
				        </div>
					</main>
					<div className='modal-close' onClick={this.props.toggleOrderModal}>&times;</div>
				</article>
			</div>
		)
	}
}

export default OrderModal;