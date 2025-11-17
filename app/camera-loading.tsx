// app/camera-loading.tsx
import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

export default function CameraLoadingScreen() {
  const router = useRouter();

  // 회전 애니메이션용 값
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 무한 회전 애니메이션
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 잠깐 로딩 후 카메라 화면으로 이동
    const id = setTimeout(() => {
      router.replace("/camera");
    }, 1500);

    return () => clearTimeout(id);
  }, [router, spinValue]);

  // 0~1 → 0deg~360deg 로 변환
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 회전하는 꽃/프로펠라 이미지 */}
        <Animated.Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/VTQ5rAjGxq/9w9gmdy8_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            width: 294,
            height: 297,
            marginBottom: 72,
            transform: [{ rotate: spin }],
          }}
        />

        <Text
          style={{
            color: "#656565",
            fontSize: 20,
            textAlign: "center",
            width: 255,
          }}
        >
          {"당신의 색각 프로필을\n AI 카메라에 적용하고 있습니다"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
