"""Audit G6 files against the lab reference values; does not run GeoGebra."""
from pathlib import Path
from zipfile import ZipFile
import hashlib
import json
import xml.etree.ElementTree as ET

folder = Path(__file__).resolve().parent
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
reference = json.loads((folder / 'reference-values.json').read_text(encoding='utf-8'))
data = json.loads((folder / 'engine-cases.json').read_text(encoding='utf-8'))
report = json.loads((folder / 'geogebra-checks.json').read_text(encoding='utf-8'))
assert sha(folder / 'reference-values.json') == data['source']['sha256'] == report['reference']['sha256']
assert report['reference'] == data['source']
assert report['total'] == report['passed'] == len(report['assertions']) == 645
assert all(a['pass'] is True for a in report['assertions'])
assert report['configurationCount'] == len(data['cases']) == 28
names = {a['name']: a for a in report['assertions']}
# Engine values recorded in the report must match the mpmath reference.
egg, sphere, why = reference['eggLimit'], reference['inSphere'], reference['why117']
required = ['ref egg S/A limit', 'ref sphere r', 'ref sphere VI/OI error %', 'ref sphere MT/VT error %', 'ref 2B/h', 'ref S/A',
            'ref T along base', 'ref T height', 'native reset', 'export/reload native reset', 'oval is a curve, not a conic/ellipse']
for section in egg['sections']:
    required += [f"ref z0={section['z0']}: {key}" for key in ['a', 'b', 'L', 'W', 'LW', 'xWmax', 'error %']]
    required += [f"z0={section['z0']}: L/W measured from drawn segments", f"z0={section['z0']}: dashed line L/(S/A) measured"]
required += [f'domain guard z0={z}: {k}' for z in data['domainCases'] for k in ['eggOK false', 'L/W undefined', 'oval hidden', 'message shown']]
for name in required:
    assert names[name]['pass'] is True, name
numeric = [a['details'] for a in report['assertions'] if isinstance(a.get('details'), dict) and 'delta' in a['details']]
assert all(d['delta'] <= d['tolerance'] * max(1, abs(d['expected'])) for d in numeric)
initial = report['initial']
for key, expected, tol in [('LW', egg['sections'][0]['LW'], 1e-11), ('L', egg['sections'][0]['L'], 1e-11), ('W', egg['sections'][0]['W'], 1e-11),
                           ('limitSA', egg['limitSA'], 1e-12), ('r', sphere['r'], 1e-12), ('VIoverOI', sphere['VIoverOI'], 1e-12),
                           ('MToverVT', sphere['MToverVT'], 1e-12), ('rPi', why['twoBoverH'], 1e-12), ('rPhi', why['SA'], 1e-12)]:
    assert abs(initial[key] - expected) <= tol * max(1, abs(expected)), key

with ZipFile(folder / 'piramida-11-7-G6.ggb') as archive:
    assert archive.testzip() is None
    xml = archive.read('geogebra.xml').decode('utf-8')
    root = ET.fromstring(xml)
    elements = {e.attrib['label']: e for e in root.findall('construction/element')}
    dependent = {e.attrib['label'] for e in root.findall('construction/expression')}
    for command in root.findall('construction/command'):
        dependent.update(command.find('output').attrib.values())
    for name, (minimum, maximum, step, initial_value) in data['sliders'].items():
        element = elements[name]
        assert name not in dependent, name
        assert float(element.find('value').attrib['val']) == initial_value, name
        assert float(element.find('slider').attrib['min']) == minimum
        assert float(element.find('slider').attrib['max']) == maximum
        assert float(element.find('animation').attrib['step']) == step
    for name in ['showBody', 'showSphere', 'showLimit']:
        assert elements[name].attrib['type'] == 'boolean' and elements[name].find('value').attrib['val'] == 'true'
    assert elements['langEN'].find('value').attrib['val'] == 'false'
    for name in ['resetButton', 'eggButton', 'sphereButton', 'whyButton', 'nextStepButton']:
        assert elements[name].attrib['type'] == 'button' and elements[name].find('ggbscript') is not None
    assert elements['resetButton'].find('ggbscript').attrib['val'] == (folder / 'reset-script.txt').read_text(encoding='utf-8').strip()
    # The egg is the true section curve, not a fitted ellipse.
    assert elements['oval'].attrib['type'] == 'curvecartesian'
    expressions = {e.attrib['label']: e.attrib['exp'] for e in root.findall('construction/expression')}
    assert expressions['fy'] == 'fy(x) = 1 / (z0 + (t * x))^(2) - x^(2)'
    assert 'z0' in expressions['eggOK'] and '4t' in expressions['eggOK'].replace(' ', '').replace('*', '')
    assert not any(e.attrib.get('type') in ('conic', 'ellipse') for e in elements.values())
    for name in ['O', 'V', 'M', 'I', 'T']:
        assert elements[name].attrib['type'] == 'point3d', name
    assert elements['ball'].attrib['type'] == 'quadric'
    for name in ['oval', 'auxSeg', 'ball', 'barsPi', 'T']:
        assert elements[name].find('condition') is not None, name
    assert root.find('euclidianView3D/plate').attrib['show'] == 'false'
    assert 'Koncepcja projektu: Michał Przybylski — prylski.dev' in xml
    assert 'https://github.com/MichaelZP/' in xml
    assert 'G6' in xml

geogebra = folder.parent
assert sha(geogebra / 'piramida-11-7-G1.ggb') == '7b530e84bd80e63528eefe42c358d674d8ed9ad3d2a5655ad65e91af65d0a691'
assert sha(geogebra / 'g2/piramida-11-7-G2.ggb') == 'c55940f50280cc95eb2a280abec63dad8c6bd33609fc59e7d8eba9c5cb8c4082'
assert sha(geogebra / 'g5/piramida-11-7-G4.ggb') == 'a6bdb540ed37407cafbc39fbd5bf20cbbf1968fa3ed5b84af6d5cb137a4eac2c'
print(json.dumps({'package': 'PASS', 'geogebraChecks': report['passed'], 'geogebraVersion': report['geogebraVersion'],
                  'numericComparisons': len(numeric), 'maxAbsoluteDelta': max(d['delta'] for d in numeric),
                  'G1G2G4unchanged': True, 'ggbSha256': sha(folder / 'piramida-11-7-G6.ggb')}, indent=2))
for key in ['LW', 'limitSA', 'r', 'VIoverOI', 'MToverVT', 'rPi', 'rPhi']:
    print(f'{key}: GeoGebra {initial[key]!r}')
