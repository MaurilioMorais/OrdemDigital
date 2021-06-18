import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [ordens, setOrdens] = useState([]);

  const history = useHistory();
  const atId = localStorage.getItem('atId');
  const atName = localStorage.getItem('atName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: atId,
      }
    }).then(response => {
      setOrdens(response.data);
    })
  }, [atId]);
  async function handleDeleteOrdem(id) {
    try {
      await api.delete(`ordens/${id}`, {
        headers: {
          Authorization: atId,
        }
      });

      setOrdens(ordens.filter(ordem => ordem.id !== id));
    } catch (err) {
      alert('Erro ao deletar ordem, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="container">
      <div className="header-container"> 
        <h1>OrdemDigital</h1>
        <div className="right-side">
        <Link className="button" to="/ordens/new">Cadastrar nova Ordem</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
        </div>
      </div>
      <div className="profile-container">
      

      <h1>Ordens cadastradas</h1>

      <ul>
        {ordens.map(ordem => (
          <li key={ordem.id}>

            <strong>Ordem:</strong>
            <p>{ordem.id}</p>

            <strong>Cliente:</strong>
            <p>{ordem.cliente}</p>

            <strong>Marca:</strong>
            <p>{ordem.marca}</p>

            <strong>Modelo:</strong>
            <p>{ordem.modelo}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{ordem.descricao}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ordem.valor)}</p>

            <button onClick={() => handleDeleteOrdem(ordem.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}