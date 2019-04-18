/**
 * If your add-on requires JavaScript, add it to this file.
 * Rivet add-on JavaScript follows the vanilla JS constructor pattern:
 *
 * https://vanillajstoolkit.com/boilerplates/constructor/
 * 
 * If your new component is purely HTML and CSS, you can delete this file
 * and any references to it in index.html.
 */

const TextCounter = (function() {
  
  'use strict';

  /**
   * This is your add-on's constructor method. This method is called when
   * you create a new instance of your component and can take any arguments
   * you need to set it up, such as a DOM element selector.
   * 
   * const component = new MyComponent(arg1, arg2, etc);
   * 
   * The example constructor below takes a selector argument that tells the
   * component which DOM elements it should apply its behavior to — in this
   * case, button elements that can be clicked to show a message.
   * 
   * const component = new MyComponent('button.rvt-fancy-button');
   */
  
  const Constructor = function(ids) {
    if(!Array.isArray(ids)) {
      this.ids = [ids];
    }
  };

  /**
   * Use the space below to write your component's private methods.
   * These methods can't be called directly by someone using your add-on;
   * typically, these private methods are used as event handler functions.
   * 
   * The example private method acts as an event handler for the component's
   * click events, showing a message when one of the button elements specified
   * in the constructor method above are clicked.
   */

  const handleInput = function() {
    generateFeedbackEl(this.getAttribute("data-text-counter"))
  }

  const somePrivateMethod = function() {
    // Do something useful.
  }

  /**
   * Use the space below to write your component's public methods.
   * These methods are called by the developer and should be described in your
   * add-on's documentation.
   * 
   * The example public method when called adds an event listener to the button
   * elements specified in the component's constructor method. This event
   * listener calls the handleClick private method defined above.
   */

   const currentCharCount = function(el) {
      return el.value.length;
   }

   const generateFeedbackEl = function(inputId) {
     console.log(inputId);
      let feedbackEl = document.querySelector(`[data-text-counter-feedback=${inputId}]`);
      const inputEl = document.querySelector(`[data-text-counter=${inputId}]`);
      if(!feedbackEl) {
        feedbackEl = document.createElement('small');
        feedbackEl.setAttribute("data-text-counter-feedback", inputId);
        inputEl.parentNode.insertBefore(feedbackEl, inputEl.nextSibling);
      }
      const lengthEntered = currentCharCount(inputEl);
      const lengthMax = inputEl.getAttribute("data-max-characters") || 50;
      feedbackEl.innerHTML = `${lengthEntered}/${lengthMax} characters`;
   }
   

  Constructor.prototype.init = function() {
    console.log(this.ids)
    this.ids.forEach((inputId) => {
      const inputEl = document.querySelector(`[data-text-counter=${inputId}]`);
      if(inputEl) {
        inputEl.addEventListener('input', handleInput);
        generateFeedbackEl(inputId);
      }
      else {
        console.error(`Unable to attach rivet-character-count to [data-text-counter="${inputId}"]`);
      }
    });
  };

  return Constructor;

})();