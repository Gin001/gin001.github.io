$(document).ready(function(){
    $('body').css('margin-bottom', $('.footer').outerHeight()+60)
});

;(function($) {
    $('.swipebox').swipebox(
        {
            hideBarsDelay : 0
        });
})(jQuery);

jQuery(function(){
    "use strict";
    jQuery(document.body)
        .on('click touchend','#swipebox-bottom-bar', function(){
        jQuery('#swipebox-next').click();
    });
});

$(".navbar-nav").bootstrapDropdownOnHover({
    mouseOutDelay: 100,
    responsiveThreshold: 768,
    hideBackdrop: true
});

$(function() {
	$('.sales-item').matchHeight();
});

$(function() {
    $("#CallbackPhone").mask("+7 (999) 999-99-99");
    $("#CallbackTime").mask("99:99");
});

$(function() {
    var header = $(".navbar-default");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();

        if (scroll >= 10) {
            header.addClass("navbar-fixed-top");
            $('.navbar-brand img').removeClass("visible-xs");
            $('.navbar-nav').css('padding-left', '15px');
            $('.navbar-right').css('margin-right', '0');
            $('.navbar-brand').css('margin-left', '15px');
        } else {
            header.removeClass("navbar-fixed-top");
            $('.navbar-brand img').addClass("visible-xs");
            $('.navbar-nav').css('padding-left', '0');
            $('.navbar-right').css('margin-right', '15px');
            $('.navbar-brand').css('margin-left', '0');
        }
    });
});