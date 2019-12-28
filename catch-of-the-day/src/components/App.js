import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

componentDidMount() {
  const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    this.setState({ fishes: sampleFishes });
    // console.log(this.props.match.params.storeId)

    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }

  componentDidUpdate() {
    console.log(this.state.order)
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  addFish = fish => {
    // take a copy of the existing state
    const fishes = { ...this.state.fishes }
    // add our fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }
  clearOrders = () => {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify({}));
    this.setState({ order: {} });
  }

  addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };
    // either add to the order or update  the number of our order
    order[key] = order[key] + 1 || 1;
    // call setstate to update our state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} clearOrders={this.clearOrders } order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    )
  }
}

export default App;
