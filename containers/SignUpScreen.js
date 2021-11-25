import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showPassAgain, setShowPassAgain] = useState(false);

  const handleSubmit = async () => {
    if (password !== password2) {
      setError("Passwords do not match.");
    } else if (
      email.length === 0 ||
      username.length === 0 ||
      description.length === 0 ||
      password.length === 0
    ) {
      setError("Please fill in all fields.");
    } else {
      const userData = {
        email: email,
        username: username,
        description: description,
        password: password,
      };
      console.log(userData);
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          userData
        );
        console.log(response.data);
        setToken(response.data.token);
        alert("Succesfully signed up.");
      } catch (error) {
        console.log(error.message);
        console.log(error.response.status);
        console.log(error.response.data);
        if (
          error.response.data.error === "This email already has an account."
        ) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            height: 800,
            marginTop: 30,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/airbnb.png")}
            style={{
              backgroundColor: "white",
              height: 100,
              marginLeft: Platform.OS === "android" ? -20 : 0,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: "grey",
              opacity: 0.9,
              fontWeight: "900",
            }}
          >
            Sign Up
          </Text>
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
            placeholder="username"
            style={{
              margin: 25,
              borderBottomColor: "#EC6B73",
              borderBottomWidth: 0.8,
            }}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Describe yourself in a few words..."
            style={{
              borderColor: "#EC6B73",
              borderWidth: 1,
              height: 90,
              margin: 25,
              textAlignVertical: "top",
              padding: 6,
            }}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <View
            style={{
              margin: 25,
              borderBottomColor: "#EC6B73",
              borderBottomWidth: 0.8,

              flexDirection: "row",
              alignItem: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="password"
              secureTextEntry={!showPass}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Ionicons
              name="eye-outline"
              size={25}
              onPress={() => {
                setShowPass(!showPass);
              }}
            />
          </View>
          <View
            style={{
              margin: 25,
              borderBottomColor: "#EC6B73",
              borderBottomWidth: 0.8,
              flexDirection: "row",
              alignItem: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="confirm password"
              secureTextEntry={!showPassAgain}
              onChangeText={(text) => setPassword2(text)}
              value={password2}
            />
            <Ionicons
              name="eye-outline"
              size={25}
              onPress={() => {
                setShowPassAgain(!showPassAgain);
              }}
            />
          </View>
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
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
              handleSubmit();
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
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={{ marginTop: -80 }}
          >
            <Text style={{ color: "grey", opacity: 0.8, textAlign: "center" }}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }}></View>
      </View>
    </ScrollView>
  );
}
