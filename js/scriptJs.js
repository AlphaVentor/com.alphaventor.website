$('body').append('<div style="" id="loading"><div class="loader"><img src="/image/embleme.svg"><span></span></div></div>');
document.documentElement.style.overflow = 'hidden';
$(window).on('load', function() {
    removeLoader()
    document.documentElement.style.overflow = 'hidden';
});

function loadIntro() {
    $('.present-msg').hide();
    document.documentElement.style.overflow = 'hidden';
    $('body').append('<section class="intro"> </section>');
    $('.intro').html('<video class="videoIntro" preload="" autoplay="" muted="" playsinline=""><source src="video/rendu3.mp4" type="video/mp4"></video>')

    setTimeout(function() {
        $('.intro').fadeTo(1000, 0);
        $('.intro').css('display', 'none!important');
        $('.intro').remove();
    }, 6000);

};

function removeLoader() {
    $('#loading').fadeOut(500, function() {
        $('#loading').remove();
        $('.header').css('display', 'none!important');
        document.documentElement.style.overflow = 'auto';
    });

}

document.onreadystatechange = function(e) {
    if (document.readyState == "interactive") {
        var all = document.getElementsByTagName("*");
        for (var i = 0, max = all.length; i < max; i++) {
            opacity = document.getElementById("progress_width").value;
            console.log("---" + opacity * 0.01, );
            $(".loader span").text(opacity);
            $(".loader img").attr('style', 'opacity:' + opacity);
            set_ele(all[i]);
        }
    }
}

function check_element(ele) {
    var all = document.getElementsByTagName("*");
    var totalele = all.length;
    var per_inc = 100 / all.length;

    if ($(ele).on()) {
        var prog_width = per_inc + Number(document.getElementById("progress_width").value);
        document.getElementById("progress_width").value = prog_width;
        var opacity = prog_width.toFixed(2) * 0.01;
        $(".loader span").text(opacity);
        /*$(".loader img").attr('style', 'opacity:' + opacity);*/
        console.log($(".loader img").attr('style'));
        /*if (opacity == 1) {
            removeLoader();

        }*/
    } else {
        set_ele(ele);
    }
}

function set_ele(set_element) {
    check_element(set_element);
}
jQuery(document).ready(function($) {
    loadIntro();
    $(".owl-carousel").owlCarousel({
        autoplay: true,
        autoplayTimetout: 2000,
        items: 3,
        loop: true,
        autoHeight: true,
    });
    $('.view-full a').on('click', function() {
        var div = document.createElement('div');
        div.className = 'full-screen-video';
        $('.view-full').prepend(div);

        var video = $('<video />', {
            id: 'video',
            src: 'video/Intro.mp4',
            type: 'video/mp4',
            controls: true,
            autoplay: true,
            loop: true
        });

        video.appendTo($('.full-screen-video'));
        $('.full-screen-video').append('<span class="close-player">X</span>');
        document.documentElement.style.overflow = 'hidden';
    });
    var test = $('.octofan-sequence canvas');
    console.log(octofanSequence.images);

    $('.view-full').on('click', '.close-player', function() {
        $('.vue-style .full-screen-video').remove();
        document.documentElement.style.overflow = 'auto';
        var url = "/#view-gen";
        location.href = url;
    })
    $('body').click(function() {
        $('.header img').slideDown('slow').delay(3000);
        $('.header nav').slideDown('slow').delay(3000);
    })

    setTimeout(function() {
        $('body').click();
    }, 6000)
})