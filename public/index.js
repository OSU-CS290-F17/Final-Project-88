/*
 * Write your JS code in this file.
 */

var allPostElems = [];
var allPositions = [];

/*
 * This function shows the "sell something" modal by removing the "hidden"
 * class from the modal and backdrop.
 */
function showAddStarModal() {

  var addStarModal = document.getElementById('add-star-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  addStarModal.classList.remove('hidden');
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
 * This function generates a new HTML element representing a complete post,
 * given the specified information about the item to be sold.  The new post
 * element has the following structure:
 *
 * <div class="post" data-price="{{price}}" data-city="{{city}}" data-condition="{{condition}}">
 *   <div class="post-contents">
 *     <div class="post-image-container">
 *       <img src="{{photoURL}}" alt="{{itemText}}">
 *     </div>
 *     <div class="post-info-container">
 *       <a href="#" class="post-title">{{itemText}}</a> <span class="post-price">${{price}}</span> <span class="post-city">({{city}})</span>
 *     </div>
 *   </div>
 * </div>
 */
function insertPostElement(name, photoURL, height, position, location) {

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


/*
 * This function creates a new <option> element containing a given city name.
 */
function createPositionOption(position) {
  var newPositionOption = document.createElement('option');
  newPositionOption.textContent = position;
  return newPositionOption;
}


/*
 * This function handles a click on the modal's "accept" button by checking
 * whether all of the required inputs were supplied by the user and, if so,
 * inserting a new post into the page constructed using this inputs.  If the
 * user did not supply a required input, they instead recieve an alert, and
 * no new post is inserted.
 */
function handleModalAcceptClick() {

  var name = document.getElementById('post-text-input').value.trim();
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var height = document.getElementById('post-height-input').value.trim();
  var position = document.getElementById('post-position-input').value.trim();
  var location = document.querySelector('#post-location-fieldset input:checked').value;

  if (!name || !photoURL || !height || !position || !location) {
    alert("You must fill in all of the fields!");
  } else {

    var newPostElem = createPostElement(name, photoURL, height, position, location);
    allPostElems.push(newPostElem);

    var postsSection = document.getElementById('posts');
    postsSection.appendChild(newPostElem);

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

    hideAddStarModal();

  }

}


/*
 * A function to apply the current filters to a specific post.  Returns true
 * if the post passes the filters and should be displayed and false otherwise.
 */
function postPassesFilters(postElem, filters) {

  if (filters.name) {
    var postText = postElem.textContent.toLowerCase();
    var filterText = filters.name.toLowerCase();
    if (postText.indexOf(filterText) === -1) {
      return false;
    }
  }

  if (filters.minHeight) {
    var postHeight = Number(postElem.getAttribute('data-height'));
    var filterMinHeight = Number(filters.minHeight);
    if (postHeight < filterMinHeight) {
      return false;
    }
  }

  if (filters.maxHeight) {
    var postHeight = Number(postElem.getAttribute('data-height'));
    var filterMaxHeight = Number(filters.maxHeight);
    if (postHeight > filterMaxHeight) {
      return false;
    }
  }

  if (filters.position) {
    var postPosition = postElem.getAttribute('data-position').toLowerCase();
    var filterPosition = filters.position.toLowerCase();
    if (postPosition !== filterPosition) {
      return false;
    }
  }

  if (filters.locations && filters.locations.length > 0) {
    var postLocation = postElem.getAttribute('data-location');
    if (filters.locations.indexOf(postLocation) === -1) {
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
    name: document.getElementById('filter-text').value.trim(),
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
  allPostElems.forEach(function (postElem) {
    if (postPassesFilters(postElem, filters)) {
      insertNewPost(postElem.description, postElem.photoURL, postElem.height, postElem.position, popostElemst.location);
    }
  });

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
    allPostElems.push(postElems[i]);
  }

  /*
   * Grab all of the city names already in the filter dropdown.
   */
  var filterPositionSelect = document.getElementById('filter-position');
  var filterPositionOptions = filterPositionSelect.querySelectorAll('option:not([selected])');
  for (var i = 0; i < filterPositionOptions.length; i++) {
    allPositions.push(filterPositionOptions[i].value.trim().toLowerCase());
  }

  var addStarButton = document.getElementById('add-star-button');
  addStarButton.addEventListener('click', showAddStarModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideAddStarModal);
  }

  var filterSearchButton = document.getElementById('filter-search-button');
  filterSearchButton.addEventListener('click', doFilterSearch)

});
