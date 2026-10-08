# Historia 13 pozycji i tutorial

Przegląd źródeł: 2026-10-05. Teksty aplikacji i ten dokument powstają z tego samego rejestru `relation-history.ts`; odtworzenie: `node docs/history-13/generate.mjs` (Node ≥22).

Historia pojęcia nie jest historią jego nazwy ani symbolu. Data najstarszego wskazanego świadectwa nie zawsze jest datą odkrycia. Brak ustalonego źródła intencji nie jest dowodem, że intencja była niemożliwa. Zapisujemy zakres potwierdzenia, bez przypisywania motywów budowniczym.

## Trzy warstwy dowodu

- Matematyka: definicje celów i obliczenia modelu; dokładność i zależności opisuje [audyt](matematyka-13-stalych.md).
- Historia: teksty matematyczne, artefakty i badania ich zapisu potwierdzają tylko wskazane fakty. Euklides jest cytowany w przekładzie D. Joyce’a; współczesne wzory nie są jego dosłownym zapisem.
- Interpretacja: dopasowanie proporcji, punktacja i współczesny Golden Egg nie dowodzą funkcji fizycznej ani intencji. Scena zwykłego owalu i tęczy jest ilustracją; zaznaczony przekrój relacji L/W ma osobną, obliczoną geometrię.

## Wszystkie 13 pozycji

### 1. pi

**Pojęcie:** Archimedes w III w. p.n.e. ograniczył stosunek obwodu koła do średnicy za pomocą wielokątów.

**Nazwa:** „Pi” jest nazwą greckiej litery; stosunek badano długo przed przyjęciem tej nazwy.

**Symbol:** Jones użył π dla tego stosunku w 1706 r.; Euler upowszechnił zapis w 1748 r.

**Matematyka / model:** Dla 11:7, 2B/H = 22/7 ≈ π. To połowa obwodu podstawy przez wysokość.

**Interpretacja piramidy:** Petrie omawiał taki związek w 1883 r. To późniejsza interpretacja wymiarów, nie świadectwo zamierzonego użycia π.

Źródła i zakres: [archimedes](#source-archimedes), [notation](#source-notation), [petrie](#source-petrie).

### 2. gamma

**Pojęcie:** Euler badał różnicę między sumą 1+1/2+…+1/n a ln n w latach 1734–35; praca ukazała się w 1740 r.

**Nazwa:** Nazwa upamiętnia Eulera i późniejsze obliczenia Mascheroniego z 1790 r.

**Symbol:** Euler pisał C, Mascheroni A. γ jest poświadczone w XIX w.; pierwszeństwo jego użycia jest sporne.

**Matematyka / model:** Cel γ jest granicą Hₙ−ln n. Modelowe 2B/(H+2D) jest przybliżeniem, odwrotnością wiersza √3.

**Interpretacja piramidy:** Historia γ nie dokumentuje jej doboru w piramidzie. Nie ustalono źródła intencji dla tego wzoru.

Źródła i zakres: [notation](#source-notation).

### 3. sqrt3

**Pojęcie:** Archimedes używał granic 265/153 < √3 < 1351/780 w Pomiarze koła; sposób ich uzyskania jest niepewny.

**Nazwa:** „Pierwiastek z 3” opisuje dodatnią liczbę, której kwadrat to 3; nie jest nazwą od odkrywcy.

**Symbol:** Znak √ występuje w Coss Rudolffa (1525), dużo później niż obliczenia Archimedesa.

**Matematyka / model:** R = (H+2D)/(2B) ≈ √3 i R = 1/Rγ. Cele √3 i γ nie są dokładnymi odwrotnościami.

**Interpretacja piramidy:** Starożytne obliczenia √3 nie dowodzą użycia tej sumy długości w Gizie.

Źródła i zakres: [archimedes](#source-archimedes), [radical](#source-radical).

### 4. sqrt6

**Pojęcie:** Księga X Elementów Euklidesa bada współmierność długości i kwadratów — tło dzisiejszych pierwiastków niewymiernych.

**Nazwa:** „Pierwiastek z 6” oznacza dodatnią liczbę o kwadracie 6. Nie ustalono osobnego momentu jej odkrycia.

**Symbol:** √6 łączy znak pierwiastka, poświadczony u Rudolffa w 1525 r., z liczbą 6.

**Matematyka / model:** Cel √6 = √2·√3. Także R√6 = √2·R√3, więc oba wiersze mają ten sam błąd względny.

**Interpretacja piramidy:** To algebraicznie zależny wynik, nie drugie niezależne świadectwo projektu piramidy.

Źródła i zakres: [euclidX](#source-euclidX), [radical](#source-radical).

### 5. sqrt2

**Pojęcie:** Starobabilońska tabliczka YBC 7289 zawiera dokładne przybliżenie przekątnej kwadratu, czyli dzisiejszego √2.

**Nazwa:** „Pierwiastek z 2” to opis algebraiczny. Tabliczka nie używa tej współczesnej nazwy.

**Symbol:** Współczesne √2 używa znaku √ z tradycji Rudolffa (1525); tabliczka ma zapis sześćdziesiątkowy.

**Matematyka / model:** D² = B²+B² ⇒ D/B = √2 dokładnie, dla każdej wysokości kwadratowej piramidy.

**Interpretacja piramidy:** To cecha kwadratowej podstawy. Nie wyróżnia 11:7, a tabliczka z Babilonii nie dowodzi intencji budowniczych w Gizie.

Źródła i zakres: [babylon](#source-babylon), [radical](#source-radical).

### 6. sqrt5

**Pojęcie:** Konstrukcja Euklidesa II.11 dzieli odcinek w proporcji dziś wyrażanej przez √5 i złotą liczbę.

**Nazwa:** „Pierwiastek z 5” opisuje liczbę o kwadracie 5. To współczesny język algebraiczny dla dawnej geometrii.

**Symbol:** √5 używa znaku √ poświadczonego u Rudolffa (1525), a nie zapisu Euklidesa.

**Matematyka / model:** √5 = 2φ−1. Modelowe (S+B)/S = 1+2/p, p=S/A; równość z √5 wymaga p=φ.

**Interpretacja piramidy:** Wiersz zależy od S/A. Znajomość konstrukcji Euklidesa nie potwierdza jej zastosowania w Wielkiej Piramidzie.

Źródła i zakres: [euclidII](#source-euclidII), [radical](#source-radical).

### 7. tribonacci

**Pojęcie:** Ciąg sumuje trzy poprzednie wyrazy. Feinberg opisał go w artykule Fibonacci–Tribonacci z 1963 r.

**Nazwa:** Tytuł artykułu dokumentuje nazwę „Tribonacci”, nawiązującą do Fibonacciego i trzech składników.

**Symbol:** T jest skrótem użytym w tej aplikacji dla stałej, nie dowodem uniwersalnego historycznego oznaczenia.

**Matematyka / model:** Cel T>1 spełnia T³=T²+T+1. Model R=(1+4√2)/(p+2), p=S/A, jest przybliżeniem.

**Interpretacja piramidy:** Nowoczesna nazwa nie datuje samej zależności, ale brak źródła łączącego ją z zamysłem budowniczych.

Źródła i zakres: [tribonacci](#source-tribonacci).

### 8. brun

**Pojęcie:** Brun w 1919 r. dowiódł zbieżności sumy odwrotności liczb pierwszych bliźniaczych, np. (1/3+1/5)+(1/5+1/7)+….

**Nazwa:** „Stała Bruna” upamiętnia Vigga Bruna i dotyczy tej sumy, a nie długości krawędzi.

**Symbol:** B₂ oznacza tutaj sumę dla par bliźniaczych. To inne B niż bok podstawy piramidy.

**Matematyka / model:** E/A = √(p²+1), p=S/A. Porównujemy z oszacowaniem 1,902160583104, nie dokładną znaną wartością.

**Interpretacja piramidy:** Nie ustalono twierdzenia łączącego E/A z sumą po liczbach pierwszych ani źródła intencji budowniczych.

Źródła i zakres: [brun](#source-brun), [brunEstimate](#source-brunEstimate).

### 9. invPhi

**Pojęcie:** Mästlin podał w liście do Keplera z 1597 r. około 0,6180340 dla dłuższej części złoto podzielonego odcinka jednostkowego.

**Nazwa:** „Odwrotność φ” jest opisem tej samej proporcji w odwrotnym kierunku, nie nazwą nowego odkrycia.

**Symbol:** 1/φ składa się z dzielenia i późniejszego symbolu φ; nie przypisujemy temu zapisowi starożytnego pochodzenia.

**Matematyka / model:** 1/φ = φ−1. Modelowe S/(S+A)=p/(p+1) nie jest ogólnie równe 1/p.

**Interpretacja piramidy:** To przekształcenie wiersza S/A, bez dodatkowego niezależnego dowodu dotyczącego piramidy.

Źródła i zakres: [golden](#source-golden), [notation](#source-notation).

### 10. phi

**Pojęcie:** Euklides VI, definicja 3, opisuje podział w skrajnym i średnim stosunku: całość do większej części jak większa do mniejszej.

**Nazwa:** Nazwa „złoty podział” jest poświadczona u Martina Ohma w 1835 r.; nie ustalono jej twórcy.

**Symbol:** Cook w 1914 r. przypisuje propozycję φ Markowi Barrowi. To świadectwo oznaczenia, nie użycia proporcji przez Fidiasza.

**Matematyka / model:** φ=(1+√5)/2 i φ²=φ+1. Dla 11:7 S/A≈φ; dokładny preset φ wybiera inne H/A.

**Interpretacja piramidy:** Bliskość S/A do φ jest wynikiem modelu. Cytowane źródła nie dokumentują zamierzonego złotego podziału w piramidzie.

Źródła i zakres: [euclidVI](#source-euclidVI), [golden](#source-golden), [notation](#source-notation).

### 11. e

**Pojęcie:** Badania logarytmów i procentu składanego prowadziły do e. Bernoulli badał granicę (1+1/n)ⁿ w 1683 r.

**Nazwa:** „Liczba Eulera” jest nazwą upamiętniającą matematyka, nie świadectwem, że pojęcie zaczęło się od niego.

**Symbol:** Euler użył e w rękopisie z 1727–28 r.; drukiem w Mechanica (1736). Powód wyboru litery nie jest ustalony.

**Matematyka / model:** e jest podstawą logarytmu naturalnego. Modelowe 2θ/β≈e porównuje kąty; stopnie i radiany dają ten sam iloraz.

**Interpretacja piramidy:** Czynnik 2 jest wyborem formuły porównawczej. Historia e nie dowodzi takiego projektu piramidy.

Źródła i zakres: [e](#source-e), [notation](#source-notation).

### 12. eMinus1

**Pojęcie:** e−1 powstaje przez odjęcie jedności od e. Jego kontekst historyczny to rozwój logarytmów i funkcji wykładniczej.

**Nazwa:** „e minus jeden” jest opisem działania; nie ustalono odrębnej historycznej nazwy ani odkrycia.

**Symbol:** e−1 łączy symbol Eulera z odejmowaniem. To nie e⁻¹, które oznacza 1/e.

**Matematyka / model:** Model odejmuje jedność od R_e. Błąd bezwzględny jest ten sam co dla e, względny jest inny.

**Interpretacja piramidy:** To ten sam wynik geometryczny po przekształceniu, nie kolejne niezależne świadectwo intencji.

Źródła i zakres: [e](#source-e), [notation](#source-notation).

### 13. eggLW

**Pojęcie:** Christian Lange opisuje współczesną propozycję złotego owalu: płaskie cięcie powierzchni obrotu hiperboli, z Z₀=7,65.

**Nazwa:** „Golden Egg” („Złote Jajo”) to nazwa propozycji i presetu; nie ustalono pierwszego użycia ani starożytnego pochodzenia.

**Symbol:** L/W to długość przez szerokość (length/width). Cel φ jest istniejącą stałą, nie nową stałą L/W.

**Matematyka / model:** Owal zr=1 nie jest elipsą. Dla 11:7 błąd L/W wobec φ to 0,105620285%; preset Golden Egg dobiera kąt do celu.

**Interpretacja piramidy:** Lange dokumentuje własną interpretację. Audyt nie potwierdza jego liczb ani twierdzeń o funkcji fizycznej czy intencjach budowniczych.

Źródła i zakres: [lange](#source-lange), [euclidVI](#source-euclidVI).

## Bibliografia i zakres źródeł

<a id="source-notation"></a>

### notation

[Jeff Miller · MacTutor: Symbols for Constants](https://mathshistory.st-andrews.ac.uk/Miller/mathsym/constants/)

π, e, γ i φ: zapisy i świadectwa ich użycia; pierwszeństwo γ jest sporne.

<a id="source-radical"></a>

### radical

[MacTutor · Christoff Rudolff](https://mathshistory.st-andrews.ac.uk/Biographies/Rudolff/)

Coss (1525): użycie znaku √. To historia zapisu, nie odkrycia wszystkich pierwiastków.

<a id="source-archimedes"></a>

### archimedes

[E. B. Davies · Archimedes’ calculations of square roots (2011)](https://arxiv.org/abs/1101.0492)

Badanie granic √3 w Pomiarze koła Archimedesa; metoda ich uzyskania pozostaje niepewna.

<a id="source-euclidX"></a>

### euclidX

[Euklides / D. Joyce · Elements X.9](https://mathcs.clarku.edu/~djoyce/elements/bookX/propX9.html)

Współmierność długości i kwadratów; starożytne tło dzisiejszych pierwiastków niewymiernych.

<a id="source-babylon"></a>

### babylon

[D. Melville · YBC 7289, Yale Babylonian Collection](https://myslu.stlawu.edu/~dmel/mesomath/tablets/YBC7289.html)

Tabliczka starobabilońska z przybliżeniem √2; nie jest dowodem wiedzy budowniczych w Gizie.

<a id="source-euclidII"></a>

### euclidII

[Euklides / D. Joyce · Elements II.11](https://mathcs.clarku.edu/~djoyce/elements/bookII/propII11.html)

Konstrukcja podziału odcinka; dzisiejsza algebra wiąże ją z √5 i φ.

<a id="source-euclidVI"></a>

### euclidVI

[Euklides / D. Joyce · Elements VI, Definition 3](https://mathcs.clarku.edu/~djoyce/elements/bookVI/defVI3.html)

Definicja podziału w skrajnym i średnim stosunku, bez nazwy „złoty” i symbolu φ.

<a id="source-golden"></a>

### golden

[J. O’Connor, E. Robertson · MacTutor: Golden ratio](https://mathshistory.st-andrews.ac.uk/HistTopics/Golden_ratio/)

Mästlin (1597): 0,6180340; nazwa „złoty podział” poświadczona u Ohma (1835), jej twórca nieustalony.

<a id="source-tribonacci"></a>

### tribonacci

[M. Feinberg · Fibonacci–Tribonacci (1963), pp. 71–74](https://www.fq.math.ca/Scanned/1-3/feinberg.pdf)

Źródłowy artykuł dokumentuje nazwę i ciąg sumujący trzy poprzednie wyrazy; nie dowodzi pierwszeństwa wszelkich takich rekurencji.

<a id="source-brun"></a>

### brun

[MacTutor · Viggo Brun](https://mathshistory.st-andrews.ac.uk/Biographies/Brun/)

Twierdzenie z 1919 r. o zbieżności sumy odwrotności liczb pierwszych bliźniaczych i nazwa stałej.

<a id="source-brunEstimate"></a>

### brunEstimate

[OEIS · A065421](https://oeis.org/A065421)

Pochodzenie przyjętego oszacowania 1,902160583104; nie wszystkie jego cyfry są ustalone.

<a id="source-e"></a>

### e

[J. O’Connor, E. Robertson · MacTutor: The number e](https://mathshistory.st-andrews.ac.uk/HistTopics/e/)

Logarytmy i procent składany; Bernoulli badał granicę (1+1/n)ⁿ w 1683 r.

<a id="source-lange"></a>

### lange

[Christian Lange · The golden angle (June 2002)](https://www.sectioaurea.com/sectioaurea/the_golden_angle.htm)

Źródło autorskie współczesnej propozycji „golden egg”, zr=1 i Z₀=7,65. Nie potwierdza jej twierdzeń fizycznych ani intencji budowniczych; liczby sprawdza osobny audyt.

<a id="source-petrie"></a>

### petrie

[W. M. F. Petrie · The Pyramids and Temples of Gizeh (1883; wyd. 2 / ed. 2, 1885; reprint 1990)](https://gizapyramids.org/pdf_library/petrie_gizeh.pdf)

Skan drugiego wydania: pomiary w rozdz. II; interpretacja 7:22 i 14:11 w rozdz. IX, s. 93 (PDF 106). Późniejsza teoria autora, nie zapis intencji budowniczych.

<a id="source-rhind"></a>

### rhind

[British Museum · Rhind Mathematical Papyrus, EA10057](https://www.britishmuseum.org/collection/object/Y_EA10057)

Papirus datowany na ok. 1550 p.n.e., późniejszy niż Wielka Piramida. Dokumentuje egipską matematykę; nie plan jej budowy.

### Krytyka i ograniczenia źródeł

MacTutor to opracowania historyków i rejestr Jeffa Millera ze wskazaniami wcześniejszych tekstów, nie antyczny dokument. Przy γ rejestr odnotowuje sprzeczne przypisania; nie ogłaszamy odkrywcy symbolu. Dla √6 nie wskazano osobnej daty odkrycia. Artykuł Feinberga jest świadectwem nazwy i ciągu w 1963 r., nie dowodem pierwszeństwa wszystkich rekurencji rzędu trzeciego. B₂ i T to oznaczenia używane tutaj, bez twierdzenia o pierwszym historycznym użyciu.

Książka Petriego ukazała się pierwszy raz w 1883 r. Linkowany skan jest reprintem z 1990 r. drugiego, skróconego wydania z 1885 r. Zweryfikowano kartę tytułową, przedmowę i s. 93 (strona PDF 106): autor interpretuje 7:22 dla wysokości i półobwodu oraz 14:11 dla profilu. Pomiary są w rozdziale II; interpretacja w rozdziale IX. Nie zamieniamy późniejszej teorii w zapis projektu z czasów budowy. Papirus Rhinda (EA10057, ok. 1550 p.n.e.) jest późniejszy od Wielkiej Piramidy i nie jest jej planem.

Lange to źródło pierwotne własnej, niedatowanej interpretacji. Nadaje się do ustalenia pochodzenia propozycji Golden Egg, nie do potwierdzenia jego spekulacji fizycznych, historycznych ani globalnej unikalności. Jego 51,84° i wymiary nie zgadzają się z dokładnym modelem audytu: przy Z₀=7,65 rozwiązanie L/W=φ ma około 51,795319256°. Nie ustalono pierwszego użycia nazwy. OEIS ostrzega o cyfrach oszacowania Bruna; ścisły przedział jego błędu pozostaje otwarty.

## Tutorial i interfejs

### 1. Zacznij od kwadratu

B to bok podstawy, A jego połowa, D pełna przekątna. D/B=√2 jest dokładne dla każdej wysokości. To nasz punkt wyjścia, nie wyróżnik 11:7.

`A=B/2; D=B√2`

Pozycje: sqrt2.

### 2. Jeden parametr kształtu

H jest pionową wysokością, S apotemą do środka boku. Trójkąt VOM jest prostokątny. Dla 11:7 mamy t=14/11. Zmiana skali zachowuje proporcje; zmiana t je zmienia.

`t=H/A; p=S/A=√(1+t²)`

Pozycje: phi.

### 3. Pół obwodu i π

Dwie kopie B dzielimy przez H. Pełny obwód to 4B, więc jego iloraz przez H przybliża 2π. 22/7 nie jest dokładnym π. Interpretacja wymiarów nie dokumentuje intencji budowniczych.

`Rπ=2B/H=4/t; 11:7 ⇒ 22/7≈π`

Pozycje: pi.

### 4. Rodzina γ, √3 i √6

Te trzy wiersze używają H i D. Odwrócenie u daje wiersz γ, mnożenie przez √2 daje wiersz √6. To zależne wyniki; cele γ i √3 nie są dokładnymi odwrotnościami.

`u=t/4+√2; Rγ=1/u; R√3=u; R√6=√2·u`

Pozycje: gamma, sqrt3, sqrt6.

### 5. Rodzina φ, 1/φ i √5

Wszystkie trzy wyniki wyznacza p. Przy p=φ trafiają dokładnie w swoje cele; przy 11:7 są przybliżeniami. Modelowe p/(p+1) nie jest ogólnie 1/p. Kliknij pozycję, aby obejrzeć jej odcinki.

`p=S/A; R1/φ=p/(p+1); R√5=1+2/p`

Pozycje: phi, invPhi, sqrt5.

### 6. Tribonacci i Brun też zależą od p

E to krawędź do narożnika, a S do środka boku: E²=S²+A². Zatem E/A zależy od p. Tak samo suma dla Tribonacci. Wartość Bruna jest oszacowaniem; bliskość nie łączy geometrii z sumą liczb pierwszych.

`RT=(1+4√2)/(p+2); RB₂=√(p²+1)`

Pozycje: tribonacci, brun.

### 7. Kąty, e i e−1

θ i β to dopełniające się kąty tego samego trójkąta. Dzielimy miary kątów, nie długości łuków. Po odjęciu jedności otrzymujemy wiersz e−1. To jeden wynik w dwóch postaciach.

`θ=atan(t); β=90°−θ; Re=2θ/β; R(e−1)=Re−1`

Pozycje: e, eMinus1.

### 8. Owal jest osobnym modelem

Przekrój bierze θ z piramidy, ale dodaje powierzchnię i Z₀. L i W nie są jej krawędziami. Owal nie jest elipsą. Preset Golden Egg dobiera kąt do φ; dla 11:7 błąd wynosi 0,105620285%.

`zr=1; z=Z₀+x tan θ; Z₀=7.65; L/W≈φ`

Pozycje: eggLW, phi.

### 9. Jak czytać wynik i jego historię

R to wynik modelu, c to cel. 13 wierszy nie daje 13 niezależnych dowodów. Historia rozdziela pojęcie, nazwę i symbol. Obliczenie oddzielamy od hipotezy. Późniejszy pomiar Petriego i papirus Rhinda nie zapisują intencji budowniczych.

`ε=|R−c|/|c|`

Pozycje: phi, pi, eggLW.

Tutorial jest opcjonalny, bez automatycznego uruchomienia. Przycisk „Tutorial” i panel „Stałe” otwierają ostatni zapisany krok. Lista kroków pozwala przejść w dowolne miejsce; przejście ręczne zatrzymuje automat. „Pomiń / zamknij”, Escape i Android Back zachowują krok, przywracając scenę piramidy. Miejsce przechowuje lokalny klucz `pyramid-tutorial-v1-step`; jeśli pamięć jest niedostępna, działa do końca sesji. Wznowienie wraca do zapisanej sceny kroku.

Automat jest dobrowolny, z okresem 18 s. Zatrzymuje się na końcu, po ukryciu strony, zmianie modelu lub rozpoczęciu osobnej lekcji. Ograniczony ruch wymusza ręczne kroki. Tutorial nie zmienia modelu, progów, wag ani danych XLSX. Podświetlenia używają istniejących konstrukcji geometrycznych. Kliknięcie powiązanej pozycji zatrzymuje automat; miejsce w tutorialu zostaje.

Teksty są krótkie; historia i interpretacja są rozwijane, nie zajmują stale panelu. Źródła przy każdej pozycji i pełna bibliografia mają lokalne opisy zakresu. Otwarcie pełnego tekstu wymaga internetu i nie jest automatyczne. Aplikacja nie pobiera tekstów źródłowych ani nie ładuje ich przy starcie. Dowody testów i oględzin zapisuje [status aktualizacji](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/status-aktualizacji.md).
