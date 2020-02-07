import React from 'react'

function FolderOption(props) {

        return (
            <option value={props.folder.id}>
                {props.folder.name}
            </option>
    )
};

export default FolderOption;