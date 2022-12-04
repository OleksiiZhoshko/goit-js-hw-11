import { fetchFoto } from './fetchfoto';
import { refs } from "./refs";
import { simpleGallery } from './simpleLightbox'
import {successMessage,failureMessage,infoSearchMessage,} from './notifix';

refs.inputValueEl.addEventListener('submit', searchValue);
let searchQuery = '';
let totalHits = '';


function searchValue(event) {
  event.preventDefault()
  searchQuery = event.currentTarget.searchQuery.value.trim();
  refs.galleryEl.innerHTML = '';
  event.currentTarget.reset();

   if (!searchQuery) {
    refs.galleryEl.innerHTML = '';
    infoSearchMessage();
    return;
  }

  fetchFoto(searchQuery)
    .then(gallery => {
      totalHits = gallery.data.totalHits;

      if (!totalHits) {
        return failureMessage();
      }
      successMessage(totalHits);
      markup(gallery.data.hits);
    })
    .catch(error => console.log(error));
}

function markup(arr) {
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(arr));
}

export function galleryMarkup(arrey) {
  return arrey
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}">
                  <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    </div>
                    <div class="info">
                      <p class="info-item">
                          <b>Likes</b>
                          ${likes}
                      </p>
                      <p class="info-item">
                          <b>Views</b>
                          ${views}
                      </p>
                      <p class="info-item">
                          <b>Comments</b>
                          ${comments}
                      </p>
                      <p class="info-item">
                          <b>Downloads</b>
                          ${downloads}
                      </p>
                  </div></a>`
      }
    )
    .join('');
}

refs.seachBatton.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.loadMore.classList.toggle("visually-hidden");
}
  
function addMarkup(arr) {
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(arr));
}
