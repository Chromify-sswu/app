// hooks/useProfile.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CVDType = 'protan' | 'deutan' | 'tritan';

type State = {
  cvdType: CVDType;
  severity: number;          // 0~1
  hasCalibrated: boolean;
  setType: (t: CVDType) => void;
  setSeverity: (v: number) => void;
  setHasCalibrated: (v: boolean) => void;
  save: () => Promise<void>;
  load: () => Promise<void>;
};

const KEY = 'chromify.profile.v1';

export const useProfile = create<State>((set, get) => ({
  cvdType: 'deutan',
  severity: 0.5,
  hasCalibrated: false,

  setType: (t) => set({ cvdType: t }),
  setSeverity: (v) => set({ severity: Math.max(0, Math.min(1, v)) }),
  setHasCalibrated: (v) => set({ hasCalibrated: v }),

  save: async () => {
    const data = JSON.stringify({
      cvdType: get().cvdType,
      severity: get().severity,
      hasCalibrated: get().hasCalibrated,
    });
    await AsyncStorage.setItem(KEY, data);
  },

  load: async () => {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return;
    const p = JSON.parse(raw);
    set({
      cvdType: p.cvdType ?? 'deutan',
      severity: typeof p.severity === 'number' ? p.severity : 0.5,
      hasCalibrated: !!p.hasCalibrated,
    });
  },
}));
