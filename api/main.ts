import express from 'express';
import { Endpoints } from "./controller/Endpoints.controller"
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post("/api/save", async (req: express.Request, res: express.Response) => {
  const { conteudo, url } = req.body;

  await Endpoints.salvar(conteudo, url);

  res.status(201).send({ message: "Documento salvo com sucesso" });
});

app.post("/api/loadBySimilarity", async (req: express.Request, res: express.Response) => {
  const { conteudo } = req.body;

  console.log("Requisicao recebida");

  const documentos = await Endpoints.carregar(conteudo);

  res.send(documentos);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
