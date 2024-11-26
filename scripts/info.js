document.addEventListener('DOMContentLoaded', function() {
    const adminButton = document.getElementById('admin-button');

    // Redirecionar para a página de código de acesso
    adminButton.addEventListener('click', () => {
        window.location.href = 'access.html';
    });
});

