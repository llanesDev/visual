import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Discrepancias() {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [reportText, setReportText] = useState('');
  const [reports, setReports] = useState({});

  const handleItemSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleShowGenerateModal = (item) => {
    setCurrentItem(item);
    setShowGenerateModal(true);
  };

  const handleCloseGenerateModal = () => {
    setShowGenerateModal(false);
  };

  const handleShowViewModal = (item) => {
    setCurrentItem(item);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  const handleGenerateReport = () => {
    setReports({ ...reports, [currentItem]: reportText });
    setReportText('');
    handleCloseGenerateModal();
  };

  const items = [
    { control: '01001', equipo: 'LAPTOP', marca: 'LENOVO', serie: '1100001', Estado: 'N/E', responsable: 'N/E', ubicacion: 'N/E', descripcion: 'Equipo portátil, Procesador Intel core 5, 256 GB, 8 GB RAM, 2.70 Hz' },
    { control: '02002', equipo: 'DESKTOP', marca: 'DELL', serie: '2220002', Estado: 'N/E', responsable: 'N/E', ubicacion: 'N/E', descripcion: 'Equipo de escritorio, Procesador Intel core i7, 512 GB, 16 GB RAM, 3.20 Hz' },
    { control: '03003', equipo: 'IMPRESORA', marca: 'HP', serie: '333003', Estado: 'N/E', responsable: 'N/E', ubicacion: 'N/E', descripcion: 'Impresora láser, 1200 dpi, 20 ppm' },
    { control: '04004', equipo: 'PROYECTOR', marca: 'EPSON', serie: '444004', Estado: 'N/E', responsable: 'N/E', ubicacion: 'N/E', descripcion: 'Proyector HD, 3000 lúmenes, 1080p' },
    { control: '05005', equipo: 'TABLET', marca: 'SAMSUNG', serie: '555005', Estado: 'N/E', responsable: 'N/E', ubicacion: 'N/E', descripcion: 'Tablet, 10 pulgadas, 64 GB, 4 GB RAM' }
  ];
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reportes</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user-circle" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Reportes')}
        >
          <Text style={styles.navButtonText}>Actual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Faltantes')}
        >
        <Text style={styles.navButtonText}>Faltante</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={styles.navButtonText}>Discrepancias</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>No. Control</Text>
          <Text style={styles.tableHeaderText}>Equipo</Text>
          <Text style={styles.tableHeaderText}>Marca</Text>
          <Text style={styles.tableHeaderText}>No. de Serie</Text>
          <Text style={styles.tableHeaderText}>Estado</Text>
          <Text style={styles.tableHeaderText}>Responsable</Text>
          <Text style={styles.tableHeaderText}>Seleccionar</Text>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.control}</Text>
            <Text style={styles.tableCell}>{item.equipo}</Text>
            <Text style={styles.tableCell}>{item.marca}</Text>
            <Text style={styles.tableCell}>{item.serie}</Text>
            <Text style={styles.tableCell}>{item.Estado}</Text>
            <Text style={styles.tableCell}>{item.responsable}</Text>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => handleShowGenerateModal(item)}
                underlayColor="transparent"
              >
                <Image
                  source={require('./img/generar.png')}
                  style={styles.buttonImage}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => handleShowViewModal(item)}
                underlayColor="transparent"
              >
                <Image
                  source={require('./img/visualizar.png')}
                  style={styles.buttonImage}
                />
              </TouchableHighlight>
            </View>
          </View>
        ))}
      </View>

      {/* Modal de Generación */}
      <Modal visible={showGenerateModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Generar Reporte</Text>
            {currentItem && (
              <>
                <Text style={styles.modalText}>No. Control: {currentItem.control}</Text>
                <Text style={styles.modalText}>Equipo: {currentItem.equipo}</Text>
                <Text style={styles.modalText}>Marca: {currentItem.marca}</Text>
                <Text style={styles.modalText}>No. Serie: {currentItem.serie}</Text>
                <Text style={styles.modalText}>Responsable: {currentItem.responsable}</Text>
                <Text style={styles.modalText}>Ubicación: {currentItem.ubicacion}</Text>
                <Text style={styles.modalText}>Descripción: {currentItem.descripcion}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe el reporte aquí (máx. 500 palabras)"
                  multiline
                  numberOfLines={4}
                  maxLength={2500}
                  value={reportText}
                  onChangeText={setReportText}
                />
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleGenerateReport}>
                    <Text style={styles.modalButtonText}>Generar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleCloseGenerateModal}>
                    <Text style={styles.modalButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de Visualización */}
      <Modal visible={showViewModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reporte</Text>
            {currentItem && (
              <>
                <Text style={styles.modalText}>No. Control: {currentItem.control}</Text>
                <Text style={styles.modalText}>Equipo: {currentItem.equipo}</Text>
                <Text style={styles.modalText}>Marca: {currentItem.marca}</Text>
                <Text style={styles.modalText}>No. Serie: {currentItem.serie}</Text>
                <Text style={styles.modalText}>Responsable: {currentItem.responsable}</Text>
                <Text style={styles.modalText}>Ubicación: {currentItem.ubicacion}</Text>
                <Text style={styles.modalText}>Descripción: {currentItem.descripcion}</Text>
                <Text style={styles.modalText}>Reporte: {reports[currentItem] || 'No se ha generado un reporte para este equipo.'}</Text>
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleCloseViewModal}>
                    <Text style={styles.modalButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    paddingHorizontal: 10,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  table: {
    marginTop: 5,
    width: '101%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
  },
  tableHeaderText: {
    width: '14%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
    marginBottom: 1, // Agregado para separar del navbar
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
    marginTop: 1,
  },
  navButton: {
    paddingVertical: 8, // Reduce el padding vertical aquí
    paddingHorizontal: 20, // Reduce el padding horizontal aquí
    borderRadius: 5,
    marginHorizontal: 15, 
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
    marginBottom: 30, // Agregamos un espacio inferior
  },
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Redondear los botones del footer
    backgroundColor: '#9EAB8F', // Color de fondo verde
    padding: 5,
    width: 65, // Reducimos el ancho del contenedor
    height: 70, // Ajustamos la altura del contenedor
  },
  footerLogo: {
    width: 50,
    height: 50,
  },  
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      marginRight: 10, // Espacio entre los botones
    },
    buttonImage: {
      width: 25, // Ajusta el ancho de la imagen según sea necesario
      height: 25, // Ajusta la altura de la imagen según sea necesario
    },
});

export default Discrepancias;