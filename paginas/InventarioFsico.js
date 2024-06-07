import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const InventarioFisico = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);
  const [isScannerActive, setIsScannerActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(currentData => [...currentData, { type, data }]);
    alert(`Código escaneado de tipo ${type} con valor: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permiso de la cámara no concedido</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
        {isScannerActive && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        )}
        <Button title={isScannerActive ? "Cerrar Scanner" : "Comenzar a Escanear"} 
                onPress={() => {
                  setIsScannerActive(!isScannerActive);
                  setScanned(false);
                }} />
        {scanned && <Button title={"Escanear de nuevo"} onPress={() => setScanned(false)} />}
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Datos Escaneados</Text>
        {scannedData.map((item, index) => (
          <Text key={index}>{item.type} - {item.data}</Text>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Inventario')}>
          <Icon name="clipboard" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('InventarioFisico')}>
          <Icon name="dropbox" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Opciones')}>
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
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#9EAB8F'
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9EAB8F',
    height: 80,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  footerLogo: {
    width: 50,
    height: 50,
  },
});

export default InventarioFisico;
