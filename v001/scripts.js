document.addEventListener("DOMContentLoaded", function () {
    function createTooltip() {
        const tooltip = document.createElement("div");
        tooltip.id = "tooltip";
        tooltip.style.position = "absolute";
        tooltip.style.padding = "5px 10px";
        tooltip.style.background = "rgba(0, 0, 0, 0.7)";
        tooltip.style.color = "#fff";
        tooltip.style.borderRadius = "5px";
        tooltip.style.fontSize = "14px";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.pointerEvents = "none";
        tooltip.style.visibility = "hidden";
        document.body.appendChild(tooltip);
    }

    function attachTooltipEvents() {
        const tooltip = document.getElementById("tooltip");
        document.querySelectorAll("img").forEach(img => {
            img.addEventListener("mouseenter", function (event) {
                if (img.alt) {
                    tooltip.textContent = img.alt;
                    tooltip.style.visibility = "visible";
                }
            });

            img.addEventListener("mousemove", function (event) {
                tooltip.style.top = `${event.pageY + 10}px`;
                tooltip.style.left = `${event.pageX + 10}px`;
            });

            img.addEventListener("mouseleave", function () {
                tooltip.style.visibility = "hidden";
            });
        });
    }

    createTooltip();
    attachTooltipEvents(); // Aplica aos elementos iniciais

    // Observa mudanças no DOM para recarregar eventos em novas imagens
    const observer = new MutationObserver(() => {
        attachTooltipEvents();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});



async function openTab(tabName) {
    const tabContent = document.getElementById("tab-content");

    // Remove a classe ativa de todas as abas
    document.querySelectorAll(".tab-button").forEach(el => el.classList.remove("active"));

    // Adiciona a classe ativa ao botão clicado
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`)?.classList.add("active");

    try {
        // Carrega o conteúdo da aba via fetch
        const response = await fetch(`abas/${tabName}.html`);
        tabContent.innerHTML = await response.text();
    } catch (error) {
        console.error("Erro ao carregar a aba:", error);
        tabContent.innerHTML = "<p>Erro ao carregar a aba.</p>";
    }
}

async function fetchUserFromFile() {
    try {
        let response = await fetch('user.txt');
        let username = await response.text();
        username = username.trim();

        console.log("Usuário identificado:", username);

        const userTabs = {
            "rdms": "rdms",
            "cris": "cris",
            "nick": "nick",
            "joao": "geral"
        };

        openTab(userTabs[username] || "geral");
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
        openTab("geral");
    }
}

window.onload = fetchUserFromFile;
