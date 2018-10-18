var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var navSearch = document.querySelector(".main-nav__item--search");
var navSearchIcon = document.querySelector(".link-search__icon");
var navSearchLink = document.querySelector(".main-nav__link--search");
var navSearchNoclick = document.querySelector(".search__input");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var modalBtn = document.querySelectorAll(".btn--to-basket");
var modalIcon = document.querySelectorAll(".product__to-basket")
var modalClose = document.querySelector(".modal__close")
navMain.classList.remove("main-nav--nojs");
navMain.classList.add("main-nav--closed");
navMain.classList.remove("main-nav--opened");


window.addEventListener("click", function () {
    var target = event.target;
    if ((target === navSearchLink) || (target.parentNode === navSearchLink)) {
        this.event.preventDefault();
        navSearch.classList.remove("main-nav__item--search--closed");
        navSearch.classList.add("main-nav__item--search--opend");
        return;
    }
    if ((target === navToggle) || (target.parentNode === navToggle)) {
        this.event.preventDefault();
        if (navMain.classList.contains("main-nav--closed")) {
            navMain.classList.remove("main-nav--closed");
            navMain.classList.add("main-nav--opened");
        } else {
            navMain.classList.add("main-nav--closed");
            navMain.classList.remove("main-nav--opened");
        }
        return;
    }
    if (modalBtn) {
        for (var key in modalBtn) {
            if ((target === modalBtn[key]) || (target.parentNode === modalBtn[key])) {
                this.event.preventDefault();
                modal.classList.add("modal--show");
                overlay.classList.add("overlay--show");
                return;
            }
        }
    } 
    if (modalIcon) {
        for (var key in modalIcon) {
            if ((target === modalIcon[key]) || (target.parentNode === modalIcon[key])) {
                this.event.preventDefault();
                modal.classList.add("modal--show");
                overlay.classList.add("overlay--show");
                return;
            }
        }
    }
    if ((target === modalClose) || (target.parentNode === modalClose)) {
        this.event.preventDefault();
        modal.classList.remove("modal--show");
        overlay.classList.remove("overlay--show");
        return;
    }
    if (target != navSearchNoclick) {
        navSearch.classList.remove("main-nav__item--search--opend");
        navSearch.classList.add("main-nav__item--search--closed");
    }

})

   