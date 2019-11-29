import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import OrderModal from './components/OrderModal/OrderModal';
import OrderList from './components/Orders/OrderList';
import SearchBox from './components/SearchBox/SearchBox';
import './App.css';

const initialState = {
  input: '',
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  isOrderModalOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: ''
  },
  orderData: {
    orderNumber: '',
    address: '',
    description: ''
  },
  searchfield: '',
  orders: [{"id": 1, 
            "orderNumber": "200422", 
            "address": "221B Baker St", 
            "description": "Sherlock Holmes continually making noise Sherlock Holmes continually making noise Sherlock Holmes continually making noise Sherlock Holmes continually making noise Sherlock Holmes continually making noise Sherlock Holmes continually making noise"
            },
            {"id": 2, 
            "orderNumber": "200423", 
            "address": "221C Baker St", 
            "description": "Cranky about noisy neighbor"
            }],
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
    
  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://192.168.99.100:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.id) {
          fetch(`http://192.168.99.100:3000/profile/${data.id}`, {
            method: 'get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
          })
            .then(resp => resp.json())
            .then(user => {
              if (user && user.email) {
                console.log(user)
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
        }
      })
      .catch(console.log)
    }
  }

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined,
    age: data.age,
    pet: data.pet
  }})
}

loadOrder = (data) => {
  this.setState({orderData: {
    orderNumber: data.orderNumber,
    address: data.address,
    description: data.description
  }})
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return (
        this.setState(initialState), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.clear()
          }
        } 
      )
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal =() => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  toggleOrderModal =() => {
    console.log('toggle Order');
    this.setState(prevState => ({
      ...prevState,
      isOrderModalOpen: !prevState.isOrderModalOpen
    }))
  }

  onSearchChange = (event) => {
  this.setState({searchfield: event.target.value});
  }

  render() {
    const { isSignedIn, route, isProfileOpen, isOrderModalOpen, user, orderData } = this.state;
    const { orders, searchfield } = this.state;
    const filteredOrders = orders.filter(order => {
      return order.address.toLowerCase().includes(searchfield.toLowerCase());
    })
    return (
      <div className="App">
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} 
          toggleModal={this.toggleModal} />
        { isProfileOpen && 
          <Modal>
            <Profile 
              isProfileOpen={isProfileOpen} 
              toggleModal={this.toggleModal} 
              user={user} 
              loadUser={this.loadUser} />
          </Modal>
        }
        { route === 'home' 
            ? <div>
              <h2>Work Orders</h2>
              <SearchBox searchChange={this.onSearchChange}/>
                <OrderList orderArray={filteredOrders} toggleOrderModal={this.toggleOrderModal}/>
                  { isOrderModalOpen && 
                    <Modal>
                      <OrderModal 
                        isOrderModalOpen={isOrderModalOpen} 
                        toggleOrderModal={this.toggleOrderModal} 
                        orderData={orderData}
                        loadOrder={this.loadOrder} />
                    </Modal>
                  }
              </div>
            : (
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        }
      </div>
    );
  }
}

export default App;
