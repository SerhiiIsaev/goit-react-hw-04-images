import { useState, useEffect } from 'react'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import axios from "axios";
import styles from './App.module.css'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [cards, setCards] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [total, setTotal] = useState(0)

  const onFormSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== search) {
      setCards([])
      setSearch(searchValue)
      setPage(1)
      setError('')
      setLoading(true)
    } else if (searchValue === "") {
      toast.info('input is empty!');
    }
  }

  useEffect(() => {
    if (search !== '') {
      const fetchPosts  = () => {
        axios.get(`https://pixabay.com/api/?q=${search}&page=${page}&key=29243564-6faefde78431833ffd5a53afd&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => {
          setTotal(response.data.total)
          return response.data.hits
        })
        .then(data => {
          const dataArray = [];
          data.map(({ id, webformatURL, largeImageURL }) => dataArray.push({ id, webformatURL, largeImageURL }))
          if (dataArray.length === 0) {
            toast.info('not found any picture!');
          }
          return dataArray
        })
        .then((newCards) => {
          return setCards(cards => [...cards, ...newCards])
        })
        .catch(catchedError => {
          setError(catchedError)
          console.log(error)
          toast.error('sorry, we have a problem')
        })
        .finally(() => {
          setLoading(false)
        })
      }
      fetchPosts()
    }
  },[search, page])

  const onLoadMoreBTN = () => {
    setPage(page + 1)
    setLoading(true)
  }
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  const openModal = (largeImageURL) => {
    setModalImage(largeImageURL)
    toggleModal()
  }

  return (
    <div className={styles.App}>
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery cards={cards} onOpen={openModal} />
      {loading && <Loader/>}
      {cards.length > 1 && cards.length < total && <Button onLoadMoreBTN={onLoadMoreBTN} />}
      <ToastContainer autoClose={3000} />
      {showModal && modalImage && (<Modal onClose={toggleModal} modalImage={modalImage} />)}
    </div>
  ); 
}
