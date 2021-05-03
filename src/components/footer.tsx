import * as React from 'react';

import Butter from 'assets/butter.png';

interface IProps {
}

export default class AboutMe extends React.Component<IProps> {

    render() {
        return (
            <div className='Footer'>
                <div className='Footer-container'>
                    <p className='Footer-text'>Adam wareing</p>
                    <div className='Footer-sponsor'>
                        <p className='Footer-sponsor-text'>Blog powered by</p>
                        <a className='Footer-sponsor-link' href='https://buttercms.com'>
                            <img src={Butter} className='Footer-sponsor-image' />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
