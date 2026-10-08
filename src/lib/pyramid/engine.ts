/**
 * Great Pyramid 11:7 mathematical-constants laboratory.
 * Comparison formulas follow the source workbook; the app scores 13 rows
 * and explicitly prefers 11/7, unlike the workbook's 12-row fraction score:
 * "Great Pyramid — Mathematical Constants Laboratory".
 */

export const RELATIVE_TOLERANCE = 0.001;
export const OBSERVED_ANGLE = 51.844;
export const OBSERVATION_HALF_BAND = 0.02;
export const FRACTION_SCALE = 0.0001;
export const SCAN_START = 51.78;
export const SCAN_END = 51.9;
export const SCAN_STEP = 0.0005;
export const TARGET_RATIO = 11 / 7;
/** Secondary rainbow / face slope of the 11:7 pyramid, degrees. */
export const RAINBOW_ANGLE = 51.83;
/** Descartes primary-rainbow red (outer). Pyramid arris ≈ 42.0°. */
export const PRIMARY_RAINBOW_RED = 42.4;
export const PRIMARY_RAINBOW_VIOLET = 40.5;
/** Descartes secondary-rainbow red (inner). Face slope sits in this band. */
export const SECONDARY_RAINBOW_RED = 50.4;
export const SECONDARY_RAINBOW_VIOLET = 53.4;

export const SCORE_WEIGHTS = {
  numerical: 0.35,
  measurement: 0.25,
  fraction: 0.25,
  robustness: 0.15,
} as const;

export const PHI = (1 + Math.sqrt(5)) / 2;
/** Harthun–Rennert cut of z = 1/r at Z₀ = 7.65 with L/W = φ. */
export const GOLDEN_EGG_ANGLE = 51.795319256;
export const GOLDEN_EGG_Z0 = 7.65;
export const GAMMA = 0.5772156649015329;
export const TRIBONACCI = 1.8392867552141612;
export const BRUN_B2 = 1.902160583104;

export type ModelId =
  | "phi"
  | "elevenSeven"
  | "mean"
  | "petrie"
  | "pi"
  | "goldenEgg"
  | "custom";

export type Geo = {
  B: number;
  H: number;
  A: number;
  D: number;
  S: number;
  E: number;
  bh: number;
  angleDeg: number;
  lateralOverB2: number;
  totalOverB2: number;
  volumeOverB3: number;
  sekedPalms: number;
};

export type ConstantId =
  | "pi"
  | "gamma"
  | "sqrt3"
  | "sqrt6"
  | "sqrt2"
  | "sqrt5"
  | "tribonacci"
  | "brun"
  | "invPhi"
  | "phi"
  | "e"
  | "eMinus1"
  | "eggLW";

export type ConstantDef = {
  id: ConstantId;
  symbol: string;
  name: string;
  family: string;
  reference: number;
  weight: number;
  formula: string;
  formulaPl: string;
  role: string;
};

export const CONSTANTS: ConstantDef[] = [
  {
    id: "pi",
    symbol: "π",
    name: "Pi",
    family: "π",
    reference: Math.PI,
    weight: 1,
    formula: "2B / H",
    formulaPl: "połowa obwodu podstawy / wysokość",
    role: "Połowa obwodu podstawy do wysokości",
  },
  {
    id: "gamma",
    symbol: "γ",
    name: "Euler–Mascheroni",
    family: "γ–√3–√6",
    reference: GAMMA,
    weight: 1 / 3,
    formula: "2B / (H + 2D)",
    formulaPl: "kombinacja wysokości i przekątnej",
    role: "Rodzina γ",
  },
  {
    id: "sqrt3",
    symbol: "√3",
    name: "Pierwiastek z 3",
    family: "γ–√3–√6",
    reference: Math.sqrt(3),
    weight: 1 / 3,
    formula: "(H + 2D) / (2B)",
    formulaPl: "odwrotność relacji γ",
    role: "Rodzina γ",
  },
  {
    id: "sqrt6",
    symbol: "√6",
    name: "Pierwiastek z 6",
    family: "γ–√3–√6",
    reference: Math.sqrt(6),
    weight: 1 / 3,
    formula: "(H + 2D) / D",
    formulaPl: "związane z √3 i √2",
    role: "Rodzina γ",
  },
  {
    id: "sqrt2",
    symbol: "√2",
    name: "Pierwiastek z 2",
    family: "kwadrat",
    reference: Math.SQRT2,
    weight: 0,
    formula: "D / B",
    formulaPl: "przekątna kwadratowej podstawy",
    role: "Stała strukturalna — niezależna od kąta",
  },
  {
    id: "sqrt5",
    symbol: "√5",
    name: "Pierwiastek z 5",
    family: "φ",
    reference: Math.sqrt(5),
    weight: 1 / 3,
    formula: "(S + B) / S",
    formulaPl: "pochodna rodziny φ",
    role: "Rodzina złotego podziału",
  },
  {
    id: "tribonacci",
    symbol: "T",
    name: "Tribonacci",
    family: "Tribonacci",
    reference: TRIBONACCI,
    weight: 1,
    formula: "(A + 2D) / (S + B)",
    formulaPl: "kombinacja czterech długości",
    role: "Cel porównawczy; wynik zależy od S/A",
  },
  {
    id: "brun",
    symbol: "B₂",
    name: "Stała Bruna",
    family: "Brun",
    reference: BRUN_B2,
    weight: 1,
    formula: "E / A",
    formulaPl: "krawędź boczna / półbok",
    role: "Przyjęte oszacowanie; wynik zależy od S/A",
  },
  {
    id: "invPhi",
    symbol: "1/φ",
    name: "Odwrotność φ",
    family: "φ",
    reference: 1 / PHI,
    weight: 1 / 3,
    formula: "S / (S + A)",
    formulaPl: "pochodna S/A",
    role: "Rodzina złotego podziału",
  },
  {
    id: "phi",
    symbol: "φ",
    name: "Złoty podział",
    family: "φ",
    reference: PHI,
    weight: 1 / 3,
    formula: "S / A",
    formulaPl: "apotema / półbok",
    role: "Najnaturalniejsza relacja φ",
  },
  {
    id: "e",
    symbol: "e",
    name: "Liczba Eulera",
    family: "e",
    reference: Math.E,
    weight: 0.5,
    formula: "2θ / (90° − θ)",
    formulaPl: "wzór kątowy (stopnie)",
    role: "Iloraz kątów przy spójnych jednostkach",
  },
  {
    id: "eMinus1",
    symbol: "e − 1",
    name: "e minus jeden",
    family: "e",
    reference: Math.E - 1,
    weight: 0.5,
    formula: "e_model − 1",
    formulaPl: "pochodna e",
    role: "Nie jest niezależnym odkryciem",
  },
  {
    id: "eggLW",
    symbol: "L/W",
    name: "Golden Egg L/W",
    family: "φ-egg",
    reference: PHI,
    weight: 1,
    formula: "L/W (z=1/r, Z₀=7.65)",
    formulaPl: "L/W przekroju z=1/r przy Z₀=7,65",
    role: "Stosunek długości do szerokości jaja Harthun–Rennert; φ przy kącie apotemy 51,795319256°",
  },
];

export type ModelDef = {
  id: ModelId;
  name: string;
  short: string;
  basis: string;
  notes: string;
  kind: "ratio" | "angle" | "custom";
  bh?: number;
  angleDeg?: number;
};

export const MODELS: ModelDef[] = [
  {
    id: "phi",
    name: "Dokładne φ",
    short: "φ",
    basis: "H / A = √φ",
    notes: "Idealny model złotego podziału: apotema do półboku równa φ.",
    kind: "ratio",
    bh: 2 / Math.sqrt(PHI),
  },
  {
    id: "elevenSeven",
    name: "11 : 7",
    short: "11:7",
    basis: "B : H = 11 : 7  (440 : 280)",
    notes: "Najprostszy dokładny ułamek. Kąt 51,8428°. Seked 5½ dłoni.",
    kind: "ratio",
    bh: 11 / 7,
  },
  {
    id: "mean",
    name: "Średnia 51,845°",
    short: "51,845°",
    basis: "Kąt używany w analizie 12 stałych",
    notes: "Kąt porównawczy w paśmie wejściowym; nie jest minimum minimax dla 13 wierszy.",
    kind: "angle",
    angleDeg: 51.845,
  },
  {
    id: "petrie",
    name: "Petrie–Lehner–Cole",
    short: "51,8504°",
    basis: "Średnia używana dla e",
    notes: "Kąt porównawczy używany dla e; nie jest dokładnym minimum średniego błędu.",
    kind: "angle",
    angleDeg: 51.8504,
  },
  {
    id: "pi",
    name: "Dokładne π",
    short: "π",
    basis: "H / A = 4 / π",
    notes: "Obwód podstawy / wysokość = 2π. Klasyczna hipoteza obwodowa.",
    kind: "ratio",
    bh: Math.PI / 2,
  },
  {
    id: "goldenEgg",
    name: "Golden Egg φ",
    short: "Egg",
    basis: "Harthun–Rennert z=1/r · Z₀=7.65 · L/W=φ",
    notes:
      "Stożek hiperboliczny z=1/r. Z₀=7.65 i L/W=φ dają 51,795319256°. Silnik laboratorium: 10 z 13 relacji w 0,1%, średni błąd ≈ 0,090%, MAX ≈ 0,397% (~0,4%). Trop geometryczny, nie zamiennik konstrukcji 11:7.",
    kind: "angle",
    angleDeg: GOLDEN_EGG_ANGLE,
  },
  {
    id: "custom",
    name: "Własny stosunek",
    short: "Własny",
    basis: "Ręcznie zadane B/H",
    notes: "Pole eksperymentalne — przeciągnij B/H albo kąt.",
    kind: "custom",
    bh: 1.57,
  },
];

export function geoFromBH(bh: number, B = 1): Geo {
  const H = B / bh;
  const A = B / 2;
  const D = B * Math.SQRT2;
  const S = Math.hypot(H, A);
  const E = Math.hypot(H, A * Math.SQRT2);
  const angleDeg = (Math.atan2(H, A) * 180) / Math.PI;
  return {
    B,
    H,
    A,
    D,
    S,
    E,
    bh,
    angleDeg,
    lateralOverB2: (2 * S) / B,
    totalOverB2: 1 + (2 * S) / B,
    volumeOverB3: H / (3 * B),
    sekedPalms: 7 * (A / H),
  };
}

export function geoFromAngle(angleDeg: number, B = 1): Geo {
  const rad = (angleDeg * Math.PI) / 180;
  const tan = Math.tan(rad);
  const bh = tan === 0 ? Number.POSITIVE_INFINITY : 2 / tan;
  return geoFromBH(bh, B);
}

/** Corner-edge (arris) elevation: atan(tan(face) / √2). ~42° for 11:7. */
export function edgeAngleDeg(faceAngleDeg: number): number {
  const faceRad = (faceAngleDeg * Math.PI) / 180;
  const t = Math.tan(faceRad);
  if (!Number.isFinite(t) || t === 0) return 0;
  return (Math.atan(t / Math.SQRT2) * 180) / Math.PI;
}

export function geoForModel(model: ModelDef, customBH: number, B = 1): Geo {
  if (model.id === "custom") return geoFromBH(customBH, B);
  if (model.kind === "angle" && model.angleDeg != null) {
    return geoFromAngle(model.angleDeg, B);
  }
  return geoFromBH(model.bh ?? TARGET_RATIO, B);
}

export function relationValue(id: ConstantId, geo: Geo): number {
  const { B, H, A, D, S, E, angleDeg } = geo;
  switch (id) {
    case "pi":
      return (2 * B) / H;
    case "gamma":
      return (2 * B) / (H + 2 * D);
    case "sqrt3":
      return (H + 2 * D) / (2 * B);
    case "sqrt6":
      return (H + 2 * D) / D;
    case "sqrt2":
      return D / B;
    case "sqrt5":
      return (S + B) / S;
    case "tribonacci":
      return (A + 2 * D) / (S + B);
    case "brun":
      return E / A;
    case "invPhi":
      return S / (S + A);
    case "phi":
      return S / A;
    case "e":
      return (2 * angleDeg) / (90 - angleDeg);
    case "eMinus1":
      return (2 * angleDeg) / (90 - angleDeg) - 1;
    case "eggLW":
      return eggLengthOverWidth(angleDeg);
  }
}

/**
 * Length/width of the Harthun–Rennert egg: plane at the apothem angle
 * cutting the hyperbolic cone z·r = 1 around axis height Z₀.
 *
 * The closed oval around Z₀ has closed-form endpoints (larger quadratic
 * root below Z₀; positive root above). Max half-width is a ternary search
 * on y². The rounded GOLDEN_EGG_ANGLE gives a relative residual below
 * 1e-11 against φ; there is no calibration rescale.
 */
export function eggLengthOverWidth(
  angleDeg: number,
  z0 = GOLDEN_EGG_Z0,
): number {
  return geometricEggLW(angleDeg, z0);
}

function geometricEggLW(angleDeg: number, z0: number): number {
  const alpha = (angleDeg * Math.PI) / 180;
  const tana = Math.tan(alpha);
  const sina = Math.sin(alpha);
  if (!(tana > 0) || !(sina > 0)) return Number.NaN;

  // y² = 0 ⇒ tan(α)/z = |z − Z₀|
  // z < Z₀: z² − Z₀·z + tan(α) = 0. Larger root is the oval end;
  // the smaller root belongs to a separate unbounded component, not this oval.
  const discLo = z0 * z0 - 4 * tana;
  if (!(discLo > 0)) return Number.NaN;
  const zLo = (z0 + Math.sqrt(discLo)) / 2;
  // z > Z₀: z² − Z₀·z − tan(α) = 0. Positive root.
  const zHi = (z0 + Math.sqrt(z0 * z0 + 4 * tana)) / 2;
  if (!(zLo > 0 && zLo < z0 && z0 < zHi)) return Number.NaN;

  const y2 = (z: number) => {
    const x = (z - z0) / tana;
    return 1 / (z * z) - x * x;
  };

  let lo = zLo;
  let hi = zHi;
  for (let i = 0; i < 80; i++) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    if (y2(m1) < y2(m2)) lo = m1;
    else hi = m2;
  }
  const maxY2 = y2((lo + hi) / 2);
  if (!(maxY2 > 0)) return Number.NaN;
  const maxY = Math.sqrt(maxY2);
  return (zHi - zLo) / sina / (2 * maxY);
}

export type RelationResult = ConstantDef & {
  value: number;
  error: number;
  within: boolean;
};

export function evaluateRelations(
  geo: Geo,
  tolerance = RELATIVE_TOLERANCE,
): RelationResult[] {
  return CONSTANTS.map((c) => {
    const value = relationValue(c.id, geo);
    const error = Math.abs(value - c.reference) / c.reference;
    return { ...c, value, error, within: error <= tolerance };
  });
}

export type ErrorSummary = {
  mean: number;
  independent: number;
  rms: number;
  maximum: number;
  matches: number;
};

export function summarize(results: RelationResult[]): ErrorSummary {
  const errors = results.map((r) => r.error);
  const mean = errors.reduce((a, b) => a + b, 0) / errors.length;
  const weightSum = results.reduce((a, r) => a + r.weight, 0);
  const independent =
    results.reduce((a, r) => a + r.error * r.weight, 0) / weightSum;
  const rms = Math.sqrt(
    errors.reduce((a, e) => a + e * e, 0) / errors.length,
  );
  const maximum = Math.max(...errors);
  const matches = results.filter((r) => r.within).length;
  return { mean, independent, rms, maximum, matches };
}

export function fractionError(bh: number): number {
  return Math.abs(bh - TARGET_RATIO) / TARGET_RATIO;
}

export function bestFraction(
  x: number,
  maxQ = 20,
): { p: number; q: number; error: number } {
  let best = { p: 11, q: 7, error: Infinity };
  for (let q = 1; q <= maxQ; q++) {
    const p = Math.max(1, Math.round(x * q));
    const err = Math.abs(x - p / q) / x;
    if (err < best.error - 1e-15) best = { p, q, error: err };
  }
  return best;
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

export function numericalScore(independent: number, tolerance = RELATIVE_TOLERANCE): number {
  return 100 * clamp01(1 - independent / tolerance);
}

export function measurementScore(
  angleDeg: number,
  observed = OBSERVED_ANGLE,
  halfBand = OBSERVATION_HALF_BAND,
): number {
  const delta = Math.abs(angleDeg - observed);
  return 100 * clamp01(1 - delta / halfBand);
}

export function fractionScore(bh: number, scale = FRACTION_SCALE): number {
  const err = fractionError(bh);
  return (100 * scale * scale) / (err * err + scale * scale);
}

export type ScanPoint = {
  angle: number;
  bh: number;
  independent: number;
  mean: number;
  rms: number;
  maximum: number;
  matches: number;
};

export function scanAngles(
  start = SCAN_START,
  end = SCAN_END,
  step = SCAN_STEP,
  tolerance = RELATIVE_TOLERANCE,
): ScanPoint[] {
  const points: ScanPoint[] = [];
  const n = Math.round((end - start) / step);
  for (let i = 0; i <= n; i++) {
    const angle = start + i * step;
    const geo = geoFromAngle(angle);
    const summary = summarize(evaluateRelations(geo, tolerance));
    points.push({
      angle,
      bh: geo.bh,
      independent: summary.independent,
      mean: summary.mean,
      rms: summary.rms,
      maximum: summary.maximum,
      matches: summary.matches,
    });
  }
  return points;
}

let cachedScan: { key: string; points: ScanPoint[] } | null = null;

export function getScan(
  start = SCAN_START,
  end = SCAN_END,
  step = SCAN_STEP,
  tolerance = RELATIVE_TOLERANCE,
): ScanPoint[] {
  const key = `${start}:${end}:${step}:${tolerance}`;
  if (cachedScan?.key === key) return cachedScan.points;
  const points = scanAngles(start, end, step, tolerance);
  cachedScan = { key, points };
  return points;
}

export function robustnessScore(
  angleDeg: number,
  halfBand = OBSERVATION_HALF_BAND,
  tolerance = RELATIVE_TOLERANCE,
): number {
  const scan = getScan(SCAN_START, SCAN_END, SCAN_STEP, tolerance);
  const lo = angleDeg - halfBand;
  const hi = angleDeg + halfBand;
  let total = 0;
  let good = 0;
  for (const p of scan) {
    if (p.angle < lo - 1e-12 || p.angle > hi + 1e-12) continue;
    total += 1;
    if (p.maximum <= tolerance) good += 1;
  }
  if (total === 0) return 0;
  return (100 * good) / total;
}

export type Consensus = {
  numerical: number;
  measurement: number;
  fraction: number;
  robustness: number;
  combined: number;
  deltaObs: number;
  fractionErr: number;
  bestPQ: { p: number; q: number; error: number };
  interpretation: string;
};

export function consensusFor(
  geo: Geo,
  summary: ErrorSummary,
  model: ModelDef,
  tolerance = RELATIVE_TOLERANCE,
): Consensus {
  const numerical = numericalScore(summary.independent, tolerance);
  const measurement = measurementScore(geo.angleDeg);
  const fraction = fractionScore(geo.bh);
  const robustness = robustnessScore(geo.angleDeg, OBSERVATION_HALF_BAND, tolerance);
  const combined =
    SCORE_WEIGHTS.numerical * numerical +
    SCORE_WEIGHTS.measurement * measurement +
    SCORE_WEIGHTS.fraction * fraction +
    SCORE_WEIGHTS.robustness * robustness;
  return {
    numerical,
    measurement,
    fraction,
    robustness,
    combined,
    deltaObs: Math.abs(geo.angleDeg - OBSERVED_ANGLE),
    fractionErr: fractionError(geo.bh),
    bestPQ: bestFraction(geo.bh),
    interpretation: model.notes,
  };
}

export type ModelSnapshot = {
  model: ModelDef;
  geo: Geo;
  results: RelationResult[];
  summary: ErrorSummary;
  consensus: Consensus;
};

export function snapshotFor(
  model: ModelDef,
  customBH: number,
  tolerance = RELATIVE_TOLERANCE,
): ModelSnapshot {
  const geo = geoForModel(model, customBH);
  const results = evaluateRelations(geo, tolerance);
  const summary = summarize(results);
  const consensus = consensusFor(geo, summary, model, tolerance);
  return { model, geo, results, summary, consensus };
}

export function allSnapshots(
  customBH: number,
  tolerance = RELATIVE_TOLERANCE,
): ModelSnapshot[] {
  return MODELS.map((m) => snapshotFor(m, customBH, tolerance));
}

export function scanMinima(points: ScanPoint[]): {
  mean: number;
  independent: number;
  rmsAngle: number;
  minimax: number;
} {
  let meanA = points[0]!.angle;
  let meanV = points[0]!.mean;
  let indA = points[0]!.angle;
  let indV = points[0]!.independent;
  let rmsA = points[0]!.angle;
  let rmsV = points[0]!.rms;
  let maxA = points[0]!.angle;
  let maxV = points[0]!.maximum;
  for (const p of points) {
    if (p.mean < meanV) {
      meanV = p.mean;
      meanA = p.angle;
    }
    if (p.independent < indV) {
      indV = p.independent;
      indA = p.angle;
    }
    if (p.maximum < maxV) {
      maxV = p.maximum;
      maxA = p.angle;
    }
    if (p.rms < rmsV) {
      rmsV = p.rms;
      rmsA = p.angle;
    }
  }
  return { mean: meanA, independent: indA, rmsAngle: rmsA, minimax: maxA };
}

export function errorTone(error: number, tolerance = RELATIVE_TOLERANCE): "ok" | "mid" | "bad" {
  if (error <= tolerance * 0.35) return "ok";
  if (error <= tolerance) return "mid";
  return "bad";
}
