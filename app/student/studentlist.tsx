import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// ----------------- Student type -----------------
interface Student {
  id: number;
  first_name: string;
  last_name: string;
  father_name?: string;
  dob?: string;
  age?: number;
  gender?: string;
  department?: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
}

// ----------------- Component -----------------
export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});

  const API_BASE = "http://127.0.0.1:8000/api"; 

  // ---------------- FETCH STUDENTS ----------------
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const res = await axios.get<Student[]>(`${API_BASE}/students/`);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not fetch students");
    }
  };

  // ---------------- DELETE STUDENT ----------------
  const deleteStudent = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/student/delete/${id}/`);
      Alert.alert("Success", "Student deleted successfully");
      getStudents();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to delete student");
    }
  };

  // ---------------- START EDITING ----------------
  const startEditing = (student: Student) => {
    setEditingStudentId(student.id);
    setFormData(student);
  };

  // ---------------- SAVE STUDENT ----------------
  const saveStudent = async () => {
    if (!editingStudentId) return;
    try {
      await axios.put(`${API_BASE}/student/update/${editingStudentId}/`, formData);
      Alert.alert("Success", "Student updated successfully");
      setEditingStudentId(null);
      getStudents();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update student");
    }
  };

  // ---------------- RENDER EACH STUDENT ----------------
  const renderStudent = ({ item }: { item: Student }) => {
    const isEditing = item.id === editingStudentId;

    return (
      <View style={styles.row}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={formData.first_name}
              onChangeText={(text) => setFormData({ ...formData, first_name: text })}
            />
            <TextInput
              style={styles.input}
              value={formData.last_name}
              onChangeText={(text) => setFormData({ ...formData, last_name: text })}
            />
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TouchableOpacity onPress={saveStudent}>
              <Feather name="save" size={20} color="green" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.cell}>{item.first_name}</Text>
            <Text style={styles.cell}>{item.last_name}</Text>
            <Text style={styles.cell}>{item.email}</Text>
            <Text style={styles.cell}>{item.password}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEditing(item)}>
                <Feather name="edit" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteStudent(item.id)}>
                <Feather name="trash-2" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  // ---------------- MAIN RETURN ----------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students List</Text>

      {/* Table Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>First Name</Text>
        <Text style={styles.headerText}>Last Name</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Password</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
      />


      <View style={styles.login}>
      <TouchableOpacity style={styles.log} onPress={()=>router.replace("/student/resultpage")}>
      <Text style={styles.txt}>LOGIN</Text>
      <Feather name="log-in" size={20} color="green" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  header: { flexDirection: "row", backgroundColor:"#7a0d0def", paddingVertical: 8 },
  headerText: { flex: 1, textAlign: "center", fontWeight: "bold", color: "#fff" },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#ddd" },
  cell: { flex: 1, textAlign: "center", color: "#050000" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 5, textAlign: "center" },
  actions: { flexDirection: "row", justifyContent: "space-evenly", flex: 1 },
  log:{flexDirection: "row", gap:5},
  txt:{fontWeight:"bold"},
  login:{position: "absolute",top: 10,right: 15},
});
