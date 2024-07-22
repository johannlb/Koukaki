document.addEventListener('DOMContentLoaded', () => {
    const handleIntersection = (entries, observer, className) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        handleIntersection(entries, observer, 'fadeIn');
    }, {
        rootMargin: '-100px 0px -100px 0px'
    });

    document.querySelectorAll('#characters, .story, #place, #studio, .site-footer').forEach(section => {
        sectionObserver.observe(section);
    });

    const titleObserver = new IntersectionObserver((entries, observer) => {
        handleIntersection(entries, observer, 'animated');
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.titleFade').forEach(element => {
        titleObserver.observe(element);
    });

    const studio = document.getElementById('studio');
    const koukaki = document.getElementById('koukaki');

    if (studio && koukaki) {
        titleObserver.observe(studio);
        titleObserver.observe(koukaki);
    }

    const video = document.getElementById('header_video');
    const banner = document.querySelector('.banner');

      // Ajouter un délai avant de lancer la vidéo
      setTimeout(() => {
        if (window.innerWidth > 768) {
            video.play().then(() => {
                banner.classList.add('video-loaded');
            }).catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            banner.classList.add('video-loaded');
        }
    }, 1000); // Délai de 1 seconde
});

document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const bannerContainer = document.querySelector('.banner__container');

    // Applique l'effet de parallaxe au container de la bannière
    const maxScroll = 500; 
    const startPos = 0;
    const endPos = 250; 

    if (scrollPosition <= maxScroll) {
        const translateY = startPos + ((endPos - startPos) * (scrollPosition / maxScroll));
        bannerContainer.style.transform = `translateY(${translateY}px)`;
    }

    // Animation des nuages
    const cloudMaxScroll = 1200; 
    const cloudStartPos = 0;
    const cloudEndPos = -300; 

    const divPlace = document.getElementById("place");
    if (divPlace) {
        const bigCloud = divPlace.querySelector(".place--big_cloud");
        const littleCloud = divPlace.querySelector(".place--little_cloud");

        // Fonction pour animer les nuages
        const animateClouds = () => {
            // Vérifie si la largeur de la fenêtre est supérieure à 768px (taille typique pour mobile)
            if (window.innerWidth > 768) {
                const scrollPosition = window.scrollY; // Position de défilement actuelle
                const cloudTranslateX = (cloudEndPos - cloudStartPos) * (scrollPosition / cloudMaxScroll);
                if (bigCloud) bigCloud.style.transform = `translateX(${cloudTranslateX}px)`;
                if (littleCloud) littleCloud.style.transform = `translateX(${cloudTranslateX}px)`;
            } else {
                // Réinitialiser la position des nuages sur les mobiles
                if (bigCloud) bigCloud.style.transform = `translateX(0px)`;
                if (littleCloud) littleCloud.style.transform = `translateX(0px)`;
            }
        };

        // Écoute l'événement de défilement
        window.addEventListener('scroll', animateClouds);

        // Appelle la fonction initialement pour s'assurer que les nuages sont positionnés correctement
        animateClouds();
    }
});

let swiper;

function initSwiper() {
    swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        coverflowEffect: {
            rotate: 40,
            stretch: 0,
            depth: 20,
            modifier: 1,
            slideShadows: false,
        },
        loop: true,
    });
}

function destroySwiper() {
    if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }
}

function checkScreenWidth() {
    if (window.innerWidth <= 768) {
        destroySwiper();
        document.querySelector('.swiper-wrapper').style.flexDirection = 'column';
        document.querySelector('.swiper-wrapper').style.width = '50%';
        document.querySelector('.swiper-wrapper').style.left = '150px';
        document.querySelector('.swiper-wrapper').style.height = 'auto';
        document.querySelector('.swiper-wrapper').style.justifyContent = 'flex-start';
        document.querySelector('.swiper-wrapper').style.alignItems = 'center';

        const slides = document.querySelectorAll('.swiper-slide');
        slides.forEach(slide => {
            slide.style.width = '100%';
            slide.style.height = 'auto';
            slide.style.marginBottom = '20px';
        });

        const swiperContainer = document.querySelector('.swiper');
        swiperContainer.style.paddingTop = '20px';
        swiperContainer.style.paddingBottom = '20px';
    } else {
        if (!swiper) {
            initSwiper();
        }
        document.querySelector('.swiper-wrapper').removeAttribute('style');
        const slides = document.querySelectorAll('.swiper-slide');
        slides.forEach(slide => {
            slide.removeAttribute('style');
        });
        const swiperContainer = document.querySelector('.swiper');
        swiperContainer.removeAttribute('style');
    }
}

window.addEventListener('load', () => {
    checkScreenWidth();
    if (window.innerWidth > 768) {
        initSwiper();
    }
});

window.addEventListener('resize', checkScreenWidth);

document.addEventListener('DOMContentLoaded', function () {
    let toggle = document.querySelector(".nav-toggle");
    let body = document.querySelector("body");
    let menuLinks = document.querySelectorAll(".menu-on ul li a");

    // Basculer le menu
    toggle.addEventListener('click', function () {
        body.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', toggle.classList.contains('active'));
    });

    // Fermer le menu en cliquant sur un lien
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function () {
            body.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});