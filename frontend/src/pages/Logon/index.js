import React, { useState } from 'react'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Logon () {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handelerLogin (e) {
    e.preventDefault()
    const data = { id }
    try {
      const response = await api.post('sessions', data)
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (error) {
      alert('erro')
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />
        <form onSubmit={handelerLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder='Sua ID'
            value={id}
            onChange={e => setId(e.target.value)}
          ></input>
          <button className='button' type='submit'>
            Entrar
          </button>

          <Link to='/register' className='back-link'>
            <FiLogIn size={16} color='#E02041' /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt='Heroes' />
    </div>
  )
}
