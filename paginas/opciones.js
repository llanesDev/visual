import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation para la navegación

function Opciones() {
  const navigation = useNavigation(); // Obtiene la instancia de navegación

  const handleInventoryPress = () => {
    // Navega a la página de "Inventario"
    navigation.navigate('Inventario');
  }

  const handlePhysicalInventoryPress = () => {
    // Navega a la página de "Inventario Físico"
    navigation.navigate('InventarioFisico');
  }

  const handleReportsPress = () => {
    // Navega a la página de "Reportes"
    navigation.navigate('Reportes');
  }

  const handleTagsPress = () => {
    // Navega a la página de "Etiquetas"
    navigation.navigate('Etiquetas');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>   SISTEMA DE INVENTARIO</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={handleInventoryPress}>
          <Icon name="clipboard" size={50} color="#000" />
          <Text style={styles.gridText}>INVENTARIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={handlePhysicalInventoryPress}>
          <Icon name="dropbox" size={50} color="#000" />
          <Text style={styles.gridText}>INVENTARIO FISICO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={handleReportsPress}>
          <Icon name="file-text" size={50} color="#000" />
          <Text style={styles.gridText}>REPORTES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={handleTagsPress}>
          <Icon name="qrcode" size={50} color="#000" />
          <Text style={styles.gridText}>ETIQUETAS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
        <Image source={require('./img/logo-small.png')} style={styles.footerLogo} resizeMode="contain" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EAB8F',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Agregar un margen superior al header
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10, // Agregar un margen superior al título
  },
  profileButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50, // Hace el fondo redondo
    padding: 5,
    position: 'relative',
    top: 0,
    right: 0, // Ajusta el botón de perfil a la derecha del contenedor del header
  },
  grid: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  gridItem: {
    width: '40%',
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  gridText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  footerLogo: {
    width: 50,
    height: 50, // Hacer el logo más pequeño
  },
});

export default Opciones;