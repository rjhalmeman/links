// ==========================================
// CONFIGURAÇÕES GLOBAIS
// ==========================================
const CONFIG = {
    baseItemSize: 80,      // Tamanho do ícone/imagem em pixels
    spacingRatio: 0.3,      // Espaçamento de profundidade
    maxSpeed: 1.5,          // Velocidade máxima do mouse
    easeFactor: 0.05,       // Suavização da busca
    ellipseWidthFactor: 0.4 // Define a largura da elipse baseada na tela (0.4 = 80% da tela)
};

let currentRotation = 0;
let targetSpeed = 0;
let radiusZ = 0;
let radiusX = 0;
let totalItems = 0;
let itemsData = [];
let itemsElements = []; // Guarda as tags HTML <a> para animá-las no loop
let carouselMode = 'mouse';
let searchTargetRotation = 0;
let isPaused = false; // [NOVO] Controla se o giro pelo mouse está pausado

async function initCarousel() {
    try {
        const response = await fetch('dados.json');
        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        itemsData = await response.json();
        const carousel = document.getElementById('carousel');
        const datalist = document.getElementById('carousel-options');

        totalItems = itemsData.length;

        // Profundidade da elipse (mantém o cálculo seguro anterior para o eixo Z)
        const spacing = CONFIG.baseItemSize * CONFIG.spacingRatio;
        radiusZ = Math.round((CONFIG.baseItemSize / 2) / Math.tan(Math.PI / totalItems)) + spacing;

        // Injeta variáveis CSS base
        const root = document.documentElement;
        root.style.setProperty('--item-size', `${CONFIG.baseItemSize}px`);
        root.style.setProperty('--translate-z', `${-radiusZ}px`);
        root.style.setProperty('--perspective', `${Math.max(1200, radiusZ * 3)}px`);

        // Renderiza itens e preenche o Datalist (Filtro incremental)
        itemsData.forEach((item) => {
            // Criação do item 3D
            const anchor = document.createElement('a');
            anchor.href = item.href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.className = 'carousel-item';
            anchor.title = item.alt;

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.alt;
            img.loading = "lazy";

            anchor.appendChild(img);
            carousel.appendChild(anchor);
            itemsElements.push(anchor); // Salva na memória para a animação

            // Criação da opção no menu suspenso
            const option = document.createElement('option');
            option.value = item.alt;
            datalist.appendChild(option);

        });

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        setupMouseControl();
        setupSearchControl();
        setupGlobalShortcuts(); // [NOVO] Ativa o atalho de teclado global
        animateCarousel();
        document.getElementById("searchInput").focus();
    } catch (error) {
        console.error("Erro na inicialização:", error);
    }
}

// Atualiza a largura da elipse quando a tela mudar de tamanho
function updateDimensions() {
    radiusX = window.innerWidth * CONFIG.ellipseWidthFactor;
}

// [NOVO] Função auxiliar para focar no input e selecionar o texto
function focusAndSelectSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
        searchInput.select();
    }
}

function setupMouseControl() {
    window.addEventListener('mousemove', (event) => {
        // [MODIFICADO] Se estiver no modo de busca ou pausado, ignora o movimento do mouse
        if (carouselMode === 'search' || isPaused) return;

        const screenWidth = window.innerWidth;
        const mouseX = event.clientX;
        const position = (mouseX / screenWidth) * 2 - 1;

        if (Math.abs(position) < 0.1) {
            targetSpeed = 0;
        } else {
            targetSpeed = position * CONFIG.maxSpeed;
        }
    });

    document.addEventListener('mouseleave', () => {
        if (carouselMode === 'mouse') targetSpeed = 0;
    });

    // [NOVO] Detecta clique simples no fundo preto para pausar/retomar
    document.addEventListener('click', (event) => {
        // Verifica se o clique NÃO foi em um item do carrossel e NÃO foi no cabeçalho de busca
        const clickedOnItem = event.target.closest('.carousel-item');
        const clickedOnHeader = event.target.closest('.search-header');

        if (!clickedOnItem && !clickedOnHeader) {
            isPaused = !isPaused;
            if (isPaused) {
                targetSpeed = 0; // Para o giro imediatamente
            }
        }
    });

    // [NOVO] Detecta clique duplo no fundo preto para focar no input
    document.addEventListener('dblclick', (event) => {
        const clickedOnItem = event.target.closest('.carousel-item');
        const clickedOnHeader = event.target.closest('.search-header');

        if (!clickedOnItem && !clickedOnHeader) {
            isPaused = false; // Retoma o carrossel ao ir para a busca, se desejar
            focusAndSelectSearch();
        }
    });
}

function setupSearchControl() {
    const searchInput = document.getElementById('searchInput');

    // Seleciona texto quando ganha foco
    searchInput.addEventListener('focus', (e) => {
        e.target.select();
    });

    // Escuta o evento de digitação
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            carouselMode = 'mouse';
            searchInput.style.borderColor = ''; // Resetar cor
            return;
        }

        // Busca mais flexível - verifica se o termo está CONTIDO no alt
        const matchIndex = itemsData.findIndex(item =>
            item.alt.toLowerCase().includes(query) || // Busca por parte do texto
            item.alt.toLowerCase().split(' ').some(word => word.startsWith(query)) // Busca por palavra que começa com
        );

        if (matchIndex !== -1) {
            // Item encontrado!
            carouselMode = 'search';
            isPaused = false; // [NOVO] Despausa automaticamente para mover até o item encontrado
            const itemAngle = matchIndex * (360 / totalItems);
            const target = -itemAngle;

            let diff = (target - currentRotation) % 360;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            searchTargetRotation = currentRotation + diff;

            // Feedback visual: borda verde quando encontra
            searchInput.style.borderColor = '#4CAF50';
            searchInput.style.borderWidth = '2px';
            searchInput.style.borderStyle = 'solid';
        } else {
            // Não encontrou - feedback visual
            searchInput.style.borderColor = '#ff4444';
            searchInput.style.borderWidth = '2px';
            searchInput.style.borderStyle = 'solid';
        }
    });

    // Escuta o ENTER para abrir a aba
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase().trim();

            // Busca mais flexível também para o ENTER
            const matchItem = itemsData.find(item =>
                item.alt.toLowerCase().includes(query) ||
                item.alt.toLowerCase().split(' ').some(word => word.startsWith(query))
            );

            if (matchItem) {
                window.open(matchItem.href, '_blank');
                // Limpar busca após abrir
                searchInput.value = '';
                searchInput.style.borderColor = '';
                carouselMode = 'mouse';
            } else {
                // Feedback visual
                searchInput.style.borderColor = '#ff4444';
                searchInput.style.borderWidth = '2px';
                searchInput.style.borderStyle = 'solid';

                // Mostrar erro
                showErrorNotification(`"${e.target.value}" não encontrado`);

                // Resetar após 3 segundos
                setTimeout(() => {
                    searchInput.style.borderColor = '';
                }, 3000);
            }
        }
    });

    // Resetar estilo quando perde o foco
    searchInput.addEventListener('blur', () => {
        if (searchInput.value === '') {
            searchInput.style.borderColor = '';
        }
    });
}

// [NOVO] Escuta o atalho Ctrl + Enter em qualquer lugar da página
function setupGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault(); // Evita comportamentos padrões indesejados
            isPaused = false;   // Retoma o carrossel se estiver pausado
            focusAndSelectSearch();
        }
    });
}

// O Loop de Animação - Calcula a elipse frame a frame
function animateCarousel() {
    if (carouselMode === 'mouse') {
        // [MODIFICADO] Só rotaciona se não estiver pausado
        if (!isPaused) {
            currentRotation += targetSpeed;
        }
    } else if (carouselMode === 'search') {
        currentRotation += (searchTargetRotation - currentRotation) * CONFIG.easeFactor;
    }

    // Posiciona e rotaciona cada item individualmente formando a elipse
    itemsElements.forEach((el, index) => {
        // Ângulo individual
        const baseAngle = index * (360 / totalItems);
        const currentItemAngle = baseAngle + currentRotation;

        // Conversão para radianos (necessário para as funções Math.sin e Math.cos)
        const rad = currentItemAngle * (Math.PI / 180);

        // O 'Pulo do gato' matemático: 
        // Largura usa o raio X flexível (baseado na tela). Profundidade usa o raio Z (estático).
        const x = radiusX * Math.sin(rad);
        const z = radiusZ * Math.cos(rad);

        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${currentItemAngle}deg)`;
    });

    requestAnimationFrame(animateCarousel);
}

document.addEventListener('DOMContentLoaded', initCarousel);