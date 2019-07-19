import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulError from '../NotefulError/NotefulError'
import Context from '../Context'
import PropTypes from 'prop-types'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = Context;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folder_id)
    return (
      <NotefulError>
        <div className='NotePageNav'>
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
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.folder_name}
            </h3>
          )}
        </div>
      </NotefulError>
    )
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}