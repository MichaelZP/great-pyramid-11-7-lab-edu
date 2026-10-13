from pathlib import Path
import hashlib,zipfile,xml.etree.ElementTree as ET
p=Path(__file__).parent/'piramida-11-7-G4.ggb'
assert len(p.read_bytes())==20562
assert hashlib.sha256(p.read_bytes()).hexdigest()=='a6bdb540ed37407cafbc39fbd5bf20cbbf1968fa3ed5b84af6d5cb137a4eac2c'
with zipfile.ZipFile(p) as z:
 assert z.testzip() is None
 root=ET.fromstring(z.read('geogebra.xml'))
 assert len(root.findall('.//construction/element'))==338
print('Approved G4 binary, ZIP integrity and 338 objects: PASS')
