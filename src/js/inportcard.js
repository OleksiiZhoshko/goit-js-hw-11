import { fetchFoto } from './fetchfoto';
import { refs } from "./refs";
import { simpleGallery } from './simpleLightbox'
import {successMessage,failureMessage,infoSearchMessage,infoMessage} from './notifix';

refs.inputValueEl.addEventListener('submit', searchValue);
let searchQuery = '';
// let totalHits = '';
let pageNumber = 1;

// async function searchValue(event) {
//   event.preventDefault()
//   pageNumber = 1;
//   searchQuery = event.currentTarget.searchQuery.value.trim();
//   refs.galleryEl.innerHTML = '';
//   event.currentTarget.reset();

//    if (!searchQuery) {
//     refs.galleryEl.innerHTML = '';
//     infoSearchMessage();
//     return;
//   }

//   // if (searchQuery) {
//   //   toggleModal()
//   // }

//   await fetchFoto(searchQuery, pageNumber)
//     .then(gallery => {
//       totalHits = gallery.data.totalHits;
//  if (totalHits>1) {
//     toggleModal()
//   }
//       if (!totalHits) {
//         return failureMessage();
//       }
//       successMessage(totalHits);
//       markup(gallery.data.hits);
//       simpleGallery.refresh();
//     })
//     .catch(error => console.log(error));
// }

async function searchValue(evt) {
  evt.preventDefault();
  // loadMoreBtnEl.classList.add('is-hidden');
  // observer.unobserve(loadMoreEl);
  refs.galleryEl.innerHTML = '';
  pageNumber = 1;
  searchQuery = evt.currentTarget.searchQuery.value.trim();
  if (!searchQuery) {
    infoSearchMessage();
    return;
  }

  const {
    data: { totalHits, hits, total }
  } = await fetchFoto(searchQuery, pageNumber);

  if (totalHits>1) {
    toggleModal()
  }

  if (!total) {
   refs.galleryEl.innerHTML = '';
    failureMessage();
    return;
  } else {
    successMessage(totalHits);
    try {
            markup(hits);
      simpleGallery.refresh();
    } catch (error) {
      console.log(error);
      failureMessage();
    }
    return searchQuery;
  }
}

function markup(arrey) {
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(arrey));
}

// onclick="return false"

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
        return `<div class="bg-color"><a href="${largeImageURL}" class="link">
                  <div class="photo-card">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
                  </div></a></div>`
      }
    )
    .join('');
}

// refs.seachBatton.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.loadMore.classList.remove("visually-hidden");
}

refs.loadMore.addEventListener('click', loading)

async function loading() {
  pageNumber += 1
  // await fetchFoto(searchQuery, pageNumber)
  //   .then(gallery => {
  //         markup(gallery.data.hits);
  //         simpleGallery.refresh();

  //       })
  //       .catch(error => {
  //         console.log(error);
  //         refs.loadMore.classList.add("visually-hidden");
  //         infoMessage()
  //       });
  const {
    data: { totalHits, hits, total }
  } = await fetchFoto(searchQuery, pageNumber);
    try {
            markup(hits);
      simpleGallery.refresh();
    } catch (error) {
      console.log(error);
      refs.loadMore.classList.add("visually-hidden");
          infoMessage()
    }
    return searchQuery;
  }