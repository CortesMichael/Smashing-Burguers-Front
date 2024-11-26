document.addEventListener('DOMContentLoaded', function() {
    const createForm = document.getElementById('create-form');

    createForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('create-nome').value;
        const descricao = document.getElementById('create-descricao').value;
        const imagem = document.getElementById('create-imagem').value;
        const valor = parseFloat(document.getElementById('create-valor').value).toFixed(2);
        const categoria = document.getElementById('create-categoria').value;

        fetch('http://localhost:8080/alimentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, imagem, valor, categoria })
        })
        .then(response => response.json())
        .then(data => {
            alert('Item criado com sucesso!');
            createForm.reset();
        })
        .catch(error => {
            console.error('Erro ao criar item:', error);
            alert('Erro ao criar item');
        });
    });
});
