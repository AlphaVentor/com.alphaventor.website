// Loader: embleme qui devient visible en fonction du chargement de la page
!(function () {
  $("body").append(
    '<div style="" id="loading"><div class="loader"><img src="/image/logo_octofan.svg"></div></div>'
  );
  $(".present-msg h1").css("opacity", "0");
  if ($("body").hasClass("home")) {
    $(".header").css("opacity", "0");
  } else {
    $(".header").css("opacity", "1");
    $(".menu-mobile").css("opacity", "1");
  }
  document.documentElement.style.overflow = "hidden";

  function loadbar() {
    (img = document.images), (c = 0), (tot = img.length);
    // console.log(tot);
    if (tot == 0) return;

    function imgLoaded() {
      c += 1;
      var perc = ((100 / tot) * c) / 100;
      $(".loader img").css("opacity", `${perc}`);
    }
    for (var i = 0; i < tot; i++) {
      var tImg = new Image();
      tImg.onload = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src = img[i].src;
    }
  }
  document.addEventListener("DOMContentLoaded", loadbar, false);
})();
const langue_site = $("select#site_langue").val();
// Chargement de la page
$(window).on("load", function () {
  setTimeout(() => {
    $(".present-msg h1").css("opacity", "1");
    $(".present-msg h1 span").css("opacity", "1");
  }, 6500);
  setTimeout(() => {
    $("input#progress_width").remove();
    removeLoader();
    document.documentElement.style.overflow = "hidden";
    if ($(".presentation video").length) {
      $(".presentation video")[0].play();
    }
  }, 2000);
  var frameJS = $('*:contains("scroll-sequence__container")');
  if (frameJS) {
    if (langue_site != "en") {
      $("body").append(
        '<script type="text/javascript" src="../js/frame.js" defer></script>'
      );
    } else {
      $("body").append(
        '<script type="text/javascript" src="js/frame.js" defer></script>'
      );
    }
  }
});
// Timeout Affichage du menu et du titre sur la page d'accueil
setTimeout(function () {
  $(".header").css("opacity", "1");
  $(".menu-mobile").css("opacity", "1");
}, 5000);

function removeLoader() {
  $("#loading").fadeOut(500, function () {
    $("#loading").remove();
    document.documentElement.style.overflow = "auto";
  });
}

document.onreadystatechange = function (e) {
  if (document.readyState == "interactive") {
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      var total = 100 / all.length;
      opacity = document.getElementById("progress_width").value;

      $(".loader span").text(opacity);
      $(".loader img").attr("style", "opacity:" + opacity * 0.01);
      set_ele(all[i]);
    }
  }
};

function check_element(ele) {
  var all = document.getElementsByTagName("*");
  var totalele = all.length;
  var per_inc = 100 / totalele;

  if ($(ele).on()) {
    var prog_width =
      per_inc + Number(document.getElementById("progress_width").value);
    document.getElementById("progress_width").value = prog_width;
    var opacity = prog_width.toFixed(2) * 0.01;
  } else {
    set_ele(ele);
  }
}

function set_ele(set_element) {
  check_element(set_element);
}
jQuery(document).ready(function ($) {
  $(".vue-style").on("mouseenter", function () {
    $(".vue-style video")[0].play();
    $(".vue-style video").attr("loop", "true");
  });
  $(".vue-style").on("mouseleave", function () {
    $("video.extrait")[0].pause();
    $(".vue-style video").removeAttr("loop", "false");
  });
  // Animate On Scroll
  // var dataAOS = $('*:contains("data-aos")');
  var dataAOS = document.querySelectorAll("[data-aos]");
  if (dataAOS.length > 0) {
    AOS.init();
  }
  // Affichage en pleine écran du vidéo
  $(".view-full a").on("click", function (e) {
    e.preventDefault();
    if ($("header").css("display") == "none") {
      $(".menu-mobile").css("display", "none");
    } else {
      $("header").css("display", "none");
    }
    var div = document.createElement("div");
    div.className = "full-screen-video";
    $(".view-full").prepend(div);
    if (langue_site == "en") {
      var video = $("<video />", {
        id: "video",
        src: "video/drone_mq.m4v",
        type: "video/mp4",
        controls: true,
        autoplay: true,
        loop: true,
      });
    } else {
      var video = $("<video />", {
        id: "video",
        src: "../video/drone_mq.m4v",
        type: "video/mp4",
        controls: true,
        autoplay: true,
        loop: true,
      });
    }
    video.appendTo($(".full-screen-video"));
    $(".full-screen-video").prepend(
      '<span class="close-player" data-aos="fade-up"><img src="/image/close-icon.svg" alt="Close icon"></span>'
    );
    document.documentElement.style.overflow = "hidden";
  });
  setTimeout(function () {
    $(".presentation").css("height", "calc(100vh - 210px)");
  }, 5000);

  // Contrôle formulaire
  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  var patternPhone = /^[+]?[0-9]{10,}$/;
  $('input[type="text"]').blur(function () {
    if ($(this).val().length == 0) {
      $(this).addClass("erreur");
      $(this).css("border", "1px solid red");
      $("input::-webkit-input-placeholder").css({ color: "red" });
      $(".output_message").text("Le champ est obligatoire");
    } else {
      $(this).css("border", "1px solid #363636");
      $(this).removeClass("erreur");
      $(".output_message").html("");
    }
  });
  $('[type = "email"]').blur(function () {
    if ($(this).val().length == 0) {
      $(this).addClass("erreur");
      $(this).css("border", "1px solid red");
      $(".output_message").text("Email est obligatoire");
    } else if (!pattern.test($(this).val())) {
      $(".output_message").text("Email invalide");
      $(this).addClass("erreur");
    } else {
      $(this).removeClass("erreur");
      $(this).css("border", "1px solid #363636");
      $(".output_message").html("");
    }
  });

  $(".phone").blur(function () {
    if ($(this).val().length == 0) {
      $(this).css("border", "1px solid red");
      $(this).addClass("erreur");
      $(".output_message").text("Phone obligatoire");
    } else if (!patternPhone.test($(this).val())) {
      $(this).addClass("erreur");
      $(".output_message").text("Numéro invalide");
      $(this).css("border", "1px solid red");
    } else {
      $(".output_message").html("");
      $(this).removeClass("erreur");
      $(this).css("border", "1px solid #363636");
    }
  });
  $("textarea").blur(function () {
    if ($(this).val().length == 0) {
      $(this).addClass("erreur");
      $(this).css("border", "1px solid red");
      $(".output_message").text("Le champ est obligatoire");
    } else {
      $(".output_message").html("");
      $(this).css("border", "1px solid #363636");
      $(this).removeClass("erreur");
    }
  });
  $(".formulaire form").submit(function (e) {
    if (
      $(".phone").val().length == 0 ||
      !patternPhone.test($(".phone").val()) ||
      $('input[type="text"]').val().length == 0 ||
      $('[type = "email"]').val().length == 0 ||
      !pattern.test($('[type = "email"]').val()) ||
      $("textarea").val().length == 0
    ) {
      e.preventDefault();
      $(".output_message").text("Error");
    } else {
      $(".output_message").html(" ");
      $(".formulaire form").unbind("submit");
    }
  });
});

$(".view-full").on("click", ".close-player", function () {
  var width = $(window).width();
  if (width < 768) {
    $(".menu-mobile").css("display", "block");
  } else {
    $("header").css("display", "grid");
  }
  $(".vue-style .full-screen-video").fadeOut(500);
  document.documentElement.style.overflow = "auto";
  if (langue_site == "en") {
    var url = "/#view-gen";
  } else {
    var url = "/fr/#view-gen";
  }
  location.href = url;
});

//   Animation fade des paragraphes
jQuery(document).ready(function ($) {
  var fade = document.querySelector("p.fadE");
  if (fade) {
    ScrollOut();
    ScrollOut({
      targets: "p.fadE",
      threshold: 0.2,
      once: true,
      onShown: function (el) {
        el.classList.add("animated");
      },
    });
  }
});

// $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
//   options.async = true;
// });

// Animation au scrollTop du menu

function ScrollCapture(
  deltaNumber,
  Menu = 5,
  ScrollDown = "nav-down",
  ScrollingState = "scrolling"
) {
  var didScroll;
  var lastScrollTop = 0;
  var delta = deltaNumber;
  var navbarHeight = $(Menu).outerHeight();
  $(window).scroll(function (event) {
    didScroll = true;
  });
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // S'ils défilent vers le bas et dépassent la barre de navigation, ajoutez une classe
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $(Menu).removeClass(ScrollDown).addClass(ScrollingState);
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $(Menu).addClass(ScrollDown);
      }
    }

    if (st === 0) {
      $(Menu).removeClass(ScrollingState);
    }

    lastScrollTop = st;
  }
}
jQuery(document).ready(function ($) {
  // Scroll menu

  /**
   * ScrollCapture() : Cache et affiche le menu en fonction du scroll
   * @param {Number} delta : default = 5
   * @param {String} Menu : La section qui contient le menu
   * @param {String} ScrollDown : default = nav-down
   * @param {String} ScrollingState : default scrolling
   */

  if ($("header").css("display") == "none") {
    ScrollCapture(undefined, ".menu-mobile", undefined, undefined);
  } else {
    ScrollCapture(undefined, "header", undefined, undefined);
  }

  // Back to top
  $("#sbttBacktotop").on("click touchstart", function (e) {
    e.preventDefault();
    $("body,html").animate({ scrollTop: 0 }, 500);
    return false;
  });
  $("footer").on("click", "#sbttBacktotop2 img", function (e) {
    e.preventDefault();
    $("body,html").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // Menu mobile

  /**
   * MenuBehavior Description: changement des propriétés du menu
   * @param {String} SectionMenu : La section qui comporte le menu entier (le parent)
   * @param {String} bgHeader : La couleur du background à laquelle le menu va devenir
   * @param {String} heightMenu : La hauteur de la menu, valeur par défaut "auto"
   * @param {String} visibility : La visibilité du menu, (non scrollable ou pas). Valeur par défaut "auto"
   */
  function MenuBehavior(
    SectionMenu,
    bgHeader,
    heightMenu = auto,
    visibility = auto
  ) {
    $(SectionMenu).css({
      background: `${bgHeader}`,
      height: `${heightMenu}`,
    });
    document.documentElement.style.overflowY = `${visibility}`;
  }

  const hamburger = document.querySelector(".hamburger");
  const menuNav = document.querySelector(".nav-menu");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    menuNav.classList.toggle("active");
    if ($(this).hasClass("active")) {
      MenuBehavior(".menu-mobile", "#1D1D1D", "100vh", "hidden");
    } else {
      MenuBehavior(".menu-mobile", "#00000000", "auto", "auto");
    }
  });
  var MenuSite = $(".header ul").html();
  $(".menu-mobile ul").prepend(MenuSite);

  $(".nav-menu .menu-mobile ul li a").on("click", function () {
    $(this).preventDefault();
    if ($(this).hasClass("active")) {
      MenuBehavior(".menu-mobile", "#1D1D1D", "100vh", "hidden");
    } else {
      MenuBehavior(".menu-mobile", "#00000000", "auto", "auto");
    }
  });
  SwitchMenu();
  if (!$('body:contains("home")')) {
    $(".header").css("opacity", "1");
    $(".menu-mobile").css("opacity", "1");
  }

  function Btop() {
    var width = $(window).width();
    if (width < 768) {
      $(".links").before(
        '<div class="sbttBacktotopFOOT"><div id="sbttBacktotop2"><img src="/image/up-arrow.svg" alt"sbtt"></div></div>'
      );
    }
  }
  Btop();
});

/**
 *SwitchMenu description:
 *Changer le menu en fonction de la taille de l'écran
 */

function SwitchMenu() {
  var width = $(window).width();
  if (width < 1201) {
    $(".menu-mobile").css("display", "block");
    $(".header").css("display", "none");
    ScrollCapture(
      undefined,
      ".menu-mobile",
      undefined,
      undefined,
      "scrolling2"
    );
    var AOSelem = document.querySelectorAll("[data-aos]");
    $(".specificity div").removeAttr("data-aos");
  } else {
    $(".menu-mobile").css("display", "none");
    $(".header").css("display", "grid");
    ScrollCapture(undefined, "header", undefined, undefined, undefined);
    $(".specificity div").attr("data-aos", "fade-up");
  }
}

$(window).resize(function () {
  SwitchMenu();
  var width = $(window).width();
  var btop = document.querySelector(".sbttBacktotopFOOT");
  if (width < 768) {
    var glide_slide = document.querySelectorAll(".glide");
    if (glide_slide.length > 0) {
      const investSlide = new Glide(".glide", {
        type: "carousel",
        startAt: 0,
        perView: 3,
        gap: 18,
        autoplay: 4000,
        focusAt: "center",
        hoverpause: false,
      });
      investSlide.mount();
    }
    if (!btop) {
      $(".links").before(
        '<div class="sbttBacktotopFOOT"><div id="sbttBacktotop2"><img src="/image/up-arrow.svg" alt"sbtt"></div></div>'
      );
    }
    return;
  } else {
    if (btop) {
      $(btop).remove();
    }
  }
});

jQuery(document).ready(function ($) {
  $(".founder-info .figure object").on("mouseenter", function () {
    $(this).css("background", "#000000CC");
  });
  $(".founder-info .figure object").on("mouseleave", function () {
    $(this).css("background", "#424242CC");
  });
  $(".investor-info .figure object").on("mouseenter", function () {
    $(this).css("background", "#000000CC");
  });
  $(".glide .investor-info .figure object").on("mouseenter", function () {
    $(this).css("background", "#000000CC");
  });
  $(".glide .investor-info .figure object").on("mouseleave", function () {
    $(this).css("background", "#424242CC");
  });
  $(".investor-info .figure object").on("mouseleave", function () {
    $(this).css("background", "#424242CC");
  });
  $(".investor-info .figure object").on("click", function () {
    var bio = $(this).siblings("div").html();
    var content = bio.split("<br>");
    var nom = $(this)
      .parent(".figure")
      .parent(".investor-info")
      .children(".crew-info")
      .children(".name")
      .text();
    var status = $(this)
      .parent(".figure")
      .parent(".investor-info")
      .children(".crew-info")
      .children(".status")
      .text();
    var div = document.createElement("div");
    div.className = "bio-container";
    var div2 = document.createElement("div");
    div2.className = "bio-content";
    var popName = document.createElement("span");
    popName.className = "pop-name";
    popName.append(nom + "\n");
    popstatus = document.createElement("span");
    popstatus.className = "pop-status";
    popstatus.append(status);
    popBio = document.createElement("p");
    popBio.className = "pop-bio";
    imgClose = document.createElement("img");
    imgClose.src = "/image/Vector.svg";
    imgContainer = document.createElement("span");
    imgContainer.className = "close-popup";
    imgContainer.append(imgClose);
    div2.append(popName, popstatus, popBio, imgContainer);
    div.append(div2);
    $("body").append(div);
    $(".close-popup").on("click", function () {
      $(".bio-container").remove();
    });
    var doc = new DOMParser().parseFromString(content, "text/html");
    var text = doc.documentElement.textContent;
    var content = text.split("[br]");
    for (i = 0; i < content.length; i++) {
      var para = document.createElement("p");
      para.append(content[i]);
      popBio.appendChild(para);
    }
  });
  $(".founder-info .figure object").on("click", function () {
    var bio = $(this).siblings("div").html();
    var content = bio.split("<br>");
    var nom = $(this)
      .parent(".figure")
      .parent(".founder-info")
      .children(".crew-info")
      .children(".name")
      .text();
    var status = $(this)
      .parent(".figure")
      .parent(".founder-info")
      .children(".crew-info")
      .children(".status")
      .text();
    var div = document.createElement("div");
    div.className = "bio-container";
    var div2 = document.createElement("div");
    div2.className = "bio-content";
    var popName = document.createElement("span");
    popName.className = "pop-name";
    popName.append(nom + "\n");
    popstatus = document.createElement("span");
    popstatus.className = "pop-status";
    popstatus.append(status);
    popBio = document.createElement("div");
    popBio.className = "pop-bio";
    imgClose = document.createElement("img");
    imgClose.src = "/image/Vector.svg";
    imgContainer = document.createElement("span");
    imgContainer.className = "close-popup";
    imgContainer.append(imgClose);
    div2.append(popName, popstatus, popBio, imgContainer);
    div.append(div2);
    $("body").append(div);
    $(".close-popup").on("click", function () {
      $(".bio-container").remove();
    });
    var doc = new DOMParser().parseFromString(content, "text/html");
    var text = doc.documentElement.textContent;
    var content = text.split("[br]");
    for (i = 0; i < content.length; i++) {
      var para = document.createElement("p");
      para.append(content[i]);
      popBio.appendChild(para);
    }
  });

  // initialisation du slider investor
  var width = $(window).width();
  var btop = document.querySelector(".sbttBacktotopFOOT");
  if (width < 768) {
    var glide_slide = document.querySelectorAll(".glide");
    if (glide_slide.length > 0) {
      const investSlide = new Glide(".glide", {
        type: "carousel",
        startAt: 0,
        perView: 3,
        gap: 18,
        hoverpause: false,
        bound: true,
        animationDuration: 1000,
        direction: "ltr",
        peek: 100,
      });
      investSlide.mount();
      $(".investor-info .figure object").on("click", function () {
        var bio = $(this).siblings("div").html();
        var content = bio.split("<br>");
        var nom = $(this)
          .parent(".figure")
          .parent(".investor-info")
          .children(".crew-info")
          .children(".name")
          .text();
        var status = $(this)
          .parent(".figure")
          .parent(".investor-info")
          .children(".crew-info")
          .children(".status")
          .text();
        var div = document.createElement("div");
        div.className = "bio-container";
        var div2 = document.createElement("div");
        div2.className = "bio-content";
        var popName = document.createElement("span");
        popName.className = "pop-name";
        popName.append(nom + "\n");
        popstatus = document.createElement("span");
        popstatus.className = "pop-status";
        popstatus.append(status);
        popBio = document.createElement("p");
        popBio.className = "pop-bio";
        imgClose = document.createElement("img");
        imgClose.src = "/image/Vector.svg";
        imgContainer = document.createElement("span");
        imgContainer.className = "close-popup";
        imgContainer.append(imgClose);
        div2.append(popName, popstatus, popBio, imgContainer);
        div.append(div2);
        $("body").append(div);
        $(".close-popup").on("click", function () {
          $(".bio-container").remove();
        });
        var doc = new DOMParser().parseFromString(content, "text/html");
        var text = doc.documentElement.textContent;
        var content = text.split("[br]");
        for (i = 0; i < content.length; i++) {
          var para = document.createElement("p");
          para.append(content[i]);
          popBio.appendChild(para);
        }
      });
    }
  }
  $("select#site_langue").on("change", function () {
    var l_site = $(this).val();
    var path = window.location.pathname;
    var path_split = path.split("/");
    var actualPage = path_split[path_split.length - 1];
    if (l_site != "en") {
      location.replace(`/${l_site}/${actualPage}`);
    } else {
      location.replace(`/${actualPage}`);
    }
  });
  $("select#site_langue_mobile").on("change", function () {
    var l_site = $(this).val();
    var path = window.location.pathname;
    var path_split = path.split("/");
    var actualPage = path_split[path_split.length - 1];
    if (l_site != "en") {
      location.replace(`/${l_site}/${actualPage}`);
    } else {
      location.replace(`/${actualPage}`);
    }
  });
});

// Rectification de la taille des canvas lors du mobile
jQuery(document).ready(function ($) {
  var width = $(window).width();
  setTimeout(function () {
    if (window.matchMedia("(max-width: 767px)").matches) {
      canvas_LIST = document.querySelectorAll("canvas");
        function drawStructure() {
          var canvas = canvas_LIST[0];
          var ctx = canvas.getContext("2d");
          ctx.canvas.width = window.innerWidth;
          // ctx.canvas.height = window.innerHeight;
          ctx.canvas.height = ctx.canvas.width;
          ws = ctx.canvas.width;
          hs = ctx.canvas.height;
          var sary = new Image();
          for (i = 0; i < structureImages.length; i++) {
            var source =
              langue_site == "en"
                ? "image/structureSM/"
                : "../image/structureSM/";
            sary.src = source + structureImages[i];
          }
          ctx.drawImage(sary, 0, 0, ws, hs, 0, 0, 50, ctx.canvas.height);
        }
        function drawPlanete() {
          var canvas2 = canvas_LIST[1];
          var ctx2 = canvas2.getContext("2d");
          ctx2.canvas.width = window.innerWidth;
          ctx2.canvas.height = ctx2.canvas.width;
          ws = ctx2.canvas.width;
          hs = ctx2.canvas.height;
          var sary = new Image();
          for (i = 0; i < planeteImages.length; i++) {
            var source =
              langue_site == "en" ? "image/planete/" : "../image/planete/";
            sary.src = source + planeteImages[i];
          }
          ctx2.drawImage(
            sary,
            0,
            0,
            ws,
            hs,
            0,
            0,
            ctx2.canvas.width,
            ctx2.canvas.width
          );
        }
        drawStructure();
        drawPlanete();
        $(".structure-container canvas").css({ width: width, height: width });
        $(".maps-container canvas").css({ width: width, height: width });
    }
  }, 10000);
  $(window).resize(function () {
    if (window.matchMedia("(max-width: 767px)").matches) {
      $(".structure-container canvas").css({ width: width, height: width });
      canvas_LIST = document.querySelectorAll("canvas");
        function drawStructure() {
          var canvas = canvas_LIST[0];
          var ctx = canvas.getContext("2d");
          ctx.canvas.width = window.innerWidth;
          ctx.canvas.height = ctx.canvas.width;
          ws = ctx.canvas.width;
          hs = ctx.canvas.height;
          var sary = new Image();
          for (i = 0; i < structureImages.length; i++) {
            var source =
              langue_site == "en"
                ? "image/structureSM/"
                : "../image/structureSM/";
            sary.src = source + structureImages[i];
          }
          ctx.drawImage(sary, 0, 0, ws, hs, 0, 0, 50, ctx.canvas.height);
        }
        function drawPlanete() {
          var canvas2 = canvas_LIST[1];
          var ctx2 = canvas2.getContext("2d");
          ctx2.canvas.width = window.innerWidth;
          ctx2.canvas.height = ctx2.canvas.width;
          ws = ctx2.canvas.width;
          hs = ctx2.canvas.height;
          var sary = new Image();
          for (i = 0; i < planeteImages.length; i++) {
            var source =
              langue_site == "en" ? "image/planete/" : "../image/planete/";
            sary.src = source + planeteImages[i];
          }
          ctx2.drawImage(
            sary,
            0,
            0,
            ws,
            hs,
            0,
            0,
            ctx2.canvas.width,
            ctx2.canvas.width
          );
        }
        drawStructure();
        drawPlanete();
        $(".maps-container canvas").css({ width: width, height: width });
    }
  });
});
