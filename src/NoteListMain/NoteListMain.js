import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotefulError from '../NotefulError/NotefulError'
import Context from '../Context'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = Context

  render() {
    const { id } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, id)
    return (
      <NotefulError>
        <section className='NoteListMain'>
          <ul>
            {notesForFolder.map(note =>
              <li key={note.note_id}>
                <Note
                  note_id={note.note_id}
                  note_name={note.note_name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      </NotefulError>
    )
  }
}
