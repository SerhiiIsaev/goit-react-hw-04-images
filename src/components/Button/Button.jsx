import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({ onLoadMoreBTN }) {
  return (
    <button onClick={onLoadMoreBTN} className={styles.LoaderButton}>Load more</button>
  )
}

Button.propTypes = {
  onLoadMoreBTN: PropTypes.func.isRequired
}

export { Button }
