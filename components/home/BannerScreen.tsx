import { BANNERS } from "@/assets/assets";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function BannerScreen() {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const slide = Math.ceil(
            e.nativeEvent.contentOffset.x /
            e.nativeEvent.layoutMeasurement.width,
          );
          if (slide !== activeBannerIndex) {
            setActiveBannerIndex(slide);
          }
        }}
      >
        {BANNERS.map((banner, index) => (
          <View key={index} style={styles.bannerWrapper}>
            <Image
              source={{ uri: banner.image }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.bannertext}>
              <Text style={styles.bannertitle}>{banner.title}</Text>
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
              <TouchableOpacity style={styles.Getbtn}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Get Now
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.overlay} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeBannerIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 18,
    backgroundColor: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 12,
  },
  Getbtn: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  bannertitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  bannerSubtitle: {
    color: "white",
    fontSize: 15,
  },
  bannertext: {
    position: "absolute",
    bottom: 20,
    left: 25,
    zIndex: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },

  bannerWrapper: {
    width: width,
    height: 200,
    paddingHorizontal: 16,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
});
