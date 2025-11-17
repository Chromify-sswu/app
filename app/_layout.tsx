// app/_layout.tsx
import "react-native-reanimated";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, Text } from "react-native";

// 공통 뒤로가기 버튼 (히스토리 없으면 홈으로)
function BackButton() {
  const router = useRouter();
  const onPress = () => {
    if (router.canGoBack?.()) router.back();
    else router.replace("/"); // 루트(index)로 이동
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 4,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
      }}
    >
      <Text
        style={{
          color: "#111827",
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        ← 뒤로
      </Text>
    </Pressable>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#FFFFFF" }, // 흰색 헤더
          headerTintColor: "#000000", // 기본 아이콘/텍스트 색
          headerTitleStyle: { fontWeight: "700", color: "#000000" },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      >
        {/* 홈 (첫 화면) — 뒤로가기 숨김 */}
        <Stack.Screen
          name="index"
          options={{
            title: "홈",
            headerLeft: () => null, // ✅ 첫 화면은 뒤로가기 버튼 없음
          }}
        />

        {/* 테스트 선택 */}
        <Stack.Screen name="test-local" options={{ title: "색각 테스트 선택" }} />

        {/* 색각 테스트 선택 */}
        <Stack.Screen name="test-config" options={{ title: "문항수 설정" }} />

        {/* 색각 테스트 진행 */}
        <Stack.Screen name="test-run" options={{ title: "색각 테스트" }} />

        {/* 테스트 결과 */}
        <Stack.Screen name="test-result" options={{ title: "테스트 결과" }} />

        {/* 카메라 생성 로딩 */}
        <Stack.Screen
          name="camera-loading"
          options={{ title: "카메라", headerShown: false }}
        />

        {/* 카메라 */}
        <Stack.Screen name="camera" options={{ title: "카메라" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
