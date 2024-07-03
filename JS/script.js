document.addEventListener('DOMContentLoaded', () => {
    // Fonction commune pour l'observation des sections et des titres
    const handleIntersection = (entries, observer, className) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className); // Ajoute la classe spécifiée lorsque l'élément entre dans le viewport
                observer.unobserve(entry.target); // Arrête d'observer l'élément une fois animé
            }
        });
    };

    // Création de l'observer pour les sections et les titres
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        handleIntersection(entries, observer, 'fadeIn');
    }, {
        rootMargin: '-100px 0px -100px 0px' // Marges pour déclencher l'animation avant que l'élément soit complètement visible
    });

    // Sélection des sections à observer
    document.querySelectorAll('#characters, .story, #place, #studio, .site-footer').forEach(section => {
        sectionObserver.observe(section); // Ajoute chaque section à l'observer
    });

    // Création de l'observer pour les titres
    const titleObserver = new IntersectionObserver((entries, observer) => {
        handleIntersection(entries, observer, 'animated');
    }, {
        threshold: 0.5 // L'animation se déclenche lorsque 50% de l'élément est visible
    });

    // Sélection des titres à observer
    document.querySelectorAll('.titleFade').forEach(element => {
        titleObserver.observe(element); // Ajoute chaque titre à l'observer
    });
});