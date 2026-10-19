# ETAP G6 — rozszerzenia geometryczne / geometric extensions

**Koncepcja projektu: Michał Przybylski — prylski.dev**  
GitHub: https://github.com/MichaelZP/

Nowy, osobny model **G6** (2026-10-19). Nie zastępuje G1, G2 ani
zatwierdzonego G4 (`g5/`); te pliki pozostają bajtowo bez zmian.
Lekcje odpowiadają zakładce „Rozszerzenia geometryczne” aplikacji
(MichaelZP/great-pyramid-11-7-lab, commit `644dc99`).

- Plik: [piramida-11-7-G6.ggb](piramida-11-7-G6.ggb), SHA-256 `8f1c8385855fd1c845a7445686be0020aa3ed9412b5560df67d3c9d7fd3f361c`.
- Widok online: [education/geogebra/g6/](https://michaelzp.github.io/great-pyramid-11-7-lab-edu/education/geogebra/g6/).
- Lekcje na stronie: [rozszerzenia.html](../../rozszerzenia.html).
- Weryfikacja: [VERIFICATION.md](VERIFICATION.md); polecenia: [commands.txt](commands.txt), reset: [reset-script.txt](reset-script.txt).

## PL — obsługa

Widoki: Graphics 1 = panel, Graphics 2 = owal i wykres (`GD`), 3D = piramida z kulą (`GT`).
Suwaki: q = B/h (0,5…4, krok 0,001), s — skala (0,25…2, krok 0,05),
z₀ (1…40, krok 0,05), lekcja 1–3, krok kuli 1–4, nr proporcji B:H 1–6.
B = 11s, h = 11s/q. Start i **Reset 11:7**: q = 11/7, s = 1, z₀ = 7,65, lekcja 1.
Przełączniki: Bryła, Kula, Linia granicy, English. Przyciski: Reset 11:7,
1 · L/W, 2 · r, 3 · 11:7, Krok +. Wszystkie skrypty są natywne (GgbScript) w pliku.

1. **Granica proporcji złotego jaja.** Rzeczywisty przekrój powierzchni
   z·√(x²+y²) = 1 płaszczyzną z = z₀ + t·x, t = h/A (z bryły). Krzywa `oval`
   jest wyliczona ze wzoru przekroju, w jego płaszczyźnie i w jednej skali ×g —
   **nie elipsą**. Warunek dziedziny: z₀² > 4t (dla 11:7 z₀ > 2,256304299271);
   poniżej owal i wyniki są niezdefiniowane, a panel pokazuje komunikat.
   L = (b−a)·√(1+t²), W z maksimum y²(x) (pierwiastek x(z₀+tx)³+t = 0).
   L/W maleje ku S/A = √(1+t²); linia przerywana ma długość L/(S/A), więc
   jest zawsze dłuższa od W. φ leży o 0,034% poniżej granicy.
2. **Kula wpisana.** r = A·h/(A+S), I = (0, 0, r), T na apotemie MV,
   MT = MO = A, VT = S − A. Kontrola w silniku mierzy odległość I od
   podstawy i czterech ścian (Distance do płaszczyzn) oraz IT — wszystkie = r.
   VI/OI = S/A (ta sama rodzina φ, nie nowe potwierdzenie); MT/VT ≈ φ (0,0899%).
3. **Dlaczego 11:7.** 2B/h i S/A z odcinków bryły oraz tabela dla
   3:2, 8:5, 11:7, 14:9, 19:12, 25:16, ten sam błąd |R − c| / |c|.
   Kolejność według mianownika; to nie ranking. Słupki obcięto na 5%.

Model matematyczny; zgodności liczbowe nie dowodzą intencji budowniczych.

## EN — usage

Views: Graphics 1 = panel, Graphics 2 = oval and chart (`GD`), 3D = pyramid with the sphere (`GT`).
Sliders: q = B/h (0.5…4, step 0.001), s — scale (0.25…2, step 0.05), z₀ (1…40, step 0.05),
lesson 1–3, sphere step 1–4, B:H item 1–6. Start and **Reset 11:7**: q = 11/7, s = 1, z₀ = 7.65, lesson 1.
Toggles: Solid, Sphere, Limit line, English. Buttons: Reset 11:7, 1 · L/W, 2 · r, 3 · 11:7, Step +.

1. **Golden egg limit.** The true section of z·√(x²+y²) = 1 by z = z₀ + t·x, drawn in its own plane at one
   uniform scale — not an ellipse. Domain guard z₀² > 4t; below it the oval and values are undefined.
   L/W decreases toward S/A = √(1+t²); the dashed auxiliary line has length L/(S/A), always longer than W.
2. **Inscribed sphere.** r = A·h/(A+S), centre I, tangency point T on the apothem MV; engine-measured distances
   from I to the base, all four faces and T equal r. VI/OI = S/A (same φ family), MT/VT ≈ φ (0.0899%).
3. **Why 11:7.** 2B/h and S/A from the solid's segments plus a fixed list of small ratios with the same
   relative-error definition. Ordered by denominator, not a ranking.

A mathematical model; numerical agreements do not establish builders' intent.

## Budowa i kontrola / Build and check

```bash
node education/geogebra/g6/prepare.mjs      # commands.txt, reset-script.txt, engine-cases.json (Node ≥ 18)
node education/geogebra/server.mjs          # http://127.0.0.1:8093/g6/workbench.html (local only)
python3 education/geogebra/g6/verify-artifacts.py
```

W warsztacie: **Zbuduj G6 → Sprawdź G6 → Zapisz .ggb**, potem po przeładowaniu
**Otwórz zapisany G6 → Sprawdź G6 → Zapisz raport → Zapisz widok**.
Warsztat ładuje oficjalny silnik z https://www.geogebra.org/apps/deployggb.js
i nic nie wysyła na konto GeoGebra. Serwer zapisuje tylko trzy nazwane artefakty G6.

Wartości odniesienia: [reference-values.json](reference-values.json) — kopia
`docs/geometric-extensions/reference-values.json` z aplikacji (mpmath, 40 cyfr).

## Autorstwo i licencje / Authorship and licences

Nie przypisujemy Michałowi autorstwa stałych matematycznych ani GeoGebra.
Materiały nie ustanawiają nowej licencji projektu (Copyright © 2026 Michał Przybylski);
decyzja licencyjna CC BY-NC-SA 4.0 / CC BY-SA 3.0 dotyczy wyłącznie G4 (`g5/`).
GeoGebra zachowuje własne [warunki licencji](https://www.geogebra.org/license).
