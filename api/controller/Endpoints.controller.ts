import { randomUUID } from "crypto";
import { DadosEntrada, BancoVetorial, DocumentoComSimilaridade } from "../interfaces/interfaces";
import { BancoDeDados } from "./Database.controller";
import * as tk from "tiktoken";
import { SimilaridadeDeCosseno } from "../utils/SimilaridadeDeCosseno"

export class Endpoints {
  static async salvar(conteudo: string, url: string) {
    const conjuntoDeDadosDeEntrada: DadosEntrada = {
      conteudo: conteudo,
      metadata: {
        id: randomUUID(),
        url: url,
      },
    };

    const codificacao = tk.get_encoding("cl100k_base");
    const conteudoTokenizado = new Uint32Array(codificacao.encode(conjuntoDeDadosDeEntrada.conteudo));

    const conteudoTokenizadoArray = Array.from(conteudoTokenizado);
    const conteudoTokenizadoPadronizado = this.padOrTruncate(conteudoTokenizadoArray, 516);

    const dadosParaSalvamento: BancoVetorial = {
      id: randomUUID(),
      conteudo: conjuntoDeDadosDeEntrada.conteudo,
      metadata_id: conjuntoDeDadosDeEntrada.metadata.id,
      metadata_url: conjuntoDeDadosDeEntrada.metadata.url,
      vetor: JSON.stringify(conteudoTokenizadoPadronizado),
    };

    const bancoDeDados = new BancoDeDados();

    await bancoDeDados.salvar(dadosParaSalvamento);
  };


  static async carregar(conteudo: string): Promise<any> {
    const codificacao = tk.get_encoding("cl100k_base");
    const conteudoTokenizado = new Uint32Array(codificacao.encode(conteudo));
    const conteudoTokenizadoArray: number[] = Array.from(conteudoTokenizado);

    const bancoDeDados = new BancoDeDados();
    const documentos = await bancoDeDados.carregar();

    const documentosComSimilaridade: DocumentoComSimilaridade[] = [];
    const documentoDeEntrada = [{}];

    for (const documento of documentos) {
      const vetorBanco = JSON.parse(documento.vetor);
      const tamanhoVetorBanco = vetorBanco.length;

      const conteudoTokenizadoPadronizado = this.padOrTruncate(conteudoTokenizadoArray, tamanhoVetorBanco);
      console.log("Banco:", tamanhoVetorBanco, "Vetor de entrada", conteudoTokenizadoPadronizado.length);
      console.log("Banco:", vetorBanco, "Vetor de entrada", conteudoTokenizadoPadronizado);
      const similaridade = SimilaridadeDeCosseno.calcular(vetorBanco, conteudoTokenizadoPadronizado);

      documentoDeEntrada.push(conteudoTokenizadoPadronizado);

      documentosComSimilaridade.push({
        ...documento,
        similarity: similaridade
      } as DocumentoComSimilaridade);
    };

    const documentosOrdenados = documentosComSimilaridade.sort((a, b) => b.similarity - a.similarity)

    const saida = {
      documentos: documentosOrdenados,
      documentoDeEntrada: documentoDeEntrada[1],
    }

    return saida;
  }

  static padOrTruncate(tensor: number[], targetSize: number): number[] {
    if (!Array.isArray(tensor)) {
      throw new Error('O tensor deve ser um array');
    }

    if (targetSize < 0) {
      throw new Error('O tamanho alvo deve ser positivo');
    }

    if (tensor.length === targetSize) {
      return [...tensor];
    }

    if (tensor.length < targetSize) {
      return [...tensor, ...new Array(targetSize - tensor.length).fill(0)];
    }
    console.log(tensor.slice(0, targetSize));
    return tensor.slice(0, targetSize);
  }
}
