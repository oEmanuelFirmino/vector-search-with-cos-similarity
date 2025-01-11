import { writeFile, readFile } from 'fs/promises';
import { BancoDeDadosRepositorio, BancoVetorial } from '../interfaces/interfaces';

export class BancoDeDados implements BancoDeDadosRepositorio {
  private dataPath: string;

  constructor() {
    this.dataPath = './data.json'
  };

  public async salvar(dados: BancoVetorial): Promise<void> {
    try {
      console.log(
        'Antes de salvar:',
        JSON.stringify(dados, null, 2)
      );
      let existingData = await this.carregar();
      console.log(
        'Antes de salvar:',
        JSON.stringify(existingData, null, 2)
      );
      existingData.push(dados);

      await writeFile(this.dataPath, JSON.stringify(existingData, null, 2));
      console.log('Dados salvos com sucesso');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    };
  };

  public async carregar(): Promise<any[]> {
    try {
      const fileContent = await readFile(this.dataPath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      return [];
    };
  };
};
