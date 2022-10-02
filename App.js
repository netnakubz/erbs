import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Button,
  LogBox
} from 'react-native';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import ListChat from './pages/ListChat';
import 'react-native-gesture-handler';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
//Screen
import { Navbar } from './components/Navbar';
import { HomeScreen } from './pages/HomeScreen';
import { LikeScreen } from './pages/LikeScreen';
import { PersonalScreen } from './pages/ProfileScreen';
import { BottomNavigation, Text } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProductPage } from './pages/ProductPage';
import DirectMessage from './pages/DirectMessage';
import LendPage from './pages/LendPage';
import PickerItemLendRent from './pages/PickerItemLendRent';
import { EditUserProfile } from './pages/EditUserProfile';
import { MyItem } from "./pages/MyItem";
import { AddItem } from './pages/AddItem';
import { Category } from './pages/Category';
import { EquipmentSettings } from './pages/EquipmentSettings';
import { RentPage } from './pages/RentPage';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import * as ImagePicker from 'expo-image-picker'
import { useEffect } from 'react';
import API from './env/API';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { FirstContract } from './pages/FirstContract';
import { SecContract } from './pages/SecContract';
import { Receipt } from './pages/Receipt';
import { FirstPage } from './pages/FirstPage';
import { SaveReceipt } from './pages/SaveReceipt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUp } from './pages/SignUp';
const MusicRoute = () => <Text style={{ color: "green" }}>Music</Text>;

const AlbumsRoute = () => <Text style={{ color: "green" }}>Albums</Text>;

const RecentsRoute = () => <Text style={{ color: "green" }}>Recents</Text>;
const BottomNav = () => {
  const [homePage, setHomePage] = useState(true);
  const navigation = useNavigation();
  const checktoken = async () => {
    let token = await AsyncStorage.getItem("token");
    // await AsyncStorage.clear("token")
    if (token === null) {
      navigation.navigate("firstPage");
    }
  }
  useEffect(() => {
    checktoken();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Like') {
            iconName = 'heart-outline';
          } else if (route.name === 'PersonalScreen') {
            iconName = 'person-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          }
          if (focused) {
            color = '#FF6280';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: "absolute", bottom: 0, left: 0, right: 0,
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen name="Home" options={{ headerShown: false }}
        listeners={() => ({
          tabPress: (e) => {
            if (e.type === "tabPress") {
              setHomePage(true);
            }
          }
        })}
        children={props => <HomeScreen isHomePage={homePage} setHomeFalse={setHomePage}  {...props} />}
      />
      <Tab.Screen name="Like" options={{ title: "สิ่งที่ฉันถูกใจ" }} component={LikeScreen} />
      <Tab.Screen name="Chat" options={{ headerShown: false }} component={ListChat} />
      <Tab.Screen name="PersonalScreen" component={PersonalScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  LogBox.ignoreAllLogs()
  const [login, isLogin] = useState(false);

  useEffect(() => {
    // AsyncStorage.clear();
    // API.auth();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // React.useEffect(() => {
  //   const getPermission = async () => {
  //     let result = await ImagePicker.getCameraPermissionsAsync();
  //     console.log(result);
  //   }
  //   getPermission();
  // }, []);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen component={BottomNav} options={{ headerShown: false }} name="BottomNav" />
          <Stack.Screen component={ProductPage} name="ProductPage" />
          <Stack.Screen component={DirectMessage} name="DirectMessage" />
          <Stack.Screen component={LendPage} name="LendPage" options={{ title: "โพสต์ปล่อยเช่า" }} />
          <Stack.Screen component={RentPage} name="RentPage" options={{ title: "โพสต์ขอยืม" }} />
          <Stack.Screen component={PickerItemLendRent} name="PickerItemLendRent" />
          <Stack.Screen component={EditUserProfile} name="EditUserProfile" />
          <Stack.Screen component={MyItem} name="MyItem" options={{ title: "อุปกรณ์ของฉัน" }} />
          <Stack.Screen component={AddItem} name="AddItem" options={{ title: "เพิ่มอุปกรณ์" }} />
          <Stack.Screen component={Category} name="Category" options={{ title: "หมวดหมู่" }} />
          <Stack.Screen component={FirstContract} name="firstContract" options={{ title: "ข้อตกลง" }} />
          <Stack.Screen component={SecContract} name="secContract" options={{ title: "ข้อตกลง" }} />
          <Stack.Screen component={EquipmentSettings} name="EquipmentSettings" options={{ title: "ตั้งค่าอุปกรณ์" }} />
          <Stack.Screen component={SaveReceipt} name="SaveReceipt" />
          <Stack.Screen component={Receipt} name="ใบเสร็จ" />
          <Stack.Screen component={SignUp} options={{ headerShown: false }} name="SignUp" />
          <Stack.Screen component={FirstPage} name="firstPage" options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  card: {
    padding: 10,
  },
  chatName: {
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    marginTop: 10,
    flex: 1,
  }
});
