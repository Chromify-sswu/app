// app/index.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Text,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  // 시작 화면에서 다음 화면으로 이동
  const goNext = () => {
    router.push("/test-local"); // or replace("/test-local")
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* 화면 아무 곳이나(또는 나중에 버튼 부분만) 눌렀을 때 다음 페이지로 이동 */}
      <Pressable style={{ flex: 1 }} onPress={goNext}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              marginBottom: 254,
            }}
          >
            <ImageBackground
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/VTQ5rAjGxq/ncwyd927_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                alignItems: "flex-end",
              }}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/VTQ5rAjGxq/5nyph1sj_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={{
                  width: 138,
                  height: 289,
                  marginTop: 281,
                  marginBottom: 28,
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  bottom: 230,
                  right: 92,
                  left: 92,
                  color: "#656565",
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {"chromify"}
              </Text>
            </ImageBackground>

            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/VTQ5rAjGxq/llrb0cgf_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                position: "absolute",
                bottom: -254,
                right: 0,
                left: 0,
                height: 271,
              }}
            />
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}
