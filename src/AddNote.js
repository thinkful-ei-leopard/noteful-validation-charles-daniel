import React from 'react'
import CircleButton from './CircleButton/CircleButton'
import ApiContext from './ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from './config'
import FolderOption from './FolderOption'

class AddNote extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;
  
    handleAddNoteClick = (e) => {
        e.preventDefault();
        const noteName = e.target.noteName.value;
        const noteText = e.target.noteText.value;
        const noteFolderId = this.context.selectedId;
        
        let newNote = JSON.stringify({
            name: noteName,
            content: noteText,
            folderId: noteFolderId
        })
        console.log(newNote);
        fetch(`${config.API_ENDPOINT}/notes/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: newNote
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then((data) => {
              console.log(data);
              this.context.handleAddNote(data)
              // allow parent to perform extra behaviour
            })
            .catch(error => {
              console.error({ error })
            })
        };
        

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
              <form onSubmit={(e) => this.handleAddNoteClick(e)}>
                  <h2>Add Note</h2>
                  <label htmlFor='note-name'>Name</label>
                  <input name='note-name' id='noteName' required></input>
                  <textarea rows="4" cols="50" name='note-text' id='noteText'></textarea>
                  <select defaultValue= {this.context.selectedId}
                    onChange={(e) => {
                        e.preventDefault();
                        this.context.handleFolderIdSelection(e.target.value)}
                    }
                  >
                          { this.context.folders.map((folder) => <FolderOption folder={folder}/> )}
                  </select>
                  <button type='submit' id='add-note-submit'
                  onClick={() => this.props.history.goBack()}>Submit</button>
              </form>
          </div>  
        )
    }
}

export default AddNote;