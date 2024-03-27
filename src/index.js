import "./style.scss";

function fetchData(path) {

    return fetch(path)
        .then((response) => response.text())
}

const initModal = () => {
    const burger = document.getElementById('burger');
    const modal = document.querySelector('#modal');

    burger.addEventListener('pointerdown', () => {
        modal.showModal();
    });

    const closeModal = document.querySelector('.btn-close-modal');

    closeModal.addEventListener('pointerdown', () => {
        modal.close();
    });
}

const initModalRecipes = () => {
    const btnOpenMenu = document.querySelectorAll('.menu__item__button');
    const modalMenu = document.getElementById('modal-menu');
    const modalContent = modalMenu.querySelector('.modal-content');

    btnOpenMenu.forEach((btn) => {
        btn.addEventListener('click', ()=> {

            fetchData('./assets/modal.html')
                .then(data => modalContent.innerHTML = data);
                modalMenu.showModal();

                addModalEvents(modalMenu);
        })
    })
}

function addModalEvents (modal)  {

    const closeMenu = document.querySelector('#close-menu');
    closeMenu.addEventListener('pointerdown', () => {
        modal.close();
    });
}

const initGallerySlider = () => {

    const swiperGallery = new Swiper('.swiper-gallery', {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        direction: "horizontal",
        speed: 400,
        grabCursor: true,
        slidesPerGroup: 1,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            900: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: false,
            },
            1400: {
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: false,
            },
        },
    });

    return swiperGallery;
}

const initMenuSlider = () => {

    const swiperMenu = new Swiper('.swiper-menu', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        direction: "horizontal",
        speed: 400,
        grabCursor: true,
        slidesPerGroup: 1,
        slidesPerView: 6,
        spaceBetween: 0,
        //centeredSlides: true,
        /*      effect: "creative",
              creativeEffect: {
                  prev: {
                      translate: ["-50%", 0, -1],
                  },
                  next: {
                      translate: ["100%", 0, 0],
                  },
              },*/
        loop: true,
    });

    return swiperMenu;
}

document.addEventListener("DOMContentLoaded", (event) => {
    let mobile = window.matchMedia("(min-width: 0px) and (max-width: 768px)");
    let desktop = window.matchMedia("(min-width: 1024px)");

    if (mobile.matches) {
       initGallerySlider();
    }

    if (desktop.matches) {
        initMenuSlider();
    }

    initModal();
    initModalRecipes();


    /*if(myHash[1] != undefined){ //проверяем, есть ли в хеше какое-то значение
        $('html, body').animate({scrollTop: $(myHash).offset().top}, 500); //скроллим за полсекунды
    };*/

    const links = document.querySelectorAll('a');
links.forEach((link) => {
    link.addEventListener('click', () => {
        const myHash = document.location.hash;
        if(myHash) {
            const top = myHash.offsetTop;
            window.scrollTo({top: top, behavior: 'smooth'});
        }
    })
})

});