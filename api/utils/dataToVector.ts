import { randomUUID } from "crypto";
import * as tk from "tiktoken";
import { BancoVetorial, DadosEntrada } from "../interfaces/interfaces";
import { BancoDeDados } from "../controller/Database.controller";

const texto = `O urânio é um elemento químico de símbolo U e de massa atômica 
igual a 238 u, apresenta número atômico 92 (92 prótons e 92 elétrons), é um 
elemento natural e comum, muito mais abundante que a prata, abundância comparável
 à do molibdênio e arsênio, porém, quatro vezes menos abundante que o tório
  (ver: Reator de tório).[1]`;
 
const conjuntoDeDadosDeEntrada: DadosEntrada = {
  conteudo: texto,
  metadata: {
    id: geradorDeId(),
    url: "",
  },
};

const codificacao = tk.get_encoding("cl100k_base");
const conteudoTokenizado = new Uint32Array(codificacao.encode(conjuntoDeDadosDeEntrada.conteudo));

function geradorDeId(): string {
  return randomUUID();
}

const dadosParaSalvamento: BancoVetorial = {
  id: geradorDeId(),
  conteudo: texto,
  metadata_id: conjuntoDeDadosDeEntrada.metadata.id,
  metadata_url: conjuntoDeDadosDeEntrada.metadata.url,
  vetor: JSON.stringify(Array.from(conteudoTokenizado)),
};

const bancoDeDados = new BancoDeDados();
async function salvar() {
  try {
    await bancoDeDados.save(dadosParaSalvamento)
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
  }
}

async function buscar() {
  try {
    const dados = await bancoDeDados.load();
    console.log("Dados encontrados:", dados);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

salvar();

setTimeout(() => {
  buscar();
}, 2000);

