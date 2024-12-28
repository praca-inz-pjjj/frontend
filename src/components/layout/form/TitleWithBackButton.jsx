import React from 'react';
import Title from './Title';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';

const TitleWithCancelButton = ({title}) => {
    const navigate = useNavigate();
    const onBackButtonClick = () => {
        navigate(-1);
    }
    return (
        <div className='flex items-center justify-between'>
            <Title title={title}/>
            <CancelButton onClick={onBackButtonClick}/>
        </div>
    );
}

export default TitleWithCancelButton;