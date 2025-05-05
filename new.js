// Array de links fornecido
const vetorRdms = [
    {
      href: "https://drive.google.com/drive/folders/1luK7t_eTMjemJPx10nIBBNr41d2xb-6s",
      img: "./imagens/2025.jpeg",
      alt: "2025 no drive"
    },
    {
      href: "https://drive.google.com/drive/folders/1ukk9SizDqUJA_PaGNh5ynMHL-7gq-df9",
      img: "./imagens/algoritmosDrive.jpg",
      alt: "Algoritmos no drive"
    },
    {
      href: "https://drive.google.com/drive/folders/1ROW--6okVlRBXfkg-GXl2lggzCHhNzUy",
      img: "./imagens/dw1.jpg",
      alt: "Dw1 no drive"
    },
    {
      href: "https://github.com/rjhalmeman",
      img: "./imagens/git.png",
      alt: "Github"
    },
    {
      href: "https://bitbucket.org/",
      img: "./imagens/bitbucket.png",
      alt: "Bitbucket"
    },
    {
      href: "https://replit.com/@RadamesHalmeman",
      img: "./imagens/replit.png",
      alt: "Repl.it"
    },
    {
      href: "https://dontpad.com/radames",
      img: "./imagens/dontpad.png",
      alt: "Dont pad"
    },
    {
      href: "https://onedrive.live.com/?id=root&cid=006F2139754FBA4A",
      img: "./imagens/oneDrive.png",
      alt: "One drive microsoft"
    },
    {
      href: "https://mail.google.com/mail/u/0/#search/is%3Aunread+%2Bfacebook+OR+%2Blinkedin+OR+%2Blojadomecanico+OR+%2Bbanggood+OR+%2Bebay+OR+%2BAgenda+OR+%2BGOG+OR+%2Babes++OR+%2BKennedy++OR+%2BSmiles+OR+%2BTwitter+OR+%2BPinterest+OR+%2BAmazon+OR+%2BAliExpress+OR+%2BNetflix+OR+%2BResearchGate+OR+%2BAbastece+OR+Panvel+OR+lanterna+OR+Danki+OR+bcmed+OR+Alex+OR+Poisson+OR+Gshield+OR+prolife+OR+Lenscope+OR+wenes+OR+kabum+OR+Esparta+OR+Temu+OR+livelo+OR+kmv",
      img: "./imagens/gmail.png",
      alt: "Limpar gmail"
    },
    {
      href: "https://docs.google.com/document/d/1BazlN3kS_R-v8RSiJmV5f1zPsxkkIML5rVD5i7vK6WE/edit?tab=t.0#heading=h.m09e6q1it3zj",
      img: "./imagens/tipsTricks.jpeg",
      alt: "Dicas e truques"
    },
    {
      href: "http://flightradar24.com/",
      img: "./../imagens/flightRadar24.png",
      alt: "FlightRadar24"
    }
  ];
  

const links = [
    {
      href: "https://calendar.google.com/",
      img: "./imagens/agenda.png",
      alt: "Google Calendar"
    },
    {
      href: "https://web.whatsapp.com/",
      img: "./imagens/whatsapp.png",
      alt: "Whatsapp"
    },
    {
      href: "https://mail.google.com/",
      img: "./imagens/gmail.png",
      alt: "Gmail"
    },
    {
      href: "https://drive.google.com/",
      img: "./imagens/drive.webp",
      alt: "Drive"
    },
    {
      href: "https://classroom.google.com/",
      img: "./imagens/classroom.png",
      alt: "Classroom"
    },
    {
      href: "https://maps.google.com/",
      img: "./imagens/maps.png",
      alt: "Maps"
    },
    {
      href: "https://youtube.com/",
      img: "./imagens/youtube.jpeg",
      alt: "Youtube"
    },
    {
      href: "https://music.youtube.com/",
      img: "./imagens/ytMusic.jpeg",
      alt: "Youtube Music"
    },
    {
      href: "https://keep.google.com/u/0/",
      img: "./imagens/keep.jpeg",
      alt: "Google Keep"
    },
    {
      href: "https://sistemas2.utfpr.edu.br/",
      img: "./imagens/utfprAcademico.png",
      alt: "Sistema Acadêmico UTFPR"
    },
    {
      href: "https://www.google.com/search?q=previsao+do+tempo+campo+mourao&oq=previsao+do+tempo+campo+mourao&gs_l=psy-ab.3..0l2j0i22i30k1l3.16242.22304.0.22632.13.13.0.0.0.0.107.1282.7j6.13.0....0...1.1.64.psy-ab..0.13.1277....0.-l0_OSgE3sg",
      img: "./imagens/previsaoDoTempo.jpeg",
      alt: "Previsão do tempo"
    },
    {
        href: "http://www.bb.com.br/",
        img: "./imagens/bb.png",
        alt: "Banco do Brasil"
    },
    {
        href: "https://www.gov.br/servidor/pt-br/",
        img: "./imagens/govbr.png",
        alt: "Sigepe"
    }

    /*
  <a href="http://www.bb.com.br/" target="_blank">
                <img src="./imagens/bb.png" alt="Banco do Brasil">
            </a>
            <a href="https://www.gov.br/servidor/pt-br/" target="_blank">
                <img src="./imagens/govbr.png" alt="Sigepe">
            </a>
    */


  ];
  
  // Função para criar a lista de links
  function criarListaLinks(qualLista, qualVetor) {
      const listaEl = document.getElementById(qualLista);
      
      qualVetor.forEach(link => {
          // Criar elemento li
          const li = document.createElement('li');
          li.className = 'item';
          
          // Criar elemento de link
          const a = document.createElement('a');
          a.href = link.href;
          a.target = "_blank"; // Abre em nova aba
          
          // Criar imagem
          const img = document.createElement('img');
          img.src = link.img;
          img.alt = link.alt;
          
          // Criar parágrafo para o texto
          const p = document.createElement('p');
          p.textContent = link.alt;
          
          // Montar a estrutura
          a.appendChild(img);
          a.appendChild(p);
          li.appendChild(a);
          listaEl.appendChild(li);
      });
  }
  
// Executar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Primeira execução
    criarListaLinks('lista-horizontal', links);
    
    // Segunda execução (exemplo com um subconjunto dos links)
    const linksImportantes = links.slice(0, 4); // Primeiros 4 links
    criarListaLinks('lista-rdms', vetorRdms);
});