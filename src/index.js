import './index.css';
import NewsApiService from './js/fetch';
import { inputRef, submitRef, gallery } from './js/refs';
import Notiflix from 'notiflix';
import { createGallery } from './js/createGallery';
const newsApiService = new NewsApiService();

window.addEventListener('scroll', handleScroll);
submitRef.addEventListener('submit', onSearch);

function onSearch(e) {
	e.preventDefault();

	newsApiService.query = inputRef.value.trim();
	newsApiService.resetPage();

	newsApiService
		.fetchGallery()
		.then(({ data }) => {
			Notiflix.Notify.success(data.message);

			clearGallery();
			createGallery(data.hits);
		})
		.catch(error => {
			clearGallery();
			Notiflix.Notify.failure(error);
		});
}

function onLoadMore() {
	newsApiService.incrementPage();
	newsApiService
		.fetchGallery()
		.then(({ data }) => {
			createGallery(data.hits);
		})
		.catch(error => {
			Notiflix.Notify.failure(error);
		});
}

function handleScroll() {
	let scrollPosition = window.scrollY + window.innerHeight + 2;
	if (document.body.offsetHeight > scrollPosition) return;

	if (!newsApiService.isAvailable()) {
		Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
		return;
	}

	onLoadMore();
}

function clearGallery() {
	gallery.innerHTML = '';
}
