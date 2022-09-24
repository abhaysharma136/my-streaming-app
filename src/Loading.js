import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

const Example = ({ type, color }) => (
    <div className='top-loading-container'>
        <div className='loading-component'>
        <ReactLoading type='bubbles' color="blue" height={667} width={375} />
    </div>
    </div>
    
	
);

export default Example;