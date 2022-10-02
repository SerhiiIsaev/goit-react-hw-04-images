import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './Searchbar.module.css'
function Searchbar({ onFormSubmit }) {
    const [searchText, setSearchText] = useState('')
   
    return (
        <header className={styles.SearchbarHeader}>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <button type="submit" className={styles.formButton}>&#x1F50D;</button>

                <input 
                    onChange={(e)=>setSearchText(e.target.value)}
                    className={styles.formInput}
                    name='searchInput'
                    type="text"
                    autoComplete="off"
                    value={searchText}
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
    
}

Searchbar.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}

export {Searchbar}