$(document).ready(function(){
    my_carousel_login();
    my_carousel_signup();
});

async function my_carousel_login(){
    let slides = $('.my_slide_login');

    while(window.location.href.includes('/login')){
        for(let i = 0; i < slides.length; i++){
            slides.eq(i).css({
                'display' : 'flex',
                'animation' : 'img_slide_in 2s ease forwards'
            });
            await delayWithTimeout(3000);
            slides.eq(i).css({
                'animation' : 'img_slide_out 2s ease forwards'
            });
            await delayWithTimeout(2000);
            slides.eq(i).css({
                'animation' : 'none',
                'display' : 'none'
            });
        };
    };
};

async function my_carousel_signup(){
    let slides = $('.my_slide_signup');

    while(window.location.href.includes('/signup')){
        for(let i = 0; i < slides.length; i++){
            slides.eq(i).css({
                'display' : 'flex',
                'animation' : 'img_slide_in 2s ease forwards'
            });
            await delayWithTimeout(3000);
            slides.eq(i).css({
                'animation' : 'img_slide_out 2s ease forwards'
            });
            await delayWithTimeout(2000);
            slides.eq(i).css({
                'animation' : 'none',
                'display' : 'none'
            });
        };
    };
};

function delayWithTimeout(delayMilliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delayMilliseconds);
    });
};
