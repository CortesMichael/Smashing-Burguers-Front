document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const viewMenuButton = document.getElementById('view-menu-button');

    viewMenuButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
    });

    function carregarAlimentos() {
        fetch('http://localhost:8080/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar alimentos: ' + response.statusText);
                }
                return response.json();
            })
            .then(alimentos => {
                function filtrarAlimentosPorCategoria(categoria) {
                    return alimentos.filter(alimento => alimento.categoria === categoria);
                }

                function adicionarAlimentosNaLista(alimentos, lista) {
                    lista.innerHTML = '';
                    alimentos.forEach(alimento => {
                        const li = document.createElement('li');
                        li.className = 'alimento-item';

                        const valorFormatado = alimento.valor ? alimento.valor.toFixed(2) : '0.00';

                        li.innerHTML = `
                            <img src="${alimento.imagem}" alt="${alimento.nome}">
                            <div class="alimento-info">
                                <span>${alimento.nome}</span>
                                <p>${alimento.descricao}</p>
                                <span class="alimento-valor">R$ ${valorFormatado}</span>
                            </div>
                        `;

                        lista.appendChild(li);
                    });
                }

                const categoryButtons = document.querySelectorAll('.category-button');
                categoryButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const categoria = button.getAttribute('data-category');
                        const alimentosFiltrados = filtrarAlimentosPorCategoria(categoria);
                        const lista = document.getElementById(`${categoria.toLowerCase()}-list`);
                        adicionarAlimentosNaLista(alimentosFiltrados, lista);
                        lista.style.display = lista.style.display === 'none' || lista.style.display === '' ? 'block' : 'none';
                    });
                });
            })
            .catch(error => console.error(error));
    }

    viewMenuButton.addEventListener('click', carregarAlimentos);
});
