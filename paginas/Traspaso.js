import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Traspaso() {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [formData, setFormData] = useState({
    Propietario_Actual: '',
    Nuevo_Propietario: '',
   
  });

  const handleItemSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const isItemSelected = (index) => {
    return selectedItems.includes(index);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleConfirmUpdate = () => {
    // Aquí puedes manejar la lógica para actualizar los datos
    // Por ejemplo, enviar los datos a un servidor
    // y luego cerrar el modal
    setShowModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consulta</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user-circle" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Inventario')} // Navegar a "Inventario"
        >
          <Text style={styles.navButtonText}>ALTA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Baja')}
        >
          <Text style={styles.navButtonText}>BAJA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Consulta')}
        >
          <Text style={styles.navButtonText}>CONSULTA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Actualizar')}
        >
          <Text style={styles.navButtonText}>ACTUALIZAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={styles.navButtonText}>TRASPASO</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario de Búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por Marca, No. control, Responsable..."
        placeholderTextColor="#888"
        onChangeText={handleSearch}
        value={searchText}
      />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>No. Control</Text>
          <Text style={styles.tableHeaderText}>Equipo</Text>
          <Text style={styles.tableHeaderText}>Marca</Text>
          <Text style={styles.tableHeaderText}>No. de Serie</Text>
          <Text style={styles.tableHeaderText}>Cantidad</Text>
          <Text style={styles.tableHeaderText}>Responsable</Text>
          <Text style={styles.tableHeaderText}>Seleccionar</Text>
        </View>

        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>00001</Text>
            <Text style={styles.tableCell}>LAPTOP</Text>
            <Text style={styles.tableCell}>LENOVO</Text>
            <Text style={styles.tableCell}>11111111</Text>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>FULANO1</Text>
            <TouchableOpacity
              style={[styles.selectButton, isItemSelected(index) && styles.selected]}
              onPress={() => handleItemSelection(index)}
            >
              <Text style={styles.selectButtonText}>{isItemSelected(index) ? 'x' : 'o'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleShowModal}>
        <Text style={styles.deleteButtonText}>Traspasar</Text>
      </TouchableOpacity>

      {/* Nuevo Modal de Visualización */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Aquí va el formulario */}
            <Text style={styles.modalTitle}>Traspasar Equipo</Text>
            <TextInput
              placeholder="Actual Propietario"
              value={formData.noControl}
              onChangeText={(text) => setFormData({ ...formData, noControl: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Nuevo Propietario"
              value={formData.equipo}
              onChangeText={(text) => setFormData({ ...formData, equipo: text })}
              style={styles.input}
            />
            {/* Botones del modal */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmUpdate}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      paddingHorizontal: 15,
      paddingVertical: 10,
      justifyContent: 'space-between',
    },
    table: {
      marginTop: 15,
      width: '100%',
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 10,
    },
    tableHeaderText: {
      width: '14%',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    tableCell: {
      width: '14%',
      textAlign: 'center',
      color: '#000',
    },
    deleteButton: {
      backgroundColor: '#000',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      marginVertical: 20,
    },
    deleteButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    modalButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    selectButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
    },
    selectButtonText: {
      color: '#000',
    },
    selected: {
      backgroundColor: '#000',
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20, 
      padding: 5, 
      marginTop: 20,
      marginBottom: 10,
      width: '80%', 
      color: '#000',
      backgroundColor: '#FFF', 
    },
    
    
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20, // Agregado para separar del navbar
    },
    title: {
      fontSize: 24,
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
      marginTop: 20,
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
      fontSize: 12, // Tamaño de fuente reducido
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 10, // Agregamos un espacio inferior
    },
    footerItem: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50, // Redondear los botones del footer
      backgroundColor: '#9EAB8F', // Color de fondo verde
      padding: 10,
      width: 65, // Reducimos el ancho del contenedor
      height: 70, // Ajustamos la altura del contenedor
    },
    footerLogo: {
      width: 50,
      height: 50,
    },
  });

export default Traspaso;