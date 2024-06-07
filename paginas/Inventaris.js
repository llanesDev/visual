import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://10.41.118.31:3000';

function Inventario() {
  const navigation = useNavigation();
  const [tipoAlta, setTipoAlta] = useState('MANUAL');
  const [form, setForm] = useState({
    folio_control: '',
    descripcion: '',
    numero_serie: '',
    marca: '',
    cantidad: '',
    precio: '',
    ubicacion: '',
    estado: '',
    fecha_registro: '',
    fecha_baja: '',
    razon_baja: '',
    responsable_id: ''
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (tipoAlta === 'ARCHIVO') {
      navigation.navigate('altaarchivo');
    }
  }, [tipoAlta]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/articulo`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error fetching data. Please try again.');
    }
  };

  const validateInputs = () => {
    const { folio_control, descripcion, numero_serie, marca, cantidad, precio, ubicacion, estado, fecha_registro, responsable_id } = form;
    if (!folio_control || !descripcion || !numero_serie || !marca || !cantidad || !precio || !ubicacion || !estado || !fecha_registro || !responsable_id) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    return true;
  };

  const handleInputChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const addItem = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post(`${API_URL}/articulo`, form);
      setItems((prevItems) => [...prevItems, { ...form, id_articulo: response.data.id }]);
      setForm({
        folio_control: '',
        descripcion: '',
        numero_serie: '',
        marca: '',
        cantidad: '',
        precio: '',
        ubicacion: '',
        estado: '',
        fecha_registro: '',
        fecha_baja: '',
        razon_baja: '',
        responsable_id: ''
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo agregar el artículo. Inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>INVENTARIO</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user-circle" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={styles.navButtonText}>ALTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Baja')}>
          <Text style={styles.navButtonText}>BAJA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Consulta')}>
          <Text style={styles.navButtonText}>CONSULTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Actualizar')}>
          <Text style={styles.navButtonText}>ACTUALIZAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Traspaso')}>
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

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.labelSmall}>Folio Control:</Text>
            <TextInput
              style={styles.inputSmall}
              value={form.folio_control}
              onChangeText={(text) => handleInputChange('folio_control', text)}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.labelSmall}>Responsable ID:</Text>
            <TextInput
              style={styles.inputSmall}
              value={form.responsable_id}
              onChangeText={(text) => handleInputChange('responsable_id', text)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.labelSmall}>Marca:</Text>
            <TextInput
              style={styles.inputSmall}
              value={form.marca}
              onChangeText={(text) => handleInputChange('marca', text)}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.labelSmall}>Precio:</Text>
            <TextInput
              style={styles.inputSmall}
              value={form.precio}
              onChangeText={(text) => handleInputChange('precio', text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.labelSmall}>Número de Serie:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.numero_serie}
          onChangeText={(text) => handleInputChange('numero_serie', text)}
        />

        <Text style={styles.labelSmall}>Ubicación:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.ubicacion}
          onChangeText={(text) => handleInputChange('ubicacion', text)}
        />

        <Text style={styles.labelSmall}>Descripción:</Text>
        <TextInput
          style={styles.textareaSmall}
          value={form.descripcion}
          onChangeText={(text) => handleInputChange('descripcion', text)}
          multiline
        />

        <Text style={styles.labelSmall}>Cantidad:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.cantidad}
          onChangeText={(text) => handleInputChange('cantidad', text)}
          keyboardType="numeric"
        />

        <Text style={styles.labelSmall}>Estado:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.estado}
          onChangeText={(text) => handleInputChange('estado', text)}
        />

        <Text style={styles.labelSmall}>Fecha de Registro:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.fecha_registro}
          onChangeText={(text) => handleInputChange('fecha_registro', text)}
        />

        <Text style={styles.labelSmall}>Fecha de Baja:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.fecha_baja}
          onChangeText={(text) => handleInputChange('fecha_baja', text)}
        />

        <Text style={styles.labelSmall}>Razón de Baja:</Text>
        <TextInput
          style={styles.inputSmall}
          value={form.razon_baja}
          onChangeText={(text) => handleInputChange('razon_baja', text)}
        />

        <TouchableOpacity style={styles.captureButton} onPress={addItem}>
          <Text style={styles.captureButtonText}>Capturar</Text>
        </TouchableOpacity>
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
    marginTop: 1,
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
    fontSize: 12, // Texto más pequeño
  },
  form: {
    marginTop: -5,
  },
  labelSmall: {
    fontSize: 14, // Tamaño de fuente más pequeño
    color: '#000',
    marginBottom: 10,
  },
  pickerWrapper: {
    height: 40, // Ajustar la altura del contenedor del picker
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center', // Centrar el picker verticalmente
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 40, // Reducir la altura del picker
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputSmall: {
    height: 30, // Altura más pequeña
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5, // Borde más redondeado
    marginBottom: 10, // Menos espacio debajo del campo
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  textareaSmall: {
    height: 50, // Reducir la altura del textarea
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  captureButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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

export default Inventario;
