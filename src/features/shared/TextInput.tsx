import React from 'react';
import {FieldRenderProps} from "react-final-form";

interface IProps extends FieldRenderProps<string, HTMLInputElement> {
}

const TextInput: React.FC<IProps> = ({
                                         input,
                                         meta: {touched, error}
                                     }) => {
    return (
        <div>
            <input
                className="cc-input"
                {...input}
            />
            {touched && error && (
                <span>{error}</span>
            )}
            {console.log(touched, error)}
        </div>
    );
};

export default TextInput;
