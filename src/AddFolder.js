import React from 'react'
import CircleButton from './CircleButton/CircleButton'
import ApiContext from './ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from './config'

class AddFolder extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext; 

  handleClickAddFolder = (e) => {
    e.preventDefault();
    const folderName = e.target.folderNameInput.value;
    let newFolder = JSON.stringify({
        name: folderName,
    })
    
    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: newFolder
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((data) => {
        this.context.handleAddFolder(data)
        // allow parent to perform extra behaviour
      })
      .catch(error => {
        console.error({ error })
      })
  }
  
  render() {
        return (
          <div className='AddFolderNav'>
          <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
            <form onSubmit={(e) => this.handleClickAddFolder(e)}>
                <h2>Add Folder</h2>
                <label htmlFor='folder-name-input'>New Folder Name</label>
                <input name='folder-name-input' id='folderNameInput'></input>
                <button type='submit' id='submit'
                onClick={() => this.props.history.goBack()} >Create</button>
            </form>
        </div>    
        )
    }
}

export default AddFolder;