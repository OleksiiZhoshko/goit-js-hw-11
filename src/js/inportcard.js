import { fetchFoto } from './fetchfoto';
import { refs } from "./refs";
import { simpleGallery } from './simpleLightbox'
import {successMessage,failureMessage,infoSearchMessage,infoMessage} from './notifix';

refs.inputValueEl.addEventListener('submit', searchValue);
let searchQuery = '';
let totalHits = '';


async function searchValue(event) {
  event.preventDefault()
  pageNumber = 1;
  searchQuery = event.currentTarget.searchQuery.value.trim();
  refs.galleryEl.innerHTML = '';
  event.currentTarget.reset();

   if (!searchQuery) {
    refs.galleryEl.innerHTML = '';
    infoSearchMessage();
    return;
  }

  await fetchFoto(searchQuery, pageNumber)
    .then(gallery => {
      totalHits = gallery.data.totalHits;

      if (!totalHits) {
        return failureMessage();
      }
      successMessage(totalHits);
      markup(gallery.data.hits);
      // simpleGallery.refresh();
    })
    .catch(error => console.log(error));
}

function markup(arrey) {
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(arrey));
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
    refs.loadMore.classList.remove("visually-hidden");
}

refs.loadMore.addEventListener('click', loading)

async function loading() {
  pageNumber += 1
  await fetchFoto(searchQuery, pageNumber)
    .then(gallery => {
          markup(gallery.data.hits);
          // simpleGallery.refresh();

        })
        .catch(error => {
          console.log(error);
        });

}