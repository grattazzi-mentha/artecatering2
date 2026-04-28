/**
 * app.js – ARTEcatering
 * Gallery lightbox + smooth scroll (vanilla JS)
 */

(function () {
    'use strict';

    /* ── Remove preload class after fonts/images settle ── */
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.body.classList.remove('is-preload');
        }, 100);
    });

    /* ── Smooth scroll for anchor links ── */
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - 80,
            behavior: 'smooth'
        });
    });

    /* ── Gallery lightbox ── */
    document.querySelectorAll('.gallery').forEach(function (gallery) {

        /* Create and prepend modal element */
        var modal = document.createElement('div');
        modal.className = 'modal';
        modal.setAttribute('tabindex', '-1');
        modal.innerHTML = '<div class="inner"><img src="" alt="Gallery image" /></div>';
        gallery.insertBefore(modal, gallery.firstChild);

        var modalImg = modal.querySelector('img');
        var locked = false;

        /* Open lightbox when a gallery link is clicked */
        gallery.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href || !href.match(/\.(jpg|jpeg|gif|png|mp4)$/i)) return;

            e.preventDefault();
            e.stopPropagation();
            if (locked) return;
            locked = true;

            modalImg.src = href;
            modal.classList.add('visible');
            modal.focus();

            setTimeout(function () { locked = false; }, 600);
        });

        /* Close lightbox when modal overlay is clicked */
        modal.addEventListener('click', function (e) {
            if (locked || !modal.classList.contains('visible')) return;
            e.stopPropagation();
            locked = true;

            modal.classList.remove('loaded');
            setTimeout(function () {
                modal.classList.remove('visible');
                setTimeout(function () {
                    modalImg.src = '';
                    locked = false;
                }, 475);
            }, 125);
        });

        /* Close on Escape key */
        modal.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') modal.click();
        });

        /* Prevent accidental close from mouse events inside modal */
        ['mouseup', 'mousedown', 'mousemove'].forEach(function (type) {
            modal.addEventListener(type, function (e) {
                e.stopPropagation();
            });
        });

        /* Show image once loaded */
        modalImg.addEventListener('load', function () {
            setTimeout(function () {
                if (!modal.classList.contains('visible')) return;
                modal.classList.add('loaded');
            }, 275);
        });

    });

})();
