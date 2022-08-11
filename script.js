const header = document.querySelector('header');

const stickHeader = () => {
    const scroll = window.scrollY;

    if (scroll > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
};

window.addEventListener('scroll', stickHeader);



const menu = document.querySelector('.home-menu');
const burger = document.querySelector('.burger');

const doToggle = () => {
    menu.classList.toggle('active');
    burger.classList.toggle('active');
};

burger.addEventListener('click', doToggle);



const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach((link) => link.addEventListener('click', (e) => {
    const key = e.target.dataset.key;

    const section = document.querySelector(`.${key}`).getBoundingClientRect().top + window.pageYOffset - 110;

    menu.classList.remove('active');
    burger.classList.remove('active');

    window.scrollTo({top: section, behavior: 'smooth'});
}));