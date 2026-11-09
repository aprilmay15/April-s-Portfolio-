(function () {
    'use strict';

    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    var navigation = document.querySelector('#primary-navigation');

    if (!header || !toggle || !navigation) {
        return;
    }

    function closeMenu() {
        header.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
    }

    toggle.addEventListener('click', function () {
        var opening = !header.classList.contains('menu-open');
        header.classList.toggle('menu-open', opening);
        toggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
        toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    });

    navigation.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
            closeMenu();
        }
    });

    document.addEventListener('click', function (event) {
        if (header.classList.contains('menu-open') && !header.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}());
