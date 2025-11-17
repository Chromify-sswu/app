// app/components/IshiharaPlate.tsx
import React, { useMemo } from "react";
import Svg, { Circle } from "react-native-svg";

// ----- 간단한 시드 랜덤 (mulberry32) -----
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t |= 0;
    t = (t + 0x6D2B79F5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// ----- LAB → sRGB 변환 -----
function labToRgb(L: number, a: number, b: number): [number, number, number] {
  const y = (L + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  const xyz = [x, y, z].map((v) => {
    const v3 = v * v * v;
    return v3 > 0.008856 ? v3 : (v - 16 / 116) / 7.787;
  });

  let [X, Y, Z] = xyz;
  X *= 95.047;
  Y *= 100.0;
  Z *= 108.883;

  X /= 100;
  Y /= 100;
  Z /= 100;

  let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
  let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
  let bl = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

  const gamma = (u: number) =>
    u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055;

  r = gamma(r);
  g = gamma(g);
  bl = gamma(bl);

  const to255 = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v * 255)));

  return [to255(r), to255(g), to255(bl)];
}

type Axis = "protan" | "deutan" | "tritan";

interface IshiharaPlateProps {
  number: number;      // 문제 번호 (지금은 seed 정도로만 사용)
  axis: Axis;          // "protan" | "deutan" | "tritan"
  deltaE: number;      // 난이도 정도
  size?: number;       // 렌더링 크기 (px)
  seed?: number;       // 패턴 고정용 시드
}

interface CircleInfo {
  x: number;
  y: number;
  r: number;
  color: string;
}

export const IshiharaPlate: React.FC<IshiharaPlateProps> = ({
  number,
  axis,
  deltaE,
  size = 280,
  seed,
}) => {
  const circles = useMemo<CircleInfo[]>(() => {
    const rng = mulberry32(seed ?? number);

    let L_base_mean: number;
    let base_a_center: number;
    let base_b_center: number;
    let relative_a_diff: number;
    let relative_b_diff: number;

    if (axis === "protan") {
      // 적색맹
      L_base_mean = 50.0;
      base_a_center = rng() * 20;                // 0 ~ 20
      base_b_center = 5 + rng() * 10;           // 5 ~ 15
      relative_a_diff = deltaE * (0.9 + 0.2 * rng());
      relative_b_diff = 0;
    } else if (axis === "deutan") {
      // 녹색맹
      L_base_mean = 70.0;
      base_a_center = -10 + rng() * 20;         // -10 ~ 10
      base_b_center = 10 + rng() * 15;          // 10 ~ 25
      relative_a_diff = deltaE * (0.9 + 0.2 * rng());
      relative_b_diff = 0;
    } else {
      // tritan
      L_base_mean = 60.0;
      base_a_center = -5 + rng() * 10;          // -5 ~ 5
      base_b_center = -15 + rng() * 20;         // -15 ~ 5
      relative_a_diff = 0;
      relative_b_diff = deltaE * (0.9 + 0.2 * rng());
    }

    const bg_lab_base: [number, number, number] = [
      L_base_mean,
      base_a_center - relative_a_diff / 2,
      base_b_center - relative_b_diff / 2,
    ];
    const fg_lab_base: [number, number, number] = [
      L_base_mean,
      base_a_center + relative_a_diff / 2,
      base_b_center + relative_b_diff / 2,
    ];

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.45;

    const num_circles = 2500; // 너무 많으면 느려질 수 있어서 살짝 줄였음
    const result: CircleInfo[] = [];

    for (let i = 0; i < num_circles; i++) {
      const angle = rng() * Math.PI * 2;
      const rDist = Math.sqrt(rng());
      const rr = rDist * radius;

      const x = centerX + rr * Math.cos(angle);
      const y = centerY + rr * Math.sin(angle);

      const rv = rng();
      let cRadius: number;
      if (rv < 0.6) cRadius = 2 + Math.floor(rng() * 3);    // 2~4
      else if (rv < 0.9) cRadius = 5 + Math.floor(rng() * 4); // 5~8
      else cRadius = 9 + Math.floor(rng() * 4);             // 9~12

      const L_variation = 25.0;
      let randomL = L_base_mean + (rng() * 2 - 1) * L_variation;
      randomL = Math.max(0, Math.min(100, randomL));

      const current_fg_lab: [number, number, number] = [
        randomL,
        fg_lab_base[1],
        fg_lab_base[2],
      ];
      const current_bg_lab: [number, number, number] = [
        randomL,
        bg_lab_base[1],
        bg_lab_base[2],
      ];

      // 지금은 숫자 마스크는 안 쓰고, 전부 background 패턴으로만 생성
      const inNumber = false; // TODO: 숫자 모양 구현할 때 여기 바꾸면 됨

      let final_base: [number, number, number];
      let L_noise: number;
      let a_noise: number;
      let b_noise: number;

      if (inNumber) {
        const contamination = 0.05;
        final_base = rng() > contamination ? current_fg_lab : current_bg_lab;
        L_noise = (rng() * 2 - 1) * 8;
        a_noise = (rng() * 2 - 1) * 20;
        b_noise = (rng() * 2 - 1) * 20;
      } else {
        const contamination = 0.08;
        final_base = rng() > contamination ? current_bg_lab : current_fg_lab;
        L_noise = (rng() * 2 - 1) * 18;
        a_noise = (rng() * 2 - 1) * 40;
        b_noise = (rng() * 2 - 1) * 40;
      }

      const finalL = Math.max(0, Math.min(100, final_base[0] + L_noise));
      const finalA = final_base[1] + a_noise;
      const finalB = final_base[2] + b_noise;

      const [r, g, b] = labToRgb(finalL, finalA, finalB);
      result.push({
        x,
        y,
        r: cRadius,
        color: `rgb(${r},${g},${b})`,
      });
    }

    return result;
  }, [axis, deltaE, size, seed, number]);

  return (
    <Svg width={size} height={size}>
      {circles.map((c, i) => (
        <Circle key={i} cx={c.x} cy={c.y} r={c.r} fill={c.color} />
      ))}
    </Svg>
  );
};
