function bodyScroll(to) {
    let pos = 0
    if(to === "home"){
        pos = 0
    } else{
        let element_pos = document.getElementById(to).getBoundingClientRect().top
        pos = (element_pos - document.body.getBoundingClientRect().top) - 120
    }
    window.scrollTo(0 , pos)
}

fetch('./data/projects.json')
    .then(response => response.json())
    .then(projectData => {
        projectData.sort((a, b) => {
            const yearA = parseInt(a.year, 10);
            const yearB = parseInt(b.year, 10);
            return yearB - yearA;
        });

        $('.projects').append(`<div class="empty-project w-80 h-100"></div><div class="empty-project w-80 h-100"></div>`)
        let i = 0
        projectData.forEach(project => {
            let classes = ''
            if (i === 0) {
                classes = 'active'
            }
            $('.projects').append(`
                    <div class="carousel-item project ${classes}">
                <div class="img">
                    <i class="fa-solid ${project.icon}"></i>
                </div>
                <div class="content">
                    <h2 class="title font-bold text-lg">${project.title}</h2>
                    <p class="desc font-semibold text-sm text-gray-300/50">${project.desc}</p>
                    <button class="btn btn-soft bg-blue-900/50 hover:bg-blue-900/75 border-blue-900/90 border-3 rounded-4xl hover:shadow-blue-900/50 shadow-lg cursor-pointer" onclick="window.open('${project.url}', '_blank').focus();">Visit</button>
                </div>
            </div>
                    `)
            $('#dotsContainer').append(`<button onclick="goToSlide(${i})" class="carousel-selector h-3 w-3 ${classes}"></button>`)
            i++
        });
        $('.projects').append(`<div class="empty-project w-80 h-100"></div><div class="empty-project w-80 h-100"></div>`)
        document.getElementById('carouselTrack').scrollTo(100, 0)
    })
    .catch(error => console.error('Error loading project data:', error));

const track = document.getElementById('carouselTrack');
let items;
let dots;
$(window).on('load', function () {
    items = document.querySelectorAll('.carousel-item');
    dots = document.querySelectorAll('#dotsContainer button');
})
let current = 0;

function updateCarousel() {
    track.scrollTo(current * 370, 0)
    items.forEach((item, idx) => {
        item.classList.toggle('active', idx === current);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === current);
    });
}

function nextSlide() {
    current = (current + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    current = (current - 1 + items.length) % items.length;
    updateCarousel();
}

function goToSlide(index) {
    current = index;
    updateCarousel();
}

setInterval(() => {
    let isHovered = $('.projects').find('.active').is(':hover');
    if (!isHovered) {
        nextSlide();
    }
}, 4000);

let nav_i = 0

$('body').on("click", function () {
    if ($(event.target).closest('.nav-container').length === 0) {
        nav_i = 1
        nav_res()
    }
})

$(window).resize(function () {
    nav_i = 1
    nav_res()
})

$(window).on('scroll', function () {
    nav_i = 1
    nav_res()
    const yPosition = window.scrollY;
    let sections = ['home', 'about', 'skills', 'projects']
    let i = 1
    $(`#nav .active`).removeClass('active');
    $(`#res-nav .active`).removeClass('active');
    sections.forEach(section => {
        if(((document.getElementById(section).getBoundingClientRect().bottom - document.body.getBoundingClientRect().top) - 250) > yPosition && yPosition > ((document.getElementById(section).getBoundingClientRect().top - document.body.getBoundingClientRect().top) - 250)) {
            $(`#nav div:nth-child(${i})`).addClass('active');
            $(`#res-nav div:nth-child(${i})`).addClass('active');
        }
        i++
    })
})

function nav_res() {
    if (nav_i === 0) {
        $('.nav-container').addClass('show')
        $('#res-nav').addClass('show')
        setTimeout(function () {
            $('.nav-container').addClass('height')
            $('#res-nav').addClass('opacity')
        }, 50)
        nav_i = 1
    } else {
        $('.nav-swap-box').prop('checked', false)
        $('.nav-container').removeClass('height')
        $('#res-nav').removeClass('opacity')
        setTimeout(function () {
            $('.nav-container').removeClass('show')
            $('#res-nav').removeClass('show')
        }, 500)
        nav_i = 0
    }
}