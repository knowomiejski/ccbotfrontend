import React from 'react';
import {FieldRenderProps} from "react-final-form";

interface IProps extends FieldRenderProps<string, HTMLInputElement> {
}

const TextInput: React.FC<IProps> = ({
                                         input,
                                         meta: {touched, error}
                                     }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <input
                className="cc-input"
                {...input}
            />
            {touched && error && (
                <div style={{marginTop: '5px', paddingLeft: '15px'}} className='cc-danger-text'>{error}</div>
            )}
            {console.log(touched, error)}
        </div>
    );
};

export default TextInput;
