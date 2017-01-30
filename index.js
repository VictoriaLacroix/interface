/*
 * index.js for the COSC 4926 films database.
 *
 * This file was authored by Victoria Lacroix and Brandon Beneteau as part of a
 * group project including the aforementioned as well as Ruihua Guo and
 * Kaitlynn Anderson-Butcher.
 *
 * This javascript file depends on the following libraries:
 *
 * jQuery: http://jquery.com/
 * js-kookie: https://github.com/js-cookie/js-cookie.git
 */

var movieIDs = [];
var ratings = [];

function loadFilms() {
  movieIDs = Cookies.get('movies');
  ratings = Cookies.get('ratings');

  console.log('Cookies loaded: ' + movieIDs);
}

function addMovieByID(id) {
  if(!arrayContains(arr, obj)) {
    movieIDs += id;
    ratings += '';

    Cookies.set('movies', movieIDs);
    Cookies.set('ratings', movieIDs);

    console.log('Added movie: ' + id);
  }
}

function setMovieRating(id, rating) {
  var index = arrayIndexOf(movieIDs, id);
  if(index >= 0) {
    ratings[index] = rating;

    Cookies.set('ratings', ratings);
  }
}

// Thanks stackexchange!
function arrayContains(arr, obj) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == obj) {
      return true;
    }
  }
  return false;
}

function arrayIndexOf(arr, obj) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == obj) {
      return i;
    }
  }
  return -1;
}

