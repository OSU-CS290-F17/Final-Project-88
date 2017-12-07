var allPosts = [];
var allPositions = [];

 // * <div class="post" data-price="<PRICE>" data-city="<CITY>" data-condition="<CONDITION>">
 // *   <div class="post-contents">
 // *     <div class="post-image-container">
 // *       <img src="<PHOTO_URL>" alt="<ITEM_DESCRIPTION>">
 // *     </div>
 // *     <div class="post-info-container">
 // *       <a href="#" class="post-title"><ITEM_DESCRIPTION></a> <span class="post-price">$<PRICE></span> <span class="post-city">(<CITY>)</span>
 // *     </div>
 // *   </div>
 // * </div>
 // */
function insertNewPost(description, photoURL, height, position, location) {

  var newPostTemplateArgs = {
    description: description,
    photoURL: photoURL,
    height: height,
    position: position,
    location: location
  }

  var newPostHTML = Handlebars.templates.newPost(newPostTemplateArgs);
  console.log("== newPostHTML:", newPostHTML);

  var postsSection = document.getElementById('posts');
  postsSection.insertAdjacentHTML("beforeEnd", newPostHTML);
}

/***************************************************************************
 **
 ** You should not modify any of the functions below.
 **
 ***************************************************************************/


/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so,i nserting a new post into the page constructed using
 * these inputs.  If the user did not supply a required input, they instead
 * recieve an alert, and no new post is inserted.
 */
function handleModalAcceptClick() {

  var description = document.getElementById('post-text-input').value.trim();
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var height = document.getElementById('post-height-input').value.trim();
  var position = document.getElementById('post-position-input').value.trim();
  var location = document.querySelector('#post-location-fieldset input:checked').value;

  if (!description || !photoURL || !height || !position || !location) {
    alert("You must fill in all of the fields!");
  } else {

    allPosts.push({
      description: description,
      photoURL: photoURL,
      height: height,
      position: position,
      location: location
    });

    clearFiltersAndReinsertPosts();

    addPositionToAllPositions(position);

    hideAddStarModal();

  }

}


/*
 * This function clears all filter values, causing all posts to be re-inserted
 * into the DOM.
 */
function clearFiltersAndReinsertPosts() {

  document.getElementById('filter-text').value = "";
  document.getElementById('filter-min-height').value = "";
  document.getElementById('filter-max-height').value = "";
  document.getElementById('filter-position').value = "";

  var filterLocationCheckedInputs = document.querySelectorAll("#filter-location input");
  for (var i = 0; i < filterLocationCheckedInputs.length; i++) {
    filterLocationCheckedInputs[i].checked = false;
  }

  doFilterSearch();

}


/*
 * This function checks to see if a city is included in the collection of all
 * cities for which we have a post.  If it's not, the new city is added to the
 * collection.
 */
function addPositionToAllPositions(position) {

  /*
   * If city doesn't already exist in the list of cities by which we can
   * filter, add it.
   */
  if (allPositions.indexOf(position.toLowerCase()) === -1) {
    allPositions.push(position.toLowerCase());
    var newPositionOption = createPositionOption(position);
    var filterPositionSelect = document.getElementById('filter-position');
    filterPositionSelect.appendChild(newPositionOption);
  }

}


/*
 * This function shows the "sell something" modal by removing the "hidden"
 * class from the modal and backdrop.
 */
function showAddStarModal() {

  var showAddStarModal = document.getElementById('add-star-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showAddStarModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}


/*
 * This function clears any user-entered inputs in the "sell something" modal.
 */
function clearAddStarModalInputs() {

  var postTextInputElements = [
    document.getElementById('post-text-input'),
    document.getElementById('post-photo-input'),
    document.getElementById('post-height-input'),
    document.getElementById('post-position-input')
  ];

  /*
   * Clear any text entered in the text inputs.
   */
  postTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });

  /*
   * Grab the originally checked radio button and make sure it's checked.
   */
  var checkedPostLocationButton = document.querySelector('#post-location-fieldset input[checked]');
  checkedPostLocationButton.checked = true;

}


/*
 * This function hides the "sell something" modal by adding the "hidden"
 * class from the modal and backdrop.  It also clears any existing inputs in
 * the modal's input fields when the modal is hidden.
 */
function hideAddStarModal() {

  var showAddStarModal = document.getElementById('add-star-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showAddStarModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearAddStarModalInputs();

}


/*
 * This function creates a new <option> element containing a given city name.
 */
function createPositionOption(position) {
  var newPositionOption = document.createElement('option');
  newPositionOption.textContent = position;
  return newPositionOption;
}


/*
 * A function to apply the current filters to a specific post.  Returns true
 * if the post passes the filters and should be displayed and false otherwise.
 */
function postPassesFilters(post, filters) {

  if (filters.text) {
    var postDescription = post.description.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (postDescription.indexOf(filterText) === -1) {
      return false;
    }
  }

  if (filters.minHeight) {
    var filterMinHeight = Number(filters.minHeight);
    if (Number(post.height) < filterMinHeight) {
      return false;
    }
  }

  if (filters.maxHeight) {
    var filterMaxHeight = Number(filters.maxHeight);
    if (Number(post.height) < filterMaxHeight) {
      return false;
    }
  }

  if (filters.position) {
    if (post.position.toLowerCase() !== filters.position.toLowerCase()) {
      return false;
    }
  }

  if (filters.locations && filters.locations.length > 0) {
    if (filters.locations.indexOf(post.location) === -1) {
      return false;
    }
  }

  return true;

}


/*
 * Applies the filters currently entered by the user to the set of all posts.
 * Any post that satisfies the user's filter values will be displayed,
 * including posts that are not currently being displayed because they didn't
 * satisfy an old set of filters.  Posts that don't satisfy the filters are
 * removed from the DOM.
 */
function doFilterSearch() {

  /*
   * Grab values of filters from user inputs.
   */
  var filters = {
    text: document.getElementById('filter-text').value.trim(),
    minHeight: document.getElementById('filter-min-height').value,
    maxHeight: document.getElementById('filter-max-height').value,
    position: document.getElementById('filter-position').value.trim(),
    locations: []
  }

  var filterLocationCheckedInputs = document.querySelectorAll("#filter-location input:checked");
  for (var i = 0; i < filterLocationCheckedInputs.length; i++) {
    filters.locations.push(filterLocationCheckedInputs[i].value);
  }

  /*
   * Remove all "post" elements from the DOM.
   */
  var postContainer = document.getElementById('posts');
  while(postContainer.lastChild) {
    postContainer.removeChild(postContainer.lastChild);
  }

  /*
   * Loop through the collection of all "post" elements and re-insert ones
   * that meet the current filtering criteria.
   */
  allPosts.forEach(function (post) {
    if (postPassesFilters(post, filters)) {
      insertNewPost(post.description, post.photoURL, post.price, post.city, post.condition);
    }
  });

}


/*
 * This function parses an existing DOM element representing a single post
 * into an object representing that post and returns that object.  The object
 * is structured like this:
 *
 * {
 *   description: "...",
 *   photoURL: "...",
 *   price: ...,
 *   city: "...",
 *   condition: "..."
 * }
 */
function parsePostElem(postElem) {

  var post = {
    height: postElem.getAttribute('data-height'),
    position: postElem.getAttribute('data-position'),
    location: postElem.getAttribute('data-location')
  };

  var postImageElem = postElem.querySelector('.post-image-container img');
  post.photoURL = postImageElem.src;
  post.description = postImageElem.alt;

  return post;

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  /*
   * Remember all of the initial post elements initially displayed in the page.
   */
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPosts.push(parsePostElem(postElems[i]));
  }

  /*
   * Grab all of the city names already in the filter dropdown.
   */
  var filterPositionSelect = document.getElementById('filter-position');
  if (filterPositionSelect) {
    var filterPositionOptions = filterPositionSelect.querySelectorAll('option:not([selected])');
    for (var i = 0; i < filterPositionOptions.length; i++) {
      allPositions.push(filterPositionOptions[i].value.trim().toLowerCase());
    }
  }

  var AddStarButton = document.getElementById('add-star-button');
  if (AddStarButton) {
    AddStarButton.addEventListener('click', showAddStarModal);
  }

  var modalAcceptButton = document.getElementById('modal-accept');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideAddStarModal);
  }

  var filterSearchButton = document.getElementById('filter-search-button');
  if (filterSearchButton) {
    filterSearchButton.addEventListener('click', doFilterSearch)
  }

});
