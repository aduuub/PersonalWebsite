import * as React from 'react';
import { Element } from 'react-scroll';

import person from 'assets/me.png';
import Constants from 'models/constants';

interface IProps {
}

export default class AboutMe extends React.Component<IProps> {

  render() {
      return (
        <Element className='AboutMe' name={Constants.aboutMeKey}>
          <div className='Container'>
            <div className='Grid'>
              <div className='u-md-width1of2'>
                <img className='AboutMe-img' src={person} />
              </div>
              <div className='u-md-width1of2'>
                <div className='AboutMe-content'>
                  <h2>Gidday, i’m Adam!</h2>
                  <p>When I have some down time, I like to spend it with my dog Beau 🐶, biking 🚴‍♂️, being up the mountain 🏂, or working on my car 🛠🏎</p>
                </div>
              </div>
            </div>
          </div>
      </Element>
      );
  }
}
