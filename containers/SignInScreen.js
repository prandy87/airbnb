import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (password.length === 0 || email.length === 0) {
      setError("Please fill in all fields.");
    } else {
      const userData = {
        email: email,
        password: password,
      };
      console.log(userData);
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          userData
        );
        console.log(response.data);
        setToken(response.data.token);
        alert("Succesfully logged in.");
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("401")) {
          setError("wrong email and/or password");
        }
      }
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            height: 400,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/airbnb.png")}
            style={{ backgroundColor: "white", height: 100, marginLeft: -20 }}
            resizeMode="contain"
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: "grey",
              opacity: 0.8,
              fontWeight: "900",
            }}
          >
            Sign In
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="email"
            style={{
              margin: 25,
              borderBottomColor: "#EC6B73",
              borderBottomWidth: 0.8,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={{
              margin: 25,
              borderBottomColor: "#EC6B73",
              borderBottomWidth: 0.8,
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
          <TouchableOpacity
            style={{
              marginTop: 40,
              border: "true",
              borderColor: "red",
              borderWidth: 2,
              borderRadius: 25,
              margin: 100,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",

              backgroundColor: "white",
            }}
            onPress={async () => {
              {
                handleSubmit();
              }
              // const userToken = "secret-token";
              // setToken(userToken);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "grey",
                opacity: 0.8,
                fontSize: 17,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={{ marginTop: -80 }}
          >
            <Text style={{ color: "grey", opacity: 0.8, textAlign: "center" }}>
              No account? Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }}></View>
      </View>
    </ScrollView>
  );
}
