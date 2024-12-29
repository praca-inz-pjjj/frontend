import React from 'react';
import FormContainer from './FormContainer';
import TitleWithCancelButton from './TitleWithBackButton';
import Title from './Title';

const FormBox = ({ children, title="", cancelButton=false }) => {    
    if (!title) {
      return (
        <FormContainer>
          {children}
        </FormContainer>
      )  
    }
    return (
    <FormContainer>
        {cancelButton ?
            <TitleWithCancelButton title={title} /> :
            <Title title={title} className={"py-1"} />
        }
        {children}
    </FormContainer>
    );
};

export default FormBox;
