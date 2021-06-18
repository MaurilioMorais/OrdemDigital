import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

export default function Register() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ats', data);

      alert(`Cadastrado com sucesso :)`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="-container-">
    <div className="register-container">
      <div className="content">
          <h1>Cadastro</h1>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome de usuário"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <input 
            placeholder="Nome da assistência"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#E02041" />
          Já tenho cadastro
        </Link>
      </div>
    </div>
    </div>
  );
}