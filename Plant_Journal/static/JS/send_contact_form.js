$(document).ready(function(){
    check_collect_inputs();
});

function check_collect_inputs(){
    let reason = $('#reason_input');
    let how_to_contact = $('#how_to_contact_input');
    let first_name = $('#first_name_input');
    let last_name = $('#last_name_input');
    let email_phone = $('#email_phone_input');
    let content = $('#contact_form_text_field');
    let send_btn = $('#send_form_btn');
    let inputs = $('#contact_form select ,#contact_form input, #contact_form textarea')

    send_btn.on('click', () => {
        for(let i = 0;i < inputs.length; i++){
            if(inputs.eq(i).val() === "" || inputs.eq(i).val() === null ){
                inputs.eq(i).css({
                    'background-color' : 'yellow'
                });
            }
            else{
                inputs.eq(i).css({
                    'background-color' : 'white'
                });
            }
        };
    });
};