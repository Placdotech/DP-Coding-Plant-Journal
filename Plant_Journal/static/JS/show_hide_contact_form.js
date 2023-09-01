$(document).ready(function(){
    show_hide_contact_form();
})

function show_hide_contact_form(){
    let contact_card = $('#contact_card');
    let contact_form = $('#contact_form');
    let back_icon = $('#contact_form_back_icon');
    let toogle_contact_form_btn = $('#contact_form_btn');

    toogle_contact_form_btn.on('click', () => {
        if(contact_form.css('display') ==='none'){
            contact_card.css({
                'animation' : 'hide_card 1s ease-in-out forwards'
            });
            contact_card.one('animationend', () => {
                contact_card.css({
                    'display' : 'none'
                });
                contact_form.css({
                    'display' : 'grid',
                    'animation' : 'show_card 1s ease-in-out forwards'
                });
            });
        }
    });
    back_icon.on('click', () => {
        contact_form.css({
            'animation' : 'hide_card_reverse 1s ease-in-out forwards'
        });
        contact_form.one('animationend', () => {
            contact_form.css({
                'display' : 'none'
            });
            contact_card.css({
                'display' : 'flex',
                'animation' : 'show_card 1s ease-in-out forwards'
            });
        });
    });
};

