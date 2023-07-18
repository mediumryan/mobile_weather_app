import styled from "styled-components/native";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function App() {
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState(null);
  const currentDate = moment().format("YYYY-MM-DD");
  const API_KEY = "30a223157b4e106a3d4631fa76a27b4a";

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <MainContainer>
      {!days ? (
        <ActivityIndicator size="large" color="#00ff00" style={{ flex: 1 }} />
      ) : (
        <>
          <TopContainer>
            <City>{days ? days.name : "Loading..."}</City>
          </TopContainer>
          <BottomContainer>
            <Date>{currentDate}</Date>
            <Temp>
              {days
                ? `${parseFloat(days.main.temp).toFixed(1)}°C`
                : "Loading..."}
            </Temp>
            <Weather>{days ? days.weather[0].main : "Loading..."}</Weather>
            <Description>
              {days ? days.weather[0].description : "Loading..."}
            </Description>
          </BottomContainer>
        </>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: violet;
`;

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: tomato;
`;

const City = styled.Text`
  font-size: 48px;
  font-weight: 600;
`;

const BottomContainer = styled.View`
  flex: 4;
  align-items: center;
  background-color: aquamarine;
`;

const Date = styled.Text`
  font-size: 28px;
  margin-top: 32px;
`;

const Temp = styled.Text`
  font-size: 128px;
  margin-top: 32px;
`;

const Weather = styled.Text`
  font-size: 50px;
  margin-top: 28px;
`;

const Description = styled.Text`
  font-size: 24px;
  margin-top: 14px;
`;
