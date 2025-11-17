// components/BackButton.tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    if (router.canGoBack?.()) router.back();
    else router.replace('/'); // 히스토리 없으면 홈으로
  };

  return (
    <Pressable
      onPress={handleBack}
      style={{
        position: 'absolute',
        top: 50,       // SafeArea를 피해서 여유 있게
        left: 20,
        zIndex: 100,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: 'rgba(17,24,39,0.8)', // 반투명 다크 배경
        borderRadius: 12,
      }}
    >
      <Text style={{ color: '#E5E7EB', fontWeight: '700', fontSize: 16 }}>← 뒤로</Text>
    </Pressable>
  );
}
