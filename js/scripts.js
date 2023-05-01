window.onload = function () {

  // Липкое меню.
  function stikyMenu(header) {
    let headerTop = header.offset().top;
    headerToggleClass();
    $(window).scroll(function () {
      headerToggleClass();
    });
    function headerToggleClass() {
      if ($(window).scrollTop() > headerTop + 130) {
        header.addClass('sticky');
      } else if ($(window).scrollTop() <= headerTop) {
        header.removeClass('sticky');
      }
    }
  };
  stikyMenu($('#headerSticky'));

  // Выпадайки при клике по кнопке
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  function dropBlock(btn, lock = false) {
    let $this = undefined,
        drop = undefined,
        close = $('.js-drop-close'),
        body = $('body');
    btn.on('click', function () {
      let $this = $(this);
      let drop = $('#' + $this.data('drop'));
      let scrollWidth = (window.innerWidth - $(window).width());
      if (!$this.hasClass('is-active')) {
        $this.addClass('is-active');
        drop.addClass('open');
        if (lock) {
          body.toggleClass('lock');
          body.css('padding-right', scrollWidth);
        }
      } else {
        $this.removeClass('is-active');
        drop.removeClass('open');
        body.removeClass('lock');
        body.css('padding-right', 0);
      }
      $(document).mouseup(function (e) {
        if (!$this.is(e.target)
          && $this.has(e.target).length === 0
          && !drop.is(e.target)
          && drop.has(e.target).length === 0) {
          $this.removeClass('is-active');
          drop.removeClass('open');
          body.removeClass('lock');
          body.css('padding-right', 0);
        }
      });
    })
    close.on('click', function () {
      $('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
      $('#' + $(this).data('drop')).removeClass('open');
      body.removeClass('lock');
      body.css('padding-right', 0);
    })
  }
  dropBlock($('.js-drop-btn'));
  dropBlock($('.js-drop-menu'), true);

  // Анимация счетчика
  function countNumber(block) {
    block.each(function () {
      var scrollTop = false,
        countNumberStatus = true,
        $this = $(this),
        blockPosition = $this.position().top,
        valUp = $this.data('val-up'),
        valTo = $this.data('val-to'),
        valDuration = $this.data('duration'),
        valDelay = $this.data('delay');
      $this.html(0);
      gofunc();
      $(window).scroll(function () {
        gofunc();
      });
      function gofunc() {
        scrollTop = $(window).scrollTop() + $(window).height() - 150;
        if (scrollTop > blockPosition && countNumberStatus) {
          setTimeout(() => {
            $({ numberValue: valUp }).animate({ numberValue: valTo }, {
              duration: valDuration,
              easing: "swing",
              step: function (val) {
                $this.html(Math.ceil(val));
              }
            });
          }, valDelay);
          countNumberStatus = false;
        }
      }
    });
  };
  countNumber($(".count-number"));

  // Swiper | Слайдер "команда"
  if ($('#sliderTeam').length) {
    let sliderTeam;
    let init = false;
    function sliderToggle() {
      if ($(window).width() <= 768 && !init) {
        init = true;
        sliderTeam = new Swiper('#sliderTeam', {
          slidesPerView: 1.2,
          spaceBetween: 20,
          speed: 1000,
          pagination: false,
          navigation: false,
          breakpoints: {
            769: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 30,
            }
          }
        });
      } else if ($(window).width() > 768 && init) {
        init = false;
        sliderTeam.destroy();
      }
    };
    sliderToggle();
    $(window).resize(function () {
      sliderToggle();
    });
  }

  // Swiper | Слайдер "Клиенты"
  if ($('#sliderClients').length) {
    let sliderClients;
    let init = false;
    function sliderToggle() {
      if ($(window).width() <= 768 && !init) {
        init = true;
        sliderClients = new Swiper('#sliderClients', {
          slidesPerView: 1.2,
          spaceBetween: 20,
          speed: 1000,
          pagination: false,
          navigation: false,
          breakpoints: {
            769: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 30,
            }
          }
        });
      } else if ($(window).width() > 768 && init) {
        init = false;
        sliderClients.destroy();
      }
    };
    sliderToggle();
    $(window).resize(function () {
      sliderToggle();
    });
  }

  // Swiper | Клиенты 2
  if ($('#sliderClients2').length) {
    const sliderClients2 = new Swiper('#sliderClients2', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 1,
      },
      speed: 3000,
      freeMode: true,
      breakpoints: {
        769: {
          spaceBetween: 60,
        },
        576: {
          spaceBetween: 30,
        }
      }
    });
  }

  // Select2 || Стилизация селекта
  $('select').select2({
    minimumResultsForSearch: -1,
  });

  // AOS || Анимация появления блоков
  AOS.init({
    duration: 1500,
    once: true,
  });

}