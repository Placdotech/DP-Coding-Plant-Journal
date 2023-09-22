$(document).ready(function(){
    logout();
});

function logout(){
    logout_btn = $('#logout_btn');

    logout_btn.on('click', () => {
        loescheCookie('user_key')
    });
};

function loescheCookie(cookieName) {
    var gestern = new Date(); 
    gestern.setDate(gestern.getDate() - 1); 

    document.cookie = cookieName + "=; expires=" + gestern.toUTCString() + "; path=/";
};
