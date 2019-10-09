//get reset link
let getResetlink = document.getElementById('reset-view');
let sendResetLink = document.getElementById('send-reset-view');

//reset 
let resetUsername = document.getElementById('username-reset');
let resetPassword = document.getElementById('password-reset');
let confirmReset = document.getElementById('confirm-reset-view');

function popUp(elementHide, elementShow){
    elementHide.style.display = 'none';
    elementShow.style.display = 'flex';
};