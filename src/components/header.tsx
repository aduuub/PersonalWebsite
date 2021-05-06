import * as React from 'react';

import FeatureTile from 'components/feature-tile';

import computer from 'assets/computer.png';
import house from 'assets/house.png';

interface IProps {
}

export default class Header extends React.Component<IProps> {

  titleContent() {
    return [
      {
        title: 'Property',
        body: 'I’ve managed several renovations with over 200% return on cost, got my hands dirty on the tools, and now love to help others get a great return.',
        image: house,
      },
      {
        title: 'Software Development',
        body: 'I\'m an iOS developer who has a keen eye for design. I love to share my knowledge with others, and help my team achieve ambitious goals.',
        image: computer,
      },
    ];
  }

  render() {
    const featureTiles = this.titleContent().map((content, index) =>
      <div className='u-width1of1 u-lg-width1of2' key={index}>
        <FeatureTile title={content.title} body={content.body} image={content.image} key={index} />
      </div>,
    );

    return (
        <>
          <div className='Header'>
            <div className='Header-title'>
              <h1>Who is Adam?</h1>
              <h5>A property investor, developer, and entrepreneur in Wellington, NZ</h5>
            </div>
            <div className='Container'>
              <div className='Grid Header-items'>
                {featureTiles}
              </div>
            </div>
          </div>
          <div className='Header-footer'></div>
        </>
    );
  }
}
