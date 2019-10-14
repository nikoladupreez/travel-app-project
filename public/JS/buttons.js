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

