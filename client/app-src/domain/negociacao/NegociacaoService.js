import { HttpService } from '../../util/HttpService';
import { Negociacao } from './Negociacao';
import { ApplicationException } from '../../util/ApplicationException';

export class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obtemNegociacacoesDaSemana() {
        return this._http.get(`${SERVICE_URL}/negociacoes/semana`).then(dados => {
                                const negociacoes = dados.map(objeto => {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                })
                             
                                return negociacoes;
                            }).catch(err => {
                                ApplicationException('Não foi possível obter as negociações');
                            })
    }

    obtemNegociacacoesDaSemanaAnterior() {
        return this._http.get(`${SERVICE_URL}/negociacoes/anterior`).then(dados => {
                                const negociacoes = dados.map(objeto => {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                })
                             
                                return negociacoes;
                            }).catch(err => {
                                ApplicationException('Não foi possível obter as negociações da semana anterior');
                            })
    }

    obtemNegociacacoesDaSemanaRetrasada() {
        return this._http.get(`${SERVICE_URL}/negociacoes/retrasada`).then(dados => {
                                const negociacoes = dados.map(objeto => {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                })
                             
                                return negociacoes;
                            }).catch(err => {
                                ApplicationException('Não foi possível obter as negociações da semana retrasada');
                            })
    }

    async obtemNegociacoesDoPeriodo() {
        try {
            let periodo = await Promise.all([
                this.obtemNegociacacoesDaSemana(),
                this.obtemNegociacacoesDaSemanaAnterior(),
                this.obtemNegociacacoesDaSemanaRetrasada()
            ]);

            return periodo
                    .reduce((novoArray, item) => novoArray.concat(item), [])
                    .sort((a, b) => b.data.getTime() - a.data.getTime());
        } catch(err) {
            ApplicationException('Não foi possível obter as negociações do período');
        }
    }
}