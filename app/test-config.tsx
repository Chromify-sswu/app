// app/test-config.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";

// test.tsx에서 넘겨준 type 값에 대한 설정
const TYPE_CONFIG = {
  "protan-red": {
    label: "Protan-적색맹",
    colors: ["#F5F5F5E3", "#F51F1F80"],
    horizontal: false,
  },
  "protan-green": {
    label: "Protan-녹색맹",
    colors: ["#F5F5F5E3", "#00800080"],
    horizontal: false,
  },
  "protan-blue": {
    label: "Protan-청색맹",
    colors: ["#F5F5F5E3", "#1F4EF580"],
    horizontal: false,
  },
  mix: {
    label: "mix-혼합",
    colors: [
                "#FF9A9E",
                "#FBCB99",
                "#FAFF9C",
                "#90F7EC",
                "#A18CD1",
              ], // RGB 가로 그라데이션
    horizontal: false,
  },
} as const;

type TypeKey = keyof typeof TYPE_CONFIG;

const MIN_QUESTIONS = 5;   // 최소 문항 수
const MAX_QUESTIONS = 30;  // 최대 문항 수

export default function TestConfigScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();

  // type 파라미터 파싱
  const rawType = params.type;
  let type: TypeKey = "protan-red";
  if (
    rawType === "protan-red" ||
    rawType === "protan-green" ||
    rawType === "protan-blue" ||
    rawType === "mix"
  ) {
    type = rawType;
  }
  const cfg = TYPE_CONFIG[type];

  // ✅ 문항 수 state로 관리
  const [questionCount, setQuestionCount] = useState<number>(20);

  const handleDecrease = () => {
    setQuestionCount((prev) => Math.max(MIN_QUESTIONS, prev - 1));
  };

  const handleIncrease = () => {
    setQuestionCount((prev) => Math.min(MAX_QUESTIONS, prev + 1));
  };

  const handleStart = () => {
    // 시작하기 → 첫 번째 문제로 이동하면서 total 같이 넘김
    router.push({
      pathname: "/test-run",
      params: {
        type,
        index: "1",
        total: String(questionCount),
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 0,
        }}
      >
        {/* 색각 카드 – 선택한 유형에 따라 색/텍스트 변경 */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={cfg.horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }}
          colors={cfg.colors}
          style={{
            borderColor: "#00000000",
            borderRadius: 20,
            borderWidth: 1,
            paddingHorizontal: 52,
            paddingVertical: 10,
            marginTop: 82,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              marginTop: 282,
              marginBottom: 28,
            }}
          >
            {cfg.label}
          </Text>
        </LinearGradient>

        {/* 문항 수 타이틀 */}
        <Text
          style={{
            color: "#656565",
            fontSize: 23,
            marginBottom: 20,
          }}
        >
          {"문항수"}
        </Text>

        {/* 문항 수 조절 영역 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          {/* - 버튼 (왼쪽 회색 버튼, 크기 업 + 화살표) */}
          <TouchableOpacity
            onPress={handleDecrease}
            activeOpacity={0.8}
            style={{
              width: 55,
              height: 50,
              marginRight: 23,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E5E5E5",
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#656565",
                fontSize: 26,
                fontWeight: "700",
              }}
            >
              {"‹"}
            </Text>
          </TouchableOpacity>

          {/* 현재 문항 수 */}
          <Text
            style={{
              color: "#656565",
              fontSize: 30,
              marginRight: 22,
            }}
          >
            {questionCount}
          </Text>

          {/* + 버튼 (오른쪽 회색 버튼, 크기 업 + 화살표) */}
          <TouchableOpacity
            onPress={handleIncrease}
            activeOpacity={0.8}
            style={{
              width: 55,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E5E5E5",
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#656565",
                fontSize: 26,
                fontWeight: "700",
              }}
            >
              {"›"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 아래 버튼들 */}
        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            marginBottom: 53,
            marginHorizontal: 32,
          }}
        >
          {/* 뒤로가기 */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#007AFF80",
              borderColor: "#1F4EF51A",
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 19,
              marginRight: 34,
            }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize:18,
              }}
            >
              {"뒤로가기"}
            </Text>
          </TouchableOpacity>

          {/* 시작하기 */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#007AFF80",
              borderColor: "#1F4EF51A",
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 19,
            }}
            onPress={handleStart}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
              }}
            >
              {"시작하기"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
