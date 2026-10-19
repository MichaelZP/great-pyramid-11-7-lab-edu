# ETAP G6 — raport weryfikacji / verification report

2026-10-19. Koncepcja projektu: Michał Przybylski — prylski.dev.  
GitHub: https://github.com/MichaelZP/

## Wynik / Result

[piramida-11-7-G6.ggb](piramida-11-7-G6.ggb) zbudowano i wyeksportowano przez
oficjalny silnik **GeoGebra Classic 5.4.920.0** (deployggb.js) w Chrome headless,
z [workbench.html](workbench.html) serwowanego przez [server.mjs](../server.mjs).
Następnie zapisany **plik z dysku** wczytano do świeżej instancji i powtórzono
pełną kontrolę: **645/645 asercji PASS**, w tym **538 porównań liczbowych**,
maksymalna różnica bezwzględna **8,1e−13** (błąd % przy z₀ = 30,6; próg 1e−8).
Kontrola obejmuje też eksport/odczyt przez API i natywne skrypty przycisków.

SHA-256: `8f1c8385855fd1c845a7445686be0020aa3ed9412b5560df67d3c9d7fd3f361c`.  
Widok: [model.png](model.png). Pełne asercje: [geogebra-checks.json](geogebra-checks.json),
przypadki: [engine-cases.json](engine-cases.json).

## Odniesienie / Reference

[reference-values.json](reference-values.json) = `docs/geometric-extensions/reference-values.json`
z MichaelZP/great-pyramid-11-7-lab `644dc99a62aba0c106a10818fee6a4c6ac8d1e79`
(mpmath, 40 cyfr, niezależne od kodu aplikacji), SHA-256
`b146651e3d8a67c0fc1a12e1a7cc9a500c244594909747b8d071ca9b1659c105`.
Próg: 2e−12·max(1,|x|) dla wartości zamkniętych, 1e−11 dla L, W, L/W,
1e−9 dla x(W_max) (Root w GeoGebra), 1e−8/1e−9 dla błędów w %.

| Wielkość / quantity (q = 11/7, s = 1) | GeoGebra | reference |
|---|---:|---:|
| L/W, z₀ = 7,65 | 1.6197429608524623 | 1.6197429608524618 |
| L, W, z₀ = 7,65 | 0.42356248296574533, 0.26149981398457606 | 0.4235624829657453, 0.2614998139845761 |
| L/W, z₀ = 15,3 | 1.618662131983316 | 1.6186621319833108 |
| L/W, z₀ = 30,6 | 1.618594832386584 | 1.6185948323865706 |
| S/A (granica / limit) | 1.6185903467968052 | 1.618590346796805 |
| L/W błąd / error vs φ, z₀ = 7,65 | 0.10562028452120087 % | 0.1056202845211713 % |
| r | 2.673193998657622 | 2.673193998657622 |
| VI/OI | 1.618590346796805 | 1.618590346796805 |
| MT, VT | 5.499999999999999, 3.4022469073824286 | 5.5, 3.4022469073824277 |
| MT/VT (błąd / error) | 1.6165787345021085 (0.0899396587 %) | 1.6165787345021092 (0.0899396587 %) |
| T (wzdłuż podstawy / along base, wysokość / height) | 2.101981464374531, 4.324750863523324 | 2.1019814643745307, 4.324750863523325 |
| 2B/h (błąd / error vs π) | 3.142857142857143 (0.0402499435 %) | 3.142857142857143 (0.0402499435 %) |

## Zakres kontroli / Scope

- 6 suwaków niezależnych; `oval` typu `curvecartesian` (nie stożkowa / not a conic); wzór przekroju z z₀.
- 3 przekroje odniesienia: a, b, x(W_max), L, W, L/W, błąd %; L/W zmierzone z narysowanych odcinków;
  linia przerywana L/(S/A); L/W > S/A > φ.
- Przebieg z₀ = 2,26…40: L/W maleje i pozostaje powyżej S/A; zgodność z niezależnym solverem (bisekcja).
- Dziedzina: z₀ = 1, 2, 2,25 → eggOK = false, L/W niezdefiniowane, owal ukryty, komunikat w panelu.
- Kula: r, OI, VI, MT, VT, ilorazy, T; odległości I od podstawy, 4 ścian i T = r; MT = MO.
- Tabela 6 proporcji: błąd względem π i φ, wybór B:H.
- 28 konfiguracji q × s (q = 11/7, 1, π/2, 2, 3, 0,5, 4; s = 0,25 / 1 / 1,5 / 2): styczność, VI/OI = S/A,
  MT = MO, 2B/h = 2q, L/W z niezależnego solvera lub strażnik dziedziny, niezmienniczość skali.
- Widoczność wg lekcji, przełączniki, kroki kuli, przyciski, PL/EN, reset, eksport/odczyt.
- [verify-artifacts.py](verify-artifacts.py): audyt ZIP/XML, raportu i odniesienia; G1, G2 i G4 bez zmian.

Nie sprawdzono osobnej instalacji Classic 6, telefonu ani pracy offline.
Not checked: a separate Classic 6 install, phones, offline use.
