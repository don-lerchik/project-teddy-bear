(function () {
  'use strict';

  const navMain = document.querySelector(`.main-nav`);
  const navToggle = document.querySelector(`.main-nav__toggle`);
  const navSearch = document.querySelector(`.main-nav__item--search`);
  const navSearchLink = document.querySelector(`.main-nav__link--search`);
  const navSearchNoclick = document.querySelector(`.search__input`);
  const modal = document.querySelector(`.modal`);
  const overlay = document.querySelector(`.overlay`);
  const modalBtn = document.querySelectorAll(`.btn--to-basket`);
  const modalIcon = document.querySelectorAll(`.product__to-basket`)
  const modalClose = document.querySelector(`.modal__close`)

// When loading a script, removes the class checking support for js
  window.addEventListener(`DOMContentLoaded`, () => {
    navMain.classList.remove(`main-nav--nojs`);
    navMain.classList.add(`main-nav--closed`);
  });

//switch active state of the navigation menu in the mobile version
  navToggle.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    navMain.classList.toggle(`main-nav--opened`);
    navMain.classList.toggle(`main-nav--closed`);
  });

// open/close search input in desktop version
  const closeSearchInput = (evt) => {
    if (evt.target != navSearchNoclick) {
      navSearch.classList.remove(`main-nav__item--search--opend`);
      navSearch.classList.add(`main-nav__item--search--closed`);
      window.removeEventListener(`click`, closeSearchInput);
    }
  }
  const openSearchInput = (evt) => {
    evt.preventDefault();
    navSearch.classList.remove(`main-nav__item--search--closed`);
    navSearch.classList.add(`main-nav__item--search--opend`);
    setTimeout(() => {
      window.addEventListener(`click`, closeSearchInput);
    }, 0);
  }

  navSearchLink.addEventListener(`click`, openSearchInput);


// show/close modal and overlay windows 
// when the user clicks the buy item button or the icon

  const modalOverlayClose = (evt) => {
    evt.preventDefault();
    modal.classList.remove(`modal--show`);
    overlay.classList.remove(`overlay--show`);
    modalClose.removeEventListener(`click`, modalOverlayClose);
  }
  const modalOverlayShow = (evt) => {
    evt.preventDefault();
    modal.classList.add(`modal--show`);
    overlay.classList.add(`overlay--show`);
    modalClose.addEventListener(`click`, modalOverlayClose);
  }
  modalBtn.forEach(element => {
    element.addEventListener(`click`, modalOverlayShow)
  });

  modalIcon.forEach(element => {
    element.addEventListener(`click`, modalOverlayShow)
  });

})();

