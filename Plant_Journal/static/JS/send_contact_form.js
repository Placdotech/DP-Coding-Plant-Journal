$(document).ready(function(){
    start_form_procedure();
});

function start_form_procedure(){
    let show_contact_form_btn = $('#contact_form_btn');

    show_contact_form_btn.on('click', () => {
        send_form_to_backend();
    })
}

function send_form_to_backend(){
    let reason = $('#reason_input');
    let how_to_contact = $('#how_to_contact_input');
    let first_name = $('#first_name_input');
    let last_name = $('#last_name_input');
    let email_phone = $('#email_phone_input');
    let content = $('#contact_form_text_field');
    let send_btn = $('#send_form_btn');
    let inputs = $('#contact_form select ,#contact_form input, #contact_form textarea')
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phonePattern = /^\+?\d{12,15}$/; 
    let values = []
    let start_end_animation_btn = $('#contact_form_back_icon');
    let contact_card = $('#contact_card');
    let bird_gif = $('#sending_gif');
    let contact_badge = $('#contact_badge');

    for(let i = 0; i < inputs.length; i++){     // so that the type of input 'email/phone' will set correctly first for autofill
        if(inputs.eq(i).prop('id') !== 'how_to_contact_input'){
            inputs.eq(i).prop('disabled', true)
            inputs.eq(i).css({
                'background-color' : 'yellow'
            });
        };
        send_btn.prop('disabled', true);
    }


    how_to_contact.on('change', () => {     // Change Placeholder with the how_to_contact input
        clear_inputs(inputs, false)     // so that all fields will delete for better autofill
        for(let i = 0; i < inputs.length; i++){
            if(inputs.eq(i).prop('id') !== 'how_to_contact_input'){
                inputs.eq(i).prop('disabled', false)
                inputs.eq(i).css({
                    'background-color' : 'white'
                });
            };
            send_btn.prop('disabled', false);
        };
        if(how_to_contact.val() === 'email'){       // set HTML-Type for autofill
            email_phone.attr("type", "email");
            email_phone.prop('placeholder', 'Email');
        }
        else{
            email_phone.attr("type", "tel");        // set HTML-Type for autofill
            email_phone.prop('placeholder', 'Telefonnummer');
        };
    });

    send_btn.on('click', () => {        // Check inputs
        for(let i = 0; i < inputs.length; i++){     
            if(inputs.eq(i).val() === '' || inputs.eq(i).val() === null){       // check if input is empty excluding 'email/phone' because of autofill
                inputs.eq(i).css({
                    'background-color' : 'yellow'
                });           
            }
            else if(inputs.eq(i).prop('id') !== 'email_phone_input'){
                inputs.eq(i).css({
                    'background-color' : 'white'
                });
            };

            email_phone.one('input', () => {        // validates email input
                if(how_to_contact.val() === 'email'){
                    if(emailPattern.test(email_phone.val()) === false){
                        email_phone.css({
                            'background-color' : 'yellow'
                        });
                    };
                }
                else if(how_to_contact.val() === 'call' || how_to_contact.val() === 'WhatsApp'){        // validates tel input
                    if(phonePattern.test(email_phone.val()) === false){
                        email_phone.css({
                            'background-color' : 'yellow'
                        });
                    };
                }
                else{
                    email_phone.css({
                        'background-color' : 'white'
                    });
                };
            });
        }; 

        for(let i = 0; i < inputs.length; i++){     // collect all background-values for check
            values[i] = inputs.eq(i).css('background-color')
        }
        for(let i = 0; i < values.length; i++){     // check all inputs with the help of backgrounds
            if(values[i] === 'rgb(255, 255, 0)'){
                return
            }
        }

        let data_to_send = {
            'reason' : reason.val(),
            'how_to_contact' : how_to_contact.val(),
            'first_name' : first_name.val(),
            'last_name' : last_name.val(),
            'email/phone' : email_phone.val(),
            'content' : content.val()
        };

        get_set_csrf_token();       // get and set CSRF-Token in Ajax-Header
        
        $.ajax({
            type: 'POST',
            url: '/contact_request/',
            data: JSON.stringify(data_to_send),
            crossDomain: false,
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json', // Der Inhaltstyp ist JSON
            success: function(responseData) {
                for(let i = 0; i < inputs.length; i++){
                    inputs.eq(i).prop('disabled', true);
                    send_btn.prop('disabled', true);
                };
                bird_gif.css({
                    'display' : 'block',
                    'animation' : 'bird_fly_away 4s ease-in-out forwards' 
                })
                bird_gif.one('animationstart', () => {
                    setTimeout(() => {
                        start_end_animation_btn.click();
                    },1800);
                });
                contact_card.one('animationend', () => {
                    clear_inputs(inputs)
                    for(let i = 0; i < inputs.length; i++){
                        inputs.eq(i).prop('disabled', false)
                        send_btn.prop('disabled', false)
                    }
                    bird_gif.css({
                        'display' : 'none',
                        'animation' : '' 
                    })
                    return
                });
                contact_card.one('animationend', () => {
                    contact_badge.addClass('bg-success');
                    setTimeout(() => {
                        contact_badge.text('Deine Anfrage wurde erfolgreich versendet.')
                        contact_badge.css({
                            'display' : 'block',
                            'animation' : 'show_hide_badge 8s ease-in-out forwards'
                        });
                    },1000)
                });
                contact_badge.one('animationend', () => {
                    contact_badge.css({
                        'display' : 'none',
                        'animation' : ''
                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                for(let i = 0; i < inputs.length; i++){
                    inputs.eq(i).prop('disabled', true);
                    send_btn.prop('disabled', true);
                };
                bird_gif.css({
                    'display' : 'block',
                    'animation' : 'bird_try_to_fly_away 4s ease-in-out forwards' 
                })
                bird_gif.one('animationstart', () => {
                    setTimeout(() => {
                        start_end_animation_btn.click();
                    },1800);
                });
                contact_card.one('animationend', () => {
                    clear_inputs(inputs)
                    for(let i = 0; i < inputs.length; i++){
                        inputs.eq(i).prop('disabled', false)
                        send_btn.prop('disabled', false)
                    }
                    bird_gif.css({
                        'display' : 'none',
                        'animation' : '' 
                    })
                    return
                });
                contact_card.one('animationend', () => {
                    contact_badge.addClass('bg-danger');
                    setTimeout(() => {
                        contact_badge.text('Beim versenden deiner Anfrage ist ein Fehler aufgetreten')
                        contact_badge.css({
                            'display' : 'block',
                            'animation' : 'show_hide_badge 8s ease-in-out forwards'
                        });
                    },1000)
                });
                contact_badge.one('animationend', () => {
                    contact_badge.css({
                        'display' : 'none',
                        'animation' : ''
                    });
                });
            },
        });
    });
};

function get_set_csrf_token(){
    let csrf_token = Cookies.get('csrftoken')

    $.ajaxSetup({
        headers: {
            'X-CSRFToken': csrf_token
        }
    });
};

function clear_inputs(inputs_to_clear, clear_selects = true){
    for(let i = 0; i < inputs_to_clear.length; i++){
        if(inputs_to_clear.eq(i).is('select')){
            if(clear_selects === true){
                inputs_to_clear.eq(i).prop("selectedIndex", 0);
            };
        }
        else{
            inputs_to_clear.eq(i).val('');
        };
    };
};