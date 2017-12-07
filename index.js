/*
<<<<<<< HEAD
 * Write your JS code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Chen Huang
 * Email:huangc4@oregonstate.edu
 */

/*
 * These
 */
var allPosts = [];
var allCities = [];

/*
 * This function should use your Handlebars post template to generate HTML
 * representing a single post, given the description, photo URL, price, city,
 * and condition of the item to be sold as arguments to the function.  The
 * generated HTML should then be inserted into the DOM at the end of the
 * <section> element whose id is "posts".
 *
 * The function currently uses native JS methods to generate a new DOM element
 * representing single post, given the specified information, and inserts that
 * post into the DOM.  The new post element has the following structure:
 *
 * <div class="post" data-price="<PRICE>" data-city="<CITY>" data-condition="<CONDITION>">
 *   <div class="post-contents">
 *     <div class="post-image-container">
 *       <img src="<PHOTO_URL>" alt="<ITEM_DESCRIPTION>">
 *     </div>
 *     <div class="post-info-container">
 *       <a href="#" class="post-title"><ITEM_DESCRIPTION></a> <span class="post-price">$<PRICE></span> <span class="post-city">(<CITY>)</span>
 *     </div>
 *   </div>
 * </div>
 */

//function insertNewPost(description, photoURL, price, city, condition) {

//  // Create the containing <div> element.
//  var postDiv = document.createElement('div');
//  postDiv.classList.add('post');
//  postDiv.setAttribute('data-price', price);
//  postDiv.setAttribute('data-city', city);
//  postDiv.setAttribute('data-condition', condition);

//  // Create the inner post-contents <div> and add it to the post <div>.
//  var postContentsDiv = document.createElement('div');
//  postContentsDiv.classList.add('post-contents');
//  postDiv.appendChild(postContentsDiv);

//  /*
//   * Create the post-image-container <div> and its <img> contents and add
//   * them into the post-contents <div>.
//   */
//  var postImageContainerDiv = document.createElement('div');
//  postImageContainerDiv.classList.add('post-image-container');
//  postContentsDiv.appendChild(postImageContainerDiv);

//  var postImg = document.createElement('img');
//  postImg.src = photoURL;
//  postImg.alt = description;
//  postImageContainerDiv.appendChild(postImg);

//  /*
//   * Create the post-info-container <div> and all of its contents and add
//   * them into the post-contents <div>.
//   */
//  var postInfoContainerDiv = document.createElement('div');
//  postInfoContainerDiv.classList.add('post-info-container');
//  postContentsDiv.appendChild(postInfoContainerDiv);

//  var postLink = document.createElement('a');
//  postLink.classList.add('post-title');
//  postLink.href = '#';
//  postLink.textContent = description;
//  postInfoContainerDiv.appendChild(postLink);

//  var spaceText1 = document.createTextNode(' ');
//  postInfoContainerDiv.appendChild(spaceText1);

//  var postPriceSpan = document.createElement('span');
//  postPriceSpan.classList.add('post-price');
//  postPriceSpan.textContent = '$' + price;
//  postInfoContainerDiv.appendChild(postPriceSpan);

//  var spaceText2 = document.createTextNode(' ');
//  postInfoContainerDiv.appendChild(spaceText2);

//  var postCitySpan = document.createElement('span');
//  postCitySpan.classList.add('post-city');
//  postCitySpan.textContent = '(' + city + ')';
//  postInfoContainerDiv.appendChild(postCitySpan);

//  var postsSection = document.getElementById('posts');
//  postsSection.appendChild(postDiv);

//}

function insertNewPost(description, photoURL, price, city, condition)
{

    var postTemplateArgs =
    {
        description: description,
        photoURL: photoURL,
        price: price,
        city: city,
        condition: condition
    }

    var postHTML = Handlebars.templates.posts(postTemplateArgs);
    console.log("== postHTML:", postHTML);

    var postsSection = document.getElementById('posts');
    postsSection.insertAdjacentHTML("beforeEnd", postHTML);
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
  var price = document.getElementById('post-price-input').value.trim();
  var city = document.getElementById('post-city-input').value.trim();
  var condition = document.querySelector('#post-condition-fieldset input:checked').value;

  if (!description || !photoURL || !price || !city || !condition) {
    alert("You must fill in all of the fields!");
  } else {

    allPosts.push({
      description: description,
      photoURL: photoURL,
      price: price,
      city: city,
      condition: condition
    });

    clearFiltersAndReinsertPosts();

    addCityToAllCities(city);

    hideSellSomethingModal();

  }

}


/*
 * This function clears all filter values, causing all posts to be re-inserted
 * into the DOM.
 */
function clearFiltersAndReinsertPosts() {

  document.getElementById('filter-text').value = "";
  document.getElementById('filter-min-price').value = "";
  document.getElementById('filter-max-price').value = "";
  document.getElementById('filter-city').value = "";

  var filterConditionCheckedInputs = document.querySelectorAll("#filter-condition input");
  for (var i = 0; i < filterConditionCheckedInputs.length; i++) {
    filterConditionCheckedInputs[i].checked = false;
  }

  doFilterUpdate();

}


/*
 * This function checks to see if a city is included in the collection of all
 * cities for which we have a post.  If it's not, the new city is added to the
 * collection.
 */
function addCityToAllCities(city) {

  /*
   * If city doesn't already exist in the list of cities by which we can
   * filter, add it.
   */
  if (allCities.indexOf(city.toLowerCase()) === -1) {
    allCities.push(city.toLowerCase());
    var newCityOption = createCityOption(city);
    var filterCitySelect = document.getElementById('filter-city');
    filterCitySelect.appendChild(newCityOption);
  }

}


/*
=======
 * Write your JS code in this file.
 */

var allPostElems = [];
var allCities = [];

/*
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
 * This function shows the "sell something" modal by removing the "hidden"
 * class from the modal and backdrop.
 */
function showSellSomethingModal() {

  var showSomethingModal = document.getElementById('sell-something-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}


/*
 * This function clears any user-entered inputs in the "sell something" modal.
 */
function clearSellSomethingModalInputs() {

  var postTextInputElements = [
    document.getElementById('post-text-input'),
    document.getElementById('post-photo-input'),
    document.getElementById('post-price-input'),
    document.getElementById('post-city-input')
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
  var checkedPostConditionButton = document.querySelector('#post-condition-fieldset input[checked]');
  checkedPostConditionButton.checked = true;

}


/*
 * This function hides the "sell something" modal by adding the "hidden"
 * class from the modal and backdrop.  It also clears any existing inputs in
 * the modal's input fields when the modal is hidden.
 */
function hideSellSomethingModal() {

  var showSomethingModal = document.getElementById('sell-something-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearSellSomethingModalInputs();

}


/*
<<<<<<< HEAD
=======
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
function createPostElement(itemText, photoURL, price, city, condition) {

  // Create the containing <div> element.
  var postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.setAttribute('data-price', price);
  postDiv.setAttribute('data-city', city);
  postDiv.setAttribute('data-condition', condition);

  // Create the inner post-contents <div> and add it to the post <div>.
  var postContentsDiv = document.createElement('div');
  postContentsDiv.classList.add('post-contents');
  postDiv.appendChild(postContentsDiv);

  /*
   * Create the post-image-container <div> and its <img> contents and add
   * them into the post-contents <div>.
   */
  var postImageContainerDiv = document.createElement('div');
  postImageContainerDiv.classList.add('post-image-container');
  postContentsDiv.appendChild(postImageContainerDiv);

  var postImg = document.createElement('img');
  postImg.src = photoURL;
  postImg.alt = itemText;
  postImageContainerDiv.appendChild(postImg);

  /*
   * Create the post-info-container <div> and all of its contents and add
   * them into the post-contents <div>.
   */
  var postInfoContainerDiv = document.createElement('div');
  postInfoContainerDiv.classList.add('post-info-container');
  postContentsDiv.appendChild(postInfoContainerDiv);

  var postLink = document.createElement('a');
  postLink.classList.add('post-title');
  postLink.href = '#';
  postLink.textContent = itemText;
  postInfoContainerDiv.appendChild(postLink);

  var spaceText1 = document.createTextNode(' ');
  postInfoContainerDiv.appendChild(spaceText1);

  var postPriceSpan = document.createElement('span');
  postPriceSpan.classList.add('post-price');
  postPriceSpan.textContent = '$' + price;
  postInfoContainerDiv.appendChild(postPriceSpan);

  var spaceText2 = document.createTextNode(' ');
  postInfoContainerDiv.appendChild(spaceText2);

  var postCitySpan = document.createElement('span');
  postCitySpan.classList.add('post-city');
  postCitySpan.textContent = '(' + city + ')';
  postInfoContainerDiv.appendChild(postCitySpan);

  return postDiv;

}


/*
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
 * This function creates a new <option> element containing a given city name.
 */
function createCityOption(city) {
  var newCityOption = document.createElement('option');
  newCityOption.textContent = city;
  return newCityOption;
}


/*
<<<<<<< HEAD
 * A function to apply the current filters to a specific post.  Returns true
 * if the post passes the filters and should be displayed and false otherwise.
 */
function postPassesFilters(post, filters) {

  if (filters.text) {
    var postDescription = post.description.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (postDescription.indexOf(filterText) === -1) {
=======
 * This function handles a click on the modal's "accept" button by checking
 * whether all of the required inputs were supplied by the user and, if so,
 * inserting a new post into the page constructed using this inputs.  If the
 * user did not supply a required input, they instead recieve an alert, and
 * no new post is inserted.
 */
function handleModalAcceptClick() {

  var itemText = document.getElementById('post-text-input').value.trim();
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var price = document.getElementById('post-price-input').value.trim();
  var city = document.getElementById('post-city-input').value.trim();
  var condition = document.querySelector('#post-condition-fieldset input:checked').value;

  if (!itemText || !photoURL || !price || !city || !condition) {
    alert("You must fill in all of the fields!");
  } else {

    var newPostElem = createPostElement(itemText, photoURL, price, city, condition);
    allPostElems.push(newPostElem);

    var postsSection = document.getElementById('posts');
    postsSection.appendChild(newPostElem);

    /*
     * If city doesn't already exist in the list of cities by which we can
     * filter, add it.
     */
    if (allCities.indexOf(city.toLowerCase()) === -1) {
      allCities.push(city.toLowerCase());
      var newCityOption = createCityOption(city);
      var filterCitySelect = document.getElementById('filter-city');
      filterCitySelect.appendChild(newCityOption);
    }

    hideSellSomethingModal();

  }

}


/*
 * A function to apply the current filters to a specific post.  Returns true
 * if the post passes the filters and should be displayed and false otherwise.
 */
function postPassesFilters(postElem, filters) {

  if (filters.text) {
    var postText = postElem.textContent.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (postText.indexOf(filterText) === -1) {
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
      return false;
    }
  }

  if (filters.minPrice) {
<<<<<<< HEAD
    var filterMinPrice = Number(filters.minPrice);
    if (Number(post.price) < filterMinPrice) {
=======
    var postPrice = Number(postElem.getAttribute('data-price'));
    var filterMinPrice = Number(filters.minPrice);
    if (postPrice < filterMinPrice) {
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
      return false;
    }
  }

  if (filters.maxPrice) {
<<<<<<< HEAD
    var filterMaxPrice = Number(filters.maxPrice);
    if (Number(post.price) > filterMaxPrice) {
=======
    var postPrice = Number(postElem.getAttribute('data-price'));
    var filterMaxPrice = Number(filters.maxPrice);
    if (postPrice > filterMaxPrice) {
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
      return false;
    }
  }

  if (filters.city) {
<<<<<<< HEAD
    if (post.city.toLowerCase() !== filters.city.toLowerCase()) {
=======
    var postCity = postElem.getAttribute('data-city').toLowerCase();
    var filterCity = filters.city.toLowerCase();
    if (postCity !== filterCity) {
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
      return false;
    }
  }

  if (filters.conditions && filters.conditions.length > 0) {
<<<<<<< HEAD
    if (filters.conditions.indexOf(post.condition) === -1) {
=======
    var postCondition = postElem.getAttribute('data-condition');
    if (filters.conditions.indexOf(postCondition) === -1) {
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
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
function doFilterUpdate() {

  /*
   * Grab values of filters from user inputs.
   */
  var filters = {
    text: document.getElementById('filter-text').value.trim(),
    minPrice: document.getElementById('filter-min-price').value,
    maxPrice: document.getElementById('filter-max-price').value,
    city: document.getElementById('filter-city').value.trim(),
    conditions: []
  }

  var filterConditionCheckedInputs = document.querySelectorAll("#filter-condition input:checked");
  for (var i = 0; i < filterConditionCheckedInputs.length; i++) {
    filters.conditions.push(filterConditionCheckedInputs[i].value);
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
<<<<<<< HEAD
  allPosts.forEach(function (post) {
    if (postPassesFilters(post, filters)) {
      insertNewPost(post.description, post.photoURL, post.price, post.city, post.condition);
=======
  allPostElems.forEach(function (postElem) {
    if (postPassesFilters(postElem, filters)) {
      postContainer.appendChild(postElem);
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
    }
  });

}


/*
<<<<<<< HEAD
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
    price: postElem.getAttribute('data-price'),
    city: postElem.getAttribute('data-city'),
    condition: postElem.getAttribute('data-condition')
  };

  var postImageElem = postElem.querySelector('.post-image-container img');
  post.photoURL = postImageElem.src;
  post.description = postImageElem.alt;

  return post;

}


/*
=======
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  /*
   * Remember all of the initial post elements initially displayed in the page.
   */
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
<<<<<<< HEAD
    allPosts.push(parsePostElem(postElems[i]));
=======
    allPostElems.push(postElems[i]);
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46
  }

  /*
   * Grab all of the city names already in the filter dropdown.
   */
  var filterCitySelect = document.getElementById('filter-city');
<<<<<<< HEAD
  if (filterCitySelect) {
    var filterCityOptions = filterCitySelect.querySelectorAll('option:not([selected])');
    for (var i = 0; i < filterCityOptions.length; i++) {
      allCities.push(filterCityOptions[i].value.trim().toLowerCase());
    }
  }

  var sellSomethingButton = document.getElementById('sell-something-button');
  if (sellSomethingButton) {
    sellSomethingButton.addEventListener('click', showSellSomethingModal);
  }

  var modalAcceptButton = document.getElementById('modal-accept');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }
=======
  var filterCityOptions = filterCitySelect.querySelectorAll('option:not([selected])');
  for (var i = 0; i < filterCityOptions.length; i++) {
    allCities.push(filterCityOptions[i].value.trim().toLowerCase());
  }

  var sellSomethingButton = document.getElementById('sell-something-button');
  sellSomethingButton.addEventListener('click', showSellSomethingModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideSellSomethingModal);
  }

  var filterUpdateButton = document.getElementById('filter-update-button');
<<<<<<< HEAD
  if (filterUpdateButton) {
    filterUpdateButton.addEventListener('click', doFilterUpdate)
  }
=======
  filterUpdateButton.addEventListener('click', doFilterUpdate)
>>>>>>> f382b0de4373098a39c61c752641b95baf5f1b46

});
