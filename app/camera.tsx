// app/camera.tsx
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Swiper from 'react-native-web-swiper';
import { useProfile } from '../hooks/useProfile';
import BackButton from '../components/BackButton'; // 👈 추가

export default function CameraPager() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const camRef = useRef<CameraView | null>(null);
  const { cvdType, severity } = useProfile();

  // granted 플래그만 관찰하여 불필요한 반복 요청 방지
  useEffect(() => {
    if (permission && !permission.granted) requestPermission();
  }, [permission?.granted]);

  if (!permission) return <View style={styles.center} />;
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.title}>카메라 권한이 필요합니다</Text>
        <TouchableOpacity
          style={[styles.circleButton, styles.neonButton]}
          onPress={requestPermission}
        >
          <Text style={styles.circleButtonText}>권한 허용</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 플로팅 뒤로가기 버튼 */}
      
      <Text style={styles.header}>좌↔우 스와이프: 원본 ↔ 보정(예정)</Text>

      <Swiper loop={false} controlsEnabled={false}>
        {/* 0. 원본 */}
        <View key="orig" style={styles.page}>
          <Text style={styles.pageTitle}>원본</Text>
          <View style={styles.cameraWrap}>
            <CameraView ref={camRef} style={{ flex: 1 }} facing={facing} />
          </View>
        </View>

        {/* 1. 보정(자리) */}
        <View key="cvd" style={styles.page}>
          <Text style={styles.pageTitle}>
            보정(예정) — {cvdType} / {severity.toFixed(2)}
          </Text>
          <View style={styles.cameraWrap}>
            <CameraView style={{ flex: 1, opacity: 0.95 }} facing={facing} />
          </View>
          <Text style={styles.helper}>※ 다음 단계에서 실시간 색보정이 적용됩니다.</Text>
        </View>
      </Swiper>

      {/* 하단 네온 버튼 */}
      <View style={styles.bottomBarGlass}>
        <TouchableOpacity
          style={[styles.circleButton, styles.neonButton]}
          onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}
        >
          <Text style={styles.circleButtonText}>↻</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circleButton, styles.neonPink]}>
          <Text style={styles.circleButtonText}>◎</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circleButton, styles.neonButton]}>
          <Text style={styles.circleButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b1020' },
  title: { color: '#fff', fontSize: 18, marginBottom: 12 },
  header: { color: '#E5E7EB', textAlign: 'center', paddingVertical: 8 },
  page: { flex: 1, paddingHorizontal: 10 },
  pageTitle: { color: '#c7d2fe', marginBottom: 6, fontWeight: '600' },
  cameraWrap: { flex: 1, borderRadius: 16, overflow: 'hidden', backgroundColor: '#111827' },
  helper: { color: '#9CA3AF', marginTop: 8, textAlign: 'center', fontSize: 12 },
  bottomBarGlass: {
    position: 'absolute', bottom: 22, left: 0, right: 0,
    marginHorizontal: 40, paddingVertical: 10,
    flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20,
    shadowColor: '#00E5FF', shadowOpacity: 0.2, shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 }, elevation: 10,
  },
  circleButton: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  circleButtonText: { fontSize: 24, color: 'white', fontWeight: '700' },
  neonButton: { backgroundColor: 'rgba(0,229,255,0.15)', borderWidth: 1, borderColor: '#00E5FF' },
  neonPink: { backgroundColor: 'rgba(255,123,229,0.2)', borderWidth: 1, borderColor: '#FF7BE5' },
});
