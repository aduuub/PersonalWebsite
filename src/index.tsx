import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'routes/app';

import './styles/index.scss';

class Root extends React.Component {
  render() {
    return (
      <div className='hi'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
