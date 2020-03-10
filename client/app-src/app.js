import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../css/stylesheet.css';
import '../node_modules/reflect-metadata/Reflect.js'
import { NegociacaoController } from './controllers/NegociacaoController';
import { Negociacao } from './domain';

const controller = new NegociacaoController();
const negociacao = new Negociacao(new Date(), 1, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'POST';

const config = {
    method,
    headers,
    body
}

fetch(`${ SERVICE_URL }/negociacoes`, config).then(() => console.log('Dado enviado com sucesso'));
