const searchForm = document.getElementById('searchForm');
const searchButton = document.getElementById('searchButton');
const searchMessage = document.getElementById('searchMessage');
const resultsDiv = document.getElementById('searchResults');

const API_BASE_URL = 'http://localhost:3000/api';
const MESSAGE_TIMEOUT = 5000;

let tensorChart;

function showMessage(messageElement, text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, MESSAGE_TIMEOUT);
}

function updateTensorChart(documentos) {
    if (!documentos || documentos.length === 0) {
        console.error('Nenhum dado válido para atualizar o gráfico.');
        return;
    }

    console.log(documentos.map((documento) => {
        return documento.vetor
    }));

    const tensorData = documentos.map((documento, index) => {
        if (typeof documento.vetor === 'string') {
            try {
                documento.vetor = JSON.parse(documento.vetor);
            } catch (e) {
                console.error(`Erro ao parsear o vetor do documento ${index + 1}:`, e);
                return {
                    label: `Documento ${index + 1}`,
                    data: [],
                    borderColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4],
                    tension: 0.1,
                    pointRadius: 0,
                };
            }
        }

        if (!Array.isArray(documento.vetor)) {
            console.error(`Documento ${index + 1} não tem um vetor válido.`);
            return {
                label: `Tensor ${index + 1}`,
                data: [],
                borderColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4],
                tension: 0.1,
                pointRadius: 0,
            };
        }

        return {
            label: `Tensor ${index + 1}`,
            data: documento.vetor,
            borderColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4],
            tension: 0.1,
            pointRadius: 0,
        };
    });

    const labels = tensorData[0].data.map((_, i) => `Posição ${i + 1}`) || [];

    if (tensorChart) {
        tensorChart.destroy();
    }

    const ctx = document.getElementById('tensorChart').getContext('2d');
    tensorChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: tensorData,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10, // Adiciona margem à esquerda
                    right: 10, // Adiciona margem à direita
                    top: 10, // Adiciona margem no topo
                    bottom: 10, // Adiciona margem na parte inferior
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Posição no Tensor',
                    },
                    ticks: {
                        stepSize: Math.max(1, Math.floor(labels.length / 5)), // Ajuste adicional para espaçamento
                        autoSkip: true,
                        maxTicksLimit: 10, // Limita o número de rótulos exibidos,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor',
                    },
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 100, // Limita o número de rótulos no eixo Y
                    },
                },
            },
        },
    });
}

function displayResults(documentos) {
    if (!documentos || documentos.length === 0) {
        resultsDiv.innerHTML = `
      <div class="no-results">
        <p>Nenhum resultado encontrado</p>
      </div>
    `;
        return;
    }

    const resultsHtml = documentos
        .map(
            (item) => `
      <div class="result-item">
        <div class="content">
          <p>${item.conteudo}</p>
          ${item.metadata_url
                    ? `<a href="${item.metadata_url}" class="url" target="_blank" rel="noopener">
                  Ver fonte <span class="url-text">${item.metadata_url}</span>
                 </a>`
                    : ''
                }
        </div>
        <div class="similarity-badge">
          Similaridade: ${(item.similarity * 100).toFixed(1)}%
        </div>
      </div>
    `
        )
        .join('');

    resultsDiv.innerHTML = resultsHtml;
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        conteudo: searchForm.elements.conteudo.value,
    };

    searchButton.disabled = true;
    searchButton.innerHTML = '<span class="spinner"></span>Buscando...';

    try {
        const response = await fetch(`${API_BASE_URL}/loadBySimilarity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        displayResults(data.documentos);
        updateTensorChart(data.documentos);

        showMessage(searchMessage, 'Busca realizada com sucesso!', 'success');
    } catch (error) {
        showMessage(searchMessage, `Erro na busca: ${error.message}`, 'error');
        resultsDiv.innerHTML = '';
    } finally {
        searchButton.disabled = false;
        searchButton.innerHTML = 'Obter similares';
    }
});
