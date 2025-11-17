// app/test-run.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IshiharaPlate } from "../components/IshiharaPlate";

// 타입 라벨
const TYPE_LABEL: Record<string, string> = {
  "protan-red": "Protan-적색맹",
  "protan-green": "Protan-녹색맹",
  "protan-blue": "Protan-청색맹",
  mix: "mix-혼합",
};

// axis 매핑 (이건 IshiharaPlate의 axis 용)
const TYPE_AXIS: Record<string, "protan" | "deutan" | "tritan"> = {
  "protan-red": "protan",
  "protan-green": "deutan",
  "protan-blue": "tritan",
  mix: "protan", // 일단 protan에 매핑
};

export default function TestRunScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    type?: string;
    index?: string;
    total?: string;
  }>();

  const typeKey = params.type ?? "protan-red";
  const typeLabel = TYPE_LABEL[typeKey] ?? "Protan-적색맹";
  const axis = TYPE_AXIS[typeKey] ?? "protan";

  const initialIndex = Number(params.index ?? "1");
  const total = Number(params.total ?? "30");

  // 👉 더 이상 라우터로 index 이동 안 하고, 로컬 state로 관리
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [answer, setAnswer] = useState("");

  // 난이도 (deltaE) — 나중에 AdaptiveStaircase 붙이면 여기서 변경
  const deltaE = 30;
  const progress = Math.min(currentIndex / total, 1);

  const goToResult = () => {
    router.push({
      pathname: "/test-result",
      params: {
        type: typeKey,
        score: "27",       // TODO: 실제 점수 계산 결과로 교체
        reliability: "92", // TODO: 실제 신뢰도 결과로 교체
      },
    });
  };

  const goNextQuestion = () => {
    if (currentIndex < total) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer("");
    } else {
      goToResult();
    }
  };

  const handleSubmit = () => {
    // TODO: 여기에서 answer 기반 정답/오답 체크 + AdaptiveStaircase 기록 가능
    console.log("제출:", { index: currentIndex, answer });

    goNextQuestion();
  };

  const handleSkip = () => {
    console.log("넘어감:", { index: currentIndex });
    goNextQuestion();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 상단 타입 표시 */}
          <View
            style={{
              alignItems: "flex-end",
              marginTop: 35,
              marginBottom: 3,
            }}
          >
            <Text
              style={{
                color: "#F51F1F",
                fontSize: 16,
                marginRight: 31,
              }}
            >
              {typeLabel}
            </Text>
          </View>

          {/* 진행률 바 + 문제 번호 */}
          <View
            style={{
              alignItems: "flex-end",
              marginBottom: 22,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: 28,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#AAAAAA",
                  borderRadius: 20,
                  paddingLeft: 17,
                  marginRight: 12,
                }}
              >
                <View
                  style={{
                    width: 110,
                    height: 13,
                    backgroundColor: "#D9D9D9",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: `${progress * 100}%`,
                      height: 14,
                      backgroundColor: "#4B8BFF",
                      borderRadius: 20,
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                }}
              >
                {`${currentIndex}/${total}`}
              </Text>
            </View>
          </View>

          {/* 질문 */}
          <Text
            style={{
              color: "#656565",
              fontSize: 25,
              marginBottom: 32,
              marginLeft: 23,
            }}
          >
            {"어떤 숫자가 보이시나요?"}
          </Text>

          {/* plate 위치 (회색 동그라미 없이, 그냥 그 자리에 plate만) */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <IshiharaPlate
              number={currentIndex}
              axis={axis}
              deltaE={deltaE}
              size={280}
              seed={currentIndex}
            />
          </View>

          {/* 입력창 + 제출 */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 14,
              marginHorizontal: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#F5F5F5E3",
                borderColor: "#1F4EF51A",
                borderRadius: 10,
                borderWidth: 1,
                paddingVertical: 12,
                paddingHorizontal: 18,
                marginRight: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                keyboardType="number-pad"
                maxLength={2}
                placeholder="숫자 (0~9)"
                placeholderTextColor="#999999"
                style={{
                  color: "#000000",
                  fontSize: 20,
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF80",
                borderColor: "#1F4EF51A",
                borderRadius: 10,
                borderWidth: 1,
                paddingVertical: 19,
                paddingHorizontal: 30,
                justifyContent: "center",
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                }}
              >
                {"제출"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 아래 “넘어가기” 버튼 */}
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#007AFF80",
              borderColor: "#1F4EF51A",
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 19,
              marginBottom: 40,
              marginHorizontal: 30,
            }}
            onPress={handleSkip}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 20,
              }}
            >
              {"넘어가기"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
