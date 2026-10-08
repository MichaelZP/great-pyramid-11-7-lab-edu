> Follow-up, 2026-10-06: the RMS defect recorded in this historical audit has
> been repaired. The fresh independent comparison also asserts RMS minima;
> see [review](REVIEW-13.md) and [fresh results](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/audit-13/review-2026-10-06.json).

# Audyt 13 pozycji matematycznych piramidy 11:7

Data: 2026-10-05. Badana wersja aplikacji: `a11489c5b0995ded8f3e06fdd1405598f6bcb2f1`.

**Potwierdzono obliczenia wszystkich 13 wierszy silnika. Dla 11:7 dokładną
tożsamością z celem jest tylko `D/B = √2`. Pozostałe wiersze są porównaniami
wybranych proporcji z wartościami referencyjnymi. 12/13 mieści się w umownym
progu 0,1%; błąd `eggLW` wynosi 0,105620285%.** Nie jest to 13 niezależnych
odkryć ani dowód funkcji lub historycznej intencji konstrukcji.

## Zakres i źródła lokalne

Katalog aplikacji to `android-offline`. W chwili audytu nie było plików
`docs/plan-13-stalych.md` ani `docs/status-aktualizacji.md`. Przeczytano ich
istniejące odpowiedniki: [PLAN.md](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/PLAN.md) i [STATUS.md](STATUS.md), a także
`AUTHORSHIP.md`, oba README, dokumenty matematyczne, Golden Egg, optyczne,
Android i opis danych. Nie znaleziono obowiązującego `AGENTS.md`.
Nowy [status-aktualizacji.md](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/status-aktualizacji.md) zapisuje wynik tego etapu.

Źródłem inwentarza są `CONSTANTS`, `relationValue`, `geoFromBH` i
`geometricEggLW` w [engine.ts](../src/lib/pyramid/engine.ts), skonfrontowane
z [MATHEMATICS.md](MATHEMATICS.md) i dwoma skoroszytami:

- **EN:** [Great_Pyramid_11_7_Mathematical_Constants_Lab.xlsx](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/data/Great_Pyramid_11_7_Mathematical_Constants_Lab.xlsx).
- **PL:** [Piramida_11_7_laboratorium_stalych.xlsx](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/data/Piramida_11_7_laboratorium_stalych.xlsx).

Audyt obejmuje 13 aktywnych wierszy aplikacji. Dalsze liczby w bibliotece
kandydatów arkusza `02_Constants` / `02_Stale` nie są dodatkowymi aktywnymi
relacjami i nie zostały dołączone do tego zestawu.

## Geometria, definicje i sposób liczenia błędu

Rozpatrujemy prawidłową piramidę kwadratową: wierzchołek `V` leży pionowo
nad środkiem podstawy `O`; `M` jest środkiem boku, `C` narożnikiem podstawy.

| Symbol | Wielkość | Wyprowadzenie |
|---|---|---|
| `B` | bok kwadratu | wejście modelu |
| `H = OV` | wysokość pionowa | wejście modelu |
| `A = OM = B/2` | połowa boku | własność kwadratu |
| `D` | pełna przekątna podstawy | `D²=B²+B²`, więc `D=B√2` |
| `S = VM` | apotema ściany | `S²=H²+A²` w trójkącie `VOM` |
| `E = VC` | krawędź boczna | `OC=D/2=A√2`, więc `E²=H²+2A²` |
| `θ` | kąt apotemy nad podstawą | `tan θ=H/A`; `0<θ<π/2` |
| `β` | dopełnienie kąta w `VOM` | `β=π/2−θ` |

Wszystkie długości piramidy mogą mieć tę samą dowolną jednostkę. Dla 11:7
przyjmujemy dokładnie `B=11`, `H=7`, zatem:

```text
A = 11/2,  D = 11√2,  S = √317/2,  E = √438/2,
t = H/A = 14/11,
p = S/A = √(1+t²) = √317/11,
θ = atan(14/11) ≈ 51,842773412630940°.
```

Oznaczenia `Rπ`, `Rγ`, `Rφ` itd. poniżej oznaczają **wynik modelu**, a nie
matematyczną stałą. Wszystkie równości między `R` są tożsamościami modelu;
zbliżenie do stałej oznaczamy `≈`. Dla dodatniego celu `c`:

```text
ε = |R−c|/|c|,       błąd w procentach = 100ε.
Próg projektu: ε ≤ 0,001, czyli 0,1%.
```

Procentów nie wolno utożsamiać z bezwymiarowym `ε`. Próg nie jest tolerancją
wykonania ani prawdopodobieństwem prawdziwości hipotezy. Wartości tabeli są
zaokrąglone wyłącznie do prezentacji; błędy policzono przed zaokrągleniem.
Wiersz Bruna używa zadeklarowanego oszacowania, nie dokładnie znanego rozwinięcia.

## Wyniki dla 11:7

| # | ID / cel | Wynik modelu `R` | Wartość porównawcza `c` | `100ε` [%] | ≤0,1% |
|---|---|---:|---:|---:|---|
| 1 | `pi` / π | 3,142857142857 | 3,141592653590… | 0,040249943 | tak |
| 2 | `gamma` / γ | 0,577235434373 | 0,577215664902… | 0,003424971 | tak |
| 3 | `sqrt3` / √3 | 1,732395380555 | 1,732050807569… | 0,019893931 | tak |
| 4 | `sqrt6` / √6 | 2,449977042573 | 2,449489742783… | 0,019893931 | tak |
| 5 | `sqrt2` / √2 | 1,414213562373… | 1,414213562373… | **0 dokładnie** | tak |
| 6 | `sqrt5` / √5 | 2,235643103864 | 2,236067977500… | 0,019000927 | tak |
| 7 | `tribonacci` / T | 1,839626376991 | 1,839286755214… | 0,018464863 | tak |
| 8 | `brun` / B₂ | 1,902586321496 | 1,902160583104 (oszacowanie) | 0,022381832 | tak* |
| 9 | `invPhi` / 1/φ | 0,618115143049 | 0,618033988750… | 0,013131041 | tak |
| 10 | `phi` / φ | 1,618590346797 | 1,618033988750… | 0,034384818 | tak |
| 11 | `e` / e | 2,717323980239 | 2,718281828459… | 0,035237267 | tak |
| 12 | `eMinus1` / e−1 | 1,717323980239 | 1,718281828459… | 0,055744535 | tak |
| 13 | `eggLW` / φ | 1,619742960852 | 1,618033988750… | **0,105620285** | **nie** |

\* Klasyfikacja dotyczy przyjętej liczby referencyjnej Bruna. Nie ustanawia
ścisłego przedziału dla rzeczywistej stałej B₂.

## 1. π — `pi`

**Definicja celu:** π jest stosunkiem obwodu okręgu do jego średnicy.
**Wielkości:** suma dwóch boków podstawy `2B` oraz wysokość `H`.

```text
Rπ = 2B/H = 4/t.
11:7: Rπ = 22/7 ≈ 3,142857142857;
c = π ≈ 3,141592653590; 100ε ≈ 0,040249943%.
```

Wyprowadzenie wykorzystuje `B=2A` i `t=H/A`. To dokładna wartość proporcji
i przybliżenie π, nie wyprowadzenie π z piramidy. `22/7` jest wymierne,
π niewymierne. **Pełny obwód** daje `4B/H=44/7≈2π`.
Opis „obwód podstawy / wysokość” przy wzorze `2B/H` w silniku jest błędny.

**Zależności:** `t=4/Rπ`, więc ta jedna proporcja określa wszystkie pozostałe
proporcje piramidy. Na przykład `R√3=1/Rπ+√2` i
`Rφ=√(1+(4/Rπ)²)`.

## 2. Stała Eulera–Mascheroniego γ — `gamma`

**Definicja celu:** `γ=lim[n→∞](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/%CE%A3(k%3D1%E2%80%A6n)1/k−ln n)`.
**Wielkości:** `2B` oraz suma wysokości i dwóch pełnych przekątnych `H+2D`.
Ta suma jest konstrukcją arytmetyczną z długości, nie pojedynczym odcinkiem
już wskazanym na bryle.

```text
Rγ = 2B/(H+2D) = 4/(t+4√2).
11:7: Rγ = 22/(7+22√2) ≈ 0,577235434373;
c = γ ≈ 0,577215664902; 100ε ≈ 0,003424971%.
```

Wyprowadzenie: podziel licznik i mianownik przez `A`; `D/A=2√2`.
Potwierdzono wartość tej wybranej proporcji, ale nie związek definiujący
γ przez geometrię piramidy. Definicję i cyfry γ podaje
[NIST DLMF §5.2](https://dlmf.nist.gov/5.2#ii) oraz
[§3.12](https://dlmf.nist.gov/3.12).

**Zależności:** dokładnie `Rγ·R√3=1` oraz
`Rγ=1/(1/Rπ+√2)`. Natomiast **γ nie jest równa `1/√3`**.
Wierszy 2 i 3 nie można jednocześnie traktować jako dokładnych równości
z celami; cele nie są wzajemnie odwrotne.

## 3. √3 — `sqrt3`

**Definicja celu:** dodatni pierwiastek równania `x²=3`.
**Wielkości:** ta sama suma `H+2D` i długość `2B`, w odwróconej kolejności.

```text
R√3 = (H+2D)/(2B) = t/4+√2 = 1/Rγ.
11:7: R√3 = 7/22+√2 ≈ 1,732395380555;
c = √3 ≈ 1,732050807569; 100ε ≈ 0,019893931%.
```

Wyprowadzenie: `H/(2B)=t/4`, `D/B=√2`.
To przybliżenie √3 przez proporcję, całkowicie zależną od wiersza 2.
**Zależności:** wiersze 1, 2, 5 oraz `R√6=R√3·R√2` w wierszu 4.

## 4. √6 — `sqrt6`

**Definicja celu:** dodatni pierwiastek równania `x²=6`, dokładnie `√2·√3`.
**Wielkości:** suma `H+2D` i pełna przekątna `D`.

```text
R√6 = (H+2D)/D = 2+t/(2√2).
11:7: R√6 = 2+7/(11√2) ≈ 2,449977042573;
c = √6 ≈ 2,449489742783; 100ε ≈ 0,019893931%.
```

Wyprowadzenie: rozdzielenie sumy i `D=2A√2`.
**Zależności:** `R√6/R√3=2B/D=√2=D/B`, gdzie ostatnia równość
wynika z `D²=2B²`. Ponieważ cel też mnożymy przez √2, błąd względny
jest **dokładnie taki sam** jak w wierszu 3. Nie jest to dodatkowe niezależne
potwierdzenie.

## 5. √2 — `sqrt2`

**Definicja celu:** dodatni pierwiastek równania `x²=2`.
**Wielkości:** przekątna i bok kwadratu.

```text
D² = B²+B²  ⇒  R√2 = D/B = √2.
11:7 i każda inna wysokość: R√2 = √2 ≈ 1,414213562373;
c = √2; ε = 0 dokładnie.
```

To **dokładna tożsamość geometryczna**, niezależna od `H` i `θ`.
Nie odróżnia modelu 11:7 od żadnej innej piramidy o kwadratowej podstawie.
**Zależności:** określa `D`, występuje w wierszach 2–4 i 7–8; silnik
słusznie nadaje jej wagę 0 w średniej ważonej, lecz nadal liczy ją do 12/13.

## 6. √5 — `sqrt5`

**Definicja celu:** dodatni pierwiastek równania `x²=5`.
**Wielkości:** suma apotemy i boku `S+B`, podzielona przez apotemę `S`.

```text
R√5 = (S+B)/S = 1+2/p.
11:7: R√5 = 1+22/√317 ≈ 2,235643103864;
c = √5 ≈ 2,236067977500; 100ε ≈ 0,019000927%.
```

Wyprowadzenie: `B=2A`, `p=S/A`.
**Zależności:** dokładnie `R√5=1+2/Rφ`.
Dla **innego**, idealnego modelu `p=φ` otrzymujemy
`1+2/φ=2φ−1=√5`, ponieważ `φ²=φ+1`.
Dla 11:7 `p≠φ`, więc nie wolno przenosić tej idealnej równości na aktualny
model. Wiersze 6, 9 i 10 są jedną rodziną algebraiczną.

## 7. Stała Tribonacciego T — `tribonacci`

**Definicja celu:** jedyny rzeczywisty pierwiastek `T³−T²−T−1=0`, około
`1,83928675521416113255`. Równanie wynika z poszukiwania wzrostu `Tⁿ`
dla rekurencji `uₙ=uₙ₋₁+uₙ₋₂+uₙ₋₃`. Definicja i cyfry są potwierdzone
w [OEIS A058265](https://oeis.org/A058265).

**Wielkości:** `A+2D` oraz `S+B`, obie będące sumami długości.

```text
RT = (A+2D)/(S+B) = (1+4√2)/(p+2).
11:7: RT = 11(1+4√2)/(√317+22) ≈ 1,839626376991;
c = T ≈ 1,839286755214; 100ε ≈ 0,018464863%.
```

Wyprowadzenie proporcji: podziel przez `A`. Wyprowadzenie równania T
z rekurencji **nie dowodzi**, że ta proporcja je spełnia; wartości są różne.

**Zależności:** dokładnie `RT=(1+4R√2)/(Rφ+2)`.
Cel T ma inną definicję niż φ, ale wynik geometryczny nie jest niezależny
od wierszy 5 i 10. Etykieta „niezależny cel numeryczny” w kodzie nie oznacza
niezależnego pomiaru ani odkrycia.

## 8. Stała Bruna B₂ — `brun`

**Definicja celu:** zbieżna suma `Σ(1/q+1/(q+2))` po parach liczb
pierwszych bliźniaczych. Obejmuje `(3,5)` i `(5,7)`, więc składnik `1/5`
występuje dwa razy. Jest to B₂, nie stała iloczynowa Hardy'ego–Littlewooda C₂.
Definicję i heurystyczny charakter ekstrapolacji numerycznych opisuje
[Thomas R. Nicely, Enumeration to 10¹⁴…](https://oeis.org/A001359/a001359.pdf).

**Wielkości:** krawędź boczna `E=VC` i półbok `A=OM`.

```text
E² = H²+2A² ⇒ RB₂ = E/A = √(t²+2).
11:7: RB₂ = √438/11 ≈ 1,902586321496;
c przyjęte = 1,902160583104; 100ε ≈ 0,022381832%.
```

**Zależności:** `RB₂²=Rφ²+1`. To konsekwencja dwóch trójkątów
prostokątnych, nie niezależny wynik wobec φ.

**Ograniczenie:** projekt przechowuje `1,902160583104` jako liczbę
referencyjną. [OEIS A065421](https://oeis.org/A065421/internal) ostrzega przed
uznawaniem wszystkich końcowych cyfr za ustalone; wpis wiąże tę liczbę
z oszacowaniem Sebaha. Oryginalny serwer Sebaha/Gourdona nie odpowiedział
poprawnie podczas audytu. Nie potwierdzono rygorystycznego błędu tego
oszacowania i nie przeliczano sumy po liczbach pierwszych. Podana w tabeli
precyzja błędu odtwarza porównanie projektowe; nie jest precyzją wiedzy o B₂.
Nie znaleziono twierdzenia łączącego sumę Bruna z `E/A`.

## 9. Odwrotność złotej liczby 1/φ — `invPhi`

**Definicja celu:** `1/φ=φ−1=(√5−1)/2`.
**Wielkości:** apotema `S` i suma `S+A`.

```text
R1/φ = S/(S+A) = p/(p+1).
11:7: R1/φ = √317/(√317+11) ≈ 0,618115143049;
c = 1/φ ≈ 0,618033988750; 100ε ≈ 0,013131041%.
```

Wyprowadzenie: dzielenie przez `A`.
**Zależności:** `R1/φ=Rφ/(Rφ+1)`, a nie ogólnie `1/Rφ` ani `Rφ−1`.
Równość `p/(p+1)=1/p` zachodzi dla dodatniego `p` dopiero, gdy
`p²=p+1`, czyli `p=φ`. Dla 11:7 nazwa celu nie uprawnia do odwrócenia
wyniku wiersza 10. Wiersz jest całkowicie od niego zależny.

## 10. Złota liczba φ — `phi`

**Definicja celu:** przy złotym podziale odcinka `(a+b)/a=a/b=φ>1`.
Stąd `φ²=φ+1` i `φ=(1+√5)/2`.
**Wielkości:** apotema `S=VM` i półbok `A=OM`.

```text
S²=H²+A² ⇒ Rφ = S/A = √(1+t²).
11:7: Rφ = √317/11 ≈ 1,618590346797;
c = φ ≈ 1,618033988750; 100ε ≈ 0,034384818%.
```

Warunek dokładnego złotego stosunku wymaga `t²=φ²−1=φ`, a więc
`t=√φ`, zamiast `14/11`. To rozróżnia preset „dokładne φ” i 11:7.

**Zależności:** `p=Rφ` wyznacza wiersze 6–9, a dla `t>0` także
`t=√(p²−1)` i wszystkie inne wiersze piramidy. Wiersz 13 ma ten sam cel φ,
ale inną geometrię oraz dodatkowe założenie `Z₀=7,65`.

## 11. Liczba Eulera e — `e`

**Definicja celu:** `e=exp(1)=Σ(n=0…∞)1/n!`, podstawa logarytmu naturalnego.
**Wielkości:** kąty `θ` i `β=90°−θ` tego samego przekroju `VOM`.

```text
Re = 2θ/β = 2atan(t)/(π/2−atan(t)).
11:7: Re ≈ 2,717323980239;
c = e ≈ 2,718281828459; 100ε ≈ 0,035237267%.
```

Wyprowadzenie dotyczy **proporcji kątów**: `θ=atan(H/A)`, a suma ostrych
kątów trójkąta prostokątnego wynosi 90°. Czynnik 2 jest wybranym elementem
formuły porównawczej; nie wynika z definicji funkcji wykładniczej.
[Strona źródłowa Alana Greena](https://tobeornottobe.org/the-great-pyramid-intro/math-constants/)
przedstawia dodawanie dwóch takich ilorazów przy kącie 51,8504°.
To dokumentuje pochodzenie porównania, nie dowód dokładnej równości z e.

**Jednostki:** przy `θ_deg=180θ_rad/π` czynnik konwersji skraca się:
`2θ_deg/(90−θ_deg)=2θ_rad/(π/2−θ_rad)`. Opis silnika, że wynik zależy
od miary w stopniach, jest mylący. Błędem byłoby tylko użycie radianów
przy pozostawieniu liczby `90` w mianowniku.

**Zależności:** funkcja tego samego `t` co wiersze 1 i 10; całkowicie
wyznacza wiersz 12. Równanie `Re=e` wybiera kąt
`θ=eπ/[2(e+2)]`; samo takie dobranie kąta nie jest niezależnym odkryciem e.

## 12. e−1 — `eMinus1`

**Definicja celu:** stała pochodna `e−1=Σ(n=1…∞)1/n!`.
**Wielkości:** te same kąty `θ`, `β` co w wierszu 11 oraz liczba 1.

```text
R_eMinus1 = R_e − 1 = 2θ/β−1 = (3θ−90°)/(90°−θ).
11:7: R_eMinus1 ≈ 1,717323980239;
c = e−1 ≈ 1,718281828459; 100ε ≈ 0,055744535%.
```

Wyprowadzenie to odejmowanie jedności od poprzedniego wzoru.
**Zależności:** dokładnie wiersz 11, bez nowej informacji geometrycznej.
Błąd bezwzględny jest taki sam, a względny większy:
`ε_eMinus1 = [e/(e−1)] ε_e`. Różna wartość procentowa nie oznacza
drugiego niezależnego wyniku.

## 13. L/W przekroju „Golden Egg” — `eggLW`

**Definicja:** `L/W` jest stosunkiem długości do maksymalnej szerokości
zamkniętego owalu będącego składową przecięcia powierzchni obrotowej
`z·r=1`, `r=√(x²+y²)`, `z>0`, z płaszczyzną
`z=Z₀+x tan θ`. **Celem jest istniejąca stała φ**, nie nowa stała L/W.
Płaszczyzna ma kąt θ nad poziomem; utożsamienie go z kątem apotemy jest
założeniem modelu, nie koniecznością geometryczną.

**Wielkości:** osiowa długość owalu w płaszczyźnie `L`, poprzeczna szerokość
`W`, wysokość przecięcia osi `Z₀=7,65` w znormalizowanych współrzędnych
powierzchni. To nie są odcinki `B,H,S,E` piramidy.
W jednostkach fizycznych należałoby napisać `zr=k`, gdzie `k` ma wymiar
długości²; parametr bezwymiarowy to `Z₀/√k`. Przyjęto `k=1`.
Przeskalowanie samej piramidy nie zmienia wiersza; dowolna zmiana `Z₀`
przy stałym `k` już go zmienia.

### Wyprowadzenie końców i maksimum szerokości

Niech `t=tan θ>0`. Eliminując `x=(z−Z₀)/t`, otrzymujemy

```text
y² = f(z) = 1/z² − (z−Z₀)²/t².
```

Na osi owalu `y=0`. Dla `z<Z₀` równanie ma postać
`z²−Z₀z+t=0`, a dla `z>Z₀`: `z²−Z₀z−t=0`.
Jeżeli `Z₀²>4t`, końce zamkniętej składowej wokół `Z₀` są:

```text
zLo = (Z₀+√(Z₀²−4t))/2,
zHi = (Z₀+√(Z₀²+4t))/2.
L = (zHi−zLo)/sin θ.
```

Pierwiastek `(Z₀−√(Z₀²−4t))/2` wyznacza inną, nieograniczoną
składową przecięcia dochodzącą do `z→0+`. Jest rzeczywistą częścią
geometrii, nie „fałszywym” rozwiązaniem; nie jest końcem badanego owalu
i nie wolno łączyć tych składowych przy liczeniu L.

Maksymalną szerokość znajdujemy z pochodnej, niezależnie od trójdzielnego
wyszukiwania w silniku:

```text
f′(z) = −2/z³ − 2(z−Z₀)/t² = 0
      ⇔ z³(Z₀−z)=t².
W = 2√f(zMax),
R_LW = (zHi−zLo)/(2 sin θ √f(zMax)).
```

Istnieje dokładnie jedno maksimum szerokości wewnątrz tego owalu.
Dla `g(z)=z³(Z₀−z)−t²` mamy `g(zLo)>0`, `g(Z₀)<0`,
a `g′(z)=z²(3Z₀−4z)`. Funkcja najpierw ewentualnie rośnie, a potem
ściśle maleje; w `(zLo,Z₀)` przechodzi przez zero dokładnie raz.
Powyżej `Z₀` pochodna `f′` jest ujemna. Bisekcja wybiera więc właściwe
globalne maksimum szerokości zamkniętej składowej.

### Wynik 11:7 i rozwiązanie złote

```text
t = 14/11; Z₀ = 7,65
zLo ≈ 7,479845787071286
zHi ≈ 7,812900735064411
zMax ≈ 7,646376705533864
L ≈ 0,423562482965745
W ≈ 0,261499813984576
R_LW ≈ 1,619742960852462
c = φ ≈ 1,618033988749895
ε ≈ 0,001056202845211713; 100ε ≈ 0,105620284521171%.
```

Rozwiązując osobno `R_LW=φ` przy ustalonym `Z₀`, uzyskano
`θ≈51,795319255897588°`, `L≈0,423115245749481`,
`W≈0,261499603031444`. To potwierdza preset Golden Egg z dokładnością
zapisu kąta. W obliczeniu 60-cyfrowym reszta równania jest poniżej `2·10⁻⁵⁸`
względnie; nie oznacza to fizycznej dokładności wymiarów ani dokładności
zaokrąglonego presetu w JavaScript.

**Zakres potwierdzenia:** wykazano jednoznaczność maksimum szerokości;
znaleziono rozwiązanie kąta w nawiasie `1,26<t<1,28` i odtworzono je
niezależnie od arkusza. Nie przedstawiono dowodu globalnej jednoznaczności
rozwiązania `L/W=φ` w całej dziedzinie `0<t<Z₀²/4`.
Nie należy utożsamiać jednoznaczności maksimum W z jednoznacznością kąta.
Przy swobodnych `θ` i `Z₀` nie ma podstaw do ogłaszania unikalnej pary.

**Kształt:** owal nie jest elipsą. Współrzędna wzdłuż osi w płaszczyźnie
jest liniową funkcją `z`, a dla elipsy symetrycznej względem tej osi `y²`
byłoby funkcją kwadratową tej współrzędnej. Tutaj `f‴(z)=−24/z⁵≠0`.
Szerokość maksymalna nie przypada w połowie między końcami. Nazwa
„hyperbolic cone” oznacza tu powierzchnię obrotu hiperboli, nie klasyczny
stożek o prostych tworzących. Nie używa się całkowania do obliczenia L/W.

**Zależności i pochodzenie:** kąt pochodzi z tego samego `t` co pozostałe
wiersze, ale `Z₀` i wybór powierzchni są dodatkowymi wejściami. Wspólny cel φ
łączy wiersz z pozycjami 6, 9 i 10; nie oznacza identyczności ich proporcji.
[Christian Lange, The golden angle](https://www.sectioaurea.com/sectioaurea/the_golden_angle.htm)
podaje 51,84°, `Z₀=7,65`, długość 0,423584 i szerokość 0,261789.
Te dane źródłowe nie zastępują wyprowadzenia powyżej: rozwiązany kąt różni
się od 51,84°, a podane wymiary od wymiarów dokładnego modelu.
Nie potwierdzono historycznego uzasadnienia wyboru `Z₀` ani związku
modelu `zr=1` z fizyczną funkcją piramidy. Inny model `z=1/r²`
i idealna elipsoida φ:1:1 w arkuszu są odrębnymi konstrukcjami.

## Mapa zależności i znaczenie „13 pozycji”

Wiersze 1–12 mają **jeden stopień swobody kształtu**, `t=H/A`.
Wiersz 13, przy ustalonym `Z₀`, także jest funkcją tego samego `t`.
Nie są to niezależne obserwacje. Rodziny wag w aplikacji tylko częściowo
ograniczają wielokrotne liczenie zależnych relacji.

```text
t ──> Rπ=4/t
  ├─> R√3=t/4+√2 ──> Rγ=1/R√3, R√6=√2·R√3
  ├─> p=Rφ=√(1+t²) ──> R√5=1+2/p
  │                    ├─> R1/φ=p/(p+1)
  │                    ├─> RT=(1+4√2)/(p+2)
  │                    └─> RB₂=√(p²+1)
  ├─> θ=atan(t) ──> Re=2θ/(π/2−θ) ──> R_eMinus1=Re−1
  └─> (θ, Z₀, zr=1, wybór owalu) ──> R_LW
kwadrat ──> R√2=√2 (nie zależy od t)
```

π, e, γ, T, B₂, φ i pierwiastki są matematycznie zdefiniowanymi stałymi.
`1/φ` i `e−1` są stałymi pochodnymi. `L/W` jest proporcją geometryczną,
nie dodatkową uniwersalną stałą. Każdy `R` jest proporcją modelu; poza
wierszem √2 jej bliskość do celu jest tu przybliżeniem.
Odrębna definicja celu nie daje niezależności wyniku geometrycznego.

## Pochodzenie komórek i zgodność skoroszytów

Nazwy arkuszy różnią się językiem, adresy komórek są wspólne:

| Rola | EN | PL | Sprawdzone komórki |
|---|---|---|---|
| Parametry | `00_Start` | `00_Start` | B7:B13, E6:E9; B6 jako wejście skali |
| Geometria | `01_Models` | `01_Modele` | D7:K7 (11:7), D12:K12 (Golden Egg) |
| Cele i wagi | `02_Constants` | `02_Stale` | D6:D17, G6:G17 |
| 12 wyników | `03_12_Errors` | `03_Bledy_12` | D7:O7, D12:O12 |
| Ich błędy | te same arkusze `03` | te same arkusze `03` | P7:AA7, P12:AA12 |
| Punktacja | `04_Consensus` | `04_Konsensus` | M7:O7 i formuły wiersza 6 |
| Owal | `11_Golden_Egg` | `11_Zlote_Jajko` | B6:B9, R16:R17, R21, R23, R25, R27 |

Mapowanie pozycji na wynik / błąd / cel dla 11:7:

| # / ID | Arkusz `03`: wynik | Arkusz `03`: błąd | Arkusz `02`: cel |
|---|---|---|---|
| 1 `pi` | D7 | P7 | D6 |
| 2 `gamma` | E7 | Q7 | D7 |
| 3 `sqrt3` | F7 | R7 | D8 |
| 4 `sqrt6` | G7 | S7 | D9 |
| 5 `sqrt2` | H7 | T7 | D10 |
| 6 `sqrt5` | I7 | U7 | D11 |
| 7 `tribonacci` | J7 | V7 | D12 |
| 8 `brun` | K7 | W7 | D13 |
| 9 `invPhi` | L7 | X7 | D14 |
| 10 `phi` | M7 | Y7 | D15 |
| 11 `e` | N7 | Z7 | D16 |
| 12 `eMinus1` | O7 | AA7 | D17 |
| 13 `eggLW` | **brak w tabeli `03`** | **brak** | φ: `11!B9` |

Dla Golden Egg pierwsze 12 wyników i błędów leży w wierszu 12 zamiast 7.
Owal w `11!R25` obliczany jest wyłącznie dla kąta `11!B6`, nie dla kąta
11:7. Jego długość to `R23=R17−R16`, szerokość `R21`, a kontrola reszty
to `B12=ABS(R25−B9)`. Układ arkusza jest równoważny powyższemu po
zamianie osi i przyjęciu `z=Z₀−v sin θ`.

**Dwie zamrożone liczby:** `B6=51,79531925589765` oraz
`R27=0,00459521093768915` są wpisanymi wartościami, nie działającym
w arkuszu solverem kąta i maksimum. Dla obecnego presetu odtworzono obie
niezależnie (`R27` różni się od obliczonego `vMax` o około `1,45·10⁻¹⁷`).
Zmiana kąta lub `Z₀` nie przelicza `R27`; etykieta „exact width” nie jest
ogólnie prawdziwa dla edytowanych wejść. Silnik WWW wyszukuje maksimum
ponownie przy każdym kącie.

Przeliczono rzeczywiste formuły komórek obu skoroszytów i ich numeryczne
poprzedniki ograniczonym ewaluatorem arytmetyki, niezależnie od zapisanych
wyników pamięci podręcznej. Wszystkie 12 proporcji i 12 błędów, dla obu
modeli i obu języków, są zgodne z audytem. Maksymalna różnica wartości
wobec obliczeń 60-cyfrowych wyniosła `8,22·10⁻¹⁵`.
Nie wykonywano pełnego przeliczenia skoroszytów w Excelu; nie sprawdzano
wszystkich kandydatów, wykresów ani działania całego interfejsu arkuszy.
Pliki XLSX odczytano bez zapisywania. Ich sumy SHA-256 oraz odczytane
formuły i wartości przechowuje [wyniki.json](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/audit-13/wyniki.json).

## Kontrola modelu Golden Egg

Przy niezależnie rozwiązanym kącie błędy procentowe wynoszą:

| ID | `100ε` [%] | ≤0,1% |
|---|---:|---|
| `pi` | 0,210916233 | nie |
| `gamma` | 0,034715421 | tak |
| `sqrt3` | 0,011391882 | tak |
| `sqrt6` | 0,011391882 | tak |
| `sqrt2` | 0 | tak |
| `sqrt5` | 0,039229992 | tak |
| `tribonacci` | 0,065581083 | tak |
| `brun` | 0,053809810 | tak, względem oszacowania |
| `invPhi` | 0,027099912 | tak |
| `phi` | 0,070917394 | tak |
| `e` | 0,250792667 | nie |
| `eMinus1` | 0,396748158 | nie |
| `eggLW` | 0 jako warunek definiujący rozwiązanie | tak |

Potwierdza to **10/13**. Zgodność ostatniego wiersza została narzucona
równaniem rozwiązującym kąt i nie jest dodatkowym testem tego presetu.
W aplikacji kąt jest zaokrąglony do 51,795319256°; reszta L/W jest rzędu
`10⁻¹²` względnie, a nie zerem ani dokładnością pojedynczego epsilona
arytmetyki double. Sformułowanie „machine precision” jest zbyt mocne.

## Punktacja i rozdzielczość skanu — osobne ustalenia

Wagi `0,35/0,25/0,25/0,15`, próg `0,001`, obserwacja `51,844°`,
półpasmo `0,02°` i skala ułamka `0,0001` są zgodne między kodem
a `00_Start`. Ich zgodność nie uzasadnia naukowo wyboru tych liczb.
Nie ustalono źródła statystycznego dla interpretacji `±0,02°` ani dowodu,
że wagi odpowiadają niezależnym informacjom.

Silnik liczy średnią ważoną błędów wierszy: π, T, B₂ i L/W mają wagę 1;
γ, √3, √6 po 1/3; √5, 1/φ, φ po 1/3; e i e−1 po 1/2; √2 ma 0.
Suma wag wynosi 7. Nazwa `independent` jest nazwą tej heurystyki,
nie dowodem niezależności. W szczególności T i B₂ zależą od `Rφ`.

Oceny mają postać `100·clamp(1−εważ/0,001)`,
`100·clamp(1−|θ−51,844°|/0,02°)`,
`100s²/(f²+s²)` dla `f=|(B/H)−11/7|/(11/7)`,
oraz odsetek punktów lokalnego skanu spełniających próg dla wszystkich
13 wierszy. `clamp` ogranicza wynik do [0,1]. Wynik łączny jest ich
sumą ważoną. Preferencja dla 11/7 została więc częściowo **wbudowana**
w kryterium ułamka; nie wynika dopiero z punktacji.

W arkuszach ranking nadal obejmuje 12 wierszy, suma wag wynosi 6.
Ponadto błąd ułamka odnosi się do najlepszego `p/q` dla `q≤20`, ma
mianownik `B/H` i dodatkową karę dla `q>7` (`04!M7`), podczas gdy
aplikacja zawsze porównuje z 11/7, z mianownikiem 11/7, bez tej kary.
`bestFraction` wyświetlane w aplikacji nie jest źródłem jej oceny ułamka.
Nie należy opisywać całej punktacji aplikacji jako identycznej z arkuszem.

Dla 11:7 aplikacja daje: średni błąd 0,029802180%, błąd ważony
0,038397766%, maksimum 0,105620285%; oceny składowe około
61,602234 / 93,867063 / 100 / 8,75 i łączną 71,340048.
W lokalnym paśmie jest 80 punktów: 52 spełniają wszystkie pierwsze 12
celów, tylko 7 spełnia wszystkie 13. Stąd arkuszowe 65% odporności
oraz aplikacyjne 8,75% opisują różne kryteria. Zapisany wynik łączny
arkusza `04!O7≈83,698861` nie jest sprzecznością arytmetyczną.

Niezależnie przeliczono oba skany 51,78°–51,90°:

| Krok | Liczba punktów | Minimum średniej | Minimum ważonej | Minimax | Rzeczywiste minimum RMS | Wszystkie 13 w progu |
|---|---:|---:|---:|---:|---:|---|
| 0,0005° (silnik) | 241 | 51,8505° | 51,8505° | 51,8375° | **51,8460°** | 51,8370°–51,8400°, 7 punktów |
| 0,001° (wykres UI) | 121 | 51,850° | 51,850° | 51,838° | **51,846°** | 51,837°–51,840°, 4 punkty |

Są to minima na siatkach, nie dowód minimum ciągłego ani dokładne granice
przedziału spełniania progów. Jeśli liczyć odporność 11:7 na grubszej
siatce, byłoby 4/40=10%; obecny `robustnessScore` nadal używa drobniejszej.

**Wykryty błąd:** `scanMinima` zwraca `rmsAngle: indA`, czyli kąt
minimum średniej ważonej zamiast minimum RMS. Wyniku nazwanego `rmsAngle`
nie wolno cytować jako minimum RMS. Audyt zapisuje usterkę; nie zmienia
kodu aplikacji.

## Przeprowadzone sprawdzenia i granice wniosków

Odtwarzalny skrypt: [audit-13/verify.py](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/audit-13/verify.py).
Wynik z tego audytu: [audit-13/wyniki.json](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/audit-13/wyniki.json).

```powershell
# Python 3.11+ z openpyxl; Node >=22.18 z obsługą importu .ts
python -X utf8 docs/audit-13/verify.py --node node > docs/audit-13/wyniki.json
```

Skrypt używa 60-cyfrowego `decimal`, wzoru Machina dla π, szeregów
trygonometrycznych, bisekcji wielomianu T i równania pochodnej szerokości.
γ jest wartością referencyjną z DLMF; B₂ jest oszacowaniem projektu.
Sprawdza końce owalu, reszty równań, zależności przy czterech nachyleniach,
niezmienniczość skali dla `B=1,11,72,0225,440`, rzeczywiste formuły dwóch
XLSX, oba skany i zgodność z silnikiem. Maksymalna różnica 26 wyników
silnika wobec audytu wyniosła `1,264·10⁻¹¹`; obejmuje zaokrąglenie kąta
Golden Egg w kodzie. Wszystkie klasyfikacje progowe się zgadzają.

Uruchomiono również istniejący Vitest pod Node 24.19.0:
**1 plik, 25/25 testów zaliczonych**. Pierwszy start został zablokowany
przez dostęp sandboxa do konfiguracji Vite; powtórzenie za zgodą poza
sandboxem powiodło się. Testy regresji są uzupełnieniem, nie substytutem
niezależnych obliczeń. Nie było zmian silnika, UI, konfiguracji, arkuszy,
budowania aplikacji, instalacji Android ani publikacji.

Pozostają jawne ograniczenia: brak ścisłego przedziału referencji Bruna,
brak dowodu globalnej unikalności złotego kąta, brak potwierdzenia intencji
doboru wzorów i `Z₀` oraz empirycznej podstawy obserwacji i wag.
Nie dopasowywano żadnego wejścia 11:7, progu ani wartości odniesienia,
aby uzyskać oczekiwane trafienie. Osobne rozwiązanie kąta Golden Egg
jest kontrolą definicji tego presetu. Niezależność statystyczna i historyczne
znaczenie dopasowań nie wynikają z samej zgodności numerycznej.
