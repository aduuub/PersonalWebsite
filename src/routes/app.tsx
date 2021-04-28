import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from 'components/nav';
import Footer from 'components/footer';

import Home from './home';
import Blog from './blog';

export default class AppRoute extends React.Component {

  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path='/blog/:id' component={Blog} />
          <Route path='*' component={Home} />
        </Switch>
        <Footer />
      </>
    );
  }
}
