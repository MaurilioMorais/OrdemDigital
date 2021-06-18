import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

export default function NovaOrdem() {
  const [cliente, setCliente] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const history = useHistory();

  const atId = localStorage.getItem('atId');

  async function handleNovaOrdem(e) {
    e.preventDefault();

    const data = {
      cliente, 
      marca, 
      modelo, 
      descricao, 
      valor,
    };

    try {
      await api.post('ordens', data, {
        headers: {
          Authorization: atId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="-container">
    <div className="nova-ordem-container">
      <div className="content">
        <section>
          <h1>Cadastrar nova Ordem</h1>
          
        </section>

        <form onSubmit={handleNovaOrdem}>
          <input 
            placeholder="Nome do Cliente"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
          />
          <input 
            placeholder="Marca"
            value={marca}
            onChange={e => setMarca(e.target.value)}
          />

          <input 
            placeholder="Modelo"
            value={modelo}
            onChange={e => setModelo(e.target.value)}
          />

          <textarea 
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />

          <input 
            placeholder="Custo"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
        <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
      </div>
    </div>
    </div>
  )
}