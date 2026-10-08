"""Read-only G1 package audit; does not execute GeoGebra or replace browser checks."""
from pathlib import Path
from zipfile import ZipFile
import hashlib
import json
import xml.etree.ElementTree as ET

folder = Path(__file__).resolve().parent
cases = json.loads((folder / 'engine-cases.json').read_text(encoding='utf-8'))
report = json.loads((folder / 'geogebra-checks.json').read_text(encoding='utf-8'))
engine = folder.parent.parent / 'src/lib/pyramid/engine.ts'
assert hashlib.sha256(engine.read_bytes()).hexdigest() == cases['engine']['sha256']
assert report['engine'] == cases['engine']
assert len(cases['cases']) == 32
assert report['passed'] == report['total'] == len(report['assertions']) == 936
assert all(a['pass'] is True for a in report['assertions'])

with ZipFile(folder / 'piramida-11-7-G1.ggb') as archive:
    assert archive.testzip() is None
    xml = archive.read('geogebra.xml')
    root = ET.fromstring(xml)
    elements = {e.attrib['label']: e for e in root.findall('construction/element')}
    dependent = {e.attrib['label'] for e in root.findall('construction/expression')}
    for command in root.findall('construction/command'):
        dependent.update(command.find('output').attrib.values())
    for name, minimum, maximum, step, initial in [
        ('q', 0.5, 4, 0.001, 11/7), ('s', 0.25, 2, 0.05, 1)
    ]:
        element = elements[name]
        assert name not in dependent
        slider = element.find('slider')
        assert float(slider.attrib['min']) == minimum
        assert float(slider.attrib['max']) == maximum
        assert float(element.find('animation').attrib['step']) == step
        assert float(element.find('value').attrib['val']) == initial
    for name in ['B', 'h', 'A', 'D', 'S', 'E', 'rPi', 'rPhi', 'rSqrt2',
                 'errPi', 'errPhi', 'errSqrt2', 'okPi', 'okPhi', 'okSqrt2']:
        raw = elements[name].find('value').attrib['val']
        value = {'true': 1, 'false': 0}.get(raw) if raw in ('true', 'false') else float(raw)
        assert value == report['initial'][name]
    assert root.find('euclidianView3D/plate').attrib['show'] == 'false'
    for name in ['resetButton', 'piButton', 'phiButton', 'sqrtButton']:
        assert elements[name].find('ggbscript') is not None
    assert elements['resetButton'].find('ggbscript').attrib['val'] == (
        folder / 'reset-script.txt').read_text(encoding='utf-8').strip()
    assert 'Koncepcja projektu: Michał Przybylski — prylski.dev' in xml.decode('utf-8')
    assert 'https://github.com/MichaelZP/' in xml.decode('utf-8')
    for name in ['hSeg', 'aSeg', 'sSeg', 'dSeg', 's2Seg', 's3Seg', 's4Seg']:
        assert elements[name].find('condition') is not None

numeric = [a['details']['delta'] for a in report['assertions']
           if isinstance(a.get('details'), dict) and 'delta' in a['details']]
for q in {c['q'] for c in cases['cases']}:
    group = [c for c in cases['cases'] if c['q'] == q]
    for suffix in ['Pi', 'Phi', 'Sqrt2']:
        values = [c['expected']['r' + suffix] for c in group]
        assert max(values) - min(values) < 2e-12
        assert len({c['expected']['ok' + suffix] for c in group}) == 1

print(json.dumps({'package': 'PASS', 'geogebraChecks': report['passed'],
                  'configurations': len(cases['cases']), 'numericComparisons': len(numeric),
                  'maxAbsoluteDelta': max(numeric),
                  'ggbSha256': hashlib.sha256((folder / 'piramida-11-7-G1.ggb').read_bytes()).hexdigest(),
                  'engineSha256': cases['engine']['sha256']}, indent=2))
print('q | s | pi | phi | sqrt2 | pi error % | phi error % | classifications')
for case in cases['cases']:
    if case['s'] != 1:
        continue
    e = case['expected']
    print(f"{case['q']:.12g} | 1 | {e['rPi']:.12g} | {e['rPhi']:.12g} | "
          f"{e['rSqrt2']:.12g} | {100*e['errPi']:.9g} | {100*e['errPhi']:.9g} | "
          f"{e['okPi']}/{e['okPhi']}/{e['okSqrt2']}")
