document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('edit-form');
    const editSelect = document.getElementById('edit-select');

    function carregarItens() {
        fetch('http://localhost:8080/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar itens: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                editSelect.innerHTML = '<option value="" disabled selected>Selecione o Item</option>';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nome;
                    editSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar itens:', error));
    }

    carregarItens();

    editSelect.addEventListener('change', function() {
        const id = editSelect.value;

        fetch(`http://localhost:8080/alimentos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar item para edição: ' + response.statusText);
                }
                return response.json();
            })
            .then(item => {
                document.getElementById('edit-nome').value = item.nome;
                document.getElementById('edit-descricao').value = item.descricao;
                document.getElementById('edit-imagem').value = item.imagem;
                document.getElementById('edit-valor').value = item.valor.toFixed(2);
                document.getElementById('edit-categoria').value = item.categoria;
            })
            .catch(error => console.error('Erro ao carregar item para edição:', error));
    });

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = editSelect.value;
        const nome = document.getElementById('edit-nome').value;
        const descricao = document.getElementById('edit-descricao').value;
        const imagem = document.getElementById('edit-imagem').value;
        const valor = parseFloat(document.getElementById('edit-valor').value).toFixed(2);
        const categoria = document.getElementById('edit-categoria').value;

        fetch(`http://localhost:8080/alimentos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, imagem, valor, categoria })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao editar item: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Item editado com sucesso!');
            editForm.reset();
            carregarItens();
        })
        .catch(error => {
            console.error('Erro ao editar item:', error);
            alert('Erro ao editar item');
        });
    });
});
