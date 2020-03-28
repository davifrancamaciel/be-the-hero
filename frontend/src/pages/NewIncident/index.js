import React, { useState } from 'react'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link ,useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

export default function NewIncident () {
  const history = useHistory()
  const ongId = localStorage.getItem('ongId')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleNewincident (e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (error) {
      alert("Erro ao cadastrar o caso tente novamente")
    }
  }

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>Cadastar umnovo caso</h1>
          <p>
            Descreva detalhadamente um caso para encontrar um heroi para
            resolver isso.
          </p>
          <Link to='/profile' className='back-link'>
            <FiArrowLeft size={16} color='#E02041' /> voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewincident}>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Titulo do caso'
          />
          <textarea
            placeholder='Descrição'
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input
            type='tel'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Valor em reais'
          />

          <button type='submit' className='button'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
