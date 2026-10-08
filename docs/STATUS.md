# ETAP 14 — odniesienia PL/EN, 2026-10-08

Na zlecenie autora dodano pod sceną sekcję **Odniesienia i kontekst naukowy /
References and scientific context**. Bezpośredni link do Giesberta Nijhuisa,
**Double Toroidal Vortex Based Particle** (28 października 2012), jest opisany
jako powiązana wizualizacja. Artykuł UW **Laserowe tornado** (2 kwietnia 2026)
jest opisany jako kontekst naukowy dotyczący wirów optycznych w ciekłych
kryształach. Krótka uwaga PL/EN wyjaśnia, że scena artystyczna nie symuluje
opisanego eksperymentu. Zachowano podpis Michała Przybylskiego — prylski.dev.
Sekcja jest ukryta w kadrze do nagrania przez istniejące reguły CSS.
Zmiana dotyczy wyłącznie treści strony, bez zmian geometrii i animacji.
Testy PL/EN, zachowania preferencji języka i kompletności tłumaczeń:
**3/3 PASS**. Browser lokalny: obie wersje językowe, poprawne bezpośrednie
linki i ukrycie sekcji w kadrze nagrania PASS. Wdrożenie na osobną stronę
edukacyjną wymaga potwierdzenia workflow i publicznego widoku.

# ETAP 14 — płaszczyzna między torusami, 2026-10-08

Dodano warstwę **Płaszczyzna między torusami / Plane between tori**:
złoty dysk w poziomej płaszczyźnie odniesienia, w połowie odległości
środków. Dla zaakceptowanego symetrycznego rozstawu Z = 7. Promień =
1,08 × max(R₁+r₁, R₂+r₂); nie zależy od skali stożków. Obwód jest
próbkowany w 72 odcinkach i cache'owany, bez nowego renderera lub zegara.
Wypełnienie pod konstrukcją/cząstkami, czytelny złoty obwód, osobny
przełącznik i przezroczystość 0–100%, domyślnie 85%. Warstwa ujawnia się
razem z torusami i zostaje w finale, stereo i nagraniu. Full show włącza
warstwę, zachowując wybraną przezroczystość. Suwak zatrzymuje wspólny
pokaz; przełącznik widoczności nie zmienia faz. To płaszczyzna odniesienia
w prezentacji, bez dodawania twierdzeń o siłach lub funkcji piramidy.

**32/32 testów podglądów PASS**, w tym położenie wszystkich punktów dysku,
niezmienność geometrii pozostałych warstw, skala stożków/rozstaw bez zmiany
dysku, dopasowanie do rozmiaru torusa, połowa środków przy innym Z,
przezroczystość 0/100%, oba kadry stereo, jeden zegar, pauza i EN.
Lokalny browser: włączenie/wyłączenie i 100%/85% przezroczystości bez błędu.
[Widok lokalny](../education/evidence/midplane-local.png).
Aktualizacja jest przeznaczona dla osobnej strony `great-pyramid-11-7-lab-edu`;
główne laboratorium pozostaje oddzielne. Wynik wdrożenia należy potwierdzić.

**Wdrożono i sprawdzono online.** Commit strony `54071d1`,
[workflow 37760097067](https://github.com/MichaelZP/great-pyramid-11-7-lab-edu/actions/runs/37760097067)
PASS (32 testy przed wdrożeniem). HTML i `show.js` zwracają HTTP 200,
publiczna strona zawiera nową warstwę i krótki podpis „Z=7.0”. Browser:
pełna scena 100%, przełącznik off/on i stereo bez alertu/błędów konsoli.
Viewport 320×740: scrollWidth 305. To test układu na komputerze,
bez nowego pomiaru FPS ani odbioru fizycznego telefonu.
[Widok online](../education/evidence/midplane-online.png),
[dowód](../education/evidence/midplane-checks.json).

# ETAP 14 — osobna strona online, 2026-10-08

Autor zlecił link online z końcówką `-edu`. Docelowy adres:
https://michaelzp.github.io/great-pyramid-11-7-lab-edu/.
Osobne repozytorium `MichaelZP/great-pyramid-11-7-lab-edu` zawiera statyczną
kopię `education/` i istniejących zależności etapów 7–11. Eksport wykonuje
`scripts/export-education.mjs`, sprawdzając odnośniki HTML bez przebudowy
geometrii. Nagłówek strony PL/EN nazywa ją pokazem edukacyjnym.
Wdrożenie Pages ma najpierw przejść testy podglądów. Główne laboratorium,
jego gałąź Pages, APK oraz geometria i kierunki pozostają bez zmian.
Instrukcje PL/EN zawierają osobny adres strony. Wpis opisuje przygotowanie;
wynik wdrożenia i testu publicznego adresu należy sprawdzić przed ogłoszeniem.

**Wdrożenie i publiczny podgląd potwierdzone.** Repozytorium strony:
https://github.com/MichaelZP/great-pyramid-11-7-lab-edu,
commit `3c462b2ed59d1d1339d87cf1346f34838eb7ff59`.
[Workflow Pages 37748831938](https://github.com/MichaelZP/great-pyramid-11-7-lab-edu/actions/runs/37748831938)
PASS: 31/31 testów, konfiguracja, artefakt i wdrożenie. HTTP 200 dla
adresu głównego oraz `/education/`; adres główny otwiera scenę.
Browser: PL, przełączenie EN, EN po odświeżeniu, pełna scena 100%,
odtwarzanie, pauza i Cross-eye PASS; alert geometrii pusty, brak błędów
konsoli. Viewport 320×740: scrollWidth 305, Canvas 271×430, język 44 px.
To sprawdzenie układu na komputerze, bez nowego odbioru fizycznego telefonu.
[Dowód](../education/evidence/online-checks.json),
[widok strony](../education/evidence/online-site.png),
[pełna scena stereo](../education/evidence/online-full-scene.png).
Porównano 12 plików sceny i rendererów źródłowych z eksportem: identyczne.
Eksporter odrzuca zajęty katalog oraz zagnieżdżenie w kopiowanym źródle;
eksport domyślny i sprawdzenie lokalnych odnośników PASS. CI projektu źródłowego
obejmuje eksport. Odczyt zdalnych refs potwierdził brak zmian w głównym
laboratorium: main `554a3c4`, gh-pages `a600eb7`.

# ETAP 14 — udostępnienie źródeł na GitHub, 2026-10-08

Autor zlecił umieszczenie wspólnego pokazu na GitHub. Zakres obejmuje
gałąź `codex/education-show`, kod `education/`, zmiany współdzielonego
renderera etapów 10–11, testy CI, istniejące nagrania i dowody przeglądarkowe.
Dodano [angielską instrukcję pobrania i uruchomienia](../education/README_EN.md)
oraz link z README repozytorium. Udostępnienie kodu nie wdraża strony na
produkcję, nie scala gałęzi i nie tworzy APK. Starsze zapisy o braku
commit/push poniżej opisują stan przed tym zleceniem.

Kontrola przed wysłaniem: **31/31** testów podglądów (etapy 7, 10, 11
i wspólna scena), **87/87** testów aplikacji, sprawdzenie typów i lokalny
build web PASS. Vite zgłasza ostrzeżenie o rozmiarze głównych chunków.

# ETAP 14 — wspólny pokaz konstrukcji i wirów, 2026-10-08

**Przełącznik PL / EN dodany do education/.** Nad tytułem znajduje się
**Język / Language**, opcje PL — Polski i EN — English. Wybór jest
zapamiętywany w localStorage dla tego podglądu; przy niedostępnym zapisie
działa na czas wizyty. Tłumaczenie obejmuje kontrolki/opcje, opisy geometrii,
ARIA, komunikaty, jakość/pomiary, błędy, Canvas, Cross-eye, pełny ekran
i nagranie. Podpis EN: „Artistic visualization of counter-rotating toroidal
vortices”; autorstwo „Concept: Michał Przybylski — prylski.dev”. PL zachowano.
Zastrzeżenia dotyczące owalu, błędu L/W i artystycznego charakteru torusów
pozostają w obu wersjach. Język nie zmienia geometrii, zegara, kamery,
kierunków, rozmiarów, warstw ani przezroczystości. Dokumentacja i starsze
podglądy nie są objęte przełącznikiem. Cache tłumaczeń ograniczony do 256
tekstów; bez dodatkowej pętli animacji lub obserwatora DOM.

**26/26 testów PASS** (17 wspólnej sceny i 9 etapów 10–11): w tym
zmiana języka podczas odtwarzania bez resetu, przywrócenie PL, EN po
odświeżeniu, niedostępny zapis ustawień, dynamiczne komunikaty i błędy,
niezmienne liczby/symbole oraz przetłumaczone podpisy Canvas i stereo.
Browser: pełny interfejs EN i EN po odświeżeniu potwierdzone. Viewport
320×740: scrollWidth 305, selektor języka wysokości 44 px. To test układu
na komputerze; fizyczny telefon nadal do odbioru. Instrukcja wyboru języka
w [education/README](../education/README.md). Podgląd lokalny:
http://localhost:8080/education/. Bez publikacji, commit, push i APK.

## Cross-eye — 2026-10-08

**Cross-eye 3D dodany do wspólnej sceny.** Pasek nad sceną zawiera
Cross-eye 3D, Odwróć głębię, Pełny ekran oraz regulację siły głębi.
W trybie stereo lewy kadr pochodzi z kamery prawego oka, prawy z lewego;
różnica kątów kamer wynosi domyślnie ±3°, regulowana 0–±6°. Projekcje
równoległe mają wspólną oś pionową i punkt zbieżności V, bez deformowania
geometrii lub przekrojów. Zamiana kadrów odwraca głębię, zachowując ruch.
Oba obrazy powstają w tym samym rendererze, na jednym Canvas i zegarze,
z identyczną fazą cząstek oraz wspólnymi warstwami i kamerą. Domyślnie
stereo wyłączone; ponowne wyłączenie przywraca pojedynczy widok.

Pełny ekran ma własny przycisk Odtwórz scenę / Pauza sceny; wyjście
przyciskiem lub Esc. Jeśli natywny Fullscreen API jest niedostępny,
układ wypełnia okno osadzonej przeglądarki. Nagranie Canvas zachowuje
aktywną parę stereo, wspólny podpis artystyczny i autorstwo.

**23/23 testów PASS** (14 wspólnej sceny i 9 etapów 10–11). Nowe testy
obejmują identyczność geometrii/faz dla oczu, głębię zależną od współrzędnej
przestrzennej, jednakowe pionowe współrzędne, zamianę oczu, siłę 0/1/2,
dopasowanie kadru na 320/390/844/1280 px, stałe bufory, wspólną pauzę,
ograniczony ruch, jednokrotny podpis i sterowanie pełnym ekranem.
Browser: Cross-eye, odwrócenie głębi, pełny ekran, odtwarzanie i pauza
sprawdzone; brak alertu geometrii. Viewport 320×740, scrollWidth 305,
przyciski stereo >=44 px; przy 844×390 układ nie przepełnia się poziomo.
Pomiar 30 klatek pary, jakość niska, q=0,055, jaja wyłączone:
mediana CPU 7,9 ms, p95 9,7 ms, 136 cząstek rysowanych łącznie na parę
(68 na oko), bufory nadal 7680 B. To komputerowy viewport telefonu,
nie fizyczny telefon ani pełny FPS/GPU. Odbiór głębi pozostaje do oceny autora.
[Pomiar i stan przeglądarki](../education/evidence/cross-eye-browser-checks.json),
[para stereo](../education/evidence/cross-eye-scene.jpg).

Podgląd pozostaje lokalny: http://localhost:8080/education/. Instrukcja
w [education/README](../education/README.md). Bez publikacji, commit,
push i APK. Nowego filmu Cross-eye nie tworzono. Poniżej wcześniejsze wpisy.

## Kierunki, torusy i złote jaja — 2026-10-08

**Aktualizacja zaakceptowanego widoku: kierunki, torusy i pełne złote jaja.**
Dodano cztery niezależne wybory kierunku cząstek: stożek 1, stożek 2,
torus 1 i torus 2. Odwrócenie zachowuje aktualne pozycje cząstek; zmienia
dalszy przyrost fazy i zwrot smug. Znaczniki i strzałki torusów odpowiadają
wybranemu θ/ψ. Wspólny zegar, pauza/reset i ograniczony ruch obejmują
wszystkie cztery fazy. Domyślny ruch stożków nadal jest lustrzany.

Osobne rozmiary torusów 25–200% skalują R i r równomiernie, bez deformacji.
Suwak d = 2–8 u przesuwa środki symetrycznie wokół Z = 7. Piramida,
powierzchnie i punkty cięcia pozostają niezmienione. **Domyślne wiry**
przywracają zaakceptowane 100%, d = 4, T1 θ+/ψ+, T2 θ−/ψ− i lustrzane
stożki. Zmiana kierunku, rozmiaru lub rozstawu zatrzymuje pokaz.

Dodano dwie opcjonalne pełne bryły złotego jaja: konstrukcję obrotową
połowy rzeczywistego owalu wokół jego długiej osi, zgodną z istniejącym
`GoldenEggConstruct`. Profil pochodzi ze wspólnego `section`, transformacja
i odbicie z `Stage8`; siatka ma 768 płatów na bryłę i zamknięte końce.
To skończona siatka bryły obrotowej, nie objętość wycięta ze stożka.
Każde jajo i każda siatka stożka mają osobny suwak przezroczystości.
Owale i płaszczyzny pozostają czytelne niezależnie od tych ustawień.
Jaja domyślnie wyłączone; przy q = 0,055 są małe, zgodnie ze skalą.
Instrukcja inspekcji i nagrywania jest w [education/README](../education/README.md).

**20/20 testów PASS**: 11 wspólnej sceny oraz 9 zastanych etapów 10–11.
Sprawdzono izolację kierunków, brak przeskoku po odwróceniu, wspólną
pauzę/reset, położenia cząstek na zmienionych torusach, symetrię rozstawu,
niezmienność piramidy i przekrojów, siatkę jaj, dokładne południki owalu,
zamknięte końce, odbicie, skalowanie i niezależną przezroczystość.
Browser: nowe kontrolki sprawdzone, odtwarzanie działa; zmiana kierunku
przerywa ruch. Brak błędów JS i alertu geometrii. Viewport 320×740:
scrollWidth 305, nowe suwaki wysokości 44 px. Pomiar z oboma jajami,
q = 0,405, zakres przekrojów, niska jakość, 68 cząstek łącznie:
30 nieruchomych klatek, mediana CPU 9,8 ms, p95 11,4 ms, bufory 7680 B.
To rysowanie Canvas na komputerze, nie pomiar FPS/GPU lub fizycznego telefonu.
[Dowody kontrolek i pomiaru](../education/evidence/controls-browser-checks.json),
[bryły we wspólnej scenie](../education/evidence/controls-eggs-scene.jpg),
[kontrolki telefonu](../education/evidence/controls-phone.jpg).

Podgląd lokalny: http://localhost:8080/education/. Bez publikacji, commit,
push i APK. Nie tworzono nowego filmu z interaktywnymi ustawieniami;
istniejący `demo-spirals.webm` pokazuje wcześniejsze domyślne wiry,
bez brył jaj. Przycisk nagrania może zapisać bieżące ustawienia lokalnie.
Fizyczny telefon nadal do odbioru autora. Poniższe wpisy są historią etapów.

## Poprzednia korekta — 2026-10-07

**Aktualna korekta autora: osobna skala stożków i spirale na powierzchniach.**
Poprzednie dopasowanie kamery zmieniało ekranowy rozmiar piramidy przy
edycji q. Domyślny kadr jest teraz stały i równoległy, jak w etapie 7:
q zmienia tylko oba lustrzane układy źródłowe, ich płaszczyzny i owale.
Pozycja, przybliżenie kamery oraz ekranowy rozmiar piramidy/torusów
nie zależą od q. Dopasowanie całych stożków jest osobną, jawną opcją kamery;
przybliżenie +/− jest oddzielne i działa także w widokach XZ/XY.

Przycisk **Widok jak na ilustracji** ustawia q = 0,055, kadr stały,
rzut równoległy 3D, obrót 25°, nachylenie 0,28 rad i otwarte powierzchnie
ku nieskończoności z asymptotami, finał 100% i pauzę. Takie ustawienie
jest też domyślne; dawne q = 0,4 nadal dostępne. Zachowano wybór pełnych
wycinków z podstawami i otoczenia przekrojów. Równania, dokładne owale,
kąt cięcia, B = 11, h = 7, odbicie i geometria torusów bez zmian.

Warstwa **Spirale po stożkach** dodaje cząstki oraz analityczne smugi
po zr = 1, na tym samym zegarze i istniejących buforach `VortexParticles`.
Druga cząstka i cała smuga są odbiciem pierwszej w Z = 7: te same X/Y,
Z′ = 14 − Z, Vz′ = −Vz, bez dodatkowego odwracania czasu. Prędkość
obiegu, pauza, reset i ograniczony ruch są wspólne. Warstwy cząstek stożków
i torusów można niezależnie przełączać. Torusy zachowują θ+/ψ+ oraz θ−/ψ−.
Otwarte spirale wygaszają cząstki przed powrotem na początek; smugi nie
łączą granic. To artystyczne trajektorie, bez solvera przepływu.

**16/16 testów PASS** (7 wspólnej sceny, 9 etapów 10–11), w tym testy
rzeczywistych ekranowych współrzędnych piramidy/torusów dla wszystkich
trzech zakresów, trzech widoków, q = 0,005 / 0,055 / 0,08 / 0,4 / 1 / 2
i szerokości 320 / 390 / 844 / 1280. Równanie powierzchni, pozycje oraz
wektory ruchu odbicia, zamknięcie fazy, bufory, pauza, reset i warstwy PASS.
Browser: kontrolki na 320 px bez poziomego przepełnienia (scrollWidth 305),
widoczne przyciski >= 44 px; pokaz i spirale sprawdzane lokalnie.
Pomiar CPU na telefonowym viewport 320 px: 30 nieruchomych klatek,
jakość średnia, 168 cząstek (stożki i torusy łącznie), mediana 4,6 ms,
p95 5,6 ms, stałe bufory 7680 B. To CPU rysowania Canvas na komputerze,
nie pełny FPS/GPU ani pomiar fizycznego telefonu.

**Aktualny film:** [demo-spirals.webm](../education/demo-spirals.webm),
q = 0,055, stały kadr i lustrzane spirale, 1280×720, VP9,
9 333 610 B, 764 klatki, ostatni znacznik 25,939 s. Struktura EBML PASS;
finał odtworzony na 25 s z readyState = 4 i bez błędu dekodowania.
[Metadane/SHA-256](../education/evidence/spirals-video-metadata.json),
[odtwarzacz](../education/evidence/spirals-video.html),
[dowody przeglądarki](../education/evidence/spirals-browser-checks.json).
Film zawiera pięć odsłon i około 6 s ruchu finału, bez paneli, z wymaganym
podpisem artystycznym i autorstwem. 29,45 zakodowanych klatek/s to średnia
pliku; nie jest wynikiem na telefonie.
Bez publikacji, commit, push i APK; fizyczny telefon nadal do odbioru.
Poniższe wpisy i filmy bez spiral opisują wcześniejsze wersje etapu 14.

**Korekta: całe stożki wraz z podstawami.** Poprzedni suwak skalował tylko
wąskie otoczenie przekrojów. `Vortex.source` przyjmuje teraz opcjonalny
zakres pełnych skończonych wycinków z etapu 7, z logarytmicznym próbkowaniem
i wyróżnionymi okrągłymi podstawami. `education/` korzysta z tego zakresu;
domyślna siatka starszych etapów 10–11 pozostaje taka jak wcześniej.
Równanie powierzchni, dokładne punkty owali/płaszczyzn, odbicie i jednolite
skalowanie zachowano. Podstawy są granicami skończonej siatki, nie
skończonymi podstawami matematycznej powierzchni zr = 1.

Kamera dopasowuje kadr i odległość do obu pełnych wycinków, piramidy oraz
torusów. Zmiana skali przywraca zoom = 1; Reset kamery obejmuje całe stożki
po ręcznym przybliżeniu. Obrót przy zoom = 1 nie ucina geometrii.
Domyślne q = 0,4 zachowano; do wspólnego czytelnego kadru użyto q = 0,08.
**14/14 testów PASS**: 5 wspólnej sceny i 9 etapów 10–11; sprawdzono
równanie siatki/podstaw/owali, podobieństwo obu odbić, pełny kadr dla
q = 0,005 / 0,08 / 0,4 / 1 / 2, obroty, 3 widoki i szerokości
320 / 390 / 844 / 1280. To rozszerzenie nie wymagało zmian aplikacji TS.
Browser przy 320×844: obie podstawy i podpis w kadrze; poza kadrem filmowym
scrollWidth = 305, przyciski >= 44 px. Pomiar 30 nieruchomych klatek:
jakość średnia, 84 cząstki, mediana CPU 3,6 ms, p95 4,4 ms, bufory 7680 B.
Nie jest to pomiar fizycznego telefonu ani pełnego FPS/GPU.

**Aktualny demonstrator:** [demo-full-cones.webm](../education/demo-full-cones.webm),
q = 0,08, całe stożki i podstawy, 1280×720, VP9, 4 281 583 B,
756 klatek, ostatni znacznik 25,970 s. Kompletna struktura EBML PASS;
kontrola odtwarzania/finału w lokalnej przeglądarce.
[Metadane/SHA-256](../education/evidence/full-cones-video-metadata.json),
[odtwarzacz](../education/evidence/full-cones-video.html),
[kontrola struktury](../education/evidence/inspect-webm.mjs).
Starszy `demo.webm` i niższe wyniki CPU dotyczą poprzedniej wąskiej siatki.
Podgląd pozostaje lokalny; bez publikacji, commit, push i APK.

**Uzupełnienie skalowania:** odsłonięto dotychczasowy parametr `scaleFactor`
jako suwak „Skala stożków hiperbolicznych względem V”, 0,5–200%, z odczytem
procentowym i przyciskiem przywracania 40%. Korzysta ze wspólnego
`Stage8.pose/transform` oraz `Vortex.source`; jednorodnie skaluje oba
lustrzane układy, płaszczyzny i owale. Zmiana zatrzymuje pokaz, zachowuje
bieżący przebieg, L/W i odbicie; piramida, torusy i ich kierunki są stałe.
Pełny pokaz i nagranie zachowują wybrane q. Dotychczasowy film pokazuje
domyślne 40%. Bez publikacji. Kontrola: **4/4 testów wspólnej sceny PASS**,
w tym niezależne porównanie współrzędnych przy q = 0,005 / 0,08 / 0,4 / 1 / 2.
W przeglądarce sprawdzono oba końce zakresu, przywrócenie 40% i pauzę po
zmianie podczas obiegu. Na 320 px: scrollWidth 305, suwak i przycisk >= 44 px.

**Lokalna implementacja gotowa do oceny autora. Bez publikacji, commit,
push, zmiany wydania produkcyjnego ani APK.** Ten wpis dotyczy rozszerzenia
etapu 14 o wspólną scenę; nie oznacza ukończenia innych prac edukacyjnych.
Koncepcja: **Michał Przybylski — prylski.dev**.

Podgląd: **http://localhost:8080/education/**. Vite działa lokalnie na 8080.
Uruchomienie, pięć faz, sterowanie, nagranie i odbiór telefonu:
[education/README.md](../education/README.md).
Na telefonie w tej samej sieci można użyć adresu LAN wypisanego przez Vite
(w tej sesji http://192.168.26.222:8080/education/).

Pokaz ponownie wykorzystuje `section`, `Stage8`, `Vortex.source/pair/lane`,
`VortexParticles`, pamięci podręczne, renderer etapu 10 oraz zegar
`Vortex.clock`. Nowy `education/show.js` steruje odsłanianiem pięciu faz
w 20 s i przygotowaniem kadru/nagrania. Nie dodano drugiego renderera,
obliczeń geometrii ani niezależnego zegara ruchu.
W finale wszystkie warstwy pozostają widoczne razem; obiegi trwają do pauzy.
Tryb filmowy zachowuje powierzchnie, płaszczyzny i rzeczywiste przekroje.
Dodano „Pełny pokaz”, odtwarzanie/pauzę/reset/suwak, dziewięć przełączników,
opcjonalną kamerę, jakość niską/średnią/wysoką i ograniczony ruch.
Ręczna kamera wyłącza automat; pauza zatrzymuje cały ruch.
Pełny pokaz przywraca domyślny kadr po ręcznej zmianie kamery.

Geometria pozostaje identyczna z etapami 9–11: B = 11, h = 7,
α = atan(14/11), z₀ = 7,65, A/q = 0,4, odbicie w Z = 7;
torusy C₁/C₂ na Z = 5/9, R = 2,4, r = 0,65; T1 θ+/ψ+, T2 θ−/ψ−.
Deformacja jest zerowa. Widoczne powierzchnie są otwartymi, skończonymi
wycinkami. Owal i L/W pozostają niezmienione i poza 0,1% od φ dla 11:7.
Torusy są odsłaniane jako osobne obiekty artystyczne bez wyprowadzonego
przekształcenia powierzchni i bez twierdzeń o fizycznym przepływie.

**Sprawdzenie:** TypeScript i 87/87 testów aplikacji PASS; 14/14 zastanych
testów podglądów oraz 3/3 nowych testów wspólnej sceny PASS. Po końcowych
zmianach kamery sprawdzono ponownie 3/3 nowych testów. CI uzupełniono o
nowe testy, ale nie uruchamiano zdalnego CI (bez push). Lokalny build Vite
aplikacji PASS, ze znanym ostrzeżeniem o dużych paczkach. Build ten nie
pakuje `education/`; scenę wykonano i sprawdzono w lokalnym Vite.

Przegląd przeglądarki: finał wszystkich warstw, pauza, ręczne +/− wyłączające
kamerę, reset kadru, jakość niska/średnia, preferencja ograniczonego ruchu,
odtwarzanie i zapis filmu. Viewporty 320×844, 390×844, 844×390 oraz
1280×720; brak błędów konsoli. Na 320 px nie ma poziomego przepełnienia
(scrollWidth 305 <= innerWidth 320), wszystkie widoczne przyciski >= 44 px.
Podpis wąskiego kadru zajmuje dwa wiersze i pozostaje czytelny.
Zrzuty są w [education/evidence/](../education/evidence/).

Próbka CPU w podglądzie 390 px: jakość średnia, 84 cząstki, 120 próbek,
mediana 2,6 ms, p95 3,5 ms; bufory cząstek 7680 bajtów. Jest to czas CPU
rysowania Canvas, nie pełny czas klatki/GPU, test obciążenia ani pomiar
fizycznego telefonu. Mechanizm jakości nadal ogranicza cząstki, DPR,
segmenty smug i częstotliwość oraz może obniżyć jakość przy przeciążeniu.

**Gotowy film:** [education/demo.webm](../education/demo.webm), VP9,
1280×720, 8 332 987 bajtów, 775 klatek, ostatni znacznik 25,970 s.
Kontrola kompletności EBML PASS; odtwarzanie w przeglądarce bez błędu.
Film przedstawia pięć odsłon i finał, bez paneli, z wymaganym podpisem
artystycznym i autorstwem. Średnia 29,84 zakodowanych klatek/s jest
własnością tego nagrania. [Metadane/SHA-256](../education/evidence/video-metadata.json).
Eksport dużych danych przez host wymagał odczytu fragmentami; niekompletny
pierwszy zapis zastąpiono pełnym plikiem i sprawdzono jego strukturę.
Eksport z zasłoniętego Chrome ograniczał ruch; nie użyto tego częściowego
filmu jako artefaktu demonstracyjnego.

**Pozostały odbiór:** fizyczny dotyk/gesty, 5 minut płynności/nagrzewania,
pomiary FPS/GPU/pamięci/temperatury na telefonie, natywny fullscreen i APK.
Wcześniejsze obserwacje telefonu z etapu 11 nie zatwierdzają tej nowej
wspólnej sceny. Standardowy build i skrypt wydania nie dołączają pokazu
do produkcji ani APK; dalsze pakowanie/publikacja wymaga nowego polecenia.
Poniższe wpisy zachowują historię wcześniejszych wydań.

# ETAP 13 — opublikowane wydanie 2.0.2, 2026-10-07

**Publikacja i kontrola po wdrożeniu: PASS. Brak nierozwiązanych blokad dla
opublikowanego wydania internetowego.** Autor zaakceptował etap 12 i potwierdził
prawa do dystrybucji przy zachowaniu braku licencji open source.
Koncepcja: **Michał Przybylski — prylski.dev**, https://github.com/MichaelZP/.

- Aplikacja: https://michaelzp.github.io/great-pyramid-11-7-lab/.
- Wszystkie części: https://michaelzp.github.io/great-pyramid-11-7-lab/wydanie/.
- Wersja/tag: **2.0.2 / v2.0.2**; kod wydania:
  `08aead2a2f3bb800db448822b5b374d8e1bbf62e`.
- PR #3 scalono po obu CI PASS; merge:
  `f6f5d32cc92a22964c342fe72aff4184c8ddf012`.
  Po merge poprawiono wyłącznie metadane wersji/dokumentację: historyczny
  changelog zawierał już 2.0.1. Finalny commit 08aead2 także uzyskał CI PASS.
- Paczka Pages: `a600eb7eed17a695420eecfc4d41b848ef45a1d3`;
  [wdrożenie](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37611859019)
  PASS. Jeden push gh-pages; merge uruchomił tylko CI. Hosting/domena/DNS bez zmian.

**Weryfikacja:** TypeScript, 87/87 testów aplikacji, 14/14 podglądów,
niezależny audyt 60-cyfrowy/13 pozycji/obu XLSX, build i aktualne CI PASS.
Wszystkie trzy pakiety z brakującymi pełnymi notami mają 0 emitowanych modułów
w finalnym artefakcie; dostępne noty dołączono. Bez oryginalnych XLSX/PDF
w paczce strony. HTTP 200 i zgodność z dokładnymi blobami wdrożonego commitu:
**23/23 plików PASS**. Git normalizuje końce linii części tekstów; brak różnic kodu.

**Publiczna przeglądarka:** otwarcie i model 3D, PL/EN, 13 wyborów i kroki
1–4 każdej lekcji, 9 kroków tutorialu, suwaki modelu, źródła/podpis,
animacja konstrukcji/odbicie/pauza/reset, oba tryby wirów, widoki, suwaki,
pauza/wznowienie/reset i bazowy etap 10 PASS. Telefonowe viewporty
320×844 / 390×844 / 844×390 sprawdzono na komputerze; nie są pomiarem
fizycznego telefonu. Nie zaobserwowano błędów konsoli ani istotnej awarii.
Nie uruchomiono powrotu produkcji, bo nie było potrzeby.

**Ograniczenia:** osobne strony stożków/wirów, zachowane historyczne etykiety
podglądów; brak nowego APK i pełnego odbioru fizycznego, natywnego fullscreen,
pomiarów FPS/temperatury/pamięci oraz pełnego WCAG. Opóźnione zrzuty hosta
ilustrują sceny, nie dowodzą ostatniego kroku; stan DOM zapisano osobno.
Ostrzeżenia dużych paczek i Three pozostają. Wyniki 11:7 12/13, Golden Egg
10/13, L/W poza 0,1%, zależności i granice interpretacji bez zmian.
Szerszy audyt npm/native i odbiór APK nadal wymagane przed dystrybucją APK.
Nie opublikowano YouTube ani dodatkowych materiałów edukacyjnych.

**Powrót:** cofnięcie commitu publikacji a600eb7 przez `git revert` i zwykły
push gh-pages przywraca drzewo poprzedniej wersji
`3d78300ef428153ec826261ed5cff5f6661325c8`. Próba w osobnej lokalnej kopii
PASS: drzewo identyczne, bez force push. Zachowano także lokalny bundle/ZIP.
Polecenia, dokładne wyniki i granice: [ETAP-13.md](ETAP-13.md),
[opis wydania](RELEASE_NOTES.md), [dowody](etap-13/).
Poniższe wpisy są historią przygotowania i wcześniejszych etapów.

# ETAP 13 — release preparation, 2026-10-07

The author accepted the stage 12 test version and authorized merge/publication.
The author separately confirmed public distribution with existing reserved rights
(no open-source licence) and rights to materials already contained in PR #3.
Concept: **Michał Przybylski — prylski.dev**, https://github.com/MichaelZP/.

Accepted application/prototype implementation: `25281f5`; reviewed follow-up
HEAD: `9895b67e6f6a4239954a21a1e1df05b0429073f0`. Changes since that audit are
preview packaging/inventory and documentation; application/geometry unchanged.
Existing local phone-report edits were reviewed and retained. Acceptance is the
author's decision; it does not convert pending physical checks into measurements.

Web release **2.0.2** is prepared for the existing Pages address:
https://michaelzp.github.io/great-pyramid-11-7-lab/.
The release hub `/wydanie/` links the unchanged separate stage 9–11 pages.
No APK, new integration, YouTube or additional educational material is included.
Public production deployment and post-deployment checks are **PENDING**.

Live PR #3: draft/open, `feature/android-offline` → `main`, clean merge state,
two successful CI checks at `9895b67`; no branch rulesets/required reviews.
Pages source remains `gh-pages` at `/`, no custom domain. Main merge runs CI
only; manual fast-forward push to `gh-pages` triggers the single Pages deployment.
Pre-release main: `e5aeecce1457dd8b17a4d4c34161baedda182852`.
Pre-release Pages/rollback tree: `3d78300ef428153ec826261ed5cff5f6661325c8`.
Rollback restores that complete tree in a new commit on current `gh-pages`,
then normal push/Pages build, without force push or rewriting history.

Applicable web gates: rights confirmed; emitted-bundle notice audit must PASS;
current CI/typecheck/87 application + 14 prototype tests/build must PASS before
merge. The three full-notice inventory gaps remain outside the shipped web
artifact. Native notice audit and physical APK acceptance still block APK release.
Remaining limits: separate prototypes, incomplete measured phone/native/fullscreen/
accessibility evidence, library/large-chunk warnings, mathematical/historical
uncertainties described in stage 12. See [release notes](RELEASE_NOTES.md).
Historical entries below retain their original evidence and publication scope.

# ETAP 12 — częściowy odbiór telefonu, 2026-10-07

Autor potwierdził na fizycznym NE2213 / Android 16 / Chrome: stronę z 4 kafelkami,
widoczne dwa wiry i znaczniki, pauzę, wznowienie, reset, krótki pokaz filmowy,
pion/poziom i ukrywanie/przywracanie warstwy piramidy. Obrót kamery po
przeciągnięciu zgłoszony jako „ok”. Są to **ręczne obserwacje autora**, nie
automatyczne pomiary ani bezpośrednia inspekcja ekranu przez agenta.
ADB potwierdziło połączenie i uruchomienie Chrome, bez zapisu identyfikatora.

Autor potwierdził także pełne 5 minut płynnego pokazu filmowego; nagrzewanie
pozostało bez zmian i na akceptowalnym dla niego poziomie. To ocena subiektywna.
To częściowy odbiór **osobnego podglądu etapu 11**. Pomiary
FPS/temperatury/pamięci, tło/wznowienie, pozostałe kontrolki, główna aplikacja,
stożki i natywny APK pozostają niezweryfikowane na tym telefonie.
Nie oznaczono całego odbioru ani wydania jako zaliczonego.
[Raport telefonu](etap-12/phone-2026-10-07.md),
[checklista](MANUAL_ACCEPTANCE.md). Historyczne wyniki poniżej zachowano.

# ETAP 12 — podgląd internetowy do odbioru, 2026-10-06

Po zakończeniu audytu autor zlecił udostępnienie wersji testowej przez GitHub,
aby obejrzeć ją na telefonie poza lokalnym Wi-Fi. Osobny adres GitHub Pages:
https://michaelzp.github.io/great-pyramid-11-7-lab/preview/etap-12/.
Panel wejściowy prowadzi do laboratorium oraz podglądów stożków i wirów.
Dotychczasowy główny adres Pages zachowuje swój build. Bez merge PR, APK,
integracji prototypów z aplikacją i bez nowej licencji.

Audytowany kod aplikacji: `25281f5`. Osobna paczka ma poprawną bazę ścieżek
Pages i spis modułów faktycznie emitowanych przez Rollup. Wszystkie trzy
pakiety z brakującymi pełnymi notami mają **0 emitowanych modułów** w tym
artefakcie; bramki pełnego npm/native audytu pozostają dla innych wydań.
Nie przesłano oryginalnych XLSX ani prywatnej korespondencji. Wersja testowa
jest udostępniana na aktualne polecenie autora, a odbiór fizyczny nadal czeka.
[Instrukcja na telefon](MANUAL_ACCEPTANCE.md),
[spis paczki](etap-12/web-preview-inventory.json),
[materiały i licencje](THIRD_PARTY.md).

# ETAP 12 — końcowy audyt i wersja do odbioru, 2026-10-06

**Gotowa do lokalnego odbioru autora; publikacja i odbiór natywnego Androida
pozostają zablokowane przez opisane niżej bramki.**
Koncepcja: Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/.

Rzeczywisty zakres: aplikacja z 13 relacjami, lekcjami, historią PL/EN,
tutorialem i laboratorium oraz **osobne** podglądy etapów 9–11 w `docs/`.
Stożki i wiry nie zostały zintegrowane z główną aplikacją ani APK. Zastane
zmiany zachowano; plan i starsze wpisy nie są dowodem ukończenia etapów.
Gałąź `feature/android-offline`, draft
[PR #3](https://github.com/MichaelZP/great-pyramid-11-7-lab/pull/3) do `main`.
Bez scalania, produkcji, nowego tagu i APK.

**Kontrole:** 87/87 testów aplikacji, 14/14 prototypów, TypeScript, niezależny
audyt 60-cyfrowy 13 pozycji/obu XLSX/JS oraz web/Android-assets/Pages PASS.
CI rozszerzono o 14 testów prototypów. Brak skryptu lint. Przegląd przeglądarki:
13 lekcji, 26 historii PL/EN, 9 kroków tutorialu, szablony/suwak/warstwy/stereo,
A/B × 4 przekroje, skalowanie/odbicie, tryby i kamera wirów. Naprawiono
ucinanie paska i scenę wysokości ~59 px przy 844×390; scena po naprawie ~246 px,
przewijany panel boczny i wszystkie kontrolki dostępne. Desktop 1280×720 PASS.

ADB wykrył NE2213, ale fizyczny dotyk/orientacja/offline/Back/fullscreen,
długotrwałe FPS/temperatura/pamięć i APK **NIEZWERYFIKOWANE**. CSS pełnego
widoku sprawdzono; natywnego fullscreen host nie potwierdził. Pomiar CPU
Canvas nie jest pomiarem FPS. Czytnik ekranu/pełne WCAG niezweryfikowane.
Znane ostrzeżenia bibliotek i dużych paczek pozostają.

11:7: **12/13 w 0,1%**, L/W poza tolerancją; Golden Egg: **10/13**.
Zależności dokładne, przybliżenia, hipoteza autora i sztuka są rozdzielone.
Bez solvera Naviera–Stokesa i bez dowodu działania piramidy. Nie zmieniano
celów/tolerancji ani zaakceptowanych zwrotów/położenia torusów.

**Bramki publikacji:** decyzja autora o licencji/prawach do materiałów;
3 brakujące pełne noty zależności npm; dla APK także audyt zależności natywnych
i odbiór fizyczny. Zachowano podpis koncepcji; nie ustanowiono nowej licencji.
Do autora: A/B, α, q, wygląd wirów, dokładne brzmienie hipotezy i dowody,
licencja oraz ewentualna przyszła integracja podglądów.

Materiały: [audyt](ETAP-12.md), [uruchomienie i checklista](MANUAL_ACCEPTANCE.md),
[opis wydania](RELEASE_NOTES.md), [licencje i materiały](THIRD_PARTY.md),
[dowody etapu 12](etap-12/). Następny krok: ręczny odbiór autora na telefonie.
Poniżej zachowano historyczne raporty z ich datami i ograniczeniami.

# ETAP 11 — lokalna implementacja i kontrole, 2026-10-06

**Gotowe do odbioru artystycznego; fizyczny telefon i rzeczywista płynność
wyświetlania NIEZWERYFIKOWANE.**
„Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych”.
Koncepcja: Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/. Inspiracja Naviera–Stokesa jest artystyczna,
bez solvera, obliczeń mieszania/zderzeń ani dowodu działania piramidy.

Autor w tej rozmowie zaakceptował położenie C₁=(0,0,5), C₂=(0,0,9),
R=2,4, r=0,65, d=4 (regulacja 2–8) i zwroty T1: θ+,ψ+, T2: θ−,ψ−.
Historyczne wpisy o braku tej akceptacji poniżej nie opisują aktualnej decyzji.
Nie uznano za zatwierdzone wyglądu etapu 11 ani wyborów A/B, α i q.

Właściwe repo `android-offline`, `feature/android-offline`, HEAD
`f8ed12762abf0612213d7d48ce44b9ce2c1c1075`; zastane zmiany zachowano.
Odczytano instrukcje projektu i wymagane plany/status. Brak AGENTS.md.
Zachowano geometrię, zwroty, kontrolki i jeden zegar etapu 10; jego renderer
ma opcjonalne rozszerzenie oraz ograniczone cache geometrii/rozmiarów Canvas.
Dodano [etap-11/podglad.html](etap-11/podglad.html): cząstki (okrąg T1,
kwadrat T2), analityczne smugi, gładką deformację trajektorii, łagodną zmianę
rozstawu, subtelną poświatę, tryb edukacyjny/filmowy i kamerę filmową.
Zerowa deformacja zachowuje ruch etapu 10, większa nie odwraca zwrotów.
Pauza zamraża także parametry pośrednie i kamerę; ręczne sterowanie kamerą
wyłącza automat aż do świadomego ponownego włączenia. Reset i ograniczony
ruch dostępne. Wyłączenie efektów pozostawia działającą regularną geometrię.
Główna aplikacja/silnik/13 relacji/tolerancje bez zmian.

Canvas 2D/CPU, bez nowych bibliotek i obliczeń GPU. Jakości niska/średnia/
wysoka: maks. 48/120/240 cząstek na torus, 4/8/12 segmentów smug,
limity 30/45/60 rysowań/s i DPR 1/1,5/2. To nie gwarantowane FPS.
Małe widoki startują od niskiej, większy komputer od średniej. Pomiar czasu
CPU może automatycznie obniżyć jakość; użytkownik świadomie ją podnosi.
Stały bufor cząstek 7680 B, pierścień najwyżej 120 próbek, brak historii smug.

**Kontrole:** 9/9 testów etapów 10–11 (5 nowych) oraz 5/5 regresji etapów 7–9
PASS; 87/87 aplikacji i TypeScript PASS. Web/Android-assets/Pages PASS,
Node 24.19.0, lokalne wyjścia `%TEMP%/pyramid-stage11-*`. Vite/Vitest wymagały
wyjścia poza sandbox blokujący config. Brak skryptu lint; znane ostrzeżenia
>500 kB i outDir TEMP. Bez sync, APK/AAB ani instalacji. Buildy aplikacji
nie dołączają osobnego prototypu docs. Whitespace/składnia PASS.

**Przeglądarka:** 90 kombinacji obu trybów, trzech rzutów, pięciu klatek
oraz 320×844/390×844/844×390 bez błędów/przepełnienia. Sprawdzono dziewięć
warstw i oznaczeń oraz ruch/pauzę/ręczne przejęcie kamery; konsola czysta.
CPU 30 nieruchomych klatek z maksymalnymi efektami i DPR=1:

| Jakość | Komputer 908×1004 mediana / p95 [ms] | Viewport 390×844 na komputerze [ms] |
|---|---:|---:|
| Niska | 5,2 / 8,5 | 5,0 / 11,4 |
| Średnia | 7,9 / 14,4 | 6,7 / 10,6 |
| Wysoka | 12,2 / 22,3 | 11,2 / 19,4 |

Wysoka nie jest domyślna: p95 przekracza 16,7 ms dla 60 Hz. To CPU
trzech Canvas, bez późniejszego compositora/GPU. W podglądzie IAB callbacks
animacji występowały ok. 1/s mimo widocznej strony; nie potwierdzamy FPS ani
rzeczywistego czasu pokazu. Pamięć po 600 nieruchomych klatkach: JS heap
28,62–48,98 MiB z okresowymi spadkami, bufor zawsze 7680 B. Brak
monotonicznego wzrostu w tej próbie nie dowodzi braku długotrwałego wycieku.
Fizyczny telefon: aktualne ADB bez urządzeń, wydajność/dotyk/DPR/ukrycie strony
na nim NIEZWERYFIKOWANE. Brak pełnego nowego manualnego odbioru wszystkich
lekcji głównej aplikacji; jej niezmieniony kod ma regresje PASS.

Szczegóły mechanizmu, akceptacja i wszystkie granice:
[plan-podwojnego-wiru.md](plan-podwojnego-wiru.md).
[Pomiar i kontrole](etap-11/browser-checks.json),
[edukacyjny 390 px](etap-11/edukacyjny-390.jpg),
[panel ustawień filmowych](etap-11/panel-filmowy.jpg),
[instrukcja odbioru](etap-11/odbior.md).

**Jak obejrzeć:** http://127.0.0.1:8088/etap-11/podglad.html, działający
lokalny serwer. Wybierz „Pokaż obiegi · 100%”, potem tryb i Odtwórz;
kamera filmowa wymaga osobnego włączenia. Przy aktywnym ograniczonym ruchu
pozostają ręczne nieruchome klatki. Offline zachowaj katalogi etap-7/10/11.
Uruchomienie z katalogu aplikacji: `python -m http.server 8088 --bind 127.0.0.1 --directory docs`.

**Do oceny autora:** czytelność efektów i kamera obu trybów oraz wcześniejsze
A/B, α, q. Położenie i zwroty już zaakceptowane.
**Jeden następny krok:** odbiór obu trybów na fizycznym telefonie z autorem,
z dłuższym pomiarem płynności i pamięci.
Bez commitów, push, zmian PR, publikacji na produkcję i scalania.
Poniżej zachowano wcześniejsze wpisy jako historię.

---

# ETAP 10 — prototyp dwóch przeciwbieżnych wirów, 2026-10-06

**Wykonano lokalny prototyp; kontrole kodu i przeglądarki PASS.
Fizyczny telefon NIEZWERYFIKOWANY.** Interfejs nosi opis
„Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych”.
Inspiracja Naviera–Stokesa nie oznacza solvera ani dowodu działania piramidy.
Koncepcja: Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/.

## Sprawdzenie podstawy i wykonana praca

Odczytano instrukcje projektu, PLAN, STATUS, plan-stozka, animacja-stozka
i wynik odbioru/audytu etapu 9. Sprawdzono właściwe repozytorium:
`android-offline`, gałąź `feature/android-offline`, HEAD
`f8ed12762abf0612213d7d48ce44b9ce2c1c1075`. Zastany zmieniony STATUS
oraz nieśledzone dokumenty i `docs/etap-7/` zachowano. Nadrzędne repo
na `master` pozostaje osobnym kontekstem. Nie znaleziono AGENTS.md.
Nie korzystano z historycznych uprawnień do push w PLAN.md.

Aktualny etap 9 ma oba układy, odbicie bieżącej klatki, oznaczenia,
selektor i jeden zegar; ponowne 5/5 testów przed implementacją PASS.
Starszy wpis o statycznym odbiciu opisuje usunięte braki. Brak fizycznego
odbioru telefonu oraz wybór A/B i α pozostają otwarte, lecz nie blokują
regulowanego lokalnego wariantu artystycznego.

Dodano osobny [podgląd etapu 10](etap-10/podglad.html), korzystający
z nieruchomej końcowej konstrukcji etapu 9. Piramida nadal B=11, h=7.
Torusy: C₁=(0;0;7−d/2), C₂=(0;0;7+d/2), R=2,4, r=0,65; domyślnie
d=4, środki na Z=5 i Z=9. Rozstaw 2–8 u zachowuje dodatnią szczelinę.
To położenie i promienie robocze, wymagające oceny autora. Powiązanie
z odpowiednimi układami ma numer, styl linii i schematyczny łącznik.
Nie jest matematycznym przekształceniem powierzchni ani owalu.

Każdy torus ma 3 zamknięte trajektorie i 3 znaczniki. θ: obieg wokół Z;
ψ: obieg przez kołowy przekrój wokół rdzenia. T1: θ+, ψ+; T2: θ−, ψ−
w tej samej światowej konwencji. Strzałki, znaki i ciągłe/przerywane linie
pokazują zwroty. Widoki z boku, z góry i perspektywiczny oraz dwa
jednoczesne rzuty kontrolne pozwalają ocenić ruch. Rzut z góry nakłada
torusy; selektor T1/T2/oba pozwala sprawdzić każdy oddzielnie.

Odtwarzanie, osobna pauza, reset, suwak pokazu, prędkość 0,25–3×,
rozstaw, siedem warstw, selektor układów i ograniczony ruch są dostępne.
Pokaz: konstrukcja → odsłanianie torusów/trajektorii → ruch, 12 s;
po 100% obieg trwa do pauzy. Obiegi bazowo 8 s dla θ i 4 s dla ψ.
Seek zeruje fazę i zatrzymuje; reset wraca do konstrukcji. Ukrycie strony,
pagehide, ograniczony ruch i błędne dane zatrzymują zegar. Geometria nie
jest deformowana. Bez zderzeń, mieszania, turbulencji, smug i ciężkich efektów.

Zachowano cztery presety cięcia, własne α/z₀, A/B i q. Domyślne q=0,4
w etapie 10 jest roboczym wyborem czytelności; etap 9 nadal ma q=0,08.
Rzeczywisty owal pochodzi ze wspólnego `etap-7/section.js`: wyodrębniono
funkcję z HTML bez zmiany wzorów. Etap 9 nadal zawiera animację od Golden
Egg, zakresy/kadry, oznaczenia, L/W oraz osobne porównanie ze złotą elipsą.
Dodano link między podglądami. Główna aplikacja i silnik bez zmian.
Parametry, równania, zwroty i przebieg:
[plan-podwojnego-wiru.md](plan-podwojnego-wiru.md).

## Weryfikacja i granice dowodów

- **9/9 testów podglądów PASS**: 5 regresji etapów 7–9 i 4 testy etapu 10.
  Nowe testy sprawdzają równanie torusa, zamknięcie, ciągłość stycznych,
  zwroty obu składowych, rozłączność, zachowanie powierzchni/cięć/odbicia,
  renderer, stałą piramidę, warstwy, selektor i rzeczywiste handlery DOM.
  Zegar, prędkość, pauza/reset/seek, ruch po 100%, zmiana d, ograniczony
  ruch, schowanie strony i błędne dane są objęte testami. Po końcowej
  korekcie komunikatu fazy pokazowej ponownie uruchomiono 4 testy etapu 10.
- **87/87 testów aplikacji PASS, TypeScript PASS.** Web, Android-assets
  i Pages PASS, lokalne wyjścia `%TEMP%/pyramid-stage10-{web,android,pages}`.
  Node 24.19.0 z dostarczonego runtime. Systemowy Node 20 zatrzymał się
  na sandboxowym EPERM odczytu ścieżki; kontrole wykonano dostarczonym
  Node ≥22 poza sandboxem. Bez instalowania zależności. Pozostały znane
  ostrzeżenia o paczkach >500 kB i outDir w TEMP. Projekt nie ma skryptu lint.
  Nie wykonywano Capacitor sync, APK/AAB ani instalacji. Buildy aplikacji
  nie zawierają prototypu z docs i nie dowodzą jego odbioru na Androidzie.
- **Przeglądarka:** 45 kombinacji 320×844 / 390×844 / 844×390 × trzy
  rzuty × 0/25/50/75/100%, bez błędów parametrów i poziomego przepełnienia.
  Sprawdzono ruch znaczników, pełny pokaz do 100%, pauzę/reset, seek,
  prędkość, rozstaw 2/8, warstwy, ograniczony ruch, cztery presety, A/B,
  zmianę q, komunikat braku owalu i odzyskanie poprawnego źródła.
  Wykryto i poprawiono komunikat statusu pozostający w fazie odsłaniania
  po dojściu do 100%; dodano asercję regresji.
  Dodatkowo 15 kombinacji etap 9: pierwszy/drugi/oba × pięć klatek,
  bez błędów i przepełnienia; tabela zachowuje błąd 0,105620% dla α=β.
  Nie wykonano nowego pełnego manualnego odbioru wszystkich lekcji
  głównej aplikacji; ich kod nie został zmieniony, regresje 87/87 PASS.
  [Zapis kontroli przeglądarki](etap-10/browser-checks.json),
  [widok perspektywiczny](etap-10/etap-10-perspective.jpg),
  [rzut z boku 390 px](etap-10/etap-10-side-390.jpg),
  [rzut z góry 390 px](etap-10/etap-10-top-390.jpg).
  Pauzę potwierdzono stanem UI i testem zegara. Porównanie całych JPEG
  viewportu obejmowało także przewijanie/fokus, więc nie jest dowodem
  identycznych pikseli zatrzymanego canvasu. Pełny zrzut strony był
  niedostępny; użyto przejrzanych zrzutów viewportu.
- **Telefon fizyczny NIEZWERYFIKOWANY:** ADB bez urządzeń. Nie potwierdzono
  fizycznego dotyku, płynności, obrotu telefonu ani zachowania po schowaniu
  jego przeglądarki. Viewporty komputerowe nie zastępują tego odbioru.

## Jak uruchomić i co pozostaje

Z katalogu `android-offline`, Node ≥22:

```powershell
python -m http.server 8088 --bind 127.0.0.1 --directory docs
node --test docs/etap-10/vortex.test.mjs docs/etap-7/animation.test.mjs
```

**Podgląd: http://127.0.0.1:8088/etap-10/podglad.html**.
Etap 9 dostępny obok: http://127.0.0.1:8088/etap-7/podglad.html.
Lokalny serwer uruchomiono w tej sesji. Offline zachowaj katalogi
etap-7 i etap-10 z ich plikami HTML/CSS/JS. Etap 9 wymaga teraz także
section.js; zaktualizowano instrukcję odbioru. Przez USB z dostępnym
telefonem można użyć `adb reverse tcp:8088 tcp:8088` i lokalnego adresu
w jego przeglądarce; tej operacji nie wykonywano bez urządzenia.

Decyzje autora: środki i promienie torusów, rozstaw, zwroty θ/ψ, robocze
q=0,4 oraz wcześniejsze A/B i α. Nie zatwierdzono ich za autora.
**Jeden następny krok:** odbiór prototypu z autorem na fizycznym telefonie
z zapisem wyboru położenia i zwrotów.

Bez commitów, push, zmian PR, publikacji na produkcję i merge.
Poniżej zachowano wcześniejsze statusy i audyt wejściowy jako historię.

---

# ETAP 9 — uzupełnienie animacji obu układów, 2026-10-06

**Wynik: implementacja i lokalna weryfikacja PASS; fizyczny telefon
NIEZWERYFIKOWANY.** Drugi układ jest teraz odbiciem aktualnej klatki
p₂(t)=RΣ(p₁(t)), Σ: Z=7, a nie statycznym odbiciem końca. Dotyczy to
powierzchni, płaszczyzny cięcia, rzeczywistego owalu, odcinków L/W,
asymptot, lokalnych osi, strzałek kontynuacji i pozycji oznaczeń.

Dodano x′/y′/z′, L′(t)/W′(t), Q′(t), Π′(t) oraz zachowano 0H′.
Oba układy używają tych samych lokalnych wycinków siatki i pomocy;
pomarańczowa geometria jest ich odbiciem w świecie. Ekranowe odsunięcia
tekstu zachowują czytelność; nie zmieniają punktów konstrukcji.
Selektor **Pierwszy / Drugi / Oba** działa także podczas odtwarzania,
bez resetu postępu ani dodatkowego zegara. Dotychczasowe warstwy obejmują
wybrane układy. Płaszczyzna Σ pojawia się przy widocznym drugim układzie.

Pełny start Golden Egg Q=(16,775;0;28,35) i jego odbicie
Q′=(16,775;0;−14,35) nie zależą od q. Piramida B=11, h=7 pozostaje
nieruchoma. Zachowano A/B, cztery presety α oraz własne parametry,
jednolitą skalę, ograniczony ruch, tolerancję 0,1% i osobną złotą elipsę.
Kadr całego przejścia ma teraz środek (8,4;0;7), aby obejmował oba
początki; zakres 38×52, skala ekranowa i kadr etapu 7 pozostają zachowane.
Nieskończona powierzchnia może wykraczać poza ekran.

**Decyzje autora pozostają otwarte:** robocze A i α=β nie stanowią
zatwierdzenia wariantu. Na końcu A, α=β cięcia zawierają VM−/VM+;
B daje równoległość, a złoty α daje przybliżone powiązanie kątowe.
Podczas ruchu nie deklarujemy zawierania ścian przez cięcia. Dla α=β
L/W nadal ma błąd 0,105620285%, poza 0,1%.

**Kontrole tej implementacji:**

- Node 24.19.0; `node --test docs/etap-7/animation.test.mjs`: **5/5 PASS**.
  480 pozycji matematycznych: 4 kąty × 3 z₀ × 2 końce × 4 q × 5 klatek,
  każda dla obu układów. Sprawdzono równania powierzchni/cięcia,
  odbicie, skale długości, L/W, k=σ², pionowe osie i niezmienny start.
  Osobno 480 konfiguracji renderera: 4 kąty × 2 końce × 4 q × 3 zakresy
  × 5 klatek; porównano wszystkie punkty linii, strzałek i oznaczeń.
  Testy rzeczywistych handlerów DOM obejmują widoczność i warstwy przy
  0/25/50/75/100%, jeden zegar, zmianę widoku w ruchu, pauzę, reset,
  seek, koniec, prędkość, ograniczony ruch i ukrycie strony.
- Istniejące testy aplikacji **87/87 PASS**, TypeScript **PASS**.
  Web, Android-assets i wariant Pages **PASS**, tylko lokalne wyjścia
  `%TEMP%/pyramid-stage9-{web,android,pages}`. Ostrzeżenia o paczkach
  >500 kB pozostają; ostrzeżenie outDir wynika z użycia TEMP.
  Sandbox blokował konfigurację Vite przy pierwszym Vitest; powtórzenie
  poza sandboxem przeszło. Nie wykonywano sync ani pakowania Androida.
- Przeglądarka: 30 kombinacji 320/390 px × pierwszy/drugi/oba ×
  0/25/50/75/100%; bez błędów parametrów i poziomego przepełnienia strony.
  Potwierdzono A/B dla wszystkich czterech presetów, zakresy, warstwy,
  oba kadry, 3D/pionowy, pełny start przy q=0,16, przewijanie tabeli,
  odtwarzanie do końca, pauzę przy 50%, reset, seek, prędkość 0,5×/4×,
  ograniczony ruch i komunikat dla parametrów bez zamkniętego owalu.
  Brak ostrzeżeń/błędów konsoli. Jedno automatyczne kliknięcie warstwy
  nie zmieniło stanu; ponowne kliknięcie po odczycie stanu przeszło.
  Podczas pierwszego reloadu przeglądarka miała stary animation.js;
  wersjonowany adres skryptu `?v=9` rozwiązał cache.
  [Zapis viewportów i wariantów](etap-7/etap-9-browser-checks.json),
  [start 390 px](etap-7/etap-9-start-390.jpg),
  [połowa 320 px](etap-7/etap-9-polowa-320.jpg),
  [koniec 390 px](etap-7/etap-9-koniec-390.jpg).
- `adb devices -l`: pusta lista. Fizyczny telefon, dotyk, orientacje,
  płynność i pauza po schowaniu przeglądarki na urządzeniu są
  **NIEZWERYFIKOWANE**. Test viewportu ani build zasobów tego nie zastępują.
- `git diff --check`: PASS. Zastane zmiany zachowano. Gałąź
  `feature/android-offline`, HEAD `f8ed12762abf0612213d7d48ce44b9ce2c1c1075`.

Podgląd: **http://127.0.0.1:8087/podglad.html**. Definicje i kolejność
operacji: [animacja-stozka.md](animacja-stozka.md). Odbiór, w tym dalszy
test fizycznego telefonu: [odbior-etapu-9.md](odbior-etapu-9.md).
**Następny krok:** wykonać i zapisać fizyczny odbiór etapu 9 według instrukcji.
Wybór A/B i α pozostaje osobną decyzją autora.

Zakres ograniczony do istniejącego osobnego podglądu, jego testów i
dokumentacji. Bez integracji głównej aplikacji, dalszych efektów, commitów,
push, zmian PR, publikacji i merge. Buildy aplikacji nie zawierają podglądu.
Poniżej zachowano audyt wejściowy i starsze wpisy jako historię;
nie opisują aktualnej implementacji.

---

# ETAP 9 — audyt wejściowy wykonania, 2026-10-06

**Wynik: etap 9 jest częściowo wykonany i nie spełnia warunku animacji obu
układów.** Istniejąca geometria odbicia jest użyteczna, lecz pokazuje koniec
przejścia, niezależnie od aktualnego postępu. Nie jest to brak całego drugiego
układu. Brakuje jego animacji, wyboru widoku tylko drugiego układu i kompletu
lustrzanych oznaczeń. Fizyczny telefon pozostaje niezweryfikowany.

Zakres tej sesji: audyt i aktualizacja wyłącznie tego pliku. Odczytano
instrukcje README/README_PL, AUTHORSHIP, dokumenty wskazane przez PLAN oraz
PLAN.md, zastany STATUS.md, plan-stozka.md i animacja-stozka.md; sprawdzono
rzeczywisty kod, podgląd i istniejące kontrole. Nie znaleziono AGENTS.md
w drzewie projektu ani sprawdzonych katalogach nadrzędnych. Historyczne
uprawnienia do zmian/push w PLAN.md nie dotyczą tego audytu. PLAN.md opisuje
etapy 0–4; nie zawiera osobnej specyfikacji odbioru etapu 9. Kryteria poniżej
pochodzą z bieżącego polecenia autora oraz zastanych specyfikacji etapów 7–8.

**Stan wejściowy:** właściwe repozytorium to `android-offline`, gałąź
`feature/android-offline`, HEAD `f8ed12762abf0612213d7d48ce44b9ce2c1c1075`.
Zastano zmieniony `docs/STATUS.md` oraz nieśledzone `docs/plan-stozka.md`,
`docs/animacja-stozka.md` i cały `docs/etap-7/`. Zachowano te zmiany.
Nadrzędne repozytorium jest na `master` i już miało nieśledzone
`android-offline/` oraz dwa PNG; nie jest repozytorium aplikacji.

Dowody w tabeli odnoszą się do [podglad.html](etap-7/podglad.html),
[animation.js](etap-7/animation.js) i [testów podglądu](etap-7/animation.test.mjs).
Numery w nawiasach to aktualne linie kodu w tych plikach. Podgląd działa
osobno od aplikacji: `PyramidCanvas.tsx` i `RelationOverlay.tsx` nie zawierają
animacji dwóch układów ani sterowania etapu 9. Buildy aplikacji nie dołączają
`docs/etap-7/`.

| Wymaganie | Stan | Dowód w kodzie lub podglądzie | Pozostała praca |
|---|---|---|---|
| 1. Lustrzana powierzchnia, płaszczyzna, rzeczywisty przekrój i oznaczenia | częściowo | HTML (67–105): wspólny `tr` odbija powierzchnię, prostokąt cięcia, obrys i odcinki L/W końca. Kontrola współrzędnych potwierdziła odbicie tej geometrii przy 100%. Są 0H′ i P′ dla B. `if(!mirrored)` pomija osie x/y/z i podpisy L/W drugiego układu (85–89, 105). | Odbijać aktualną klatkę i dodać komplet odpowiednich oznaczeń; ujednolicić pomocnicze wycinki asymptot i strzałki, które mają różne `guideScale` (83, 91). |
| 2. Płaszczyzna odbicia i szeroka część ku górze | wykonane | `Stage8.reflect(p)` zwraca `[X,Y,14-Z]`; HTML (75, 99, 115) rysuje Σ: Z=7 i górną szeroką część. Potwierdzono w rzucie pionowym. | Zachować tę ustaloną płaszczyznę podczas dodawania animacji. |
| 3. Powiązanie z przeciwległą ścianą piramidy | częściowo | HTML (76) pokazuje VM− i VM+. Dla końca A, α=β odbita płaszczyzna zawiera V i M+; reszta równania dla M+ <1e-12. W B jest tylko równoległa, a przy złotym α powiązanie kątowe jest przybliżone. | Przenieść powiązanie na ruch drugiego układu; opisać jego zależność od A/B i α bez deklarowania ścisłego dopasowania wszystkich wariantów. |
| 4. Animacja obu układów | brak | HTML (69): pierwszy używa `frame`, drugi `Stage8.reflect(Stage8.transform(p,o,end))`. Zmiana t nie zmienia żadnej pomarańczowej linii; potwierdzono dla 80 pozycji oraz wizualnie przy 0/25/50/100%. | Animować cały drugi układ jako lustrzany odpowiednik aktualnej klatki pierwszego. |
| 5. Wspólny suwak, odtwarzanie, pauza, reset | częściowo | HTML (137–150) i `Stage8.playback`: jedna anulowalna pętla, seek zatrzymuje ruch, pauza zachowuje postęp, reset daje 0%. Przeglądarka potwierdziła te działania i koniec 100%. Aktualnie sterują ruchem tylko pierwszego układu. | Podłączyć drugi układ do tego samego postępu i zegara. |
| 6. Widoczność pierwszego, drugiego i obu | częściowo | HTML (26, 77): `mirror` wybiera `[false]` lub `[false,true]`. Działają pierwszy i oba; warstwy są wspólne. | Dodać widok tylko drugiego oraz zweryfikować wszystkie trzy wybory podczas ruchu. |
| 7. Geometria w początku, pośrednich pozycjach i końcu | częściowo | 3/3 istniejących testów: 480 pozycji pierwszego, równania powierzchni/cięcia, L/W, kąty, dodatnia jednolita skala, niezmienny start względem q i zgodny koniec. Dodatkowo 80 kontroli `drawScene`: nieruchoma piramida i statyczny drugi układ; geometria obu jest lustrzana na końcu. | Testy geometrii i lustrzanej relacji drugiego układu we wszystkich klatkach; istniejący test celowo sprawdza tylko statyczne odbicie końca. |
| 8. Oznaczenia, tolerancja 0,1%, owal a złota elipsa | częściowo | HTML (53–60, 125–133): rzeczywisty owal, osobny wzorzec `(φ cos q,sin q)`, jedna skala 2/W i próg `e<=.1` dla błędu w %. Engine ma `RELATIVE_TOLERANCE=0.001`. Podgląd pokazuje L/W=1,61974296, błąd 0,105620%, NIE dla α=β. | Uzupełnić oznaczenia odbicia i ich czytelność podczas ruchu; zachować istniejącą tolerancję i rozdział owalu od elipsy. |
| 9. Działanie na telefonie | niezweryfikowane | W przeglądarce 320/390 px: brak poziomego przepełnienia strony i błędów konsoli, działające kontrolki, przewijanie tabeli i przejścia A/B. `adb devices -l` nie wykazał urządzenia. | Fizyczny telefon: dotyk, orientacje, płynność, widoczność podpisów i pauza po ukryciu strony. Wynik viewportu nie jest odbiorem telefonu; build zasobów Androida nie jest APK ani testem urządzenia. |
| 10. Kontrole projektu, dokumentacja, odbiór i PR | częściowo | Testy podglądu 3/3, aplikacji 87/87, TypeScript, web/Android-assets/Pages i `git diff --check`: PASS. Dokument animacji opisuje etap 8 i statyczne odbicie. MANUAL_ACCEPTANCE.md dotyczy głównej aplikacji, bez odbioru etapu 9. PR #3 jest OPEN/draft, oba CI SUCCESS, ale nie zawiera lokalnych plików etapów 7–8. | Dokumentacja i instrukcja odbioru etapu 9 oraz wynik odbioru obu układów. Ewentualny PR dla tych zmian wymaga osobnego upoważnienia; obecny PR nie dowodzi wykonania etapu 9. |

**Kontrole wykonane w tym audycie:**

- Node dostarczony z runtime: 24.19.0. Systemowy Node 20.15.0 jest poniżej
  wymaganego >=22, dlatego nie użyto go do kontroli projektu.
- `node --test docs/etap-7/animation.test.mjs`: 3/3 PASS.
  `node node_modules/vitest/vitest.mjs run`: 87/87 PASS w 4 plikach.
  `node node_modules/typescript/bin/tsc --noEmit`: PASS.
- Istniejące trzy warianty Vite z CI przeszły: web, `--mode android`,
  Pages z `GITHUB_PAGES=true`. Wyjścia skierowano do
  `%TEMP%/pyramid-stage9-audit-{web,android,pages}`. Nie synchronizowano
  Capacitor, nie budowano APK/AAB. Pozostają ostrzeżenia paczek >500 kB;
  ostrzeżenie o outDir poza projektem wynika z użycia TEMP.
- Pierwsze uruchomienie Vitest/Vite zatrzymał sandbox: esbuild nie mógł
  odczytać katalogu nadrzędnego/config. Powtórzenie poza sandboxem przeszło.
  To rozwiązana przeszkoda środowiskowa, nie błąd testów ani funkcji.
- `verify.py` uruchomiono z kopii w `%TEMP%/pyramid-stage9-audit-numeric`,
  aby nie nadpisywać projektowego `wyniki.json`. Obliczenia Decimal (60 cyfr)
  potwierdziły tolerancje, rodzinę złotych rozwiązań i niezmienniki odbicia.
  Dla α=β: L/W=1,6197429608524617, błąd 0,105620284521%, poza 0,1%.
- Dodatkowy audyt kodu `drawScene` w pamięci, bez zapisania zmian/testów
  w projekcie: 80 pozycji (A/B, α=β/złoty, q=0,005/0,08/0,16/2,
  t=0/0,25/0,5/0,75/1). Współrzędne piramidy i drugiego układu są stałe;
  pierwszy zmienia się z t. Powierzchnia, cięcie, przekrój i odcinki L/W
  na końcu spełniają X′=X, Y′=Y, Z′+Z=14. Nie rozszerza to wyniku na
  pominięte oznaczenia ani różne wizualne wycinki asymptot/strzałek.
- Użyto dostępnego lokalnego serwera **http://127.0.0.1:8087/podglad.html**.
  Przeglądarka: start, 25/50%, koniec A/B, play/pauza/seek/reset,
  ograniczony ruch, zmiana q i presetu, rzut pionowy/3D, oba kadry,
  przełącznik odbicia, warstwa przekroju i błąd parametrów bez zamkniętego
  owalu. Start przy q=0,08/0,16 pozostaje Q=(16,775;0;28,35).
  Odbicie końca pozostaje nieruchome. Widok 320/390 px nie przepełnia
  strony; brak ostrzeżeń/błędów konsoli w sprawdzonym podglądzie.
- GitHub odczytano na żywo: [PR #3](https://github.com/MichaelZP/great-pyramid-11-7-lab/pull/3),
  OPEN, draft, `feature/android-offline` -> `main`, head zgodny z lokalnym
  f8ed127. Oba kontrole `check` SUCCESS:
  [CI push](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37419250637),
  [CI PR](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37419247682).
  Lista plików PR nie obejmuje `docs/etap-7/`, `plan-stozka.md` ani
  `animacja-stozka.md`; CI nie uruchamia testu animation.test.mjs.

**Nierozstrzygnięte decyzje autora:** końcowe zakotwiczenie i warunek skali
A lub B (ewentualnie inne jawne Z_P i L_doc), a także wariant α.
A i α=β dają ścisłe powiązanie końcowego cięcia ze ścianą, lecz L/W jest
poza 0,1%; złoty α przy z₀=7,65 daje L/W≈φ i przybliżone powiązanie kątowe.
Robocze A nie jest zatwierdzonym wyborem. Start pierwszego układu Golden Egg
i Σ: Z=7 są już ustalone. Przygotowując etap 9 można zachować oba warianty;
nie trzeba wymyślać decyzji autora. Integracja osobnego podglądu z główną
aplikacją nie została wyspecyfikowana jako część etapu 9 w odczytanych
dokumentach i wymaga oddzielnego ustalenia zakresu. Brak precyzyjnej
hipotezy funkcji fizycznej konstrukcji pozostaje tematem wcześniejszego
planu; nie blokuje tej animacji i nie jest pracą etapu 9.

**Jeden następny krok:** domknąć etap 9 w istniejącym podglądzie, zaczynając
od lustrzanej animacji aktualnej klatki drugiego układu na wspólnym zegarze,
z zachowaniem dostępnych A/B i wariantów α.

**Prompt obejmujący wyłącznie brakujące prace etapu 9:**

> Pracuj w android-offline na aktualnej gałęzi. Przeczytaj instrukcje oraz
> audyt etapu 9 w docs/STATUS.md i zachowaj zastane zmiany. W istniejącym
> docs/etap-7/podglad.html i animation.js animuj drugi układ jako
> p₂(t)=RΣ(p₁(t)), Σ: Z=7: powierzchnię, płaszczyznę, rzeczywisty przekrój,
> linie, pomocnicze wycinki i pozycje oznaczeń. Uzupełnij brakujące oznaczenia
> drugiego układu. Użyj istniejącego postępu, play/pauzy/resetu i jednej pętli;
> dodaj wybór pierwszy/drugi/oba. Zachowaj piramidę B=11, h=7, pełny start
> Golden Egg niezależny od q, końce A/B, warianty α, jednolitą skalę,
> ograniczony ruch, próg 0,1% i oddzielny wzorzec złotej elipsy. Nie uznawaj
> A/B ani wariantu α za decyzję autora. Rozszerz istniejące testy o relację
> lustrzaną i niezmienniki obu układów przy 0/25/50/75/100%, widoczność i
> wspólne sterowanie. Sprawdź podgląd 320/390 px, istniejące kontrole projektu
> oraz fizyczny telefon, jeśli dostępny; brak urządzenia oznacz jako
> niezweryfikowane. Uzupełnij dokumentację i instrukcję odbioru tylko etapu 9.
> Nie dodawaj dalszych efektów ani integracji głównej aplikacji. Bez commitów,
> push, publikacji, tworzenia lub modyfikacji PR i merge bez osobnego polecenia.

Nie zmieniono kodu ani innych dokumentów projektu. Zachowano wcześniejszą
treść STATUS.md poniżej; nowszy wynik audytu ma pierwszeństwo wobec dawnych
opisów zakresu i dowodów. Nie wykonano commitów, push, publikacji ani merge.

---

# ETAP 8 — animacja od położenia Golden Egg, 2026-10-06

**Zaimplementowano w osobnym podglądzie etapu 7.** Autor wskazał początek
„tak jak w widoku modelu golden egg”. Odczytano GoldenEggConstruct i
przeniesiono położenie pionowej osi, poziom lokalnego zera i kierunek cięcia
na niezmienną piramidę B=11, h=7. Rzeczywisty owal pozostaje z etapu 7;
ilustracyjna geometria jaja nie zastępuje przekroju. Dokładne współrzędne,
adaptacja parametrów i kolejność operacji: [animacja-stozka.md](animacja-stozka.md).

Animowany jest cały pierwszy układ: powierzchnia, płaszczyzna, przekrój,
linie i pozycje oznaczeń. Obrót R=I; ruch to przesunięcie i jednolita skala
z łagodnym początkiem/końcem. Zachowano q względem V, stały kadr i wszystkie
warianty. **Korekta po zrzucie autora:** q skaluje wyłącznie koniec;
start nie zależy od q i ma Q_start=(16,775;0;28,35), lokalne zero Z=−7,865.
Wcześniejsze zmniejszanie startu przez q zostało usunięte. Dodano stały kadr
„Całe przejście”, z powierzchnią po lewej i piramidą po prawej; dawny kadr
etapu 7 i jego skala ekranowa są nadal dostępne do wyboru.
Dodano postęp 0–100%, odtwarzanie/pauzę, reset, skok do końca, prędkość,
warstwy i ograniczony ruch. Ręczny postęp zatrzymuje odtwarzanie.
Odbicie jest statycznym podglądem końca w Z=7; jego pełna animacja to etap 9.

**Sprawdzono:** 3/3 testy podglądu (480 pozycji i zegar odtwarzania),
87/87 testów aplikacji, TypeScript, web/Android-assets/Pages buildy,
składnia i whitespace. Node 24.19.0; buildy w `%TEMP%/pyramid-stage8-*`.
W przeglądarce: koniec A/B, klatki pośrednie, pauza, seek, reset, prędkość,
trzy pełne cykle, wariant/preset, warstwy i ograniczony ruch; brak błędów
konsoli i poziomego przepełnienia przy 320/390 px. Poprawiono czytelność
podpisów przy małej skali. [Zrzut 390 px](etap-7/etap-8-390.png).
Dotychczasowe ostrzeżenia o paczkach >500 kB pozostają. Bez testu na
fizycznym telefonie, APK/AAB ani integracji tego podglądu z główną sceną.
Tolerancja 0,1% zachowana; α=β nadal ma błąd L/W 0,105620285%, poza progiem.

Po korekcie początku: ponownie 3/3 testy podglądu, w tym niezależność startu
od q, zachowany koniec i 480 pozycji. W przeglądarce sprawdzono q=0,0616595
i 0,16, A/B, oba kadry i ekran 390 px. [Aktualny pełny start](etap-7/etap-8-start-pelny.png).
Dotychczasowe zrzuty 390 px i połowy przedstawiają wersję przed korektą.
Korekta obejmuje osobny podgląd i dokumentację; główna aplikacja bez zmian.

**Jak uruchomić podgląd:** http://127.0.0.1:8087/podglad.html;
z katalogu aplikacji `python -m http.server 8087 --bind 127.0.0.1
--directory docs/etap-7`. Można też otworzyć docs/etap-7/podglad.html lokalnie.
Testy podglądu: `node --test docs/etap-7/animation.test.mjs` (Node ≥22).
HTML wymaga sąsiadującego animation.js, działa offline. Bez commitów,
push, merge i publikacji. Gałąź `feature/android-offline`, HEAD `f8ed127`;
zastane zmiany zachowano. Buildy aplikacji nie zawierają osobnego podglądu.

**Decyzje autora:** początek wskazany; A pozostaje roboczy, końcowe A/B
i wariant α pozostają dostępne do wyboru.
**Jeden następny krok:** autor ocenia pełny start z Golden Egg
i wybiera końcowy wariant na podstawie animacji.

Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/.

---

# ETAP 7 — specyfikacja i osobny podgląd, 2026-10-06

**Aktualizacja — powierzchnia bez podstawy:** domyślny tryb
„Bez podstawy · ku nieskończoności” usuwa końcowe okręgi/dyski, rozszerza
siatkę poza kadr i oznacza kontynuację strzałkami. Lokalne osie x,y,z,
zero 0H i odbite 0H′ oraz przerywane płaszczyzny pokazują z → 0⁺ dla
r → ∞. Oznaczenie O nadal dotyczy piramidy. Lokalna płaszczyzna zerowa
po umieszczeniu na osi ma Z = Z(P_q)−s_q z₀, a nie automatycznie Z = 0.
Powierzchnia nie osiąga ani tej płaszczyzny, ani punktu zero. Poprzednie
wycinki pozostają do wyboru. Piramida, cięcia i skalowanie wokół V są
zachowane. [Aktualny podgląd](etap-7/podglad-nieskonczonosc.png).

**Aktualizacja podglądu — skalowanie względem V:** dodano suwak skali
obu układów z ich płaszczyznami i przekrojami, przy niezmiennej piramidzie
i stałym kadrze. Domyślne 8% oraz szerszy zakres powierzchni pokazują
dolną i górną szeroką podstawę. Podstawy są granicami wyświetlanego
wycinka zr = k. Odbicie pozostaje w Z = h; kąty i L/W są zachowane.
Można przełączyć zakres na samo otoczenie przekrojów. Kontrola współrzędnych
renderowania potwierdziła nieruchomą piramidę i jednolite skalowanie obu
układów względem V dla A/B i rzutów 3D/pionowego; kontrola przeglądarki
objęła suwak, wpisanie mnożnika i zmianę zakresu.
[Aktualny zrzut](etap-7/podglad-skala.png). Ten sam lokalny adres podglądu
poniżej; bez publikacji i zmian w aplikacji.

Aktualny zakres: [plan-stozka.md](plan-stozka.md), niezależne obliczenia i
lokalny podgląd; bez zmiany aplikacji, animacji, commitów, push i publikacji.
Gałąź `feature/android-offline`, początkowy HEAD `f8ed127`, drzewo aplikacji
było czyste. Zastany stan nadrzędnego repozytorium pozostawiono bez zmian.
Starsze zapisy o uprawnieniach i PR poniżej dotyczą poprzedniego etapu.

**Ustalono i sprawdzono:** odczytano trzy strony Huntleya oraz autorską stronę
Langego i obraz wzoru; zdefiniowano zr = k, jednostki k, dziedzinę, płaszczyznę,
gałęzie i pomiar we własnej płaszczyźnie. Sprawdzono e, c, d i półcięciwę
ogniskową złotej elipsy. Przekrój powierzchni jest owalem, nie elipsą.
Niezależny skrypt [verify.py](etap-7/verify.py) (Decimal, 60 cyfr) i
[wyniki.json](etap-7/wyniki.json) odtwarzają długości, szerokości, tolerancje,
trzy różne złote pary parametrów, miarę całego obrysu oraz niezmienniki
jednolitego skalowania i odbicia. Nie potwierdzono globalnej jednoznaczności
pierwiastka dla każdej ustalonej wysokości; jednoznaczność pary (α,z₀)
została obalona różnymi rozwiązaniami przy k = 1.

- θ Huntleya = 51,827292372988°, β 11:7 = 51,842773412631°;
  różnica 0,015481039643°, błąd 0,029870439%: zgodność w tolerancji 0,1%.
- Dla k = 1, z₀ = 7,65 złoty dobór α ≈ 51,795319255898°;
  odchylenie α od β 0,091534757% spełnia tolerancję kątową.
- Przy α = β, L/W = 1,619742960852, błąd 0,105620285%: poza 0,1%.
  Przy α = 51,84° błąd wynosi 0,099439369%: w tolerancji, bez dokładnej równości.
- Zarejestrowany obrys po jednej wspólnej skali porównano ze wzorcem Huntleya;
  dyskretna miara Hausdorffa nie oznacza klasycznej elipsy ani zgodności L/W.
- Autor ustalił odbicie w **Z = h = 7**, przez wierzchołek V, na wspólnej osi.
  Odbita powierzchnia ma szeroką część ku górze; płaszczyzna cięcia ma −α.

**Jak obejrzeć:** otwórz [podglad.html](etap-7/podglad.html) w przeglądarce
(działa bez internetu). W bieżącej sesji uruchomiono osobny serwer lokalny:
**http://127.0.0.1:8087/podglad.html**. Odtworzenie: z katalogu aplikacji
`python -m http.server 8087 --bind 127.0.0.1 --directory docs/etap-7`.
Podgląd pozwala porównać α = β, złoty dobór, Langego i Huntleya; warianty
położenia A/B, oba układy, przekroje, płaszczyzny i apotemy. Dostępne są
obrót widoku, rzut pionowy i własne α/z₀; pełnej animacji nie dodano.

**Weryfikacja:** niezależne obliczenia i niezmienniki przeszły; składnia JS
podglądu i kontrola whitespace przeszły. Przeglądarka potwierdziła wartości
dla 11:7, złotego doboru i Langego, przełączanie A/B, rzut pionowy/3D,
widoczność odbicia i komunikat dla parametrów bez zamkniętego owalu.
Brak błędów/ostrzeżeń konsoli podglądu oraz poziomego przepełnienia całej
strony przy domyślnym rozmiarze 1280 px. Zrzuty:
[wariant A](etap-7/podglad-A.png), [wariant B](etap-7/podglad-B.png).
To kontrola osobnego podglądu na komputerze; aplikacji/Androida nie budowano
i nie testowano na urządzeniu w tym etapie.

**Potrzebna odpowiedź:** dla pierwszego układu A (P = V, L′ = h) czy B
(P na połowie wysokości, L′ = h/2), ewentualnie konkretne Z_P i L_doc?
Ponadto α = β (ścisłe powiązanie ze ścianą, L/W poza 0,1%) czy złoty dobór
α przy z₀ = 7,65 (złota proporcja i przybliżone powiązanie ze ścianą)?
Odbicie w Z = h jest już przyjęte. Domyślny podgląd A nie jest decyzją autora.

**Jeden następny krok:** wybór przez autora zakotwiczenia, skali i wariantu
cięcia na podstawie podglądu; dopiero potem osobny etap integracji w scenie.

---

# Final review — 2026-10-06

Reviewed the complete existing thirteen-position update on
`feature/android-offline`, starting at `a11489c`, including the already dirty
scene/history/tutorial files. No applicable AGENTS.md was found. The parent
repository and its two review PNGs were preserved. GitHub fetch confirmed the
remote and default target `main`; the earlier offline foundation is also in
this branch's diff against main.

## Checked and corrected

All 13 formulas/results/relative errors, both source workbooks, segment endpoints
and copies, complementary angles, actual oval L/W, scene switching/return,
PL/EN history, nine tutorial steps, saved progress, author credit, seven presets,
custom input and ordinary scene switches were reviewed. Fixed the RMS scan
minimum (51.846°), cancellable timers, misleading oval/precision/ranking copy,
missing visible **Michał Przybylski — prylski.dev** credit, header overlap,
fixed-shell scrolling and unnecessary settled-height geometry uploads.

| Control | Final result |
|---|---|
| Vitest | **87/87**, four files |
| TypeScript / whitespace | `tsc --noEmit` and diff checks pass |
| Independent Decimal audit | all 13 rows, both XLSX, both scans including RMS pass; [fresh evidence](audit-13/review-2026-10-06.json) |
| Comparisons | 11:7 **12/13**; Golden Egg **10/13**; 11:7 L/W error **0.105620285%**, unchanged |
| Builds | web `dist/`, Android web assets `%TEMP%/pyramid-history-android-check`, Pages `%TEMP%/pyramid-history-pages-check`; expected `/`, `./`, `/great-pyramid-11-7-lab/` bases |
| Browser | all 13 four-step lessons, 26 PL/EN history entries, nine tutorial steps; 1280×720, 320×740 and 390×844; no horizontal page overflow |
| Playback | 4.2/18 s deadlines, hiding, cleanup and reduced motion tested with a fake clock; host forces reduced motion for visual review |
| Regression | scene return, presets/custom input, scene switches, stereo/swap and tutorial reload exercised; shell scroll remains zero after slider focus |
| Android | no ADB device; no new native APK/AAB/install or physical UX/offline/FPS validation |

Full scope, fixes, source checks, screenshots and limitations:
[review report](REVIEW-13.md). [Release description](RELEASE_NOTES.md).
CI now includes all three web build modes, without deployment.

## Remaining issues

Physical Android touch/Back/offline/portrait/landscape, sustained animation/FPS
and native fullscreen remain pending. The in-app host showed expanded canvas
and exit controls but did not expose a fullscreen element and scaled captures;
that does not establish native fullscreen. Chunks above 500 kB and Three.js
Clock/shadow-map warnings remain. A Fast Refresh hook-order error during live
edits did not recur after a full reload.

Brun's rigorous uncertainty, global uniqueness of the golden angle, statistical
provenance of the reference angle/weights and the author's precise physical
function hypothesis remain unresolved. Fifteen source URLs were attempted;
Rhind (403) and the Petrie scan were not freshly readable. Laven's papers cover
general optics; the cited unpublished 2017 correspondence is unverified.
No dependent result is presented as an independent discovery.

## Test version and one next step

From `android-offline`, use Node ≥22 and `npm run dev -- --host 127.0.0.1`;
open **http://127.0.0.1:8080/**. A local preview tab is available. On a trusted
LAN, `npm run dev` prints a phone-accessible address. The existing public Pages
version and old Android artifacts do not include this draft update.

**One next step:** perform and record the physical Android acceptance in
[MANUAL_ACCEPTANCE.md](MANUAL_ACCEPTANCE.md), including timed playback with
reduced motion off and sustained animation behavior, before readiness review.

Implementation commit `0730d406f538188b3d5070e44a008c449a0c076f` was pushed
on `feature/android-offline`. [Draft PR #3](https://github.com/MichaelZP/great-pyramid-11-7-lab/pull/3)
is verified OPEN and draft, targeting `main`. Both GitHub CI runs for that
implementation passed, including typecheck, 87 tests and three build modes:
[PR CI](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37417291314),
[push CI](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37417066622).
This final status recording changes documentation only. No merge or production
publication was performed; the PR stays draft for physical acceptance.

---

## Historical status entries

The following records describe earlier sessions and their then-current limits.

# Pyramid 11:7 — current status

## Current update — history, sources and optional tutorial, 2026-10-05

All thirteen positions now separate the history of the concept, name and symbol
in Polish and English. Expandable notes distinguish mathematics/model results,
historical evidence and pyramid interpretation, without attributing builders’
intent from numerical proximity. Fifteen scoped sources are accessible per row
and in the app bibliography. The documentation shares the app’s source registry:
[English history](HISTORY-13.md), [Polish history](historia-13-pozycji.md).

The optional nine-step tutorial connects all thirteen positions and reuses their
3D constructions. It supports skip/close, pause, resume, arbitrary step selection,
restart and saved progress across reloads. It starts manually; optional timed
progression stops on completion, hidden pages and manual changes. Reduced motion
uses manual navigation. Ranking copy now identifies chosen weights and the 11/7
preference. Formula/target/weight computations and source workbooks are unchanged;
only two misleading engine descriptions were corrected. Startup locale retention
and rejected fullscreen promises were also repaired during review.

79 tests, typecheck and local web/Android-assets/Pages builds pass. Browser review
covers all thirteen history entries in both languages, nine tutorial steps, saved
progress and desktop/320/390 px layouts.
The final review also checks panel-only scrolling, fullscreen entry/exit and
step navigation within fullscreen, with no new console errors.
Timed playback under unrestricted motion and physical Android touch/offline checks
remain separate. Details, screenshots
and evidence limits: [update status](status-aktualizacji.md).

No publication, commit, push, native packaging, sync or installation. Earlier
uncommitted visualization and audit work was preserved.

## Previous update — all thirteen interactive relations, 2026-10-05

All thirteen audited positions have labelled 3D constructions, common result/error
panels and four-step bilingual explanations. Length sums use explicit copies;
angular relations show complementary arcs; L/W uses the actual closed section
and maximum width. Playback supports pause, resume, finite completion, reduced
motion and return to the ordinary scene. Phone labels, framing and compact scene
controls were checked at 390 and 320 px widths.

Typecheck, 65 tests and local web/Android-assets/Pages builds pass. Browser review
includes manual steps 1–4 for every position. Timed playback without reduced
motion and physical Android touch/offline checks remain separate validation.
The mathematical engine, workbook and earlier audit findings are unchanged.
See [preview, evidence and outstanding work](status-aktualizacji.md) and
[architecture](RELATION-VISUALIZATION.md). No publication, commit, push, native
packaging, sync or installation was performed.

## Previous update — interactive relation prototype, 2026-10-05

Implemented the audited phi `S/A` relation with labelled 3D segments, a common
13-position selector/result panel, proportional length bars and a four-step
explanation with pause/resume/manual navigation and return to the normal scene.
The other twelve positions explicitly report that their 3D scenes are pending.
See [current status and local preview instructions](status-aktualizacji.md) and
[extension contract](RELATION-VISUALIZATION.md). Typecheck, 35 tests and local
web/Android-assets/Pages builds pass. Browser review covers desktop and narrow
phone viewports; it does not establish physical Android UX/offline validation.
No commit, push, publication, native packaging or installation was performed.

## Previous update — mathematical audit, 2026-10-05

Stage 1 has been completed with explicit unresolved findings. The current
status is [status-aktualizacji.md](status-aktualizacji.md); the full audit is
[matematyka-13-stalych.md](matematyka-13-stalych.md). Independent calculations
confirm 12/13 comparisons within 0.1% for 11:7 and 10/13 for Golden Egg.
Only the square-base sqrt(2) relation is an exact target identity for 11:7.
The report documents dependencies, workbook/engine differences, the oval
derivation, limitations of Brun's reference and the incorrect `rmsAngle` result.
Existing regression tests pass 25/25. No application or workbook changes,
commit, push, build, device validation or publication were performed.

## Historical planning baseline

Recorded: 2026-10-05, before the audit above. Scope of that earlier stage:
planning only. The remainder preserves its evidence and then-proposed next step;
use the linked current status for work completed since that baseline.

## Repository and instructions

The application root is `C:\Users\user\Documents\ChatGPT\Piramida\android-offline`.
It is a separate Git repository on `feature/android-offline`, at
`a11489c5b0995ded8f3e06fdd1405598f6bcb2f1` (`Add offline Capacitor Android release build`).
Before this session it was clean. Its configured remote is
`https://github.com/MichaelZP/great-pyramid-11-7-lab.git`.
HEAD and the locally cached `origin/feature/android-offline` have zero commits
of divergence. No fetch was performed; this is not confirmation of live remote state.

The parent `Piramida` directory also contains a Git repository: branch `master`,
no commits, with the application directory and two review PNGs untracked.
Use Git from the application root. Preserve those existing parent files.
No applicable `AGENTS.md` was found. Project READMEs, technical docs, package
scripts, Vite/Capacitor configuration, CI and engine/tests were inspected.

## Application baseline

React 19 / TypeScript / Vite web application, Three.js with React Three Fiber,
Zustand state and a Capacitor Android wrapper. Seven presets include 11:7,
Golden Egg and a custom ratio. The UI contains models, constant comparisons,
angle scan and a weighted verdict; English/Polish text and stereo controls exist.

The code and mathematical documentation contain all **13** comparison rows.
The complete sourced list and formulas are in [PLAN.md](PLAN.md).
Existing regression expectations specify **12/13** within 0.1% for 11:7 and
**10/13** for Golden Egg. The egg row is outside tolerance for 11:7 at about
0.106%; Golden Egg's maximum row error is about 0.397%. These are software
results requiring independent mathematical review, not evidence of a physical
function or historical intention.

The precise affirmative hypothesis about the construction's function was not
found in the inspected files. It must be supplied or confirmed by the author.
Rainbow bands and the cone/egg scene contain schematic presentation choices;
the numeric egg and displayed egg use different parameterizations.

Known issues are recorded in the plan: π perimeter wording, Node requirements,
twelve/13 labels, section terminology, scan step and source/score verification.
No behavior, source code, package metadata, existing docs or configuration was changed.

## Local startup

Use **Node.js ≥22**, matching `package.json` and the Android instructions;
CI currently uses Node 22. The READMEs' Node 20 allowance is inconsistent.
From PowerShell:

```powershell
Set-Location 'C:\Users\user\Documents\ChatGPT\Piramida\android-offline'
# For a fresh setup, install the locked dependencies:
npm ci
npm run dev
```

Vite binds port 8080 with `strictPort: true`; open `http://localhost:8080/`.
If the port is occupied, startup fails rather than choosing another port.
Dependencies already exist locally; this session did not reinstall them.

Existing checks: `npm run typecheck`, `npm run test:run`.
Standard production flow: `npm run build`, then `npm run preview`.
Vite base is `/` normally, `/great-pyramid-11-7-lab/` when
`GITHUB_PAGES=true`, and `./` for `npm run build:android`.
Capacitor consumes `dist/`. Android additionally requires JDK 21 and SDK 36
(minimum Android SDK 24); see [ANDROID_OFFLINE.md](ANDROID_OFFLINE.md).
Android sync, signing, installation and publication are not part of this session.

## Verification boundaries

The PATH Node executable reports v20.15.0, below the declared requirement.
The first npm version probe was blocked by sandbox access (`EPERM`). A separate
check used the bundled Node v24.19.0 outside the sandbox; npm reports 10.7.0.
With bundled Node v24.19.0, direct invocation of the installed TypeScript
`tsc --noEmit` completed without diagnostics, and the installed Vitest runner
completed successfully: **1 test file, 25/25 tests passed**. These checks validate
the current implementation, not the independent truth of its interpretations.
Final Git status contains exactly three new, untracked documents:
`AUTHORSHIP.md`, `docs/PLAN.md`, `docs/STATUS.md`; tracked-file diff is empty.
No files were staged or committed, and no push or publication was performed.
No application browser/Android launch, visual validation, build, workbook-cell
audit or external-reference review is claimed for this session.

## One next step

Perform **Stage 1: an independent, documentation-only audit of all 13 relations**,
including worksheet/cell provenance from both workbooks and the numerical egg
derivation. Produce an audit report without changing the engine, UI or publishing.
Stages involving the author's function hypothesis remain open until its wording
is available; this does not block the mathematical audit.

## Next-session instruction

> Read `docs/PLAN.md`, `docs/STATUS.md` and `AUTHORSHIP.md` in `android-offline`,
> check applicable instructions and current Git status, then do Stage 1 only.
> Verify all 13 rows independently against code, documentation and both workbooks;
> identify sources, assumptions, dependencies and discrepancies. Do not invent
> the author's function hypothesis, modify application behavior, commit, push or publish.
