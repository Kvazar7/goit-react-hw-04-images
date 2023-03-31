import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import Search from './Searchbar/searchbar'
import { Loader } from './Loader/loader';
import { getDataImg } from 'services/getpicture';
import { ImageGallery } from './ImageGallery/imagegallery';
import { Button } from './Button/button';
import { Modal } from './Modal/modal';

import css from './App.module.css'

export default function App() {
	
	const [searchText, setSerchText] = useState('');
	const [page, setPage] = useState(1);
	const [imagesArray, setImagesArray] = useState([]);
	const [imagesTotal, setimagesTotal] = useState(0);
	const [loadingInProgress, setLoadingInProgress] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const [imageToShow, setImageToShow] = useState('');
	const [imageToShowAlt, setImageToShowAlt] = useState('');
	
	const showModal = ( largFormat, alt ) => {
		setImageToShow(largFormat);
		setImageToShowAlt(alt);
		setIsShowModal(true)
		console.log('Open modal')
	}

	const closeModal = () => {
		setIsShowModal(false)
		console.log('Close modal')
	}

	const handleSerch = (searchText) => {
		setSerchText(searchText);
		setImagesArray([]);
		console.log('Looking for an image and photo');
	}

	const onLoadMore = () => {
		setPage(prevState => prevState + 1 )
		console.log('Load more')
	}

	useEffect(() => {
		if (!searchText
			// prevState.page < page ||
			// prevState.searchText !== searchText
		) {
			return
		}
			setLoadingInProgress(true);
			getDataImg(searchText, page)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					if (data.hits.length === 0) {
						Notiflix.Notify.warning('Sorry, nothing found')
					}
					setimagesTotal(data.total);
					setImagesArray(prevImagesArray => [...prevImagesArray, ...data.hits]);
					// setImagesArray(imagesArray.push(...data.hits));
				})
				.catch(error => {
					Notiflix.Notify.failure(`${error}`)
					console.log(error)
				})
				.finally(() => {
					setLoadingInProgress(false)
				})
	}, [page, searchText])
	
	return (
      <div className={css.App}>
			<Search handleSerch={handleSerch} />
			{loadingInProgress &&
				<Loader />}
			{imagesArray.length > 0 &&
				<ImageGallery images={imagesArray} openModal={showModal} />}
			{
				// this.state.imagesArray.length > 0 &&
				imagesTotal > imagesArray.length && 
				<Button onLoadMore={onLoadMore} />}
			{isShowModal &&
				<Modal closeModal={closeModal} imageToShow={imageToShow} imageToShowAlt={imageToShowAlt} />}
      </div>
  	)
};



// import Search from './Searchbar/searchbar'
// import { Loader } from './Loader/loader';
// import { getDataImg } from 'services/getpicture';
// import { ImageGallery } from './ImageGallery/imagegallery';
// import { Button } from './Button/button';
// import { Modal } from './Modal/modal';

// import css from './App.module.css'

// export class App extends Component {
// 	state = {
// 		searchText: '',
// 		page: 1,
// 		imagesArray: [],
// 		imagesTotal: 0,
// 		loadingInProgress: false,
// 		isShowModal: false,
// 	}

// 	showModal = ( largFormat, alt ) => {
// 		this.setState({ imageToShow: largFormat, imageToShowAlt: alt, isShowModal: true })
// 		console.log('Open modal')
// 	}

// 	closeModal = () => {
// 		this.setState({ isShowModal: false })
// 		console.log('Close modal')
// 	}

// 	// clearingThePreviousArray = (prevState) => {
// 	// 	if (this.state.searchText !== prevState.searchText) {
// 	// 		this.setState({ imagesArray: [] })
// 	// 	}
// 	// } 

// 	handleSerch = (searchText) => {
// 		this.setState({ searchText, imagesArray: [] })
// 		console.log('Looking for an image and photo')
// 	}

// 	onLoadMore = () => {
// 		this.setState(prevState => ({ page: prevState.page + 1 }))
// 		console.log('Load more')
// 	}

// 	componentDidUpdate(prevProps, prevState) {
		
// 		if (prevState.page < this.state.page || prevState.searchText !== this.state.searchText) {
// 			// this.setState({ imagesArray: [] });
// 			this.setState({ loadingInProgress: true });
// 			getDataImg(this.state.searchText, this.state.page)
// 				.then((response) => response.json())
// 				.then(data => {
// 					console.log(data)
// 					if (data.hits.length === 0) {
// 						Notiflix.Notify.warning('Sorry, nothing found')
// 					}
					
// 					this.setState({ imagesTotal: data.total });
// 					this.setState(prevState => ({ imagesArray: [...prevState.imagesArray, ...data.hits] }));
// 				})
				
// 				.catch(error => {
// 					Notiflix.Notify.failure(`${error}`)
// 				})
// 				.finally(() => {
// 					this.setState({ loadingInProgress: false })
// 				})
// 		}
// 	}
	

//   render() {
    
// 	return (
//       <div className={css.App}>
// 			<Search handleSerch={this.handleSerch} />
// 			{this.state.loadingInProgress &&
// 				<Loader />}
// 			{this.state.imagesArray.length > 0 &&
// 				<ImageGallery images={this.state.imagesArray} openModal={this.showModal} />}
// 			{
// 				// this.state.imagesArray.length > 0 &&
// 				this.state.imagesTotal > this.state.imagesArray.length && 
// 				<Button onLoadMore={this.onLoadMore} />}
// 			{this.state.isShowModal &&
// 				<Modal closeModal={this.closeModal} imageToShow={this.state.imageToShow} imageToShowAlt={this.state.imageToShowAlt} />}
//       </div>
//   	)}
// };
