// GeoGebra G1. This module is the single ordered command source.
export const RESET_SCRIPT = 'SetValue(q, 11/7)\nSetValue(s, 1)\nSetValue(lesson, 1)\nSetValue(showBody, true)\nSetValue(showGuides, false)';
export const commands = [
  'q = Slider(0.5, 4, 0.001, 1, 250, false, true, false, false)',
  's = Slider(0.25, 2, 0.05, 1, 250, false, true, false, false)',
  'lesson = Slider(1, 3, 1, 1, 250, false, true, false, false)',
  'SetValue(q, 11/7)', 'SetValue(s, 1)', 'SetValue(lesson, 1)',
  'showBody = Checkbox("Bryła")', 'showGuides = Checkbox("Pozostałe apotemy")',
  'SetValue(showBody, true)', 'SetValue(showGuides, false)',
  'B = 11*s', 'h = 11*s/q', 'A = B/2',
  'P1 = (-A, -A, 0)', 'P2 = (A, -A, 0)',
  'P3 = (A, A, 0)', 'P4 = (-A, A, 0)',
  'O = (0, 0, 0)', 'V = (0, 0, h)',
  'M1 = Midpoint(P1, P2)', 'M2 = Midpoint(P2, P3)',
  'M3 = Midpoint(P3, P4)', 'M4 = Midpoint(P4, P1)',
  'base = Polygon(P1, P2, P3, P4)',
  'face1 = Polygon(P1, P2, V)', 'face2 = Polygon(P2, P3, V)',
  'face3 = Polygon(P3, P4, V)', 'face4 = Polygon(P4, P1, V)',
  'b1 = Segment(P1, P2)', 'b2 = Segment(P2, P3)',
  'b3 = Segment(P3, P4)', 'b4 = Segment(P4, P1)',
  'edge1 = Segment(P1, V)', 'edge2 = Segment(P2, V)',
  'edge3 = Segment(P3, V)', 'edge4 = Segment(P4, V)',
  'hSeg = Segment(O, V)', 'aSeg = Segment(O, M1)',
  'dSeg = Segment(P1, P3)', 'sSeg = Segment(M1, V)',
  's2Seg = Segment(M2, V)', 's3Seg = Segment(M3, V)', 's4Seg = Segment(M4, V)',
  // Values come from actual Euclidean segment lengths, not a separate JS renderer.
  'D = Length(dSeg)', 'S = Length(sSeg)', 'E = Length(edge1)',
  'rPi = (Length(b1) + Length(b2))/Length(hSeg)',
  'rPhi = Length(sSeg)/Length(aSeg)', 'rSqrt2 = Length(dSeg)/Length(b1)',
  'cPi = pi', 'cPhi = (1+sqrt(5))/2', 'cSqrt2 = sqrt(2)', 'tol = 0.001',
  'errPi = abs(rPi-cPi)/abs(cPi)', 'errPhi = abs(rPhi-cPhi)/abs(cPhi)',
  'errSqrt2 = abs(rSqrt2-cSqrt2)/abs(cSqrt2)',
  'okPi = errPi <= tol', 'okPhi = errPhi <= tol', 'okSqrt2 = errSqrt2 <= tol',
  'result = If(lesson == 1, rPi, If(lesson == 2, rPhi, rSqrt2))',
  'target = If(lesson == 1, cPi, If(lesson == 2, cPhi, cSqrt2))',
  'error = If(lesson == 1, errPi, If(lesson == 2, errPhi, errSqrt2))',
  'within = error <= tol',
  'titleText = Text("Piramida 11:7 | ETAP G1", (0.7, 28.4))',
  'lessonText = Text(If(lesson == 1, "#1 π: połowa obwodu / wysokość", If(lesson == 2, "#10 φ: apotema / półbok", "#5 √2: przekątna / bok")), (0.7, 15))',
  'formulaText = Text(If(lesson == 1, "R = (b1+b2)/h = 2B/h", If(lesson == 2, "R = S/A = sqrt(1+(2/q)^2)", "R = D/B = sqrt(2)")), (0.7, 13.5))',
  'resultText = Text("Wynik R = " + round(result, 12), (0.7, 12))',
  'targetText = Text("Wartość wzorcowa c = " + round(target, 12), (0.7, 10.5))',
  'errorText = Text("Odchylenie |R-c|/|c| = " + round(100*error, 9) + " %", (0.7, 9))',
  'toleranceText = Text("Tolerancja 0.1%: " + If(within, "TAK", "NIE"), (0.7, 7.5))',
  'dimensionsText = Text("B = " + round(B, 6) + " ; h = " + round(h, 6), (0.7, 6))',
  'noteText = Text(If(lesson == 3, "Tożsamość kwadratu; dowolne q i s.", "Przybliżenie celu; brak dowodu intencji."), (0.7, 4.5))',
  'scaleText = Text("q = B/h; s skaluje całą bryłę.", (0.7, 3))',
  'creditText = Text("Koncepcja projektu: Michał Przybylski — prylski.dev", (0.7, 1.5))',
  'githubText = Text("GitHub: https://github.com/MichaelZP/", (0.7, 0.5))',
  'resetButton = Button("Przywróć piramidę 11:7")',
  'piButton = Button("π (#1)")', 'phiButton = Button("φ (#10)")',
  'sqrtButton = Button("√2 (#5)")',
  'SetPerspective("GT")', 'SetActiveView(1)',
  'ZoomIn(0, 0, 23, 29)',
  'SetVisibleInView(xAxis, 1, false)', 'SetVisibleInView(yAxis, 1, false)',
  'SetVisibleInView(xAxis, -1, false)', 'SetVisibleInView(yAxis, -1, false)',
  'SetVisibleInView(zAxis, -1, false)', 'SetVisibleInView(xOyPlane, -1, false)',
  'SetCoords(q, 25, 105)', 'SetCoords(s, 25, 160)', 'SetCoords(lesson, 25, 215)',
  'SetCoords(showBody, 25, 265)', 'SetCoords(showGuides, 160, 265)',
  'SetCoords(resetButton, 25, 305)',
  'SetCoords(piButton, 25, 350)', 'SetCoords(phiButton, 130, 350)',
  'SetCoords(sqrtButton, 235, 350)',
];

export const scripts = {
  resetButton: RESET_SCRIPT,
  piButton: 'SetValue(lesson, 1)',
  phiButton: 'SetValue(lesson, 2)',
  sqrtButton: 'SetValue(lesson, 3)',
};
export const visibility = {
  base: 'showBody', face1: 'showBody', face2: 'showBody', face3: 'showBody', face4: 'showBody',
  b1: 'true', b2: 'lesson == 1', b3: 'false', b4: 'false',
  edge1: 'showBody', edge2: 'showBody', edge3: 'showBody', edge4: 'showBody',
  hSeg: 'lesson == 1 || lesson == 2', aSeg: 'lesson == 2', sSeg: 'lesson == 2',
  dSeg: 'lesson == 3',
  s2Seg: 'lesson == 2 && showGuides', s3Seg: 'lesson == 2 && showGuides',
  s4Seg: 'lesson == 2 && showGuides',
  P1: 'true', P2: 'true', P3: 'lesson == 1 || lesson == 3', P4: 'false',
  O: 'lesson == 1 || lesson == 2', V: 'lesson == 1 || lesson == 2',
  M1: 'lesson == 2', M2: 'lesson == 2 && showGuides',
  M3: 'lesson == 2 && showGuides', M4: 'lesson == 2 && showGuides',
};

export function configure(api) {
  // Hide auto-generated Polygon sides as well as numeric/helper objects.
  const names = api.getAllObjectNames();
  for (const name of names) {
    api.setVisible(name, false);
    api.setLabelVisible(name, false);
    api.setAuxiliary(name, true);
  }
  const exec = command => {
    api.evalCommand(command);
  };
  for (const [name, condition] of Object.entries(visibility)) {
    exec(`SetVisibleInView(${name}, 1, false)`);
    exec(`SetVisibleInView(${name}, -1, true)`);
    exec(`SetConditionToShowObject(${name}, ${condition})`);
  }
  for(const name of names.filter(n => !(n in visibility) && /^(segment|polygon|point)/.test(api.getObjectType(n)))) {
    exec(`SetConditionToShowObject(${name}, false)`);
    api.setVisible(name,false);
  }
  for (const name of ['base', 'face1', 'face2', 'face3', 'face4']) {
    api.setColor(name, 143, 172, 194); api.setFilling(name, 0.12);
  }
  const captions = {b1:'B', b2:'B', hSeg:'h', aSeg:'A = B/2', dSeg:'D', sSeg:'S',
    s2Seg:'S2', s3Seg:'S3', s4Seg:'S4'};
  for (const [name, caption] of Object.entries(captions)) {
    api.setCaption(name, caption); api.setLabelStyle(name, 3); api.setLabelVisible(name, true);
    api.setLineThickness(name, 6);
  }
  for (const name of ['P1','P2','P3','O','V','M1','M2','M3','M4']) api.setLabelVisible(name,true);
  for (const name of ['P1','P2','P3','P4','O','V','M1','M2','M3','M4']) api.setFixed(name,true,false);
  for (const name of ['b1','b2']) api.setColor(name, 24, 99, 190);
  api.setColor('hSeg', 199, 49, 58); api.setColor('aSeg', 24, 99, 190);
  api.setColor('sSeg', 202, 126, 15); api.setColor('dSeg', 126, 67, 178);
  for (const name of ['s2Seg','s3Seg','s4Seg']) {
    api.setColor(name, 202,126,15); api.setLineStyle(name, 1); api.setLineThickness(name, 3);
  }
  for (const name of names.filter(n => api.getObjectType(n) === 'text').concat(
    ['q','s','lesson','showBody','showGuides',...Object.keys(scripts)])) {
    exec(`SetVisibleInView(${name}, 1, true)`);
    exec(`SetVisibleInView(${name}, -1, false)`);
    api.setAuxiliary(name, false);
  }
  api.setCaption('q','q = B/h = %v'); api.setCaption('s','s — skala = %v'); api.setCaption('lesson','Lekcja 1–3 = %v');
  for (const name of ['q','s','lesson']) { api.setLabelStyle(name,3); api.setLabelVisible(name,true); }
  for (const name of ['showBody','showGuides',...Object.keys(scripts)]) {
    api.setLabelVisible(name,true); api.setColor(name,30,45,60);
  }
  api.setRounding('12');
  api.setGridVisible(false);
  api.setCoordSystem(-14,14,-14,14,-2,18,false);
  // Persistent GeoGebra scripts: no external JS listeners needed by the .ggb.
  const document = new DOMParser().parseFromString(api.getXML(), 'application/xml');
  document.querySelector('euclidianView3D > plate').setAttribute('show','false');
  for (const [name, script] of Object.entries(scripts)) {
    const element = document.querySelector(`element[label="${name}"]`);
    const node = document.createElement('ggbscript'); node.setAttribute('val',script);
    element.appendChild(node);
  }
  api.setXML(new XMLSerializer().serializeToString(document));
  api.setPerspective('GT');
  api.showToolBar(false);
  api.evalCommand('SetActiveView(-1)'); api.evalCommand('ZoomIn(0.5)'); api.evalCommand('SetActiveView(1)');
}
