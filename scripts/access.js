document.addEventListener('DOMContentLoaded', function() {
    const submitCodeButton = document.getElementById('submit-code-button');
    const accessCodeInput = document.getElementById('access-code');
    const errorMessage = document.getElementById('error-message');
    const correctCode = '170874';

    submitCodeButton.addEventListener('click', () => {
        if (accessCodeInput.value === correctCode) {
            // Redirecionar para a página de gerenciamento de alimentos
            window.location.href = 'manage.html';
        } else {
            // Mostrar mensagem de erro
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Código de acesso incorreto!';
        }
    });
});
