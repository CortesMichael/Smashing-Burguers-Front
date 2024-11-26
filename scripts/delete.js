document.addEventListener('DOMContentLoaded', function() {
    const deleteForm = document.getElementById('delete-form');
    const deleteSelect = document.getElementById('delete-select');

    function carregarItens() {
        fetch('http://localhost:8080/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar itens: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                deleteSelect.innerHTML = '<option value="" disabled selected>Selecione o Item</option>';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nome;
                    deleteSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar itens:', error));
    }

    carregarItens();

    deleteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = deleteSelect.value;

        fetch(`http://localhost:8080/alimentos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir item: ' + response.statusText);
            }
            alert('Item excluído com sucesso!');
            deleteForm.reset();
            carregarItens();
        })
        .catch(error => {
            console.error('Erro ao excluir item:', error);
            alert('Erro ao excluir item');
        });
    });
});
