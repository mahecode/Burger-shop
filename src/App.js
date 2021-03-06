import React, { Component } from 'react';
import { Route , Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/Burgerbuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/auth/auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/register" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
