import React from 'react'
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'

export default function Detail () {
  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident
  const valueIncident = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(incident.value)
  const msg = `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${valueIncident}`
  function navigateBack () {
    navigation.goBack()
  }
  function sendMail () {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: msg
    })
  }

  function sendWhatsapp () {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${msg}`)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#e02041' />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{valueIncident}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitlhe}>Salve o dia!</Text>
        <Text style={styles.heroTitlhe}>Seja o heroi desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
