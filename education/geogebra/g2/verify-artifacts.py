"""Audit G2 files and their link to the actual engine; does not run GeoGebra."""
from pathlib import Path
from zipfile import ZipFile
import hashlib
import json
import xml.etree.ElementTree as ET

folder = Path(__file__).resolve().parent
data = json.loads((folder / 'engine-cases.json').read_text(encoding='utf-8'))
report = json.loads((folder / 'geogebra-checks.json').read_text(encoding='utf-8'))
engine = folder.parent.parent.parent / 'src/lib/pyramid/engine.ts'
assert hashlib.sha256(engine.read_bytes()).hexdigest() == data['engine']['sha256']
assert report['engine'] == data['engine']
assert len(data['cases']) == report['configurationCount'] == 64
assert report['total'] == report['passed'] == len(report['assertions']) == 12849
assert all(a['pass'] is True for a in report['assertions'])
assert report['relationIds'] == [r['id'] for r in data['relations']]
assert len(report['relationIds']) == 10

with ZipFile(folder / 'piramida-11-7-G2.ggb') as archive:
    assert archive.testzip() is None
    xml = archive.read('geogebra.xml')
    root = ET.fromstring(xml)
    elements = {e.attrib['label']: e for e in root.findall('construction/element')}
    dependent = {e.attrib['label'] for e in root.findall('construction/expression')}
    for command in root.findall('construction/command'):
        dependent.update(command.find('output').attrib.values())
    for name, minimum, maximum, step, initial in [
        ('q', .5, 4, .001, 11/7), ('s', .25, 2, .05, 1), ('lesson', 1, 10, 1, 2)
    ]:
        element = elements[name]
        assert name not in dependent
        assert float(element.find('value').attrib['val']) == initial
        assert float(element.find('slider').attrib['min']) == minimum
        assert float(element.find('slider').attrib['max']) == maximum
        assert float(element.find('animation').attrib['step']) == step
    for name, expected in report['initial'].items():
        raw = elements[name].find('value').attrib['val']
        actual = {'true': 1, 'false': 0}[raw] if raw in ('true', 'false') else float(raw)
        assert actual == expected
    buttons = ['resetButton', 'piButton', 'phiButton', 'sqrtButton',
               'previousButton', 'nextButton', 'view3dButton', 'viewCopiesButton']
    for name in buttons:
        assert elements[name].find('ggbscript') is not None
    assert elements['resetButton'].find('ggbscript').attrib['val'] == (
        folder / 'reset-script.txt').read_text(encoding='utf-8').strip()
    assert elements['viewCopiesButton'].find('ggbscript').attrib['val'] == 'SetPerspective("GD")'
    assert elements['view3dButton'].find('ggbscript').attrib['val'] == 'SetPerspective("GT")'
    assert root.find('euclidianView3D/plate').attrib['show'] == 'false'
    assert 'Koncepcja projektu: Michał Przybylski — prylski.dev' in xml.decode('utf-8')
    assert 'https://github.com/MichaelZP/' in xml.decode('utf-8')
    for prefix in ['n', 'd']:
        for i in [1, 2, 3]:
            helper = elements[f'{prefix}Name{i}']
            assert helper.find('condition').attrib['showObject'] == 'false'
            assert elements[f'{prefix}Copy{i}'].find('condition') is not None
            color = elements[f'{prefix}Copy{i}'].find('objColor')
            assert all(key in color.attrib for key in ['dynamicr', 'dynamicg', 'dynamicb'])
    for name in ['CopyN0', 'CopyN1', 'CopyD0', 'CopyD1']:
        assert elements[name].attrib['type'] == 'point'

numeric = [a['details']['delta'] for a in report['assertions']
           if isinstance(a.get('details'), dict) and 'delta' in a['details']]
for q in {c['q'] for c in data['cases']}:
    group = [c for c in data['cases'] if c['q'] == q]
    for r in data['relations']:
        suffix = r['suffix']
        values = [c['expected']['r' + suffix] for c in group]
        assert max(values) - min(values) < 2e-12
        assert len({c['expected']['ok' + suffix] for c in group}) == 1
g1 = folder.parent / 'piramida-11-7-G1.ggb'
assert hashlib.sha256(g1.read_bytes()).hexdigest() == '7b530e84bd80e63528eefe42c358d674d8ed9ad3d2a5655ad65e91af65d0a691'
print(json.dumps({'package': 'PASS', 'geogebraChecks': report['passed'],
                  'configurations': len(data['cases']), 'relations': len(report['relationIds']),
                  'numericComparisons': len(numeric), 'maxAbsoluteDelta': max(numeric),
                  'G1unchanged': True,
                  'ggbSha256': hashlib.sha256((folder / 'piramida-11-7-G2.ggb').read_bytes()).hexdigest()}, indent=2))
case = next(c for c in data['cases'] if c['name'] == '11:7, s=1')
for index, r in enumerate(data['relations'], 1):
    e = case['expected']; suffix = r['suffix']
    print(f"{index} {r['id']}: R={e['r'+suffix]:.12f}; error={100*e['err'+suffix]:.9f}%; within={e['ok'+suffix]}")
