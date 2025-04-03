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
let nextArrowDelay = 3.8;

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

function controlArrowVisibility(selector, value, delay) {
  if (Number($(`[${selector}]`).attr(selector)) === value) {
    nextButtonTimeout = setTimeout(() => {
      $(nextSlideButton).removeClass(hiddenArrowClass);
      $(prevSlideButton).removeClass(hiddenArrowClass);
    }, delay * 1000);
  }
}

function controlSecondSlide() {
  let currentValue = Number($('.slide--2__right-content').attr('data-visible-el'));

  $('[data-click="arrow-first"]').on('click', function () {
    $(this).addClass('ready');
    gsap.to($(`[data-show="arrow-first-text-box"]`), { opacity: 1, duration: 0.65, delay: 0.5, x: '0' });
    gsap.to($(`[data-show="arrow-first-line"]`), { opacity: 1, duration: 0.5, delay: 1, });
    gsap.to($(`[data-show="arrow-first-text"]`), { opacity: 1, duration: 0.5, delay: 1.25, });
    currentValue++;
    $('.slide--2__right-content').attr('data-visible-el', currentValue);
    controlArrowVisibility('data-visible-el', 3, 2)
  })

  $('[data-click="arrow-second"]').on('click', function () {
    $(this).addClass('ready');
    gsap.to($(`[data-show="arrow-second-text-box"]`), { opacity: 1, duration: 0.65, delay: 0.5, x: '0' });
    gsap.to($(`[data-show="arrow-second-line"]`), { opacity: 1, duration: 0.5, delay: 1, });
    gsap.to($(`[data-show="arrow-second-text"]`), { opacity: 1, duration: 0.5, delay: 1.25, });
    currentValue++;
    $('.slide--2__right-content').attr('data-visible-el', currentValue);
    controlArrowVisibility('data-visible-el', 3, 2)
  })

  $('[data-click="arrow-third"]').on('click', function () {
    $(this).addClass('ready');
    gsap.to($(`[data-show="arrow-third-text-box"]`), { opacity: 1, duration: 0.65, delay: 0.5, x: '0' });
    gsap.to($(`[data-show="arrow-third-line"]`), { opacity: 1, duration: 0.5, delay: 1, });
    gsap.to($(`[data-show="arrow-third-text"]`), { opacity: 1, duration: 0.5, delay: 1.25, });
    currentValue++;
    $('.slide--2__right-content').attr('data-visible-el', currentValue);
    controlArrowVisibility('data-visible-el', 3, 2)
  })
}

function controlThirdSlide() {
  let currentValue = Number($('.slide--3__right-content').attr('data-visible-el'));

  $('.slide--3__right .hand-pointers img').on('click', function () {
    const targetClass = $(this).data('target');
    $(this).addClass('ready');
    gsap.to(`.slide--3__right ul li.li-${targetClass}`, { opacity: 1, duration: 0.75, delay: 0.5, y: '0' });
    currentValue++;
    $('.slide--3__right-content').attr('data-visible-el', currentValue);
    controlArrowVisibility('data-visible-el', 5, 2);
  });

  $('.slide--3__left p.percent').on('click', function () {
    $(this).addClass('ready');
    gsap.to('.slide--3__blocks-wrapper.first', { opacity: 1, duration: 0.75, delay: 0.5, x: '0' });
    gsap.to('.slide--3__blocks-wrapper.second', { opacity: 1, duration: 0.75, delay: 1, x: '0' });
    gsap.to('.slide--3__blocks-wrapper.third', { opacity: 1, duration: 0.75, delay: 1.5, x: '0' });
    currentValue++;
    $('.slide--3__right-content').attr('data-visible-el', currentValue);
    controlArrowVisibility('data-visible-el', 5, 2);
  })
}

function controlFourthSlide() {
  let currentValue = Number($('.slide--4__blocks').attr('data-visible-el'));

  $('.slide--4__block img.model').on('click', function () {
    $(this).closest('.slide--4__block').addClass('ready');
    gsap.to($(this), { opacity: 1, duration: 0.75, delay: 0.25 });
    gsap.to($(this).closest('.slide--4__block').find('ul'), { opacity: 1, duration: 0.75, delay: 0.75, y: '0' });
    gsap.to($(this).closest('.slide--4__block').find('img.bottle'), { opacity: 1, duration: 0.75, delay: 0.75 });
    currentValue++;
    $('.slide--4__blocks').attr('data-visible-el', currentValue);
    controlArrowVisibility('data-visible-el', 3, 1.25);
  });
}

function controlSixthSlide() {
  $('.slide--6__right-up img.bottle').on('click', function() {
    $(this).closest('.slide--6__right-up').addClass('ready');

    gsap.to('.slide--6__right-up .text', { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });
    gsap.to('.slide--6__right-block.first', { opacity: 1, duration: 0.5, delay: 1, y: '0' });
    gsap.to('.slide--6__right-block.second', { opacity: 1, duration: 0.5, delay: 1.3, y: '0' });
    gsap.to('.slide--6__right-block.third', { opacity: 1, duration: 0.5, delay: 1.6, y: '0' });
    gsap.to('.slide--6__right p.accent', { opacity: 1, duration: 0.5, delay: 2.1, y: '0' });

    nextButtonTimeout = setTimeout(() => {
      $(nextSlideButton).removeClass(hiddenArrowClass);
      $(prevSlideButton).removeClass(hiddenArrowClass);
    }, 2.8 * 1000);
  });
}

function controlSeventhSlide() {
  $('.slide--7__right-block img').on('click', function() {
    $(this).closest('.slide--7__right-block').addClass('ready');
    gsap.to($(this).closest('.slide--7__right-block').find('h3'), { opacity: 1, duration: 0.5, delay: 0.75, y: '0' });
    gsap.to($(this).closest('.slide--7__right-block').find('ul'), { opacity: 1, duration: 0.5, delay: 1.15, y: '0' });

    if ($('.slide--7__right-block.ready').length === 4) {
      gsap.to('.slide--7__right p.accent', { opacity: 1, duration: 0.5, delay: 0.1 });
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2.3 * 1000);
    }
  });
}

function controlEightSlide() {
  $('.slide--8__left-block p.num').on('click', function() {
    $(this).closest('.slide--8__left-block').addClass('ready');
    gsap.to($(this).closest('.slide--8__left-block').find('p.text'), { opacity: 1, duration: 0.5, delay: 0.5, x: '0', y: '0' });

    if ($('.slide--8__left-block.ready').length === 3) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 1.5 * 1000);
    }
  });
}

function controlTenthSlide() {
  $('.slide--10__right-column-first h3').on('click', function() {
    $(this).addClass('ready');
    $('.slide--10__right-column-first').addClass('ready');

    gsap.to('.slide--10__right-column-first-content .bottle.first', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
    gsap.to('.slide--10__right-column-first-content .plus-small', { opacity: 1, duration: 0.5, delay: 0.85, y: '0' });
    gsap.to('.slide--10__right-column-first-content .bottle.second', { opacity: 1, duration: 0.5, delay: 1.2, y: '0' });

    if ($('.slide--10__right-column h3.ready').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2.2 * 1000);
    }
  });

  $('.slide--10__right-column-second-content h3').on('click', function() {
    $(this).addClass('ready');
    $('.slide--10__right-column-second').addClass('ready');

    gsap.to('.slide--10__right-column-second-content .bottle.first', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
    gsap.to('.slide--10__right-column-second-content .bottle.second', { opacity: 1, duration: 0.5, delay: 0.85, y: '0' });

    if ($('.slide--10__right-column h3.ready').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 1.85 * 1000);
    }
  });
}

function controlTwelveSlide() {
  $('.slide--12__right-skin').on('click', function () {
    const targetClass = $(this).data('target');
    $(this).addClass('ready');
    $('.slide--12__right-skins').addClass(targetClass)

    if ($('.slide--12__right-skin.ready').length === 2) {
      nextButtonTimeout = setTimeout(() => {
        gsap.to('.slide--12__right p.accent', { opacity: 1, duration: 0.5, delay: 0.1 });
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 1 * 1000);
    }
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    typewriterEffect('.slide--1__right h1', 1.4, 1);
    gsap.from('.slide--1__right h2', { opacity: 0, duration: 0.75, delay: 2.7, y: '35%' });
    nextArrowDelay = 3.8;
  },
  2: () => {
    controlSecondSlide();
  },
  3: () => {
    controlThirdSlide();
  },
  4: () => {
    controlFourthSlide();
  },
  5: () => {
    animateNumber(1, '.slide--5 p.number span');
    gsap.from('.slide--5__right-block.first', { opacity: 0, duration: 0.75, delay: 0.75, y: '35%' });
    gsap.from('.slide--5__right-block.second', { opacity: 0, duration: 0.75, delay: 1.25, y: '35%' });
    gsap.from('.slide--5__right-block.third', { opacity: 0, duration: 0.75, delay: 1.75, y: '35%' });
    nextArrowDelay = 3.5;
  },
  6: () => {
    controlSixthSlide();
  },
  7: () => {
    controlSeventhSlide();
  },
  8: () => {
    controlEightSlide();
  },
  9: () => {
    gsap.from('.slide--9__right h2', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    gsap.from('.slide--9__right-up', { opacity: 0, duration: 0.75, delay: 1.3, y: '35%' });
    gsap.from('.slide--9__right-block.first', { opacity: 0, duration: 0.75, delay: 1.8, y: '25%' });
    gsap.from('.slide--9__right-block.second', { opacity: 0, duration: 0.75, delay: 2.1, y: '25%' });
    gsap.from('.slide--9__right-block.third', { opacity: 0, duration: 0.75, delay: 2.4, y: '25%' });
    gsap.from('.slide--9__right p.accent', { opacity: 0, duration: 0.75, delay: 2.9, y: '35%' });
    nextArrowDelay = 3.9;
  },
  10: () => {
    controlTenthSlide();
  },
  11: () => {
    gsap.from('.slide--11__left-content h2', { opacity: 0, duration: 0.75, delay: 1, y: '35%' });
    gsap.from('.slide--11__left-block.first', { opacity: 0, duration: 0.75, delay: 1.5, x: '-35%' });
    gsap.from('.slide--11__left-block.second', { opacity: 0, duration: 0.75, delay: 1.8, x: '35%' });
    gsap.from('.slide--11__left-content p.accent', { opacity: 0, duration: 0.75, delay: 2.3, y: '35%' });
    nextArrowDelay = 3.3;
  },
  12: () => {
    controlTwelveSlide();
  },
  13: () => {
    animateNumber(1, '.slide--13__left-block p.num span');
    gsap.from('.slide--13__right-block.first', { opacity: 0, duration: 0.75, delay: 0.75, y: '35%' });
    gsap.from('.slide--13__right-block.second', { opacity: 0, duration: 0.75, delay: 1.25, y: '35%' });
    nextArrowDelay = 3.5;
  },
  14: () => {
    $('.slide--14__right-up img.bottle').on('click', function() {
      $(this).closest('.slide--14__right-up').addClass('ready');
  
      gsap.to('.slide--14__right-up .text', { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });
      gsap.to('.slide--14__right-block.first', { opacity: 1, duration: 0.5, delay: 1, y: '0' });
      gsap.to('.slide--14__right-block.second', { opacity: 1, duration: 0.5, delay: 1.3, y: '0' });
      gsap.to('.slide--14__right-block.third', { opacity: 1, duration: 0.5, delay: 1.6, y: '0' });
      gsap.to('.slide--14__right p.accent', { opacity: 1, duration: 0.5, delay: 2.1, y: '0' });
  
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2.8 * 1000);
    });
  },
  15: () => {
    $('.slide--15__right-column-first h3').on('click', function() {
      $(this).addClass('ready');
      $('.slide--15__right-column-first').addClass('ready');
  
      gsap.to('.slide--15__right-column-first-content .bottle.first', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
      gsap.to('.slide--15__right-column-first-content .plus-small', { opacity: 1, duration: 0.5, delay: 0.85, y: '0' });
      gsap.to('.slide--15__right-column-first-content .bottle.second', { opacity: 1, duration: 0.5, delay: 1.2, y: '0' });
  
      if ($('.slide--15__right-column h3.ready').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 2.2 * 1000);
      }
    });
  
    $('.slide--15__right-column-second-content h3').on('click', function() {
      $(this).addClass('ready');
      $('.slide--15__right-column-second').addClass('ready');
  
      gsap.to('.slide--15__right-column-second-content .bottle.first', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
      gsap.to('.slide--15__right-column-second-content .bottle.second', { opacity: 1, duration: 0.5, delay: 0.85, y: '0' });
  
      if ($('.slide--15__right-column h3.ready').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 1.85 * 1000);
      }
    });
  },
  16: () => {
    gsap.from('.slide--16__right-up', { opacity: 0, duration: 0.75, delay: 1, y: '25%' });
    gsap.from('.slide--16__right-list', { opacity: 0, duration: 0.75, delay: 1.3, y: '35%' });
    gsap.from('.slide--16__right-block.first', { opacity: 0, duration: 0.75, delay: 1.8, y: '25%' });
    gsap.from('.slide--16__right-block.second', { opacity: 0, duration: 0.75, delay: 2.1, y: '25%' });
    gsap.from('.slide--16__right-block.third', { opacity: 0, duration: 0.75, delay: 2.4, y: '25%' });
    nextArrowDelay = 3.4;
  },
  17: () => {
    $('.slide--17__left-block').on('click', function() {
      $(this).addClass('ready');
      const targetClass = $(this).data('target');
      animateNumber(0.1, `.slide--17__left-block.${targetClass} p.num span`);

      if ($('.slide--17__left-block.ready').length === 5) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3 * 1000);
      }
    })
  },
  18: () => {
    $('.slide--18__right-percents h3').on('click', function() {
      $(this).addClass('ready');

      gsap.to('.slide--18__right-percents h4', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
      gsap.to('.slide--18__right-percent-block.first', { opacity: 1, duration: 0.5, delay: 0.9, y: '0' });
      gsap.to('.slide--18__right-percent-block.second', { opacity: 1, duration: 0.5, delay: 1.2, y: '0' });
      gsap.to('.slide--18__right-percent-block.third', { opacity: 1, duration: 0.5, delay: 1.5, y: '0' });
      gsap.to('.slide--18__right-percent-block.fourth', { opacity: 1, duration: 0.5, delay: 1.8, y: '0' });

      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 2.8 * 1000);
    })
  },
  19: () => {
    animateNumber(1, '.slide--19__left-block p.percent span');
    gsap.from('.slide--19__right-up', { opacity: 0, duration: 0.75, delay: 1, y: '25%' });
    gsap.from('.slide--19__right-block.first', { opacity: 0, duration: 0.75, delay: 1.5, y: '25%' });
    gsap.from('.slide--19__right-block.second', { opacity: 0, duration: 0.75, delay: 1.8, y: '25%' });
    gsap.from('.slide--19__right-block.third', { opacity: 0, duration: 0.75, delay: 2.1, y: '25%' });
    nextArrowDelay = 3.1
  },
  20: () => {
    $('.slide--20__right-up img.bottle').on('click', function() {
      $(this).closest('.slide--20__right-up').addClass('ready');
      gsap.to('.slide--20__right-up .text', { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });

      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, 1.5 * 1000);
    });
  },
  21: () => {
    clearTimeout(lastSlideActionTimeout);

    $('.slide--21__right-column-first h3').on('click', function() {
      $(this).addClass('ready');
      $('.slide--21__right-column-first').addClass('ready');
  
      gsap.to('.slide--21__right-column-first-content .bottle.first', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
      gsap.to('.slide--21__right-column-first-content .plus-small', { opacity: 1, duration: 0.5, delay: 0.85, y: '0' });
      gsap.to('.slide--21__right-column-first-content .bottle.second', { opacity: 1, duration: 0.5, delay: 1.2, y: '0' });
  
      if ($('.slide--21__right-column h3.ready').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 2.2 * 1000);
      }
    });
  
    $('.slide--21__right-column-second-content h3').on('click', function() {
      $(this).addClass('ready');
      $('.slide--21__right-column-second').addClass('ready');
  
      gsap.to('.slide--21__right-column-second-content .bottle.first', { opacity: 1, duration: 0.5, delay: 0.5, y: '0' });
      gsap.to('.slide--21__right-column-second-content .bottle.second', { opacity: 1, duration: 0.5, delay: 0.85, y: '0' });
  
      if ($('.slide--21__right-column h3.ready').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 1.85 * 1000);
      }
    });
  },
  22: () => {
    $('.slide--22__right-blocks:nth-child(2)').on('click', function() {
      $(this).addClass('ready');
      gsap.to('.slide--22__right-blocks-wrapper img.bottle', { opacity: 1, duration: 0.5, delay: 0.5 });
    });

    $('.slide--22__right-blocks-wrapper img.bottle-2').on('click', function() {
      $(this).addClass('ready');
      $('.slide--22__right-blocks-wrapper img.hand-pointer').addClass('ready');
      gsap.to('.slide--22__right-blocks:nth-child(5)', { opacity: 1, duration: 0.5, delay: 0.5, x: '0' });

      lastSlideActionTimeout = setTimeout(() => {
        lastSlideAction();
      }, 7.5 * 1000);
    });
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
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 10:
      break;
    case 12:
      break;
    case 14:
      break;
    case 15:
      break;
    case 17:
      break;
    case 18:
      break;
    case 20:
      break;
    case 21:
      break;
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
