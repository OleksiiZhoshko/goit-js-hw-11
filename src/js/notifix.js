 import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const failureMessage = () => {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.');
};

export const successMessage = totalHits => {
  return Notify.success(`Hooray! We found ${totalHits} images.`);
};

export const infoMessage = () => {
  return Notify.info(
    "We're sorry, but you've reached the end of search results.");
};

export const infoSearchMessage = () => {
  return Notify.info('Please fill the search field!');
};