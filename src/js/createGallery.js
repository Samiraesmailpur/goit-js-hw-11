import { gallery } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simpleDimple = new SimpleLightbox('.gallery a', {
	captionDelay: 250,
});

export function createGallery(galleryItems) {
	const markup = galleryItems
		.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
			return `<div>
      <a class="photo-card" href='${largeImageURL}'>
  <img src="${webformatURL}" data-sourse="${largeImageURL}" alt="${tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes <span class="info-span">${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views <span class="info-span">${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments<span class="info-span"> ${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads <span class="info-span">${downloads}</span></b>
    </p>
  </div>
</a> 
</div>
 `;
		})
		.join('');

	gallery.insertAdjacentHTML('beforeend', markup);
	simpleDimple.refresh();
}
