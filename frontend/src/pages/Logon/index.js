import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import celImg from '../../assets/OD.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('atId', id);
      localStorage.setItem('atName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="container-">
      <div className="logon-container">
        <img src={celImg} alt="smartphone" />
        <section className="form">
          <form onSubmit={handleLogin}>
            <h1>OrdemDigital</h1>
            <h1>Login</h1>

            <input 
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />

            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}
