import { Component } from 'react'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import axios from "axios";
import styles from './App.module.css'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export class App extends Component {

  state = {
    cards: [],
    search: "",
    error: "",
    loading: false,
    page: 1,
    showModal: false,
    modalImage: null,
    total: 0,
  }



  fetchPosts = () => {
    const request = this.state.search
    const page = this.state.page
    axios.get(`https://pixabay.com/api/?q=${request}&page=${page}&key=29243564-6faefde78431833ffd5a53afd&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        this.setState({
          total: response.data.total,
        })
        console.log(response.data.total)
        return response.data.hits
      })
    .then(data => {
      const dataArray = [];
      data.map(({ id, webformatURL, largeImageURL }) =>dataArray.push({ id, webformatURL, largeImageURL })
      )
      if (dataArray.length === 0) {
        toast.info('not found any picture!');
      }
      return dataArray
    }
    )
    .then( (newCards) => {
        this.setState((prevState) => {
          if (prevState.cards.length === 0) {
        return {
        cards: newCards,
      }
      } else {
        
        return {
          cards: [...prevState.cards, ...newCards]
        }
      }
      
      })
    })
    .catch(error => {
      this.setState({
        error
      })
    })
      .finally(() => this.setState({
        loading: false,  
      })
      )
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== this.state.search) {
      this.setState({
      cards: [],
      search: searchValue,
      page: 1,
      loading: true,
      
    })
    } else if (searchValue === "") {
      toast.info('input is empty!');
    }
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search || this.state.page !== prevState.page) {
      setTimeout(this.fetchPosts, 200) 
    }
  }

  onLoadMoreBTN = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
        loading: true,
      }
    })
  }
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, }));
  }
  
  openModal = (largeImageURL) => {
    this.setState({
      modalImage: largeImageURL,
    })
    this.toggleModal()

  }

  render() {
    const {showModal,modalImage, total} = this.state
    return (
      <div className={styles.App}>
        <Searchbar onFormSubmit={this.onFormSubmit} />
        <ImageGallery cards={this.state.cards} onOpen={this.openModal} />
        {this.state.loading && <Loader/>}
        {this.state.cards.length > 1 && this.state.cards.length < total && <Button onLoadMoreBTN={this.onLoadMoreBTN} />}
        <ToastContainer autoClose={3000} />
        {showModal && modalImage && (<Modal onClose={this.toggleModal} modalImage={modalImage} />)}
      </div>
    );
  }
  
};
