import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let sinpleGallery = new SimpleLightbox('.gallery a', {
 captionsData: 'alt',
  captionDelay: 300,
 });