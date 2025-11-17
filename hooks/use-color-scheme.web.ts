// hooks/use-color-scheme.web.ts
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

// 웹 정적 렌더링 대응: 클라이언트 하이드레이션 후 실제 스킴 반환
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => { setHasHydrated(true); }, []);
  const colorScheme = useRNColorScheme();
  return hasHydrated ? colorScheme : 'light';
}
