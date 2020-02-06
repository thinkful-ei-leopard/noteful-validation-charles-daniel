import React from 'react'
import ApiContext from './ApiContext';

function FolderOption(props) {

        return (
            <option value={props.folder.id}>
                {props.folder.name}
            </option>
    )
};

export default FolderOption;