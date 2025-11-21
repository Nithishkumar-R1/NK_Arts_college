import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      return Alert.alert("Error", "Email and Password are required");
    }

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Alert.alert("Success", "Login successful");
          router.push("/student/studentlist"); // Navigate to Students screen
        } else {
          Alert.alert("Error", data.message);
        }
      })
      .catch((err) => Alert.alert("Error", err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} color="#7a0d0def" />
      <View style={{ height: 20 }} />
      <Button title="Register" onPress={() => router.push("/student/register")} color="#7a0d0def"/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 12, borderRadius: 5 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});
