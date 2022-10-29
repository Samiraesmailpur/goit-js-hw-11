import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30859701-04efb23d375a384661f66a904';
export default class NewsApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
		this.perPage = 40;
		this.totalAvailableImages = 0;
	}

	async fetchGallery() {
		if (!this.searchQuery.length) return Promise.reject('Enter data to search.');

		const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);

		if (!response.data.hits.length) return Promise.reject('Sorry, there are no images matching your search query. Please try again.');
		this.totalAvailableImages = response.data.totalHits;

		response.data.message = `Hooray! We found ${response.data.totalHits} images.`;

		return response;
	}

	incrementPage() {
		this.page += 1;
	}

	resetPage() {
		this.page = 1;
	}

	isAvailable() {
		let maxPages = this.totalAvailableImages / this.perPage;
		return this.page <= maxPages;
	}

	get query() {
		return this.searchQuery;
	}

	set query(newQuery) {
		this.searchQuery = newQuery;
	}
}
