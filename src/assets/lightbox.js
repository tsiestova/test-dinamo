
import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5.4.2/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from 'https://unpkg.com/photoswipe@5.4.2/dist/photoswipe.esm.js';

const photo_swipe_options = {
    gallery: '#my-gallery',
    pswpModule: PhotoSwipe,
    bgOpacity: .9,
    showHideOpacity: true,
    children: 'a',
    loop: true,
    showHideAnimationType: 'fade', /* options: fade, zoom, none */
    /* Click on image moves to the next slide */
    imageClickAction: 'next',
    tapAction: 'next',
    zoom: true,
    wheelToZoom: true,
};

const lightbox = new PhotoSwipeLightbox(photo_swipe_options);

const lightbox1 = lightbox.init();
