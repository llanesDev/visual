// paginas/AltaArchivo.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function AltaArchivo() {
  const navigation = useNavigation();
  const [tipoAlta, setTipoAlta] = useState('ARCHIVO');

  useEffect(() => {
    if (tipoAlta === 'MANUAL') {
      navigation.navigate('Inventario');
    }
  }, [tipoAlta]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ALTA POR ARCHIVO</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user-circle" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={styles.navButtonText}>ALTA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Baja')} // Navegar a "Baja"
        >
          <Text style={styles.navButtonText}>BAJA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>CONSULTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>ACTUALIZAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>TRASPASO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.labelSmall}>TIPO DE ALTA</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipoAlta}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoAlta(itemValue)}
          >
            <Picker.Item label="MANUAL" value="MANUAL" />
            <Picker.Item label="ARCHIVO" value="ARCHIVO" />
          </Picker>
        </View>

        <View style={styles.fileUpload}>
          <Text style={styles.label}>Subir Archivo:</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="cloud-upload" size={50} color="#000" />
            <Text style={styles.uploadButtonText}>Adjuntar Archivo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Inventario')}>
          <Icon name="clipboard" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('InventarioFisico')}>
          <Icon name="dropbox" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
        <Image source={require('./img/logo-small.png')} style={styles.footerLogo} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Reportes')}>
          <Icon name="file-text" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Etiquetas')}>
          <Icon name="qrcode" size={50} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#9EAB8F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  profileButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  navButton: {
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: '#000',
    borderRadius: 10,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  form: {
    marginTop: 20,
  },
  labelSmall: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  pickerWrapper: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 40,
  },
  fileUpload: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  uploadButtonText: {
    marginTop: 30,
    fontSize: 26,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLogo: {
    width: 50,
    height: 50,
  },
});

export default AltaArchivo;
