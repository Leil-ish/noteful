import React from 'react'
import Note from '../Note/Note'
import Context from '../Context'
import NotefulError from '../NotefulError/NotefulError'
import PropTypes from 'prop-types'
//import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = Context

  handleDeleteNote = note_id => {
    this.props.history.push(`/`)
  }

  render() {
    const findNote = (notes=[], note_id) => notes.find(note => note.note_id === note_id)
    const { notes=[] } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || { content: '' }
    return (
      <NotefulError>
        <section className='NotePageMain'>
          {console.log(findNote)}
          <Note
            note_id={note.note_id}
            note_name={note.note_name}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
          />
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </section>
      </NotefulError>
    )
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}