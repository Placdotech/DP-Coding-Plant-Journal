$(document).ready(function(){
    start_form_check();
});

function start_form_check(){
    if(window.location.href.includes('/signup')){
        check_username();
        check_names();
        check_password_repeat();
        activate_submit_btn();
        new_user_reg_ajax();
    };
    if(window.location.href.includes('/home/?new_user_reg=1')){
        setTimeout(() => {
            window.location.href = '/home/'
        },3000);
    }
};

async function check_username() {
    let username = $('#input_username_signup');
    let username_badge = $('#signup_username_error_badge');

    username.on('change', async function () {
        let data = {
            'username': $(this).val()
        };

        try {
            let response = await $.ajax({
                type: "POST",
                url: "/check_available/",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
            });

            if (response.is_available) {
                username_badge.hide();
            } else {
                username_badge.show();
            }
        } catch (error) {
            username_badge.show();
            console.error("Fehler:", error);
        }
    });
}


function check_names(){
    let first_name = $('#input_first_name_signup');
    let last_name = $('#input_last_name_signup');
    let first_name_badge = $('#signup_first_name_error_badge');
    let last_name_badge = $('#signup_last_name_error_badge');
    let nameRegex = /^[A-Za-z\s]+$/;

    first_name.on('change', function(){
        if($(this).val() && $(this).val().match(nameRegex)){
            first_name_badge.hide();
        }
        else if($(this).val() === ''){
            first_name_badge.hide();
        }
        else{
            first_name_badge.show();
        };
    });

    last_name.on('change', function(){
        if($(this).val() && $(this).val().match(nameRegex)){
            last_name_badge.hide();
        }
        else if($(this).val() === ''){
            last_name_badge.hide();
        }
        else{
            last_name_badge.show();
        };
    });
}

function check_password_repeat(){
    let password_input = $('#input_password_signup');
    let repeated_password_input = $('#input_password_repeat_signup');
    let password_badge = $('#signup_password_error_badge');
    let password_to_check = '';
    let password_to_compare = '';

    password_input.on('change', () => {
        password_to_check = password_input.val();
        if(password_to_check !== password_to_compare){
            password_badge.show();
            password_ready = false;
        }
        else{
            password_badge.hide();
            password_ready = true;
        };
    });

    repeated_password_input.on('change', () => {
        password_to_compare = repeated_password_input.val();
        if(password_to_check !== password_to_compare){
            password_badge.show();
            password_ready = false;
        }
        else{
            password_badge.hide();
            password_ready = true;
        };
    });
};

function activate_submit_btn(){
    let submit_btn = $('#signup_submit_btn');
    let inputs = $('#signup_container form input');
    let badges = $('#signup_container form span');

    for(let i = 0; i < inputs.length; i++){
        inputs.eq(i).on('change', () => {

            for(let i = 0; i < inputs.length; i++){
                if(inputs.eq(i).val() === ''){
                    submit_btn.css({
                        'pointer-events' : 'none',
                        'opacity' : '0.5'
                    });
                    return
                }
            }
            for(let i = 0; i < badges.length; i++){
                if(badges.eq(i).css('display') !== 'none'){
                    submit_btn.css({
                        'pointer-events' : 'none',
                        'opacity' : '0.5'
                    });
                    return
                }
            }
        
            submit_btn.css({
                'pointer-events' : 'all',
                'opacity' : '1'
            });

        });
    };
};

function new_user_reg_ajax() {
    let form = $('#signup_container form');
    let submit_btn = $('#signup_submit_btn');

    submit_btn.on('click', async function (event) {
        event.preventDefault(); // Verhindern, dass das Formular standardmäßig gesendet wird

        let formData = form.serializeArray();

        try {
            const response = await $.ajax({
                type: 'POST',
                url: '/signup/',
                data: JSON.stringify(formData),
                contentType: 'application/json; charset=utf-8',
            });

            // Überprüfen Sie hier die Antwort, wenn dies erforderlich ist
            if (response.success) {
                setTimeout(() => {
                    window.location.href = '/home/?new_user_reg=1';
                }, 500);
            } else {
                // Zeigen Sie eine Fehlermeldung oder nehmen Sie andere Maßnahmen bei fehlgeschlagenem Registrierungsversuch
                console.error('Registrierung fehlgeschlagen:', response.message);
            }
        } catch (error) {
            console.error('Fehler:', error);
        }
    });
};
