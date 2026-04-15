import React, { useState } from "react";
import {
     View,
     Text,
     TextInput,
     TouchableOpacity,
     StyleSheet,
     ActivityIndicator,
     Alert,
} from "react-native";

const WeatherScreen = () => {
     const [city, setCity] = useState("");
     const [weather, setWeather] = useState(null);
     const [loading, setLoading] = useState(false);

     const API_KEY = "d3f28b9c6e5c9a2cb259a2c3e4e5b5c0";

     const getWeather = async () => {
          if (!city.trim()) {
               Alert.alert("Enter city name");
               return;
          }

          try {
               setLoading(true);

               const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
               );

               const data = await response.json();

               console.log(data); // DEBUG

               if (data.cod === "404") {
                    Alert.alert("City not found. Try Ahmedabad or Mumbai");
                    setWeather(null);
               } else {
                    setWeather(data);
               }
          } catch (error) {
               Alert.alert("Network error");
          }

          setLoading(false);
     };

     return (
          <View style={styles.container}>
               <View style={styles.card}>
                    <Text style={styles.title}>Weather App</Text>

                    <TextInput
                         placeholder="Enter city"
                         value={city}
                         onChangeText={setCity}
                         style={styles.input}
                         placeholderTextColor="#999"
                    />

                    <TouchableOpacity style={styles.button} onPress={getWeather}>
                         <Text style={styles.buttonText}>Check Weather</Text>
                    </TouchableOpacity>

                    {loading && (
                         <ActivityIndicator size="large" style={{ marginTop: 20 }} />
                    )}

                    {weather && weather.main && (
                         <View style={styles.result}>
                              <Text style={styles.city}>{weather.name}</Text>
                              <Text style={styles.temp}>
                                   {Math.round(weather.main.temp)}°C
                              </Text>
                              <Text style={styles.desc}>
                                   {weather.weather[0].description}
                              </Text>
                         </View>
                    )}
               </View>
          </View>
     );
};

export default WeatherScreen;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#4facfe",
          justifyContent: "center",
          alignItems: "center",
     },
     card: {
          width: "85%",
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 20,
          elevation: 6,
     },
     title: {
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
     },
     input: {
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 12,
          marginBottom: 15,
     },
     button: {
          backgroundColor: "#4facfe",
          padding: 14,
          borderRadius: 12,
     },
     buttonText: {
          textAlign: "center",
          color: "#fff",
          fontWeight: "bold",
     },
     result: {
          marginTop: 20,
          alignItems: "center",
     },
     city: {
          fontSize: 22,
          fontWeight: "bold",
     },
     temp: {
          fontSize: 40,
          fontWeight: "bold",
          color: "#4facfe",
     },
     desc: {
          fontSize: 16,
          textTransform: "capitalize",
     },
});