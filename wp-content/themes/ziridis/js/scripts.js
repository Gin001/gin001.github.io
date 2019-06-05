$(document).ready(function() {
    var overlay = $('#overlay');
    var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
    var close = $('.modal_close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    var modal = $('.modal_div'); // все скрытые мoдaльные oкнa

     open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
         event.preventDefault(); // вырубaем стaндaртнoе пoведение
         var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
         overlay.fadeIn(400, //пoкaзывaем oверлэй
             function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
                 $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
                     .css('display', 'block') 
                     .animate({opacity: 1, top: '5%'}, 200); // плaвнo пoкaзывaем
         });
     });

     close.click( function(){ // лoвим клик пo крестику или oверлэю
            modal // все мoдaльные oкнa
             .animate({opacity: 0, top: '15%'}, 200, // плaвнo прячем
                 function(){ // пoсле этoгo
                     $(this).css('display', 'none');
                     overlay.fadeOut(400); // прячем пoдлoжку
                 }
             );
     });
});

    $(document).ready(function () {
        $('a#link').click(function (e) {
            $(this).toggleClass('active');
            $('#menu').toggle();
                
            e.stopPropagation();
        });

        $('body').click(function () {
            var link = $('a#link');
            if (link.hasClass('active')) {
                link.click();
            }
        });
    });

var btn_prev = document.querySelector('#gallery .buttons .prev');
var btn_next = document.querySelector('#gallery .buttons .next');
var slideInterval = setInterval(nextSlide,4000);

var images = document.querySelectorAll('#gallery .photos img');
var i = 0;

function nextSlide() {
        images[i].className = '';
        i--;

        if (i < 0) {
            i = images.length -1;
        }

        images[i].className = 'showed';
}
btn_prev.onclick = function() {
    images[i].className = '';
    i--;

    if (i < 0) {
        i = images.length -1;
    }

    images[i].className = 'showed';
}

btn_next.onclick = function() {
    images[i].className = '';
    i++;

    if (i >= images.length) {
        i = 0;
    }

    images[i].className = 'showed';
}



