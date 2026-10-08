# ETAP G2 — raport porównania i zakres sprawdzeń

2026-10-08. Koncepcja projektu: Michał Przybylski — prylski.dev.  
GitHub: https://github.com/MichaelZP/

## Wykonany rezultat

[piramida-11-7-G2.ggb](piramida-11-7-G2.ggb) wyeksportowano przez oficjalny
silnik **GeoGebra Classic 5.4.920.0** w przeglądarce. Zawiera dziesięć
rzeczywistych pozycji #1–10, źródłowe odcinki 3D, dwa łańcuchy kopii
w osobnym Graphics 2 i osiem natywnych skryptów przycisków.
q=11/7, s=1 i pozycja #2 są stanem początkowym i stanem resetu.

Po przeładowaniu warsztatu wczytano zapisany **plik z dysku** do świeżej
instancji silnika i ponowiono pełną kontrolę. Niezależnie procedura kontrolna
wykonuje eksport i odczyt przez API, a następnie reset zapisanym skryptem.
Obsługa modelu w `.ggb` nie zależy od zewnętrznych listenerów JavaScript.

Przykład widoku kopii: [model.png](model.png). Lista poleceń i ustawień:
[README.md](README.md), [commands.txt](commands.txt), [reset-script.txt](reset-script.txt).
Nie publikowano na koncie GeoGebra ani na stronie projektu.

## Dane odniesienia i próg numeryczny

[prepare.mjs](prepare.mjs) importuje bieżące `geoFromBH` i `evaluateRelations`
z [engine.ts](../../../src/lib/pyramid/engine.ts), nie kopię funkcji.
Node 24.19.0; audyt plików Python 3.12.

- HEAD aplikacji: `1ae5f97299ae20d1f04bf96516c7ded691af2f21`.
- SHA-256 silnika: `72496508b2d8c4911915ef44c77224ebd3cf79a055e887cf62388071dca2e7de`.
- 16 proporcji q × 4 skale s=0,25 / 1 / 1,5 / 2: **64 konfiguracje**.
- 8 głównych q: 11/7, 1, 2, 3, π/2, 2/√φ, 0,5, 4.
- 8 dodatkowych q: po obu stronach granic tolerancji π i γ.
  Dla π: q=(π/2)(1±0,001f); dla γ: q=1/(2/[γ(1±0,001f)]−2√2),
  gdzie f=0,999 oraz 1,001. To przypadki tuż wewnątrz i tuż na zewnątrz
  obu granic, zamiast niepewnej klasyfikacji dokładnie na granicy float.
- **12 849/12 849 asercji PASS**, w tym **8258 porównań liczbowych**.
- Maksymalna różnica bezwzględna: **1,4210854715202004e−14**,
  przy porównaniu całej sumy kopii z sumą aplikacji.
- Próg porównania implementacji: `2e−12 × max(1, |wartość oczekiwana|)`.
  Tolerancja edukacyjna pozostaje osobnym warunkiem ε≤0,001 (0,1%).

Pełne dane i każda asercja: [engine-cases.json](engine-cases.json),
[geogebra-checks.json](geogebra-checks.json). Śladowe różnice reprezentacji
zmiennoprzecinkowej nie są odchyleniem modelu historycznego lub fizycznego.

Przykład przy B=11, h=7; wartości **aplikacji**, zaokrąglone tylko w tabeli:

| # / ID | R | ε w % | W progu 0,1% |
|---|---:|---:|---|
| 1 pi | 3,142857142857 | 0,040249943 | TAK |
| 2 gamma | 0,577235434373 | 0,003424971 | TAK |
| 3 sqrt3 | 1,732395380555 | 0,019893931 | TAK |
| 4 sqrt6 | 2,449977042573 | 0,019893931 | TAK |
| 5 sqrt2 | 1,414213562373 | ≈0 | TAK |
| 6 sqrt5 | 2,235643103864 | 0,019000927 | TAK |
| 7 tribonacci | 1,839626376991 | 0,018464863 | TAK |
| 8 brun | 1,902586321496 | 0,022381832 | TAK względem przyjętego oszacowania |
| 9 invPhi | 0,618115143049 | 0,013131041 | TAK |
| 10 phi | 1,618590346797 | 0,034384818 | TAK |

Przykładowo przy q=2 wynik γ=0,600884419289 i wynik √3=1,664213562373
nie spełniają progu. Dane dla wszystkich q i s są w JSON; G2 nie wymusza
zgodności poza ustawieniem początkowym. Dokładność √2 wynika z kwadratu.
Dziesięć wyników „TAK” nie jest dziesięcioma niezależnymi potwierdzeniami.

## Co sprawdzano

W każdej konfiguracji: B,h,A,D,S,E; wszystkie dziesięć wartości, błędów
i klasyfikacji; wysokość V; równość czterech apotem; zależności algebraiczne
γ/√3/√6 i √5/Brun/1φ wobec φ. Dla **każdej** aktywnej pozycji sprawdzono
wynik panelu, błąd i próg, długość całego licznika i mianownika kopii,
iloraz ich końców, widoczność wszystkich sześciu miejsc na składniki
oraz równość każdej niezerowej kopii ze źródłem podzielonym przez s.

Sprawdzono też niezależność q i s, ukrycie sześciu pomocniczych tekstów
w obu widokach 2D, źródłową geometrię poza panelem sterowania,
izolację odcinków pomiędzy dziesięcioma pozycjami, dodatkowe apotemy tylko
dla #10, bezpośrednie przyciski π/φ/√2, poprzedni/następny z granicami,
reset oraz zapis i odczyt skryptów zmiany widoków po eksporcie.
Oględziny w przeglądarce obejmują 3D dla γ i Bruna oraz kopie dla γ i T.
Po odczycie pliku ręcznie kliknięto natywne „Poprzednia” i „Kopie”,
przechodząc z Bruna do łańcuchów T; poprawiony tytuł jest czytelny także
przy widocznym pasku narzędzi GeoGebra.

W widoku kopii cały współczynnik **1/s** jest jawny. Suma h+2D nie jest
prezentowana jako jeden istniejący odcinek piramidy. Dwa odcinki D są
kopiowane dwukrotnie, mają osobne podpisy i wspólne końce.
Normalizacja jest taka sama dla licznika i mianownika; suwak s zmienia
bryłę 3D i fizyczne wartości sum, a iloraz oraz długości znormalizowane
pozostają stałe dla stałego q.

Dodatkowo:

```powershell
python education/geogebra/g2/verify-artifacts.py
```

Wynik PASS: CRC ZIP, XML, suwaki i ich niezależność, początkowe wartości
względem raportu, osiem skryptów, kolory dynamiczne kopii, warunki
widoczności, typy końców łańcuchów (punkty), ukrycie xOy, podpis i GitHub,
zgodność hash silnika i kompletność raportu, niezmienność proporcji między
skalami oraz niezmieniony hash gotowego pliku G1.
G1 SHA-256: `7b530e84bd80e63528eefe42c358d674d8ed9ad3d2a5655ad65e91af65d0a691`.

## Granice i następne kroki

- Nie uruchomiono osobnej instalacji GeoGebra Classic 6; wykonanie
  i odczyt sprawdzono w oficjalnym silniku przeglądarkowym przez API.
- Nie sprawdzono samodzielnego kalkulatora 3D, telefonu, dotyku,
  pełnej obsługi klawiaturą, czytnika ekranu, druku ani pracy offline.
  Układ dwóch widoków jest przeznaczony na komputer; mały ekran przewija.
- Ręczne wpisywanie wszystkich poleceń w aplikacji nie zostało osobno
  powtórzone. Warsztat wykonuje polecenia i jawne dodatkowe ustawienia.
- Nie wykonano nowej kwerendy historycznej γ, T i B₂; wykorzystano
  zweryfikowaną dokumentację projektu i jej przypisania autorstwa.
  Dokumentację GeoGebra dotyczącą `G`, `D`, `T` przeczytano online.
- Pozycje #11–12 i #13 nie są zaimplementowane. Pozostają w
  [planie](../EXPANSION-13.md); owal #13 przy 11:7 nadal jest poza 0,1%.
- Odbiór czytelności i treści przez autora pozostaje otwarty.

G2 dodano obok G1. Nie zmieniano obliczeń, UI ani wdrożenia istniejącej
aplikacji; zmieniono wyłącznie materiały edukacyjne, wspólny lokalny serwer
artefaktów i dokumentację statusu.
