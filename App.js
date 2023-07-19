import styled from "styled-components/native";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
          <Horizontal />
          <BottomBox horizontal pagingEnabled>
            <BottomContainer>
              <Date>{currentDate}</Date>
              <Temp>
                {days
                  ? `${parseFloat(days.main.temp).toFixed(1)}°C`
                  : "Loading..."}
              </Temp>
              <Fontisto
                name="lightning"
                size={48}
                color="white"
                style={{ marginLeft: 24, marginTop: 24 }}
              />
              <Weather>{days ? days.weather[0].main : "Loading..."}</Weather>
              <Description>
                {days ? days.weather[0].description : "Loading..."}
              </Description>
            </BottomContainer>
            <BottomContainer>
              <Date>{currentDate}</Date>
              <Temp>
                {days
                  ? `${parseFloat(days.main.temp).toFixed(1)}°C`
                  : "Loading..."}
              </Temp>
              <Fontisto
                name="cloudy"
                size={48}
                color="white"
                style={{ marginLeft: 24, marginTop: 24 }}
              />
              <Weather>{days ? days.weather[0].main : "Loading..."}</Weather>
              <Description>
                {days ? days.weather[0].description : "Loading..."}
              </Description>
            </BottomContainer>
            <BottomContainer>
              <Date>{currentDate}</Date>
              <Temp>
                {days
                  ? `${parseFloat(days.main.temp).toFixed(1)}°C`
                  : "Loading..."}
              </Temp>
              <Fontisto
                name="day-sunny"
                size={48}
                color="white"
                style={{ marginLeft: 24, marginTop: 24 }}
              />
              <Weather>{days ? days.weather[0].main : "Loading..."}</Weather>
              <Description>
                {days ? days.weather[0].description : "Loading..."}
              </Description>
            </BottomContainer>
            <BottomContainer>
              <Date>{currentDate}</Date>
              <Temp>
                {days
                  ? `${parseFloat(days.main.temp).toFixed(1)}°C`
                  : "Loading..."}
              </Temp>
              <Fontisto
                name="rains"
                size={48}
                color="white"
                style={{ marginLeft: 24, marginTop: 24 }}
              />
              <Weather>{days ? days.weather[0].main : "Loading..."}</Weather>
              <Description>
                {days ? days.weather[0].description : "Loading..."}
              </Description>
            </BottomContainer>
          </BottomBox>
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
`;

const City = styled.Text`
  font-size: 48px;
  font-weight: 600;
  color: white;
`;

const Horizontal = styled.View`
  width: 100%;
  flex: 0.05;
  background-color: white;
`;

const BottomBox = styled.ScrollView`
  flex: 4;
`;

const BottomContainer = styled.View`
  width: ${SCREEN_WIDTH};
`;

const Date = styled.Text`
  font-size: 28px;
  margin-top: 32px;
  margin-left: 24px;
  color: white;
`;

const Temp = styled.Text`
  font-size: 72px;
  margin-top: 32px;
  color: white;
  margin-left: 24px;
`;

const Weather = styled.Text`
  font-size: 50px;
  margin-top: 28px;
  color: white;
  margin-left: 24px;
`;

const Description = styled.Text`
  font-size: 24px;
  margin-top: 14px;
  color: white;
  margin-left: 24px;
`;
