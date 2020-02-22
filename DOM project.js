/**
 * @see https://gitlab.com/snippets/1841722
 */

document.addEventListener('DOMContentLoaded', function () {
  /**
   * TODO: Get the element `<ul id="activity">` and store it in the `activities` property
   * @see https://javascript.info/searching-elements-dom
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
   */
  let elements = {
    boredButton: document.querySelector('#suggest-activity-button'),
    activities: document.querySelector('#activities'),
  };


  class ExcitingActivity {
    constructor() {
      this.description = null;
      this.price = null;
      this.element = document.createElement('li');

      /**
       * TODO: Add DOM class `activity` to `this.element`
       * @see https://devdocs.io/dom/element/classlist
       * @see https://javascript.info/styles-and-classes#classname-and-classlist
       */
      this.element.classList.add('activity');
    }

    /**
     * Fetches an exciting activity from the HTTP API using `fetch()`
     * TODO:
     *   1. Return a call to `fetch()` with the following URL: https://www.boredapi.com/api/activity
     *   2. Parse the response as JSON
     *   3. The response is an object with the property `activity`, assign this to `this.description`
     *   4. The response is an object with the property `price`, assign this to `this.price`
     * @returns {Promise<object>}
     */
    fetchContents() {
      return fetch('https://www.boredapi.com/api/activity')
        .then((response) => {
          return response.text();
        })
        .then((activity) => {
          const result = JSON.parse(activity);
          this.description = result.activity;
          this.price = result.price;
          return activity;
        });
    }

    /**
     * Builds then displays exciting activity using the DOM API
     * @returns {undefined}
     */
    addToList() {
      let descriptionElement = document.createElement('p');
      descriptionElement.classList.add('activity-description');
      descriptionElement.textContent = this.description;
      this.element.appendChild(descriptionElement);

      /**
       * TODO: Creates a `span` element and stores it in a variable named `priceElement`
       * @see https://javascript.info/modifying-document#creating-an-element
       * @see https://devdocs.io/dom/document/createelement
       */
      let priceElement = document.createElement('span');

      /**
       * TODO: Add the DOM class to this `span` named `activity-price`
       * @see https://devdocs.io/dom/element/classlist
       * @see https://javascript.info/styles-and-classes#classname-and-classlist
       */
      priceElement.classList.add('activity-price');
      
      /**
       * TODO: Assign `this.price` prepended by a `$` character to `priceElement.textContent`
       * @see https://devdocs.io/javascript/template_literals
       * @see https://javascript.info/basic-dom-node-properties#textcontent-pure-text
       * @see https://devdocs.io/dom/node/textcontent
       */
      priceElement.textContent = "$" + this.price;


      /**
       * TODO: Append `priceElement` to `this.element` after `descriptionElement` is appended to it
       * @see https://javascript.info/modifying-document#insertion-methods
       * @see https://devdocs.io/dom/node/appendchild
       */
      this.element.appendChild(priceElement);

      /**
       * TODO: Appends `this.element` to `elements.activities` as a child
       * @see https://javascript.info/modifying-document#insertion-methods
       * @see https://devdocs.io/dom/node/appendchild
       */
      elements.activities.appendChild(this.element);
    }
  }


  /**
   * This function is called whenever `elements.boredButton` is clicked
   * @returns {Promise}
   */
  function addActivity() {
    /**
     * TODO: Initialize a new instance of `ExcitingActivity` into a new variable called `activity`
     * @see https://devdocs.io/javascript/operators/new
     */
    let activity = new ExcitingActivity();
    

    /**
     * TODO: Fetch the exciting activity then display it
     *   1. Call `fetchContents` function off of the new instance of `ExcitingActivity` which should return a promise
     *   2. After the promise returned by `fetchContents` is resolved, call the `addToList` function
     * @see https://javascript.info/promise-basics#then
     * @see https://devdocs.io/javascript/global_objects/promise/then
     */
    activity.fetchContents().then(function () {
      activity.addToList();
    });
    
     return activity.then;
  }


  // Runs the above function on each click, nothing to do here
  elements.boredButton.addEventListener('click', addActivity);
});
