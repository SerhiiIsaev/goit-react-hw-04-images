import PropTypes from 'prop-types'
import { Component } from 'react'
import styles from './Searchbar.module.css'

class Searchbar extends Component {
    state = {
      searchText: "",
    }
     
    onInputChange = (e) => {
         this.setState({
            searchText: e.target.value,
        })
    }
    render() {
        return (
            <header className={styles.SearchbarHeader}>
                <form className={styles.form} onSubmit={this.props.onFormSubmit}>
                    <button type="submit" className={styles.formButton}>&#x1F50D;</button>

                    <input 
                        onChange={this.onInputChange}
                        className={styles.formInput}
                        name='searchInput'
                        type="text"
                        autoComplete="off"
                        value={this.state.searchText}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}

export {Searchbar}