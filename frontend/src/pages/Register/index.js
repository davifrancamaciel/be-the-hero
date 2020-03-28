import React, { useState } from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Register () {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory()

  async function rendlerRegister (e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }
    try {
      const response = await api.post('ongs', data)
      alert(`seu id de acesso ${response.data.id}`)
      history.push('/')
    } catch (error) {
      alert(`Erro`)
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude as pessoas a
            encotrarem os casos da sua ONG.
          </p>
          <Link to='/' className='back-link'>
            <FiArrowLeft size={16} color='#E02041' /> Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={rendlerRegister}>
          <input
            type='text'
            placeholder='Nome da ONG'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='tel'
            placeholder='Whatsapp'
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className='input-group'>
            <input
              type='text'
              placeholder='Cidade'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              type='text'
              placeholder='UF'
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button type='submit' className='button'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
