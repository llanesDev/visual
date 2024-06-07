import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg"; // Importar la librería
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text,Button, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Asegúrate de importar useNavigation



const Etiquetas = () => {
  const navigation = useNavigation();
  const [dataFrom, setDataFrom] = useState({
    folio: "",
    descripcion: "",
    numeroSerie: "",
  });
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");

  const handleChange = (key, value) => {
    setDataFrom((prevData) => ({ ...prevData, [key]: value }));
  };

  const generateQRCode = () => {
    const dataString = JSON.stringify(dataFrom);

    if (dataString) {
      setQrCodeVisible(true);
      setQrCodeData(dataString);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Datos para el QR</Text>
          <TextInput
            style={styles.input}
            placeholder="Folio de control"
            value={dataFrom.folio}
            onChangeText={(text) => handleChange("folio", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Numero de serie"
            value={dataFrom.numeroSerie}
            onChangeText={(number) => handleChange("numeroSerie", number)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción del articulo"
            value={dataFrom.descripcion}
            onChangeText={(text) => handleChange("descripcion", text)}
          />
        </View>

        <Button color="#1E90FF" title="Generar Qr" onPress={generateQRCode} />
      </View>

      {qrCodeVisible && (
        <View style={styles.qrContainer}>
          <QRCode value={qrCodeData} size={300} />
          <Button
            color="#1E90FF"
            title="Cerrar Qr"
            onPress={() => setQrCodeVisible(false)}
          />
        </View>
      )}
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
      <StatusBar />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Importante para asegurar que el ScrollView pueda "crecer" según su contenido
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#9EAB8F'
  },
  formContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#4a4a4a",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  qrContainer: {
    alignItems: "center",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9EAB8F', // Color de fondo especificado
    height: 80, // Altura del footer
    
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  footerIcon: {
    width: 30, // Ancho del ícono, ajusta según necesidad
    height: 30, // Altura del ícono, ajusta según necesidad
    resizeMode: 'contain', // Asegura que el ícono se escale de manera adecuada
  },
  footerLogo: {
    width: 50,
    height: 50,
    
  },
});


export default Etiquetas;
