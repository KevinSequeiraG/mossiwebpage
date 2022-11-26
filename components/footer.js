import React, { Fragment } from 'react';
import Wave from 'react-wavify';
import styled from 'styled-components';
import SocialMedia from './SocialMedia';


const WaveContainer = styled.div`
`;

const Footer = () => {
    return (
        <Fragment>
            <div className='MainFooter'>
                <Wave
                    fill="#026a70"
                    paused={false}
                    opacity="0.30"
                    options={{
                        height: 20,
                        amplitude: 10,
                        speed: 0.3,
                        points: 3,
                    }}
                />
                <Wave
                    fill="#00959e"
                    opacity="0.80"
                    paused={false}
                    options={{
                        height: 50,
                        amplitude: 20,
                        speed: 0.3,
                        points: 2,
                    }}
                />
                <Wave
                    fill="#02cdd9"
                    paused={false}
                    opacity="0.5"
                    options={{
                        height: 45,
                        amplitude: 15,
                        speed: 0.3,
                        points: 4,
                    }}
                />

                <div className='FooterInfo'>
                    <div className='footer-texts mb-4'>
                        <small className='mr-2 text-white truncate'>&copy; Copyright Mossi Food Service</small>
                        <SocialMedia />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Footer;