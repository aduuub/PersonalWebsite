import * as React from 'react';

import Butter from 'assets/butter.png';

interface IProps {
}

export default class AboutMe extends React.Component<IProps> {

    render() {
        return (
            <div className='Footer'>
                <p className='Footer-text'>Adam wareing</p>
                <div className='Footer-sponsor'>
                    <p className='Footer-sponsor-text'>Blog powered by</p>
                    <img src={Butter} className='Footer-sponsor-image' />
                </div>
            </div>
        );
    }
}