var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var navSearch = document.querySelector(".main-nav__item--search");
var navSearchIcon = document.querySelector(".link-search__icon");
var navSearchLink = document.querySelector(".main-nav__link--search");
var navSearchNoclick = document.querySelector(".search__input");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var modalBtn = document.querySelector(".btn--to-basket");
var modalClose = document.querySelector(".modal__close")
navMain.classList.remove("main-nav--nojs");
navMain.classList.add("main-nav--closed");
navMain.classList.remove("main-nav--opened");


window.addEventListener("click", function () {
    var target = event.target;
    if ((target == navSearchLink) || (target.parentNode == navSearchLink)) {
        this.event.preventDefault();
        navSearch.classList.remove("main-nav__item--search--closed");
        navSearch.classList.add("main-nav__item--search--opend");
        return;
    }
    if ((target == navToggle) || (target.parentNode == navToggle) ){
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
    if ((target == modalBtn) || (target.parentNode == modalBtn)) {
        this.event.preventDefault();
        modal.classList.add("modal--show");
        overlay.classList.add("overlay--show");
        return;
    }
    if ((target == modalClose) || (target.parentNode == modalClose)) {
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



    // http://osvaldas.info/caching-svg-sprite-in-localstorage

    ; (function (window, document) {
        'use strict';

        var file = 'img/sprite.svg',
            revision = 1;

        if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
            return true;

        var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
            request,
            data,
            insertIT = function () {
                document.body.insertAdjacentHTML('afterbegin', data);
            },
            insert = function () {
                if (document.body) insertIT();
                else document.addEventListener('DOMContentLoaded', insertIT);
            };

        if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
            data = localStorage.getItem('inlineSVGdata');
            if (data) {
                insert();
                return true;
            }
        }

        try {
            request = new XMLHttpRequest();
            request.open('GET', file, true);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    data = request.responseText;
                    insert();
                    if (isLocalStorage) {
                        localStorage.setItem('inlineSVGdata', data);
                        localStorage.setItem('inlineSVGrev', revision);
                    }
                }
            }
            request.send();
        }
        catch (e) { }

    }(window, document));