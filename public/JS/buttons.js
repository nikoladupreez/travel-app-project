//nav

const dropdown = document.getElementById('dropdown');

function toggleHamburger() {
    const content = document.getElementById('dropdown-content');
    if (content.style.display === 'none'){
        content.style.display = 'flex';
    } else {
        content.style.display = 'none';
    }
};

dropdown.addEventListener('click', toggleHamburger)


//inputfields
const usernameField = document.getElementById('username-field');
const usernameError = document.getElementById('val-username');

function showError(err) {
    err.style.display = 'block';
}

