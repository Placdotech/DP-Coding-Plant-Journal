$(document).ready(function(){
    check_inputs();
    send_form_to_backend();
});

function check_inputs(){
    let inputs = $('#login_container form input')
    let username_input = $('#input_username_login');
    let username_badge = $('#login_username_error_badge');
    let password_input = $('#input_password_login');
    let password_badge = $('#login_password_error_badge');
    let submit_btn = $('#login_submit_btn');

    username_input.on('blur', function(){
        if($(this).val() === ''){
            username_badge.show()
        }
        else{
            username_badge.hide()
        };
    });

    password_input.on('blur', function(){
        if($(this).val() === ''){
            password_badge.show();
        }
        else{
            password_badge.hide();
        };
    });

    for(let i = 0; i < inputs.length; i++){
        inputs.eq(i).on('blur', () => {
            if(username_input.val() !== '' && password_input.val() !== ''){
                submit_btn.css({
                    'pointer-events' : 'all',
                    'opacity' : '1'
                });
            }
            else{
                submit_btn.css({
                    'pointer-events' : 'none',
                    'opacity' : '0.5'
                });
            };
        });
    }
};

function send_form_to_backend(){
    let form = $('#login_container form');
    let submit_btn = $('#login_submit_btn');

    submit_btn.on('click', () => {

        formData = form.serializeArray();

        $.ajax({
            type : 'POST',
            url : '/login/',
            data : JSON.stringify(formData),
            contentType : 'application/json; charset=utf-8'
        })
        .done(function(data){
            if(data.message !== 'Login erfolgreich')
            window.location.href = '/login/?fail=1' 
            else{
                setCookie('user_key', data.data.user_key, 1)
                window.location.href = '/home/'
            };
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Fehler:', errorThrown);
        });
    });
};

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}