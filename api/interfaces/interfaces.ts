export interface BancoDeDadosRepositorio {
  salvar(dados: BancoVetorial): Promise<void>;
  carregar(): Promise<any>;
}

export interface BancoVetorial {
  id: string;
  conteudo: string;
  metadata_id: string;
  metadata_url: string;
  vetor: string;
  similarity?: number;
}

export interface DocumentoComSimilaridade extends BancoVetorial {
  similarity: number;
}

export interface DadosEntrada {
  conteudo: string;
  metadata: {
    id: string;
    url: string;
  };
};