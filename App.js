import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './WelcomePage';
import Opciones from './paginas/opciones';
import Inventario from './paginas/Inventaris';
import AltaArchivo from './paginas/AltaArchivo';
import ArchivoBaja from './paginas/baja'; 
import ArchivoConsulta from './paginas/Consulta';
import ArchivoActualizar from './paginas/Actualizar';
import ArchivoTraspaso from './paginas/Traspaso';
import ArchivoReportes from './paginas/Reportes';
import ArchivoFaltante from './paginas/Faltante';
import ArchivoDiscrepancias from './paginas/Discrepancias';
import Etiquetas from './paginas/Etiquetas';
import InventarioFisico from './paginas/InventarioFsico';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomePage} 
          options={{ title: 'Bienvenido', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Opciones" 
          component={Opciones} 
          options={{ title: 'Opciones', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Inventario" 
          component={Inventario} 
          options={{ title: 'Inventario', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="altaarchivo" 
          component={AltaArchivo} 
          options={{ title: 'Alta por Archivo', headerTitleAlign: 'center' }} 
        />
          <Stack.Screen 
          name="Baja" 
          component={ArchivoBaja} // Asigna la página de Baja como componente para la ruta "ArchivoBaja"
          options={{ title: 'Baja', headerTitleAlign: 'center' }} 
        />
          <Stack.Screen 
          name="Consulta" 
          component={ArchivoConsulta} // Asigna la página de Baja como componente para la ruta "ArchivoConsulta"
          options={{ title: 'Consulta', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Actualizar" 
          component={ArchivoActualizar} // Asigna la página de Baja como componente para la ruta "ArchivoActualizar"
          options={{ title: 'Actualizar', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Traspaso" 
          component={ArchivoTraspaso} // Asigna la página de Baja como componente para la ruta "ArchivoTraspaso"
          options={{ title: 'Traspaso', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Reportes" 
          component={ArchivoReportes} // Asigna la página de Baja como componente para la ruta "ArchivoReportes"
          options={{ title: 'Reportes', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Faltante" 
          component={ArchivoFaltante} // Asigna la página de Baja como componente para la ruta "ArchivoReportes"
          options={{ title: 'Faltante', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Discrepancias" 
          component={ArchivoDiscrepancias} // Asigna la página de Baja como componente para la ruta "ArchivoReportes"
          options={{ title: 'Discrepancias', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="Etiquetas" 
          component={Etiquetas}
          options={{ title: 'Etiquetas', headerTitleAlign: 'center' }} 
        />
        <Stack.Screen 
          name="InventarioFisico" 
          component={InventarioFisico}
          options={{ title: 'InventarioFisico', headerTitleAlign: 'center' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
