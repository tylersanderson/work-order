import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import OrderList from './components/Orders/OrderList';
import SearchBox from './components/SearchBox/SearchBox';
import './App.css';

const initialState = {
  input: '',
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: ''
  },
  searchfield: '',
  orders: [],
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
                //this.onRouteChange('home');
              }
            })
        }
      })
      .then(orders => {
        if (true) {
          fetch(`http://192.168.99.100:3000/orders/false`, {
            method: 'get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
          })
            .then(resp => resp.json())
            .then(orders => {
              if (true) {
                console.log(orders)
                this.loadOrders(orders)
                this.onRouteChange('home');
              }
            })
        }
      })
      .catch(console.log)
    }
  }

loadOrders = (orders) => {
  if (orders.constructor === Array && orders.length > 0) {
    this.setState({ orders }); 
  }
  else {
    this.setState({orders: []})
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

  onSearchChange = (event) => {
  this.setState({searchfield: event.target.value});
  }

  render() {
    const { isSignedIn, route, isProfileOpen, user, orders, searchfield } = this.state;
        const filteredOrders = orders.filter(order => {
        return order.address.toLowerCase().includes(searchfield.toLowerCase());
    })
    const sortedOrders = filteredOrders.sort((a,b) => {return (a.ordernumber > b.ordernumber) ? 1 : ((b.ordernumber > a.ordernumber) ? -1 : 0);} )
    console.log(sortedOrders);
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
                <OrderList 
                  orderArray={sortedOrders} 
                  loadOrders={this.loadOrders}
                />
              </div>
            : (
                <Signin 
                  loadUser={this.loadUser} 
                  onRouteChange={this.onRouteChange}
                  loadOrders={this.loadOrders}
                />
              )
        }
      </div>
    );
  }
}

export default App;
