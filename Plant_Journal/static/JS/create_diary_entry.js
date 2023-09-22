$(document).ready(function(){
    if(window.location.href.includes('/create_entry')){
        set_current_date();
        check_form();
    };
});

function set_current_date(){
    let current_date_field = $('#create_entry_created_at')
    let current_date = new Date();
        
        let day = current_date.getDate().toString().padStart(2, '0');
        let month = (current_date.getMonth() + 1).toString().padStart(2, '0'); 
        let year = current_date.getFullYear();

        let formatted_date = `${day}.${month}.${year}`;
        
        current_date_field.text(formatted_date);
};

function check_form(){
    let created_at = $('#create_entry_created_at');
    let title = $('#create_entry_title');
    let description = $('#create_entry_description');
    let author = $('#create_entry_author');
    let submit_btn = $('#create_diary_entry_submit_btn');
    let title_is_ready = false;
    let description_is_ready = false

    title.on('blur', () => {
        if(title.val() === ''){
            title.css({
                'background-color' : 'yellow'
            });
            title_is_ready = false;
        }
        else{
            title.css({
                'background-color' : 'white'
            });
            title_is_ready = true;
        };
        if(title_is_ready && description_is_ready){
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
        }
    });

    description.on('blur', () => {
        if(description.val() === ''){
            description.css({
                'background-color' : 'yellow'
            });
            description_is_ready = false;
        }
        else{
            description.css({
                'background-color' : 'white'
            });
            description_is_ready = true;
        };
        if(title_is_ready && description_is_ready){
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
        }
    });

    submit_btn.on('click', () => {
        send_data_to_backend();
    });
};

function send_data_to_backend(){
    let form = $('#create_entry_form')[0];
    let formData = new FormData(form);
    let created_at = $('#create_entry_created_at');

    formData.append('created_at', created_at.text());

    $.ajax({
        url : '/diary/create_entry/',
        type : 'POST',
        data : formData,
        processData : false,        // Prevent Jquery to convert data in string
        contentType : false,        // Server can set ContentType
    })
    .done(function(){
        
        setTimeout(() => {
            window.location.href = '/diary';  
        },500);

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Fehler:', errorThrown);
    });
    };
    