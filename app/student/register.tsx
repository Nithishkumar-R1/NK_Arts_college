import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
  const router = useRouter();

  // State for student info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleRegister = () => {
    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      return Alert.alert("Error", "First Name, Last Name, Email and Password are required");
    }

    const student = {
      first_name: firstName,
      last_name: lastName,
      father_name: fatherName,
      dob,
      age,
      gender,
      department,
      email,
      password,
      address,
      city,
    };

    fetch("http://127.0.0.1:8000/api/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Alert.alert("Success", "Student registered successfully");
          router.push("/student/studentlist"); // Navigate to Students screen
        } else {
          Alert.alert("Error", data.message);
        }
      })
      .catch((err) => Alert.alert("Error", err.message));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register Student</Text>

      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Father Name" value={fatherName} onChangeText={setFatherName} style={styles.input} />
      <TextInput placeholder="DOB (YYYY-MM-DD)" value={dob} onChangeText={setDob} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={styles.input} />
      <TextInput placeholder="Department" value={department} onChangeText={setDepartment} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="City" value={city} onChangeText={setCity} style={styles.input} />

      <Button title="Register" onPress={handleRegister} color="#7a0d0def" />
      <View style={{ height: 20 }} />
      <Button title="Back to Login" onPress={() => router.push("/")} color="#7a0d0def"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 12, borderRadius: 5 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});
