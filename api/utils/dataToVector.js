"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const crypto_1 = require("crypto");
const tk = __importStar(require("tiktoken"));
const Database_controller_1 = require("./Database.controller");
const texto = `O urânio é um elemento químico de símbolo U e de massa atômica 
igual a 238 u, apresenta número atômico 92 (92 prótons e 92 elétrons), é um 
elemento natural e comum, muito mais abundante que a prata, abundância comparável
 à do molibdênio e arsênio, porém, quatro vezes menos abundante que o tório
  (ver: Reator de tório).[1]`;
const conjuntoDeDadosDeEntrada = {
    conteudo: texto,
    metadata: {
        id: geradorDeId(),
        url: "",
    },
};
const codificacao = tk.get_encoding("cl100k_base");
const conteudoTokenizado = new Uint32Array(codificacao.encode(conjuntoDeDadosDeEntrada.conteudo));
function geradorDeId() {
    return (0, crypto_1.randomUUID)();
}
const dadosParaSalvamento = {
    id: geradorDeId(),
    conteudo: texto,
    metadata_id: conjuntoDeDadosDeEntrada.metadata.id,
    metadata_url: conjuntoDeDadosDeEntrada.metadata.url,
    vetor: JSON.stringify(Array.from(conteudoTokenizado)),
};
const bancoDeDados = new Database_controller_1.BancoDeDados();
function salvar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield bancoDeDados.save(dadosParaSalvamento);
        }
        catch (error) {
            console.error("Erro ao salvar dados:", error);
        }
    });
}
function buscar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dados = yield bancoDeDados.load();
            console.log("Dados encontrados:", dados);
        }
        catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    });
}
salvar();
setTimeout(() => {
    buscar();
}, 2000);
