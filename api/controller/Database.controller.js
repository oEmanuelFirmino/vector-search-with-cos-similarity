"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BancoDeDados = void 0;
const promises_1 = require("fs/promises");
class BancoDeDados {
    constructor() {
        this.dataPath = 'data.json';
    }
    save(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let existingData = yield this.load();
                existingData.push(dados);
                yield (0, promises_1.writeFile)(this.dataPath, JSON.stringify(existingData, null, 2));
                console.log('Dados salvos com sucesso');
            }
            catch (error) {
                console.error('Erro ao salvar dados:', error);
            }
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = yield (0, promises_1.readFile)(this.dataPath, 'utf-8');
                return JSON.parse(fileContent);
            }
            catch (error) {
                return [];
            }
        });
    }
}
exports.BancoDeDados = BancoDeDados;
