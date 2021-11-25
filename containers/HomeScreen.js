import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesone } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        setData(response.data);
        console.log(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const displayStars = (ratingValue) => {
    const tab = [];
    const isDecimal = !Number.isInteger(ratingValue);
    const flooredNum = Math.floor(ratingValue);

    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push(<FontAwesone name="star" size={24} color="gold" key={i} />);
      }
      if (ratingValue < i && tab.length < 5) {
        tab.push(<FontAwesone name="star" size={24} color="grey" key={i} />);
      }
      if (flooredNum === i && isDecimal) {
        tab.push(
          <FontAwesone name="half-star-empty" size={24} color="black" key={i} />
        );
      }
    }
    return tab;
  };

  return isLoading === true ? (
    <ActivityIndicator size="large" color="#00FF00" style={{ flex: 1 }} />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
            style={styles.container}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.bgImg}
            >
              <View style={styles.priceView}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </ImageBackground>
            <View style={styles.view}>
              <View style={{ flex: 1 }}>
                <Text>{item.title}</Text>
                <View style={styles.row}>{displayStars(3.5)}</View>
              </View>
              <Image
                style={styles.userImage}
                source={{ uri: item.user.account.photo.url }}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 30 },
  bgImg: {
    width: Dimensions.get("window").width * 0.9,
    height: 250,
    justifyContent: "flex-end",
  },
  priceView: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  priceText: {
    color: "white",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
  },
  view: {
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    marginTop: 15,
  },
  userImage: { width: 60, height: 60, borderRadius: 50, marginLeft: 12 },
});
