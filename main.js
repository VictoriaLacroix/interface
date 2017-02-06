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
 * js-cookie: https://github.com/js-cookie/js-cookie.git
 */

window.onload = loadFilms;

// -- Globals --
var movieIDs = [];
var movies = [];
var ratings = [];
var statuses = [];
var expandedMovie = '';

/*
 * Movie object for page use.
 */
function movie(id, title, year, poster, genre, plot, runtime, status) {
  this.id = id;
  this.title = title;
  this.year = year;
  this.poster = poster;
  this.genre = genre;
  this.plot = plot;
  this.runtime = runtime;
  this.status = status;
}

/*
 * Creates a movie object from the given OMDB JSON object.
 */
function createMovie(obj) {
  return new movie(obj.imdbID, obj.Title, obj.Year, obj.Poster, obj.Genre,
    obj.Plot, obj.Runtime, obj.Status);
}

// -- Cookie stuff --
//
function loadFilms() {
  movieIDs = Cookies.get('movieIDs');
  ratings = Cookies.get('ratings');
  statuses = Cookies.get('statuses');
  $.each(movieIDs, function(id) {
    movies.push = fetchMovieFromOMDB(id);
  });
}

function addMovieByID(id) {
  if(!arrayContains(arr, obj)) {
    movieIDs.push(id);
    ratings.push('');
    movies.push(fetchMovieFromOMDB(id));

    Cookies.set('movieIDs', movieIDs);
    Cookies.set('ratings', ratings);
  }
}

function setRatingByID(id, rating) {
  var index = arrayIndexOf(movieIDs, id);
  if(index >= 0) {
    ratings[index] = rating;
    Cookies.set('ratings', ratings);
  }
}

/*
 * Sets the status of a movie to either "watched", "unwatched", or "rated".
 */
function setStatusByID(id, stat) {
  var index = arrayIndexOf(movieIDs, id);
  if(index >= 0) {
    statuses[index] = stat;
    Cookies.set('statuses', statuses);
  }
}

// -- OMDB stuff --

function fetchMovieFromOMDB(id) {
  $.getJSON('http://omdbapi.com/?i=' + id, function(obj) {
    return createMovie(obj);
  });
}

/*
 * Searches the OMDB API for movies matching/containing the given title, then
 * executes the given callback function with the result.
 */
function searchOMDBByTitle(title, callback) {
  // TODO include more than just movies for the searches?
  $.getJSON('http://omdbapi.com/?s=' + title + '&type=movie',
      function(response) {
    var responseMovies = response.Search;
    var results;
    $.each(responseMovies, function(arr) {
      results.push(createMovie(obj));
    });
    callback(results);
  });
}

/**
 * Creates a <div> tag based on the given movie's poster, title and year.
 */
function generateSearchResultDiv(movie) {
  var result = '<div class=".col-md-2" style="text-align: center">';
  result    += '<img src="' + movie.poster + '" alt="' + movie.title + '">';
  result    += '<p>' + movie.title + '</p>';
  result    += '<button onclick="addMovieById(' + movie.id;
               + ')">Add to List</button>';
  result    += '</div>';
  return result;
}

function generateClosedMovieDiv(movie) {
  var result = '<div id="small-' + movie.id
             + '" onclick="expandMovieDiv(' + movie.id
             + ')" class=".col-md-3" style="text-align: center">';
  result    += '<img src="' + movie.poster + '" alt="' + movie.title + '">';
  result    += '</div>';
  return result;
}

function generateMovieInfoDiv(movie, rating) {
  var result = '<div id="big-' + movie.id
             + '" onclick="shrinkMovieDiv()" class="row">'
  result    += '<div class=".col-md-3" style="text-align: center">';
  result    += '<div class="row"><img src="' + movie.poster + '" alt="'
                  + movie.title + '"></div>';
  result    += '<div class="row">buttons</div>'; //buttons
  result    += '</div>';
  result    += '<div class=".col-md-9, center-block">';
  result    += '<div class="row"><p><h3>' + movie.title + '</h3></p></div>';
  result    += '<div class="row"><p><i>' + movie.plot + '</i></p></div>';
  result    += '<div class="row"><p>' + movie.genre + '</p></div>';
  result    += '<div class="row">';
  result    += '<div class=".col-md-6"><p>' + movie.year + '</p></div>';
  result    += '<div class=".col-md-6"><p>' + movie.runtime + '</p></div>';
  result    += '</div>';
  result    += '</div>';
  return result;
}

/*
 * Creates an info pane showing expanded movie info
 */
function expandMovieDiv(movie) {
  shrinkMovieDiv(); //remove existing movie div
  var expandedMovie = movie.id;
  var newDiv = generateMovieInfoDiv(movie);
  var smallDiv = document.getElementById('small-' + movie.id);
  smallDiv.parent.append(newDiv);
}

/*
 * Removes the expanded movie div from the document.
 */
function shrinkMovieDiv() {
  var div = document.getElementById('big-' + expandedMovie);
  if(div != null) {
    div.parent.removeChild(div);
  }
}

// Helper functions

// Actually faster than most browser implementations
function arrayContains(arr, obj) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == obj) {
      return true;
    }
  }
  return false;
}

// Actually faster than most browser implementations
function arrayIndexOf(arr, obj) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == obj) {
      return i;
    }
  }
  return -1;
}

function getMovieById(id) {
  return movies[arrayIndexOf(movieIDs, id)];
}


