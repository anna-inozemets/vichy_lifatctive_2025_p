// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 0;

// additional varibles for slides
const totalSlideAmount = 22;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay, className) {
  const allElements = document.querySelectorAll(`${className}[data-number]`);

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// function that type text from scretch
function typewriterEffect(selector, duration, delay) {
  const el = document.querySelector(selector);
  const innerText = el.getAttribute('data-text');

  gsap.to(el, {
    duration: duration,
    text: innerText,
    ease: 'none',
    delay,
  });
}

function controlSecondSlide() {
  $('.slide--2__block.first').on('click', function() {
    $(this).addClass('active');
    gsap.to($(this).find('h3'), { opacity: 1, duration: 0.5, delay: 1, xPercent: -50, x: '-4.55em' });

    gsap.to($(this).find('ul li.first'), { opacity: 1, duration: 0.5, delay: 1.7, });
    gsap.to($(this).find('.slide--2__decorator.first .circle'), { opacity: 1, duration: 0.5, delay: 2.2, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.first .horizontal'), { opacity: 1, duration: 0.5, delay: 2.7, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.first .vertical'), { opacity: 1, duration: 0.5, delay: 3.2, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.first .triangle'), { opacity: 1, duration: 0.5, delay: 3.7 });

    gsap.to($(this).find('ul li.second'), { opacity: 1, duration: 0.5, delay: 2.2, });
    gsap.to($(this).find('.slide--2__decorator.second .circle'), { opacity: 1, duration: 0.5, delay: 2.7, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.second .horizontal'), { opacity: 1, duration: 0.5, delay: 3.2, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.second .triangle'), { opacity: 1, duration: 0.5, delay: 3.7 });

    gsap.to($(this).find('ul li.third'), { opacity: 1, duration: 0.5, delay: 2.7, });
    gsap.to($(this).find('.slide--2__decorator.third .circle'), { opacity: 1, duration: 0.5, delay: 3.2, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.third .horizontal'), { opacity: 1, duration: 0.5, delay: 3.7, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.third .triangle'), { opacity: 1, duration: 0.5, delay: 4.2 });

    gsap.to($(this).find('ul li.fourth'), { opacity: 1, duration: 0.5, delay: 3.2, });
    gsap.to($(this).find('.slide--2__decorator.fourth .circle'), { opacity: 1, duration: 0.5, delay: 3.7, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.fourth .vertical.first'), { opacity: 1, duration: 0.5, delay: 4.2, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.fourth .horizontal'), { opacity: 1, duration: 0.5, delay: 4.7, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.fourth .vertical.second'), { opacity: 1, duration: 0.5, delay: 5.2, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.fourth .triangle'), { opacity: 1, duration: 0.5, delay: 5.65 });

    if ($('.slide--2__block.active').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 6.7 * 1000);
    }
  });

  $('.slide--2__block.second').on('click', function() {
    $(this).addClass('active');
    gsap.to($(this).find('h3'), { opacity: 1, duration: 0.5, delay: 1, xPercent: -50, x: '4.55em' });

    gsap.to($(this).find('ul li.first'), { opacity: 1, duration: 0.5, delay: 1.7, });
    gsap.to($(this).find('.slide--2__decorator.fifth .circle'), { opacity: 1, duration: 0.5, delay: 2.2, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.fifth .horizontal'), { opacity: 1, duration: 0.5, delay: 2.7, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.fifth .vertical'), { opacity: 1, duration: 0.5, delay: 3.2, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.fifth .triangle'), { opacity: 1, duration: 0.5, delay: 3.7 });

    gsap.to($(this).find('ul li.second'), { opacity: 1, duration: 0.5, delay: 2.2, });
    gsap.to($(this).find('.slide--2__decorator.sixth .circle'), { opacity: 1, duration: 0.5, delay: 2.7, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.sixth .horizontal'), { opacity: 1, duration: 0.5, delay: 3.2, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.sixth .vertical'), { opacity: 1, duration: 0.5, delay: 3.7, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.sixth .triangle'), { opacity: 1, duration: 0.5, delay: 4.2 });

    gsap.to($(this).find('ul li.third'), { opacity: 1, duration: 0.5, delay: 2.7, });
    gsap.to($(this).find('.slide--2__decorator.seventh .circle'), { opacity: 1, duration: 0.5, delay: 3.2, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.seventh .horizontal'), { opacity: 1, duration: 0.5, delay: 3.7, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.seventh .triangle'), { opacity: 1, duration: 0.5, delay: 4.2 });

    gsap.to($(this).find('ul li.fourth'), { opacity: 1, duration: 0.5, delay: 3.2, });
    gsap.to($(this).find('.slide--2__decorator.eight .circle'), { opacity: 1, duration: 0.5, delay: 3.7, scale: 1 });
    gsap.to($(this).find('.slide--2__decorator.eight .vertical.first'), { opacity: 1, duration: 0.5, delay: 4.2, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.eight .horizontal'), { opacity: 1, duration: 0.5, delay: 4.7, scaleX: 1 });
    gsap.to($(this).find('.slide--2__decorator.eight .vertical.second'), { opacity: 1, duration: 0.5, delay: 5.2, scaleY: 1 });
    gsap.to($(this).find('.slide--2__decorator.eight .triangle'), { opacity: 1, duration: 0.5, delay: 5.65 });

    if ($('.slide--2__block.active').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 6.7 * 1000);
    }
  });
}

function controlSixthSlide() {
  $('.slide--6__block .image img').on('click', function() {
    $(this).closest('.slide--6__block').addClass('active');
    gsap.to($(this).closest('.slide--6__block').find('.text'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });

    if ($('.slide--6__block.active').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2 * 1000);
    }
  });
}

function controlEightSlide() {
  $('.slide--8__block img').on('click', function() {
    $(this).closest('.slide--8__block').addClass('active');
    gsap.to($(this).closest('.slide--8__block').find('.text'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });

    if ($('.slide--8__block.active').length === 4) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2 * 1000);
    }
  });
}

function controlTenthSlide() {
  $('.slide--10__icon img').on('click', function() {
    $(this).closest('.slide--10__icon').addClass('active');
    gsap.to($(this).closest('.slide--10__icon').find('p'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });

    if ($('.slide--10__icon.active').length === 2) {
      $('.arrows').removeClass('pointer-events');
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2 * 1000);
    }
  });
}

function controlTwelveSlide() {
  $('.slide--12__block img').on('click', function() {
    $(this).closest('.slide--12__block').addClass('active');
    gsap.to($(this).closest('.slide--12__block').find('p'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });

    if ($('.slide--12__block.active').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 3 * 1000);
    }
  });
}

function controlThirteenSlide() {
  $('.slide--13__part .slide--13__icon').on('click', function() {
    $(this).closest('.slide--13__part').addClass('active');
    if ($(this).closest('.slide--13__part').hasClass('day')) {
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.first'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.second'), { opacity: 1, duration: 0.5, delay: 0.8, x: '0' });
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.third'), { opacity: 1, duration: 0.5, delay: 1.1, x: '0' });
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.fourth'), { opacity: 1, duration: 0.5, delay: 1.4, x: '0' });
    } else if ($(this).closest('.slide--13__part').hasClass('night')) {
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.fifth'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.sixth'), { opacity: 1, duration: 0.5, delay: 0.8, x: '0' });
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.seventh'), { opacity: 1, duration: 0.5, delay: 1.1, x: '0' });
      gsap.to($(this).closest('.slide--13__part').find('.slide--13__block.eight'), { opacity: 1, duration: 0.5, delay: 1.4, x: '0' });
    }

    if ($('.slide--13__part.active').length === 2) {
      lastSlideActionTimeout = setTimeout(() => {
        lastSlideAction();
      }, 6 * 1000);
    }
  });
}
// object that store manipulations with slides
const slideActions = {
  1: () => {
    // typewriterEffect('.slide--1 h1.first', 1.7, 1)
    // typewriterEffect('.slide--1 h1.second', 1.3, 2.7)
    // gsap.from('.slide--1__formula img', { opacity: 0, duration: 0.75, delay: 4.3, x: '35%' });
    // nextArrowDelay = 5.3;
  },
  2: () => {
    // controlSecondSlide();
  },
  3: () => {
    // gsap.from('.slide--3__block.first', { opacity: 0, duration: 0.75, delay: 1, x: '35%' });
    // gsap.from('.slide--3__plus', { opacity: 0, duration: 0.75, delay: 1.6, scale: 1.3 });
    // gsap.from('.slide--3__block.second', { opacity: 0, duration: 0.75, delay: 2.2, x: '35%' });
    // nextArrowDelay = 3.2;
  },
  4: () => {
    // gsap.from('.slide--4__bottle.first', { opacity: 0, duration: 0.75, delay: 1, x: '-35%' });
    // gsap.from('.slide--4__bottle.second', { opacity: 0, duration: 0.75, delay: 1.6, y: '-35%' });
    // gsap.from('.slide--4__bottle.third', { opacity: 0, duration: 0.75, delay: 2.2, x: '35%' });
    // nextArrowDelay = 3.2;
  },
  5: () => {
    // gsap.from('.slide--5__left ul li.first', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    // gsap.from('.slide--5__left ul li.second', { opacity: 0, duration: 0.75, delay: 1.3, y: '35%' });
    // gsap.from('.slide--5__left ul li.third', { opacity: 0, duration: 0.75, delay: 1.6, y: '35%' });
    // gsap.from('.slide--5__left ul li.fourth', { opacity: 0, duration: 0.75, delay: 1.9, y: '35%' });
    // gsap.from('.slide--5__left p', { opacity: 0, duration: 0.75, delay: 2.4, x: '-35%' });
    // nextArrowDelay = 3.4;
  },
  6: () => {
    // controlSixthSlide()
  },
  7: () => {
    // gsap.from('.slide--7__left ul li.first', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    // gsap.from('.slide--7__left ul li.second', { opacity: 0, duration: 0.75, delay: 1.3, y: '35%' });
    // gsap.from('.slide--7__left ul li.third', { opacity: 0, duration: 0.75, delay: 1.6, y: '35%' });
    // gsap.from('.slide--7__left ul li.fourth', { opacity: 0, duration: 0.75, delay: 1.9, y: '35%' });
    // gsap.from('.slide--7__left ul li.fifth', { opacity: 0, duration: 0.75, delay: 2.2, y: '35%' });
    // gsap.from('.slide--7__left p', { opacity: 0, duration: 0.75, delay: 2.7, x: '-35%' });
    // nextArrowDelay = 3.7;
  },
  8: () => {
    // controlEightSlide();
  },
  9: () => {
    // gsap.from('.slide--9__left p.first', { opacity: 0, duration: 0.75, delay: 1, x: '-35%' });
    // gsap.from('.slide--9__left p.second', { opacity: 0, duration: 0.75, delay: 1.3, x: '-35%' });
    // gsap.from('.slide--9__left ul li.first', { opacity: 0, duration: 0.75, delay: 1.8, y: '35%' });
    // gsap.from('.slide--9__left ul li.second', { opacity: 0, duration: 0.75, delay: 2.1, y: '35%' });
    // gsap.from('.slide--9__left ul li.third', { opacity: 0, duration: 0.75, delay: 2.4, y: '35%' });
    // gsap.from('.slide--9__left ul li.fourth', { opacity: 0, duration: 0.75, delay: 2.7, y: '35%' });
    // gsap.from('.slide--9__left ul li.fifth', { opacity: 0, duration: 0.75, delay: 3, y: '35%' });
    // gsap.from('.slide--9__left ul li.sixth', { opacity: 0, duration: 0.75, delay: 3.3, y: '35%' });
    // gsap.from('.slide--9__left ul li.seventh', { opacity: 0, duration: 0.75, delay: 3.6, y: '35%' });
    // gsap.from('.slide--9__left ul li.eight', { opacity: 0, duration: 0.75, delay: 3.9, y: '35%' });
    // nextArrowDelay = 4.9;
  },
  10: () => {
    // $('.arrows').addClass('pointer-events')
    // controlTenthSlide();
  },
  11: () => {
    // gsap.from('.slide--11__left ul li.first', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    // gsap.from('.slide--11__left ul li.second', { opacity: 0, duration: 0.75, delay: 1.3, y: '35%' });
    // gsap.from('.slide--11__left ul li.third', { opacity: 0, duration: 0.75, delay: 1.6, y: '35%' });
    // gsap.from('.slide--11__left ul li.fourth', { opacity: 0, duration: 0.75, delay: 1.9, y: '35%' });
    // gsap.from('.slide--11__left ul li.fifth', { opacity: 0, duration: 0.75, delay: 2.2, y: '35%' });
    // gsap.from('.slide--11__left ul li.sixth', { opacity: 0, duration: 0.75, delay: 2.5, y: '35%' });
    // gsap.from('.slide--11__left p', { opacity: 0, duration: 0.75, delay: 3, x: '-35%' });
    // nextArrowDelay = 4;
  },
  12: () => {

  },
  13: () => {

  },
  14: () => {

  },
  15: () => {

  },
  16: () => {

  },
  17: () => {

  },
  18: () => {

  },
  19: () => {

  },
  20: () => {

  },
  21: () => {
    // clearTimeout(lastSlideActionTimeout);
    // gsap.from('.slide--12__left ul li.first', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    // gsap.from('.slide--12__left ul li.second', { opacity: 0, duration: 0.75, delay: 1.3, y: '35%' });
    // gsap.from('.slide--12__left ul li.third', { opacity: 0, duration: 0.75, delay: 1.6, y: '35%' });
    // gsap.from('.slide--12__left ul li.fourth', { opacity: 0, duration: 0.75, delay: 1.9, y: '35%' });
    // gsap.from('.slide--12__left ul li.fifth', { opacity: 0, duration: 0.75, delay: 2.2, y: '35%' });
    // gsap.from('.slide--12__left ul li.sixth', { opacity: 0, duration: 0.75, delay: 2.5, y: '35%' });
    // gsap.from('.slide--12__left p', { opacity: 0, duration: 0.75, delay: 3, x: '-35%' });
    // controlTwelveSlide();
  },
  22: () => {
    // controlThirteenSlide();
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
      break;
    // case 2:
    //   break;
    // case 6:
    //   break;
    // case 8:
    //   break;
    // case 10:
    //   break;
    // case 12:
    //   break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});
