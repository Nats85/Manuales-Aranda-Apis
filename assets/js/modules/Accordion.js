//-- Accordion (CSS Grid Version)

(function () {
  "use strict";
  // https://youtu.be/RIuVdi2FlMM?t=2237
  const MOVING_CLASS = "is-moving";
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaCurrent
  const ACTIVE_ATTRIBUTE = "aria-current";

  /*
  1. `aria-expanded` set to true []
  2. `aria-hidden` remove
  */

  const list = document.getElementById("list");

  list.addEventListener("click", onListClick);

  function onListClick(e) {
    const clickedItem = e.target;

    const isTitleClicked = clickedItem.classList.contains("c-card__title") || clickedItem.classList.contains("c-card__toggle");

    if (isTitleClicked === false) return;

    const clickedListItem = clickedItem.closest(".c-list__item");

    if (!clickedListItem) return;

    const listItems = Array.from(list.children);

    const isListItemOpen = clickedListItem.hasAttribute(ACTIVE_ATTRIBUTE) &&  clickedListItem.classList.contains(MOVING_CLASS);

    listItems.forEach((listItem) => {
      listItem.classList.remove(MOVING_CLASS);
      _setAriaAttributesForListItem(listItem);
    });

    // list has already been open so we close it and don't continue any further
    if (isListItemOpen) return;

    _setAriaAttributesForListItem(clickedListItem, true);

    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      if (listItem === clickedListItem) {
        clickedListItem.classList.add(MOVING_CLASS);
        break;
      }
      listItem.classList.add(MOVING_CLASS);
    }
  }

  /*Utility Functions*/
  function _setAriaAttributesForListItem(listItem, isOpen = false) {
    const toggleBtn = listItem.querySelector(".c-card__toggle");
    const contentSection = listItem.querySelector(".c-card__content");

    isOpen ? listItem.setAttribute("aria-current", "true") : listItem.removeAttribute("aria-current");

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", isOpen);
    }

    if (contentSection) {
      isOpen ? contentSection.removeAttribute("aria-hidden") : contentSection.setAttribute("aria-hidden", true);
    }
  };
  
  
  
})();
