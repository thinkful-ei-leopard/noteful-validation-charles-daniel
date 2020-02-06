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

  // onAddFolder = () => {
  //   this.props.history.goBack('/')
  // }

  handleClickAddFolder = (e) => {
    e.preventDefault();
    console.log('button working');
    const folderName = 'form value';
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
      .then(() => {
        this.context.handleAddFolder(folderName)
        // allow parent to perform extra behaviour
        // this.props.(folderName)
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
                <input name='folder-name-input' className='folder-name-input'></input>
                <button type='submit' id='submit'
                onClick={() => this.props.history.goBack()} >Create</button>
            </form>
        </div>    
        )
    }
}

export default AddFolder;