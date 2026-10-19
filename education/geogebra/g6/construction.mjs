// GeoGebra G6: three geometric extensions. Single ordered command source.
// Every value shown is computed by GeoGebra from the construction objects.
export const RESET_SCRIPT = [
  'SetValue(q, 11/7)', 'SetValue(s, 1)', 'SetValue(z0, 7.65)', 'SetValue(lesson, 1)', 'SetValue(sphereStep, 1)',
  'SetValue(pick, 3)', 'SetValue(showBody, true)', 'SetValue(showSphere, true)', 'SetValue(showLimit, true)',
  'SetPerspective("GD")',
].join('\n');
const pl = (plText, enText) => `If(langEN, ${JSON.stringify(enText)}, ${JSON.stringify(plText)})`;
export const commands = [
  // Controls
  'q = Slider(0.5, 4, 0.001, 1, 250, false, true, false, false)',
  's = Slider(0.25, 2, 0.05, 1, 250, false, true, false, false)',
  'z0 = Slider(1, 40, 0.05, 1, 250, false, true, false, false)',
  'lesson = Slider(1, 3, 1, 1, 250, false, true, false, false)',
  'sphereStep = Slider(1, 4, 1, 1, 250, false, true, false, false)',
  'pick = Slider(1, 6, 1, 1, 250, false, true, false, false)',
  'SetValue(q, 11/7)', 'SetValue(s, 1)', 'SetValue(z0, 7.65)', 'SetValue(lesson, 1)', 'SetValue(sphereStep, 1)', 'SetValue(pick, 3)',
  'showBody = Checkbox("Bryła / Solid")', 'showSphere = Checkbox("Kula / Sphere")',
  'showLimit = Checkbox("Linia granicy / Limit line")', 'langEN = Checkbox("English")',
  'SetValue(showBody, true)', 'SetValue(showSphere, true)', 'SetValue(showLimit, true)', 'SetValue(langEN, false)',
  // Pyramid (same layout as G1: Z is vertical)
  'B = 11*s', 'h = 11*s/q', 'A = B/2',
  'P1 = (-A, -A, 0)', 'P2 = (A, -A, 0)', 'P3 = (A, A, 0)', 'P4 = (-A, A, 0)',
  'O = (0, 0, 0)', 'V = (0, 0, h)', 'M = Midpoint(P1, P2)',
  'face1 = Polygon(P1, P2, V)', 'face2 = Polygon(P2, P3, V)', 'face3 = Polygon(P3, P4, V)', 'face4 = Polygon(P4, P1, V)',
  'b1 = Segment(P1, P2)', 'b2 = Segment(P2, P3)', 'b3 = Segment(P3, P4)', 'b4 = Segment(P4, P1)',
  'edge1 = Segment(P1, V)', 'edge2 = Segment(P2, V)', 'edge3 = Segment(P3, V)', 'edge4 = Segment(P4, V)',
  'hSeg = Segment(O, V)', 'aSeg = Segment(O, M)', 'sSeg = Segment(M, V)',
  'S = Length(sSeg)', 'phi = (1+sqrt(5))/2',
  // Lesson 2: inscribed sphere. r from the formula, tangency measured independently.
  'r = A*h/(A+S)', 'I = (0, 0, r)', 'T = Dilate(V, A/S, M)',
  'ball = Sphere(I, r)', 'secCircle = Circle(I, r, Vector((1, 0, 0)))',
  'oiSeg = Segment(O, I)', 'ivSeg = Segment(I, V)', 'mtSeg = Segment(M, T)', 'tvSeg = Segment(T, V)',
  'moSeg = Segment(M, O)', 'itSeg = Segment(I, T)',
  'pf1 = Plane(P1, P2, V)', 'pf2 = Plane(P2, P3, V)', 'pf3 = Plane(P3, P4, V)', 'pf4 = Plane(P4, P1, V)', 'pb = Plane(P1, P2, P3)',
  'dF1 = Distance(I, pf1)', 'dF2 = Distance(I, pf2)', 'dF3 = Distance(I, pf3)', 'dF4 = Distance(I, pf4)', 'dBase = Distance(I, pb)',
  'IT = Distance(I, T)', 'OI = Length(oiSeg)', 'VI = Length(ivSeg)', 'MT = Length(mtSeg)', 'VT = Length(tvSeg)', 'MO = Length(moSeg)',
  'VIoverOI = VI/OI', 'MToverVT = MT/VT', 'errVIOI = abs(VIoverOI-phi)/phi', 'errMTVT = abs(MToverVT-phi)/phi',
  // Lesson 1: golden egg section z·sqrt(x²+y²) = 1, plane z = z0 + t·x, t = h/A (from the pyramid).
  't = Length(hSeg)/Length(aSeg)', 'k = sqrt(1+t^2)', 'limitSA = S/A',
  'eggOK = t > 0 && z0 > 0 && z0^2 > 4*t',
  'a = If(eggOK, (-z0+sqrt(z0^2-4*t))/(2*t))', 'b = If(eggOK, (-z0+sqrt(z0^2+4*t))/(2*t))',
  'fy(x) = 1/(z0+t*x)^2 - x^2', 'gW(x) = x*(z0+t*x)^3 + t',
  'xm = x(Root(gW, a, 0))', 'L = (b-a)*k', 'W = 2*sqrt(fy(xm))', 'LW = L/W',
  'errLW = abs(LW-phi)/phi', 'errLimit = abs(limitSA-phi)/phi', 'auxLen = L/limitSA',
  // Drawn in its own plane in Graphics 2 with one uniform scale g (no ellipse, no per-axis stretch).
  'g = 8/L', 'c = (a+b)/2', 'hw = (b-a)/2',
  'oval = Curve(g*k*hw*cos(p), g*sign(sin(p))*sqrt(abs(fy(c+hw*cos(p)))), p, 0, 2*pi)',
  'um = g*k*(xm-c)',
  'lSeg = Segment((-g*L/2, 0), (g*L/2, 0))', 'wSeg = Segment((um, -g*W/2), (um, g*W/2))',
  'auxSeg = Segment((um+0.35, -g*auxLen/2), (um+0.35, g*auxLen/2))',
  'LWmeasured = Length(lSeg)/Length(wSeg)', 'auxMeasured = Length(lSeg)/Length(auxSeg)',
  // Lesson 3: why 11:7. Same relative error definition |R - c| / |c|; fixed order, no ranking.
  'rPi = (Length(b1)+Length(b2))/Length(hSeg)', 'rPhi = Length(sSeg)/Length(aSeg)',
  'errPi = abs(rPi-pi)/pi', 'errPhi = abs(rPhi-phi)/phi',
  'ratP = {3, 8, 11, 14, 19, 25}', 'ratQ = {2, 5, 7, 9, 12, 16}',
  'errPiList = Sequence(abs(2*Element(ratP, i)/Element(ratQ, i) - pi)/pi, i, 1, 6)',
  'errPhiList = Sequence(abs(sqrt(1+4/(Element(ratP, i)/Element(ratQ, i))^2) - phi)/phi, i, 1, 6)',
  'pickP = Element(ratP, pick)', 'pickQ = Element(ratQ, pick)',
  'pickPi = 2*pickP/pickQ', 'pickPhi = sqrt(1+4/(pickP/pickQ)^2)',
  'barsPi = Sequence(Segment((3*i-0.5, -6), (3*i-0.5, -6+Min(5, 100*Element(errPiList, i)))), i, 1, 6)',
  'barsPhi = Sequence(Segment((3*i+0.5, -6), (3*i+0.5, -6+Min(5, 100*Element(errPhiList, i)))), i, 1, 6)',
  'barLabels = Sequence(Text(Element(ratP, i) + ":" + Element(ratQ, i), (3*i-0.9, -7.2)), i, 1, 6)',
  'pickMark = Segment((3*pick-1.2, -6.4), (3*pick+1.2, -6.4))',
  // Texts in Graphics 1
  `titleText = Text(${pl('Piramida 11:7 | G6 · rozszerzenia geometryczne', 'Pyramid 11:7 | G6 · geometric extensions')}, (0.7, 28.4))`,
  `lessonText = Text(If(lesson == 1, ${pl('1. Granica proporcji złotego jaja', '1. The golden egg ratio limit')}, If(lesson == 2, ${pl('2. Kula wpisana i złoty podział', '2. Inscribed sphere and the golden section')}, ${pl('3. Dlaczego proporcja 11:7?', '3. Why the 11:7 ratio?')})), (0.7, 11.7))`,
  `plainText = Text(If(lesson == 1, If(limitSA > phi, ${pl('Przesuwając przekrój, zbliżamy się do granicy. Złota proporcja leży odrobinę poniżej niej.', 'Moving the section brings us closer to a limit. The golden ratio lies slightly below it.')}, ${pl('Przy tym nachyleniu granica S/A nie leży powyżej φ.', 'At this slope the limit S/A is not above φ.')}), If(lesson == 2, ${pl('Ta sama rodzina φ co S/A, nie nowe potwierdzenie.', 'The same φ family as S/A, not a new confirmation.')}, ${pl('Mały ułamek blisko π i φ naraz; jedno nachylenie.', 'One small fraction near both π and φ; one slope.')})), (0.7, 10.5))`,
  `v1Text = Text(If(lesson == 1, If(eggOK, "L/W = " + round(LW, 12), ${pl('Brak owalu: potrzeba z0² > 4t', 'No oval: z0² > 4t is required')} + " (z0 > " + round(2*sqrt(t), 6) + ")"), If(lesson == 2, "r = " + round(r, 12) + " ; VI/OI = " + round(VIoverOI, 12), "2B/h = " + round(rPi, 12) + " ; " + round(100*errPi, 9) + " %")), (0.7, 9.3))`,
  `v2Text = Text(If(lesson == 1, "S/A = √(1+t²) = " + round(limitSA, 12), If(lesson == 2, "MT = A = " + round(MT, 9) + " ; VT = S − A = " + round(VT, 9), "S/A = " + round(rPhi, 12) + " ; " + round(100*errPhi, 9) + " %")), (0.7, 8.1))`,
  `v3Text = Text(If(lesson == 1, "φ = " + round(phi, 12) + If(eggOK, " ; " + round(100*errLW, 9) + " %", ""), If(lesson == 2, "MT/VT = " + round(MToverVT, 12) + " ; " + round(100*errMTVT, 9) + " %", pickP + ":" + pickQ + " → 2B/h = " + round(pickPi, 6) + " ; S/A = " + round(pickPhi, 6))), (0.7, 6.9))`,
  `v4Text = Text(If(lesson == 1, "z0 = " + round(z0, 2) + " ; L = " + If(eggOK, round(L, 9), "—") + " ; W = " + If(eggOK, round(W, 9), "—"), If(lesson == 2, ${pl('Odległość I od podstawy i 4 ścian = r', 'Distance from I to base and 4 faces = r')}, ${pl('Kolejność wg mianownika; to nie ranking.', 'Ordered by denominator; not a ranking.')})), (0.7, 5.7))`,
  `stepText = Text(If(lesson == 2, If(sphereStep == 1, ${pl('Krok 1: kula i przekrój osiowy', 'Step 1: sphere and axial section')}, If(sphereStep == 2, ${pl('Krok 2: OI = r, IV = h − r', 'Step 2: OI = r, IV = h − r')}, If(sphereStep == 3, ${pl('Krok 3: T, MT = MO = A, VT = S − A', 'Step 3: T, MT = MO = A, VT = S − A')}, ${pl('Krok 4: VI/OI = S/A ≈ φ, MT/VT ≈ φ', 'Step 4: VI/OI = S/A ≈ φ, MT/VT ≈ φ')}))), If(lesson == 1, ${pl('Linia przerywana: szerokość L/(S/A); W jest zawsze mniejsze.', 'Dashed: width L/(S/A); W is always smaller.')}, ${pl('Słupki: błąd względem π (lewy) i φ (prawy), w %, obcięte na 5%.', 'Bars: error vs π (left) and φ (right), in %, capped at 5%.')})), (0.7, 4.5))`,
  `noteText = Text(${pl('Model matematyczny; nie dowodzi intencji budowniczych.', 'Mathematical model; it does not establish builders\' intent.')}, (0.7, 3.1))`,
  `scaleText = Text(${pl('q = B/h; s skaluje całą bryłę; z0 dotyczy tylko lekcji 1.', 'q = B/h; s scales the whole solid; z0 only affects lesson 1.')}, (0.7, 2.1))`,
  'creditText = Text("Koncepcja projektu: Michał Przybylski — prylski.dev", (0.7, 1.2))',
  'githubText = Text("GitHub: https://github.com/MichaelZP/", (0.7, 0.3))',
  // Labels in Graphics 2
  'lLabel = Text("L", (-g*L/2+0.3, 0.25))', 'wLabel = Text("W", (um-0.9, g*W/2))', 'auxLabel = Text("L/(S/A)", (um+0.6, g*auxLen/2+0.3))',
  `eggScaleText = Text(${pl('Owal w płaszczyźnie przekroju, skala ×', 'Oval in its section plane, scale ×')} + round(g, 2), (-9, 6.5))`,
  `chartText = Text(${pl('B:H — błąd względem π i φ [%]', 'B:H — error vs π and φ [%]')}, (2, -0.3))`,
  // Buttons
  `resetButton = Button(${JSON.stringify('Reset 11:7')})`,
  'eggButton = Button("1 · L/W")', 'sphereButton = Button("2 · r")', 'whyButton = Button("3 · 11:7")',
  'nextStepButton = Button("Krok + / Step +")',
  'SetPerspective("GD")', 'SetActiveView(1)', 'ZoomIn(0, 0, 23, 29)',
  'SetVisibleInView(xAxis, 1, false)', 'SetVisibleInView(yAxis, 1, false)',
  'SetCoords(q, 25, 90)', 'SetCoords(s, 25, 135)', 'SetCoords(z0, 25, 180)', 'SetCoords(lesson, 25, 225)',
  'SetCoords(sphereStep, 25, 270)', 'SetCoords(pick, 25, 315)',
  'SetCoords(showBody, 25, 350)', 'SetCoords(showSphere, 185, 350)', 'SetCoords(showLimit, 25, 380)', 'SetCoords(langEN, 270, 380)',
  'SetCoords(resetButton, 25, 415)', 'SetCoords(eggButton, 130, 415)', 'SetCoords(sphereButton, 210, 415)', 'SetCoords(whyButton, 280, 415)',
  'SetCoords(nextStepButton, 25, 455)',
];
export const scripts = {
  resetButton: RESET_SCRIPT,
  eggButton: 'SetValue(lesson, 1)\nSetPerspective("GD")',
  sphereButton: 'SetValue(lesson, 2)\nSetPerspective("GT")',
  whyButton: 'SetValue(lesson, 3)\nSetPerspective("GD")',
  nextStepButton: 'SetValue(sphereStep, If(sphereStep == 4, 1, sphereStep + 1))',
};
// Views: 1 = control panel, 2 = Graphics 2 (egg + chart), -1 = 3D (pyramid + sphere).
export const view3d = {
  face1: 'showBody', face2: 'showBody', face3: 'showBody', face4: 'showBody',
  b1: 'true', b2: 'lesson == 3', edge1: 'showBody', edge2: 'showBody', edge3: 'showBody', edge4: 'showBody',
  hSeg: 'lesson == 3 || (lesson == 2 && sphereStep == 1)', aSeg: 'lesson == 3 || (lesson == 2 && sphereStep == 1)', sSeg: 'lesson == 3 || (lesson == 2 && sphereStep == 1)',
  O: 'true', V: 'true', M: 'lesson >= 2', I: 'lesson == 2', T: 'lesson == 2 && sphereStep >= 3',
  ball: 'lesson == 2 && showSphere', secCircle: 'lesson == 2',
  oiSeg: 'lesson == 2 && (sphereStep == 2 || sphereStep == 4)', ivSeg: 'lesson == 2 && (sphereStep == 2 || sphereStep == 4)',
  mtSeg: 'lesson == 2 && sphereStep >= 3', tvSeg: 'lesson == 2 && sphereStep >= 3', moSeg: 'lesson == 2 && sphereStep >= 3', itSeg: 'lesson == 2 && sphereStep >= 3',
};
export const view2 = {
  oval: 'lesson == 1 && eggOK', lSeg: 'lesson == 1 && eggOK', wSeg: 'lesson == 1 && eggOK', auxSeg: 'lesson == 1 && eggOK && showLimit',
  lLabel: 'lesson == 1 && eggOK', wLabel: 'lesson == 1 && eggOK', auxLabel: 'lesson == 1 && eggOK && showLimit', eggScaleText: 'lesson == 1 && eggOK',
  barsPi: 'lesson == 3', barsPhi: 'lesson == 3', barLabels: 'lesson == 3', pickMark: 'lesson == 3', chartText: 'lesson == 3',
};
// One colour per quantity, same as the app (L gold, W teal, limit blue dashed; OI rose, VI teal, MT gold, VT lavender).
export const colors = {
  oval: [60, 60, 60], lSeg: [176, 132, 60], wSeg: [62, 132, 124], auxSeg: [64, 112, 176],
  ball: [140, 160, 180], secCircle: [100, 120, 140], oiSeg: [196, 110, 96], ivSeg: [62, 132, 124], mtSeg: [176, 132, 60],
  moSeg: [176, 132, 60], tvSeg: [130, 100, 170], itSeg: [100, 120, 140], barsPi: [150, 120, 70], barsPhi: [62, 132, 124], pickMark: [30, 45, 60],
  hSeg: [199, 49, 58], aSeg: [24, 99, 190], sSeg: [202, 126, 15], b1: [24, 99, 190], b2: [24, 99, 190],
};
export const sliders = { q: [0.5, 4, 0.001, 11 / 7], s: [0.25, 2, 0.05, 1], z0: [1, 40, 0.05, 7.65], lesson: [1, 3, 1, 1], sphereStep: [1, 4, 1, 1], pick: [1, 6, 1, 3] };

export function configure(api) {
  const names = api.getAllObjectNames();
  const exec = command => api.evalCommand(command);
  for (const name of names) { api.setVisible(name, false); api.setLabelVisible(name, false); api.setAuxiliary(name, true); }
  for (const [name, condition] of Object.entries(view3d)) {
    exec(`SetVisibleInView(${name}, 1, false)`); exec(`SetVisibleInView(${name}, 2, false)`); exec(`SetVisibleInView(${name}, -1, true)`);
    exec(`SetConditionToShowObject(${name}, ${condition})`);
  }
  for (const [name, condition] of Object.entries(view2)) {
    exec(`SetVisibleInView(${name}, 1, false)`); exec(`SetVisibleInView(${name}, -1, false)`); exec(`SetVisibleInView(${name}, 2, true)`);
    exec(`SetConditionToShowObject(${name}, ${condition})`);
  }
  for (const name of names.filter(n => !(n in view3d) && !(n in view2) && /^(segment|polygon|point|plane|sphere|circle|conic)/.test(api.getObjectType(n)))) {
    exec(`SetConditionToShowObject(${name}, false)`);
  }
  for (const name of ['face1', 'face2', 'face3', 'face4']) { api.setColor(name, 143, 172, 194); api.setFilling(name, 0.1); }
  for (const [name, rgb] of Object.entries(colors)) api.setColor(name, ...rgb);
  api.setFilling('ball', 0.28);
  for (const name of ['lSeg', 'wSeg', 'oiSeg', 'ivSeg', 'mtSeg', 'tvSeg']) api.setLineThickness(name, 7);
  for (const name of ['auxSeg', 'moSeg', 'itSeg']) { api.setLineStyle(name, 1); api.setLineThickness(name, 4); }
  api.setLineThickness('oval', 5); api.setLineThickness('barsPi', 9); api.setLineThickness('barsPhi', 9); api.setLineThickness('pickMark', 5);
  const captions = { oiSeg: 'r', ivSeg: 'h − r', mtSeg: 'MT = A', tvSeg: 'S − A', hSeg: 'h', aSeg: 'A', sSeg: 'S', b1: 'B', b2: 'B' };
  for (const [name, caption] of Object.entries(captions)) { api.setCaption(name, caption); api.setLabelStyle(name, 3); api.setLabelVisible(name, true); }
  for (const name of ['O', 'V', 'M', 'I', 'T']) { api.setLabelVisible(name, true); api.setFixed(name, true, false); }
  for (const name of ['P1', 'P2', 'P3', 'P4']) api.setFixed(name, true, false);
  const panel = names.filter(n => api.getObjectType(n) === 'text' && !(n in view2)).concat(
    ['q', 's', 'z0', 'lesson', 'sphereStep', 'pick', 'showBody', 'showSphere', 'showLimit', 'langEN', ...Object.keys(scripts)]);
  for (const name of panel) {
    exec(`SetVisibleInView(${name}, 1, true)`); exec(`SetVisibleInView(${name}, 2, false)`); exec(`SetVisibleInView(${name}, -1, false)`);
    api.setAuxiliary(name, false);
  }
  const sliderCaptions = { q: 'q = B/h = %v', s: 's — skala / scale = %v', z0: 'z0 = %v', lesson: 'Lekcja / Lesson 1–3 = %v', sphereStep: 'Krok kuli / Sphere step = %v', pick: 'B:H nr = %v' };
  for (const [name, caption] of Object.entries(sliderCaptions)) { api.setCaption(name, caption); api.setLabelStyle(name, 3); api.setLabelVisible(name, true); }
  for (const name of ['showBody', 'showSphere', 'showLimit', 'langEN', ...Object.keys(scripts)]) { api.setLabelVisible(name, true); api.setColor(name, 30, 45, 60); }
  api.setRounding('12');
  api.setGridVisible(false);
  api.setCoordSystem(-14, 14, -14, 14, -2, 18, false);
  const document = new DOMParser().parseFromString(api.getXML(), 'application/xml');
  document.querySelector('euclidianView3D > plate')?.setAttribute('show', 'false');
  for (const [name, script] of Object.entries(scripts)) {
    const element = document.querySelector(`element[label="${name}"]`);
    let node = element.querySelector('ggbscript');
    if (!node) { node = document.createElement('ggbscript'); element.appendChild(node); }
    node.setAttribute('val', script);
  }
  api.setXML(new XMLSerializer().serializeToString(document));
  api.setPerspective('GD'); exec('SetActiveView(2)'); exec('ZoomIn(-10, -8.5, 20, 8)');
  exec('SetVisibleInView(xAxis, 2, false)'); exec('SetVisibleInView(yAxis, 2, false)');
  api.setGridVisible(false); exec('SetActiveView(1)');
  api.setPerspective('GT'); exec('SetActiveView(-1)'); exec('ZoomIn(0.5)'); exec('SetActiveView(1)');
  api.setPerspective('GD'); api.showToolBar(false);
}
