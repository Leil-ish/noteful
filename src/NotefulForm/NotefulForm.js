import React from 'react'
import PropTypes from 'prop-types'
import NotefulError from '../NotefulError/NotefulError'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <NotefulError>
      <form
        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
      />
    </NotefulError>
  )
}

NotefulForm.propTypes = {
  className: PropTypes.string,
}