// app/test.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function TestScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<
    "protan-red" | "protan-green" | "protan-blue" | "mix" | null
  >(null);

  // ✅ 여기서 한 번만 정의
  const onNext = () => {
  if (!selected) return;
  router.push({
    pathname: "/test-config",
    params: { type: selected }, // ✅ 선택한 유형을 파라미터로 전달
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
          paddingVertical: 2,
        }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
      >
        <Text
          style={{
            color: "#656565",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 35,
            width: 300,
          }}
        >
          {"\n\n본인에게 해당되는 \n\n색각 유형을 선택해주세요."}
        </Text>

        {/* 첫 줄: 적색맹 / 녹색맹 */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            marginHorizontal: 43,
          }}
        >
          {/* Protan-적색맹 */}
          <TouchableOpacity
            style={{ flex: 1, marginRight: 19 }}
            activeOpacity={0.9}
            onPress={() => setSelected("protan-red")}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#F5F5F5E3", "#F51F1F80"]}
              style={{
                height: 180,
                borderColor:
                  selected === "protan-red" ? "#F51F1F" : "#F51F1F1A",
                borderRadius: 20,
                borderWidth: selected === "protan-red" ? 2 : 1,
                paddingLeft: 17,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {"Protan-적색맹"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Protan-녹색맹 (Deutan 느낌) */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.9}
            onPress={() => setSelected("protan-green")}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#F5F5F5E3", "#00800080"]}
              style={{
                height: 180,
                borderColor:
                  selected === "protan-green" ? "#008000" : "#0080001A",
                borderRadius: 20,
                borderWidth: selected === "protan-green" ? 2 : 1,
                paddingLeft: 17,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {"Protan-녹색맹"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 둘째 줄: 청색맹 / mix-혼합 */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 60,
            marginHorizontal: 43,
          }}
        >
          {/* Protan-청색맹 (Tritan 느낌) */}
          <TouchableOpacity
            style={{ flex: 1, marginRight: 19 }}
            activeOpacity={0.9}
            onPress={() => setSelected("protan-blue")}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#F5F5F5E3", "#1F4EF580"]}
              style={{
                height: 180,
                borderColor:
                  selected === "protan-blue" ? "#1F4EF5" : "#1F4EF51A",
                borderRadius: 20,
                borderWidth: selected === "protan-blue" ? 2 : 1,
                paddingLeft: 17,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {"Protan-청색맹"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          
{/* mix-혼합 : 무지개 그라데이션 */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.9}
            onPress={() => setSelected("mix")}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={[
                "#FF9A9E",
                "#FBCB99",
                "#FAFF9C",
                "#90F7EC",
                "#A18CD1",
              ]}
              style={{
                height: 180,
                borderColor:
                  selected === "mix" ? "#888888" : "#D9D9D966",
                borderRadius: 20,
                borderWidth: selected === "mix" ? 2 : 1,
                paddingLeft: 17,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {"mix-혼합"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 아래 "다음" 버튼 – 가로로 길쭉 & 좀 더 위쪽 */}
        <TouchableOpacity
          style={{
            alignSelf: "stretch",
            marginHorizontal: 30,
            backgroundColor: selected ? "#007AFF" : "#B7D4FF",
            borderColor: "#1F4EF51A",
            borderRadius: 14,
            borderWidth: 1,
            paddingVertical: 18,
            marginBottom: 80,
          }}
          disabled={!selected}
          onPress={onNext}  // ✅ 여기서만 사용
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {"다음"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
