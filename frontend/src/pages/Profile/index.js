import React, { useEffect, useState } from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Profile (params) {
  const history = useHistory()
  const ongName = localStorage.getItem('ongName')
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    getItens()
  }, [])

  function getItens () {
    try {
      const ongId = localStorage.getItem('ongId')
      api
        .get('profile', {
          headers: {
            Authorization: ongId
          }
        })
        .then(resp => {
          setIncidents(resp.data)
        })
    } catch (error) {
      alert('erro')
    }
  }

  async function handleDeleteIncident (id) {
    try {
      const ongId = localStorage.getItem('ongId')
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      setIncidents(incidents.filter(x => x.id !== id))
    } catch (error) {
      alert('erro ao deletar caso')
    }
  }

  function handleLogout () {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Bem vinda {ongName}</span>
        <Link to='/incidents/new' className='button'>
          Cadastrar novo caso
        </Link>
        <button type='button' onClick={handleLogout}>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>
      <h1>Casos cadsatrados</h1>
      <ul>
        {incidents.map(i => (
          <li key={i.id}>
            <strong>CASO:</strong>
            <p>{i.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{i.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(i.value)}
            </p>
            <button type='button' onClick={() => handleDeleteIncident(i.id)}>
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
