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
        btn.addEventListener('click', () => {

            fetchData('./assets/modal.html')
                .then(data => modalContent.innerHTML = data);

            displayModalMenu(modalMenu);
            addModalEvents(modalMenu);
        })
    })
}

function displayModalMenu (modal) {
    modal.showModal();

    modal.animate(getAnimationAttr(), {
        duration: 250
    });
}

function getAnimationAttr () {
    const desktop = window.matchMedia("(min-width: 1024px)");

        if(desktop.matches) {
            return [
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ]

        }

        return  [
            {
                transform: "translateX(-100%)"
            },
            {
                transform: "translateX(0)"
            }
        ]
}

function getAnimationCloseAttr () {
    const desktop = window.matchMedia("(min-width: 1024px)");

    if(desktop.matches) {
        return [
            {
                opacity: 1
            },
            {
                opacity: 0
            }
        ]

    }

    return  [
        {
            transform: "translateX(0)"
        },
        {
            transform: "translateX(-100%)"
        }
    ]
}

function addModalEvents(modal) {
    const closeMenu = document.querySelector('#close-menu');
    closeMenu.addEventListener('pointerdown', () => {

       const animateMenu =  modal.animate(
           getAnimationCloseAttr(),
           {
           duration: 250
       })

        animateMenu.onfinish = () =>  modal.close();
    });

}

const initGallerySlider = () => {

    return new Swiper('.swiper-gallery', {
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

}

const initMenuSlider = () => {

    return new Swiper('.swiper-menu', {
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
        loop: true,
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    let mobile = window.matchMedia("(max-width: 767px)");
    let desktop = window.matchMedia("(min-width: 1024px)");

    let instanceSwiperGallery;
    let instanceMenuSlider;

    mobile.addListener((match) => {
        if (match.matches) {
            instanceSwiperGallery = initGallerySlider();
        } else {
            instanceSwiperGallery.destroy();
        }

    });


    desktop.addListener((match) => {
        if (match.matches) {
            instanceMenuSlider = initMenuSlider();
        } else {
            instanceMenuSlider.destroy();
        }
    })

    if (mobile.matches) {
        if (!instanceSwiperGallery) {
            instanceSwiperGallery = initGallerySlider();
        }
    }

    if (desktop.matches) {
        if (!instanceMenuSlider) {
            instanceMenuSlider = initMenuSlider();
        }
    }

    initModal();
    initModalRecipes();

    const links = document.querySelectorAll('.nav-item a');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const modal = document.querySelector('#modal');
            if (modal.open) {
                modal.close();
            }

            const myHash = document.querySelector(link.getAttribute('href'));
            if (myHash) {

                myHash.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        })
    })

});