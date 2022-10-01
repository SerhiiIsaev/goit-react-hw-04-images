import PropTypes from 'prop-types'
import styles from './ImageGalleryItem.module.css'
function ImageGalleryItem({ webformatURL, largeImageURL, onOpen }) {
  return (
    <li className={styles.GalleryItem}>
      <img className={styles.GalleryItemImage} src={webformatURL} alt="" onClick={()=>onOpen(largeImageURL)} />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired
}

export { ImageGalleryItem }
