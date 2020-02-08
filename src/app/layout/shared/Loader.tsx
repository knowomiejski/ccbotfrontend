import React from 'react';
import '../styles.css';


interface IProps {
    size: string
}

const Loader: React.FC<IProps> = ({size}) => {

    switch (size) {
        case 'smol': return <div className='cc-smol-loader'></div>
        case 'medium': return <div className='cc-medium-loader'></div>
        case 'large': return <div className='cc-large-loader'></div>
        default:  return <div className='cc-medium-loader'></div>
    }
};

export default Loader;
