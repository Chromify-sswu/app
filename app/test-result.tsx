// app/test-result.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ColorValue, // ✅ ColorValue 타입 사용
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";

// ✅ 색각 유형별 기본 색상 세트 (튜플 타입으로 명시)
const TYPE_COLORS: Record<"red" | "green" | "blue", [ColorValue, ColorValue]> = {
  red: ["#F5F5F5E3", "#F51F1F80"],
  green: ["#F5F5F5E3", "#00800080"],
  blue: ["#F5F5F5E3", "#1F4EF580"],
};

export default function TestResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    type?: string;
    score?: string;       // 예: "27"
    reliability?: string; // 예: "92"
  }>();

  // 기본값 세팅
  const type = params.type ?? "protan-red";
  const score = params.score ?? "27";
  const reliability = params.reliability ?? "92";

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
        {/* 헤더 */}
        <Text
          style={{
            color: "#656565",
            fontSize: 30,
            marginTop: 27,
            marginBottom: 18,
          }}
        >
          {"테스트 결과"}
        </Text>

        <Text
          style={{
            color: "#9b8d8dff",
            fontSize: 14,
            textAlign: "center",
            marginBottom: 37,
            width: 284,
          }}
        >
          {"본 테스트는 참고용 보조 도구로 설계되었으며,\n의료적 판단을 대신할 수 없습니다."}
        </Text>

        {/* 결과 박스 */}
        <View
          style={{
            paddingTop: 2,
            marginBottom: 35,
            marginHorizontal: 11,
            width: "100%",
          }}
        >
          {/* 적색 결과 */}
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderColor: "#00000000",
              borderRadius: 20,
              borderWidth: 1,
              marginBottom: 24,
              marginHorizontal: 19,
            }}
          >
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={TYPE_COLORS.red}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "#00000000",
                  borderRadius: 20,
                  borderWidth: 1,
                  paddingVertical: 21,
                  paddingHorizontal: 19,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                  }}
                >
                  {"적색"}
                </Text>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                  }}
                >
                  {`${score}%`}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* 녹색 결과 */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={TYPE_COLORS.green}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "#0080001A",
              borderRadius: 20,
              borderWidth: 1,
              paddingVertical: 21,
              paddingHorizontal: 19,
              marginBottom: 24,
              marginHorizontal: 19,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
              }}
            >
              {"녹색"}
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
              }}
            >
              {"미선택"}
            </Text>
          </LinearGradient>

          {/* 청색 결과 */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={TYPE_COLORS.blue}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "#1F4EF51A",
              borderRadius: 20,
              borderWidth: 1,
              paddingVertical: 21,
              paddingHorizontal: 19,
              marginHorizontal: 19,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
              }}
            >
              {"청색"}
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
              }}
            >
              {"미선택"}
            </Text>
          </LinearGradient>
        </View>

        {/* 해석 영역 */}
        <View
          style={{
            backgroundColor: "#F5F5F5E3",
            borderRadius: 10,
            paddingVertical: 40,
            paddingHorizontal: 31,
            marginBottom: 29,
            marginHorizontal: 36,
          }}
        >
          <Text
            style={{
              color: "#656565",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {`'적색(Protan)' 계열 색상에 대한 구분력은 일반 스펙트럼의 ${score}% 수준으로\n확인되었습니다. (신뢰도: ${reliability}%)`}
          </Text>
        </View>

        {/* 버튼 */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#007AFF80",
            borderColor: "#1F4EF51A",
            borderRadius: 10,
            borderWidth: 1,
            paddingVertical: 19,
            marginBottom: 61,
            marginHorizontal: 28,
            width: "50%",  
          }}
          onPress={() => router.replace("/camera-loading")}

        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
            }}
          >
            {"카메라 생성하기"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
