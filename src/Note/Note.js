import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulError from '../NotefulError/NotefulError'
import PropTypes from 'prop-types'
import Context from '../Context'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = Context;

  handleClickDelete = e => {
    e.preventDefault()
    const note_id = this.props.note_id

    fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(note_id)
        this.props.onDeleteNote(note_id)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { note_name, note_id, modified } = this.props
    return (
      <NotefulError>
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${note_id}`}>
              {note_name}
            </Link>
          </h2>
          <button
            className='Note__delete'
            type='button'
            onClick={this.handleClickDelete}
          >
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(modified, 'Do MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
      </NotefulError>
    )
  }
}

Note.propTypes = {
  note_id: PropTypes.number
}