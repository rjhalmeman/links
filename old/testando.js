function ajustarTexto(t) {
    let i = 0;
    let aux = "";
    let sinal = "";
    while (i < t.length - 2) {
        if (t[i] === '(' && t[i + 2] === ')') {
            sinal = t[i + 1];
            let cont = 0;
            let w;
            for (w = i; cont < 2; w--) {
                if (t[w] == ' ') {
                    cont++;
                }
            }
            let k;

            let valor = "";
            for (k = w + 2; k < i; k++) {
                valor += t[k];
            }

            aux = aux.substring(0, (aux.length - valor.length));
            valor = valor.replace('.', '');
            aux += '\n' + sinal + valor.replace(',', '.') + ';';
            i += 3;
            aux += t.substring(i, i + 11) + ';';
            i += 10;
        } else {
            aux += t[i];
        }
        i++;
    }
    return aux;
}

function limparEspacos(t) {
    let i = 0;
    t = t.trim();
    let aux = "";
    while (i < t.length - 2) {
        if (t[i] === ' ') {
            aux += t[i];
            while (t[i] == ' ' && i < t.length - 2) {
                i++;
            }
        }
        aux += t[i];
        i++;
    }
    return aux;
}

function ajustesIniciais(tt) {

   // let text = "Lançamentos  Dia   Histórico   Valor  101,74 (+) 29/04/2024   Saldo Anterior 15.855,11 (+) 02/05/2024   Recebimento de Proventos UNIVERSIDADE TECNOLOGICA FEDERAL DO PA 19.252,76 (+) 02/05/2024   Recebimento de Proventos UNIVERSIDADE TECNOLOGICA FEDERAL DO PA 440,00 (+) 02/05/2024   Pix - Recebido 02/05 16:26 00001934928909 MARIA CRIST 440,00 (-) 02/05/2024   Aplicação Poupança 02/05 16:33 RADAMES JULIANO HALMEMAN 30,00 (-) 02/05/2024   Pix - Enviado 01/05 07:28 Luciano Camargo E Silva 30,00 (-) 02/05/2024   Pix - Enviado 02/05 06:54 Luciano Camargo E Silva 60,00 (-) 02/05/2024   Pix - Enviado 02/05 12:32 Isalmar Simonetti De Carva 70,00 (-) 02/05/2024   Pix - Enviado 02/05 12:37 Isalmar Simonetti De Carva 46,00 (-) 02/05/2024   Pix - Enviado 02/05 12:58 Lucelia Da Silva 1.581,78 (-) 02/05/2024   Pagamentos Diversos FUNTEF PR 2,72 (-) 02/05/2024   Cobrança de Juros 2,44 (-) 02/05/2024   Cobrança de I.O.F. 69,99 (+) 03/05/2024   Recebimentos Diversos FUNDACAO DE APOIO EDUC PESQ DESENV 32,00 (+) 03/05/2024   Recebimentos Diversos FUNDACAO DE APOIO EDUC PESQ DESENV 71,20 (+) 03/05/2024   Recebimentos Diversos FUNDACAO DE APOIO EDUC PESQ DESENV 1.530,00 (+) 03/05/2024   Pix - Recebido 03/05 11:33 08680679000119 PRONENGE CO 2.190,00 (-) 03/05/2024   Transferido para Poupança 03/05 15:27 MARIA HELENA CIEBES ALVE 120,00 (-) 03/05/2024   Pix - Enviado 03/05 16:59 Susana Katyussa Faria 39,90 (-) 06/05/2024   Compra com Cartão 04/05 12:37 NETFLIX.COM 250,00 (-) 06/05/2024   Saque no TAA 06/05 15:01 PSO CAMPO MOURAO 60,00 (-) 06/05/2024   Telefone Pre-Pago 05/05 16:03 (44)99969-5262 Tim 30,00 (-) 06/05/2024   Pix - Enviado 05/05 10:16 Caminheiros Do Bem 400,00 (-) 06/05/2024   Pix - Enviado 05/05 15:16 Marcia Tkaczuk 1.000,00 (-) 06/05/2024   Pix - Enviado 05/05 15:20 Maria Cristina Rodrigues H 292,06 (-) 06/05/2024   Pagamento de Boleto HUMANA SAUDE SUL LTDA 29,99 (-) 06/05/2024   Pagto conta telefone TIM S/A 350,00 (-) 06/05/2024   Transferência enviada 28/07 Nicolas 52,10 (-) 06/05/2024   Tarifa Pacote de Serviços Cobrança referente 06/05/2024 66,41 (-) 07/05/2024   Pix - Enviado 07/05 09:48 Mangofy Tecnologia Ltda 7,20 (-) 08/05/2024   Compra com Cartão 08/05 14:44 SUPERMERCADOS COI 5.000,00 (-) 08/05/2024   Aplicação Poupança 08/05 06:52 RADAMES JULIANO HALMEMAN 145,00 (-) 08/05/2024   Pix - Enviado 08/05 11:28 Fernando Augusto Marques 80,00 (-) 09/05/2024   Pix - Enviado 09/05 11:13 Geanne Schiticoski Braz Ra 15,00 (-) 09/05/2024   Pix - Enviado 09/05 14:13 Luciano Camargo E Silva Extrato de Conta Corrente  Cliente:   RADAMES JULIANO HALMEMANN  Agência: 406-5    Conta: 8140-X  Lançamentos  Dia   Histórico   Valor  3.700,00 (-) 10/05/2024   Aplicação Poupança 10/05 11:32 InvestimentoCris 999,90 (-) 10/05/2024   Pagamento de Boleto ESCOLA EDUCARE ENSINO FUNDAMEN 80,00 (-) 10/05/2024   Pagamento de Boleto BIT-ON INFORMATICA 320,00 (-) 10/05/2024   Pagamento de Boleto CLUBE SOCIAL E RECREATIVO 10 DE OUTUBR 41,72 (-) 10/05/2024   Pagamento de Boleto EDIFICIO RESIDENCIAL VICENZA 109,93 (-) 10/05/2024   Pagamento de Boleto CONNECT TELECOM LTDA 158,10 (-) 10/05/2024   Pagamento de Boleto SUMICITY TELECOMUNICACOES S.A. 165,09 (-) 10/05/2024   Pagamento de Boleto BANCO DO BRASIL S/A - BRASILIA-DF 80,00 (-) 10/05/2024   Pix - Enviado 10/05 11:30 Bruno Lima Da Silva 5,00 (-) 10/05/2024   Pix - Enviado 10/05 13:49 Alessandra De Lima Souza D 300,00 (-) 10/05/2024   Transferência enviada 03/01 fotovoltaico 16.162,12 (-) 10/05/2024   Pagto cartão crédito PLATINUM ESTILO VISA 434,06 (-) 10/05/2024   Pagamento Fatura de Água SANEPAR-CIA SANEAMENTO PR 31,16 (-) 10/05/2024   Pagto Energia Elétrica COPEL DISTRIBUICAO S.A. 50,00 (-) 13/05/2024   Transferência enviada 12/05 11:44 THAIS ADRIANA DE ALMEIDA 32,99 (-) 13/05/2024   Pagto conta telefone TIM S/A 40,00 (-) 13/05/2024   Pix - Enviado 11/05 09:35 Jp   Aguia Da Noite 150,00 (-) 13/05/2024   Pix - Enviado 11/05 11:52 Jociane Priscila Da Silvoa 25,00 (-) 13/05/2024   Pix - Enviado 12/05 11:46 Lucelia Da Silva 180,00 (-) 13/05/2024   Pix - Enviado 13/05 16:03 Marcilena Vieira 30,00 (-) 13/05/2024   Pix - Enviado 13/05 16:38 Marcos Antonio Soares 683,26 (-) 15/05/2024   Transferência enviada 15/05 15:57 ELSA PAULINA RODRIGUES 172,24 (-) 15/05/2024   Pagamento de Impostos GPS - CODIGO DE BARRAS 155,32 (-) 15/05/2024   Pagamento de Impostos GPS - CODIGO DE BARRAS 160,00 (-) 15/05/2024   Pix - Enviado 15/05 16:00 Ivanete Maria Carvalho Alm 30,00 (-) 15/05/2024   Pix - Enviado 15/05 16:02 Elaine Aparecida Da Silva 130,00 (-) 15/05/2024   Pix - Enviado 15/05 21:20 Susana Katyussa Faria 66,00 (-) 16/05/2024   Pix - Enviado 16/05 22:33 Elivelton Alves De Souza 17,00 (-) 17/05/2024   Pix - Enviado 17/05 11:25 48.327.774 Gabriela Cardos 50,00 (-) 17/05/2024   Pix - Enviado 17/05 11:28 Silvia Aparecida Folmann 360,00 (-) 17/05/2024   Pix - Enviado 17/05 20:15 Larissa A E E Ltda 222,28 (+) 20/05/2024   Pix - Recebido 20/05 07:15 13719379000136 TAKAHASHI & 15,00 (-) 20/05/2024   Pix - Enviado 18/05 16:38 Luciano Camargo E Silva 28,00 (-) 21/05/2024   Pix - Enviado 21/05 14:24 Oghenegare Paul Ivbrogbor 100,00 (-) 21/05/2024   Pix - Enviado 21/05 14:26 Maria Cristina Rodrigues H Extrato de Conta Corrente  Cliente:   RADAMES JULIANO HALMEMANN  Agência: 406-5    Conta: 8140-X  Lançamentos  Dia   Histórico   Valor  35,00 (-) 22/05/2024   Pix - Enviado 22/05 14:10 VIBRANTE 313,14 (-) 23/05/2024   Pagto Energia Elétrica COPEL DISTRIBUICAO S.A. 90,00 (+) 28/05/2024   Ordem Bancária 764168900001-89 GOVERNO DO PARANA SECR 140,00 (+) 31/05/2024   Transferido da poupança 30/05 07:18 RADAMES JULIANO HALMEMAN 2.534,64 (+) 31/05/2024   Pix - Recebido 31/05 03:19 00394460005887 SECR. DA RE 30,00 (-) 31/05/2024   Pix - Enviado 31/05 18:08 Elaine Aparecida Da Silva 2.509,09 (+) 31/05/2024   S A L D O  Informações Adicionais  9.600,00 (+)   - Limite Cheque Especial 7,71% Taxa Cheque Especial ao Mês 143,82% Taxa Cheque Especial ao Ano 0,82% Tributos (IOF) Diário 0,38% Tributos (IOF) Adicional 8,34% Custo Efetivo Total ao Mês 164,89% Custo Efetivo Total ao Ano 28/02/2025 Data Venc. Ch. Especial  Informações Complementares - CET (*)  9.660,09 Valor Total Devido   - Valor Liberado   99,38% 9.600,00 Despesas-(IOF)   60,09   0,62% Tarifa   0,00   0,00% (*) Simulação para utilização única e integral do limite por 30 dias. Total Aplicações Financeiras * Saldos por dia Base Sujeitos a confirmação no momento da contratação 0,00";

    tt = tt.substring(tt.indexOf("Valor"), tt.length);

    tt = tt.substring(0, tt.indexOf("Informações Adicionais") + 3);

    let cabb = "Extrato de Conta Corrente  Cliente:   RADAMES JULIANO HALMEMANN  Agência: 406-5    Conta: 8140-X  Lançamentos  Dia   Histórico   Valor";

    tt = tt.replace(cabb, "");
    tt = tt.replace(cabb, "");
    tt = tt.replace(cabb, "");
    tt = tt.replace(cabb, "");
    tt = tt.replace(cabb, "");
    return tt;
}

let text = ajustesIniciais(tt);

let pp = limparEspacos(text);


let pronto = ajustarTexto(pp);
let nt = pronto.split("\n");
let textoFinal = "";
for (let i = 1; i < nt.length; i++) {
    let aa = nt[i].trim();
    let saa = aa.split(";");
    let vv = parseFloat(saa[0]);
    let dt = saa[1];
    let desc = saa[2];
    textoFinal += vv + "|" + dt + "|" + desc + "\n";

}

console.log(textoFinal);

