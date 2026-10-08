# Plan rozszerzenia G1 na rzeczywiste 13 pozycji

Plan do oceny autora; w G1 wykonane są **tylko pi, phi, sqrt2**.
W osobnym [G2](g2/README.md) wykonano pozycje **#1–10**, w tym siedem
dodatkowych porównań i osobny widok kopii odcinków. #11–13 pozostają planem.
Źródło inwentarza i kolejności: `CONSTANTS`, `relationValue` w
`src/lib/pyramid/engine.ts` oraz `docs/matematyka-13-stalych.md`.
Cele, wartości referencyjne i próg 0,001 pozostają zgodne z aplikacją.

Koncepcja projektu: Michał Przybylski — prylski.dev.  
GitHub: https://github.com/MichaelZP/

| # / ID | R i cel | Konstrukcja następnego etapu | Zależność / granica |
|---|---|---|---|
| 1 pi | 2B/h → π | G1: dwa boki i h | przybliżenie; połowa obwodu |
| 2 gamma | 2B/(h+2D) → 0,5772156649015329 | dwa boki; łańcuch kopii h,D,D | wybór porównania, nie definicja γ |
| 3 sqrt3 | (h+2D)/(2B) → √3 | odwróć role łańcuchów #2 | dokładnie 1/Rgamma; cele nie są odwrotne |
| 4 sqrt6 | (h+2D)/D → √6 | łańcuch h,D,D; przekątna D | Rsqrt6=√2·Rsqrt3, ten sam błąd względny |
| 5 sqrt2 | D/B → √2 | G1: przekątna i bok | tożsamość każdego kwadratu, nie wyróżnia 11:7 |
| 6 sqrt5 | (S+B)/S → √5 | kopie S,B połączone końcami | 1+2/Rphi; dokładna zgodność przy idealnym φ |
| 7 tribonacci | (A+2D)/(S+B) → 1,8392867552141612 | dwa jawne łańcuchy A,D,D i S,B | (1+4√2)/(Rphi+2); cel spełnia T³−T²−T−1=0 |
| 8 brun | E/A → 1,902160583104 | krawędź E=P1V i półbok A | oszacowanie B₂; rygorystyczny błąd celu nieustalony; Rbrun²=Rphi²+1 |
| 9 invPhi | S/(S+A) → 1/φ | S wobec łańcucha S,A | Rphi/(Rphi+1), ogólnie nie 1/Rphi |
| 10 phi | S/A → φ | G1: apotema i półbok | określa rodzinę #6–9 |
| 11 e | 2θ/(90°−θ) → e | kąty θ przy M1 i β przy V w VOM | porównaj miary kątów, nie długości łuków; β=90°−θ |
| 12 eMinus1 | Re−1 → e−1 | wspólna konstrukcja #11 i odjęcie 1 | wynik zależny; inny błąd względny przy tym samym bezwzględnym |
| 13 eggLW | L/W → φ | osobny owal zr=1, z=Z₀+x tanθ, Z₀=7,65 | osobny model, nie odcinek piramidy; 11:7 poza 0,1% |

## Kolejność implementacji i odbioru

1. **Rodzina sum długości** (#2–4, #6–9): wykonana w osobnym **G2**.
   Rozszerzony wybór jednej pozycji #1–10; kopie obu łańcuchów mają
   wspólny współczynnik 1/s, wyniki sum są podane w jednostkach bryły.
   Kopie odcinków układaj koniec-do-końca w jednej skali, z identyfikacją
   źródła i liczby powtórzeń. Suma h+2D nie jest jednym naturalnym odcinkiem
   bryły. Nie pokazuj wszystkich łańcuchów naraz. Porównaj długości kopii
   i wynik z aplikacją przy kilku q i s, także blisko granicy tolerancji.
2. **Rodzina kątowa** (#11–12): θ=atan(h/A), β=90°−θ, zaznacz rzeczywiste
   kąty w VOM. Nie mieszaj radianów z liczbą 90. Iloraz jest taki sam przy
   spójnej konwersji obu miar. Podwójny θ oznacz jako sumę miar, a nie
   dodatkowy kąt piramidy. Sprawdź jednostki i zależność ReMinus1=Re−1.
3. **Osobny model owalu** (#13), dopiero po odbiorze dwóch rodzin.
   W znormalizowanych współrzędnych: t=tanθ=2/q, k=1, Z₀=7,65;
   dziedzina zamkniętego owalu wymaga Z₀²>4t>0.
   Wybierz zLo=(Z₀+√(Z₀²−4t))/2, zHi=(Z₀+√(Z₀²+4t))/2.
   Mniejszy dolny pierwiastek należy do innej nieograniczonej składowej.
   Zmaksymalizuj f(z)=1/z²−((z−Z₀)/t)² wewnątrz owalu;
   kontrola niezależna: zMax³(Z₀−zMax)=t².
   L=(zHi−zLo)/sinθ, W=2√f(zMax). Mierz L w płaszczyźnie, W w prawdziwym
   maksimum, bez zastępowania owalu elipsą ani maksimum środkiem osi.
   W GeoGebra zbadaj Solver/Root i krzywą parametryczną; wynik pierwiastka
   sprawdź względem niezależnej bisekcji i `eggLengthOverWidth` aplikacji.
4. **Niezmienność skali owalu**: parametr s jest skalą prezentacji wszystkich
   jego współrzędnych. W fizycznym zapisie zr=k skala s wymaga k′=s²k,
   Z₀′=sZ₀. Nie zmieniaj tylko Z₀ przy k=1. Zachowaj θ zależne od q.
   Dla q poza dziedziną pokazuj „brak zamkniętego owalu”, bez zastępczego wyniku.
5. **Pełny odbiór 13 pozycji**: numery/ID w kolejności silnika, każdy wzór,
   cel, wynik, ε, procenty i próg; zapis/reload `.ggb`, reset, jedna aktywna
   konstrukcja, ukrywanie rodzin i czytelność. Porównaj wszystkie 13 przy
   11:7, idealnym π, idealnym φ, Golden Egg i dowolnych q/s. Wynik oczekiwany
   dla 11:7 to 12/13, `eggLW` około 0,105620285% poza progiem, nie 13/13.

Wszystkie pozycje są funkcjami tego samego kształtu i przyjętych parametrów.
Historia celów, hipoteza autora i geometryczny wynik pozostają oddzielne.
Pełny rejestr źródeł jest w `docs/historia-13-pozycji.md` i
`src/lib/pyramid/relation-history.ts`: Euler/Mascheroni dla γ, Euklides dla
proporcji i pierwiastków, Feinberg (1963) i OEIS A058265 dla Tribonacciego,
Viggo Brun / Thomas R. Nicely / OEIS A065421 dla B₂, Euler dla e,
Alan Green jako wskazane źródło porównania kątowego, Christian Lange
(czerwiec 2002) dla współczesnej propozycji owalu. Cytowanie propozycji
Langego nie zatwierdza jego interpretacji fizycznej lub historycznej.
