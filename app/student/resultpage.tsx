import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get("window");

export default function WelcomePage() {
  const handleLogout = () => { router.replace("/") };

  // Slider logic
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const images = [
    require("../assets/NK collge.png"),
    require("../assets/nklibrary.png"),
    require("../assets/auditorium.png"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      setIndex(nextIndex);

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

    }, 3000);

    return () => clearInterval(interval);
  }, [index, images.length]);

  return (
    <View style={{ flex: 1 }}>
      <title>NK_COLLEGE</title>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.left}>
          <Image source={require('../assets/logo.png')} style={styles.logo}/>
          <Text style={styles.navtitle}>NK ARTS COLLEGE</Text>
        </View>
      </View>

      {/* FULL PAGE VERTICAL SCROLL */}
      <ScrollView style={{ flex: 1 }}>

        {/* IMAGE SLIDER */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slide}
          onScroll={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(newIndex);
          }}
          scrollEventThrottle={16}
        >
          {images.map((img, i) => (
            <Image key={i} source={img} style={styles.sliding_img} />
          ))}
        </ScrollView>

        {/* CONTENT SECTION */}
        <View style={styles.container}>
          <Text style={styles.title}>NK ARTS COLLEGE</Text>
          <Text style={styles.subtitle}>User Successfully logged in!</Text>

          <View style={styles.buttonContainer}>
            <Button title="Logout" onPress={handleLogout} color="#7a0d0def"/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar:{
    paddingTop:10,
    paddingHorizontal:20,
    paddingBottom:15,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"#eee",
    elevation:5
  },

  left:{ flexDirection:"row", alignItems:"center", flex:1 },
  right:{ flexDirection:"row", alignItems:"center", justifyContent:"flex-end", flex:1, gap:15 },
  logo:{ width:55, height:55, marginRight:10 },
  navtitle:{ fontSize:20, fontWeight:"bold",},

  slide:{
    width:"100%",
    height:500,
    backgroundColor:"#fff"
  },

  sliding_img:{
    width: Dimensions.get("window").width,
    height:500,
    resizeMode:"cover"
  },

  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:20,
    paddingVertical:40,
  },
  title:{ fontSize:28, fontWeight:"bold", color:"#000", marginBottom:10 },
  subtitle:{ fontSize:16, color:"#000", marginBottom:30 },
  buttonContainer:{ width:"50%" }
});
