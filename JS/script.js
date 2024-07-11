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
});

document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const bannerContainer = document.querySelector('.banner__container');

    // Applique l'effet de parallaxe au container de la bannière
    const maxScroll = 500; // Vous pouvez ajuster cette valeur selon vos besoins
    const startPos = 0;
    const endPos = 250; // La position finale de transformation

    if (scrollPosition <= maxScroll) {
        const translateY = startPos + ((endPos - startPos) * (scrollPosition / maxScroll));
        bannerContainer.style.transform = `translateY(${translateY}px)`;
    }

       // Animation des nuages
       const cloudMaxScroll = 1200; // Ajustez cette valeur selon vos besoins
       const cloudStartPos = 0;
       const cloudEndPos = -300; // Déplacement des nuages sur 300px vers la gauche
   
       const divPlace = document.getElementById("place");
       if (divPlace) {
           const bigCloud = divPlace.querySelector(".place--big_cloud");
           const littleCloud = divPlace.querySelector(".place--little_cloud");
   
           const cloudTranslateX = (cloudEndPos - cloudStartPos) * (scrollPosition / cloudMaxScroll);
           if (bigCloud) bigCloud.style.transform = `translateX(${cloudTranslateX}px)`;
           if (littleCloud) littleCloud.style.transform = `translateX(${cloudTranslateX}px)`;
       }
   });

// Initialisation du Swiper avec des options personnalisées
const swiper = new Swiper(".mySwiper", {
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

// ******************* GESTION DU MENU BURGER ******************* //
    // Ajout d'une classe pour gérer l'ouverture et fermeture du menu
    // Ajout d'un écouteur d'événement sur un élément ayant la classe 'toggle',
    // pour ajouter ou supprimer la classe 'open' du corps du document.
    // Cela pourrait être utilisé pour afficher ou masquer un menu ou d'autres éléments interactifs en CSS.
    
    document.addEventListener('DOMContentLoaded', function () {
        let toggle = document.querySelector(".nav-toggle");
        let body = document.querySelector("body");
        let menuLinks = document.querySelectorAll(".menu-on ul li a");
    
        // Toggle menu
        toggle.addEventListener('click', function () {
            body.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', toggle.classList.contains('active'));
        });
    
        // Close menu on link click
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function () {
                body.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    });