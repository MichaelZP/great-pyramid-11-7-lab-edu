# Etap 14 — wspólna scena konstrukcji i wirów

Pokaz do oceny autora, aktualizacja 2026-10-08. Autor zlecił udostępnienie
źródeł na GitHub w gałęzi `codex/education-show`, a następnie osobnej
strony online: https://michaelzp.github.io/great-pyramid-11-7-lab-edu/.
Główne laboratorium i APK pozostają oddzielne. Domyślne ustawienia zachowują zatwierdzoną geometrię;
kontrolki pozwalają zmieniać artystyczne wiry.

[English setup and viewing guide](README_EN.md).

## Uruchomienie

W PowerShell, Node.js >= 22 i istniejące zależności projektu:

```powershell
git clone --branch codex/education-show https://github.com/MichaelZP/great-pyramid-11-7-lab.git
Set-Location great-pyramid-11-7-lab
npm ci
npm run dev
```

Otwórz http://localhost:8080/education/. Nie otwieraj HTML przez `file://`.
W tej sesji uruchomiono Vite dołączonym Node.js 24, ponieważ Node z PATH
ma wersję 20 i sandbox blokuje dostęp do części katalogu użytkownika.
Na telefonie w tej samej sieci Wi-Fi użyj adresu Network wypisanego przez
Vite i dodaj `/education/`. Adres zależy od komputera i bieżącej sieci.

**Pełny pokaz** przywraca wszystkie warstwy i zaczyna od konstrukcji.
Jeśli system preferuje ograniczony ruch, wyłącz odpowiednią opcję świadomie,
aby odtwarzać animację. W ograniczonym ruchu dostępne są nieruchome klatki.

## Pięć odsłon

### Język PL / EN

Nad tytułem wybierz **Język / Language → EN — English** lub **PL — Polski**.
Wybór jest zapamiętywany dla podglądu `education/` w tej przeglądarce.
Przy zablokowanym zapisie ustawień przełączanie działa w bieżącej karcie.
Język zmienia kontrolki, opisy, opcje, etykiety dostępności, komunikaty,
podpisy na Canvas, oznaczenia oczu Cross-eye i tekst nagrania. Nie resetuje
zegara, kamery, przebiegu, kierunków, rozmiarów, warstw ani przezroczystości.
Polski pozostaje domyślny przy pierwszym uruchomieniu.

W nagraniu EN podpis brzmi **Artistic visualization of counter-rotating
toroidal vortices**, z autorstwem **Concept: Michał Przybylski — prylski.dev**.
PL zachowuje wymagany podpis „Wizualizacja artystyczna przeciwbieżnych
wirów toroidalnych”. Dokumentacja i osobne starsze podglądy pozostają
w dotychczasowym języku; link do tej instrukcji oznaczono w EN jako Polish.

### Cross-eye 3D

Przycisk **Cross-eye 3D** nad sceną włącza parę stereoskopową: widok
kamery prawego oka po lewej, lewego po prawej. Skrzyżuj wzrok i połącz
dwa punkty nad kadrami w jeden środkowy obraz. **Siła głębi** reguluje
różnicę kierunków kamer od 0 do ±6° (domyślnie ±3°). Przy 0 oba obrazy
są identyczne. **Odwróć głębię** zamienia kadry, odwracając odczuwaną
głębię; nie zmienia geometrii ani kierunków cząstek. Ponowne naciśnięcie
**Cross-eye 3D** przywraca pojedynczy zaakceptowany widok.

To dwie projekcje równoległe tej samej klatki, ze wspólną osią pionową
i punktem zbieżności V. W obu kadrach zachowano tę samą geometrię, fazy,
warstwy, skalę oraz ustawienia wirów i jaj. Różnica poziomych współrzędnych
zależy od głębokości; pionowe współrzędne pary pozostają jednakowe.
Istniejący renderer rysuje scenę dwa razy na jednym Canvas, bez drugiego
zegara i bez powiększania buforów cząstek. Kamera ręczna lub automatyczna
steruje oboma widokami wspólnie. Pauza/reset i ograniczony ruch działają
w całej parze. Zmiana trybu i siły głębi nie uruchamia animacji.

**Pełny ekran** pokazuje scenę z krótkim paskiem stereo i przyciskiem
**Odtwórz scenę / Pauza sceny**. Wyjdź przyciskiem lub Esc. Przeglądarka
może użyć natywnego Fullscreen API; w osadzonym podglądzie dostępny jest
układ wypełniający okno przeglądarki. Na telefonie najlepiej użyć orientacji
poziomej i niskiej jakości. Odbiór stereoskopowej głębi pozostaje do oceny
autora; automatyczne testy sprawdzają projekcje i synchronizację.

**Kadr do nagrania** oraz **Nagraj demo** zachowują aktywną parę stereo
i wspólny podpis. Istniejące filmy w katalogu są wcześniejszymi nagraniami
pojedynczego widoku; w tej aktualizacji nie tworzono filmu Cross-eye.

### Przebieg sceny

| Przebieg | Zawartość | Czas przy standardowym pokazie |
|---|---|---|
| 0–16% | Piramida i linie konstrukcyjne | 0–3,2 s |
| 16–36% | Pierwsza powierzchnia, płaszczyzna i przekrój | 3,2–7,2 s |
| 36–56% | Odbicie, szeroka część ku górze | 7,2–11,2 s |
| 56–80% | Oba torusy, trajektorie i kierunki | 11,2–16 s |
| 80–100% | Pełna scena, łagodny start cząstek | 16–20 s |

Odsłonięte elementy pozostają widoczne. Po 100% obieg trwa do pauzy.
Pauza zatrzymuje zegar, cząstki i kamerę. Suwak zatrzymuje animację,
zeruje fazę obiegu i wybiera klatkę. Reset zeruje przebieg, fazę i kamerę.
Zmiana prędkości dotyczy obiegów; odsłanianie zawsze trwa 20 s.
Automatyczna kamera jest opcjonalna; przeciągnięcie, kółko, strzałki,
przyciski +/− lub zmiana widoku ją wyłączają. Nie wraca samoczynnie.
Ukrycie karty zatrzymuje pokaz; wznowienie wymaga Odtwórz.

Suwak **Skala stożków hiperbolicznych względem V** zmienia q w zakresie
0,005–2 (0,5–200%). Domyślnie 5,5%; przycisk obok przywraca tę wartość.
100% oznacza konstrukcję L = h. Wykorzystuje dotychczasowe skalowanie
`Stage8.pose/transform` i `Vortex.source`: oba układy, płaszczyzny i owale
skalują się jednakowo, z zachowaniem odbicia w Z = 7 oraz L/W.
Piramida, torusy i ich zwroty pozostają bez zmian. Zmiana q zatrzymuje
pokaz i aktualizuje geometrię bez resetowania przebiegu. Pełny pokaz i
nagranie korzystają z wybranej skali. Domyślny **Stały** kadr kamery
utrzymuje rozmiar piramidy i torusów na ekranie: q nie zmienia przybliżenia,
orientacji ani projekcji kamery. Równoległy widok 3D wykorzystuje sposób
projekcji wcześniejszego etapu 7. Osobne +/− przybliża całą scenę.
**Dopasuj całe stożki** to jawnie wybierany kadr kamery; w tej opcji
zmiana q obejmuje całą siatkę i zmienia rozmiar ekranowy całej konstrukcji.
Reset kamery resetuje wyłącznie jej obrót i przybliżenie, bez zmiany q.

**Widok jak na ilustracji** ustawia q = 0,055, stały kadr, równoległy
widok 3D i otwarte powierzchnie ku nieskończoności. Obrót 25°, nachylenie
0,28 rad, finał 100%, pauza; warstwy konstrukcji są włączone. Szerokie
powierzchnie mogą wychodzić poza kadr, jak na obrazie autora. Zakres
**Całe wycinki z podstawami** i kadr **Dopasuj całe stożki** pozwalają
obejrzeć oba skończone wycinki w całości. Przycisk nie ukrywa torusów.

## Zachowana konstrukcja

### Niezależne wiry i pełne złote jaja (2026-10-08)

W sekcji **Kierunki i wielkości wirów** wybierz kierunek każdego stożka
i torusa osobno. Stożki mają opcje domyślna/odwrócona; domyślna para
zachowuje lustrzany ruch. Odwrócenie zmienia dalszy przebieg całej spirali,
w tym ruch wzdłuż osi. Torus pozwala wybrać θ+/ψ+ albo θ−/ψ−; odwracają
się oba obiegi, znaczniki, cząstki, smugi i strzałki. Zmiana kierunku
nie przestawia cząstek na inną trajektorię ani nie zmienia geometrii.
Cztery fazy są aktualizowane przyrostem jednego istniejącego zegara.
Pauza zatrzymuje wszystkie; Reset i suwak zerują cztery fazy.

**Wielkość torusa 1/2**: niezależnie 25–200%, jednolite skalowanie
R = 2,4 s i r = 0,65 s. **Odległość środków torusów**: d = 2–8 u,
środki Z₁ = 7 − d/2 i Z₂ = 7 + d/2. Piramida, stożki i dokładne
przekroje nie zmieniają się. Dla dużych torusów zakresy ich wysokości
mogą się nakładać; podpis podaje szczelinę osiową d − r₁ − r₂.
Zmiana kierunku, rozmiaru lub rozstawu zatrzymuje pokaz: wznowienie
przyciskiem **Odtwórz**. **Domyślne wiry** przywracają 100%, d = 4 u,
stożki w ruchu lustrzanym, torus 1 +/+ i torus 2 −/−. Zachowują q,
wybrany przebieg, warstwy i przezroczystość. Stały kadr pozostaje stały;
opcja dopasowania kamery obejmuje też zmienione torusy i bryły jaj.

W sekcji **Złote jaja i przezroczystość** włącz bryłę 1 i/lub 2.
To konstrukcja bryły obrotowej półowalu z `GoldenEggConstruct`, z profilem
pobranym z obecnego dokładnego przekroju i przeniesieniem `Stage8`.
Nie jest objętością wyciętą ze stożka ani matematycznym źródłem torusa.
Każda bryła ma 32 × 24 płaty skończonej siatki, zamknięte końce i odbicie
w Z = 7. Przekrój nadal jest owalem, nie klasyczną elipsą; nazwa
„złote jajo” nie zmienia zastrzeżenia dotyczącego błędu L/W dla 11:7.

Oba jaja i obie siatki stożków mają osobne suwaki przezroczystości:
0% = pełna intensywność danej warstwy, 100% = ukrycie. Siatki zachowują
dotychczasową bazową intensywność 0,38; owale i płaszczyzny pozostają
niezależne. Jaja są domyślnie wyłączone, z przezroczystością 65%.
Ich skala jest zgodna z q: przy zaakceptowanym 5,5% są małe. Do inspekcji
brył ustaw około 40%, **Otoczenie przekrojów**, włącz oba jaja i ustaw
przezroczystość stożków około 75%. **Widok jak na ilustracji** przywraca
zaakceptowany kadr i skalę; nie kasuje dodatkowych wyborów warstw.
Nagranie korzysta z bieżących kierunków, rozmiarów, rozstawu i jaj.

Poniższy opis geometrii i ruchu dotyczy ustawień domyślnych.

`Stage8.transform`, `section`, `Vortex.source`, `Vortex.pair`, `Vortex.lane`,
`VortexParticles` i `Vortex.clock` pochodzą z etapów 9–11. Wspólny pokaz
korzysta z ich pamięci podręcznych, jednego renderera i jednego zegara;
`show.js` definiuje odsłanianie, podpis, ustawienia i zapis Canvas.
Dotychczasowe podglądy zachowują swoje domyślne zachowanie.

B = 11, h = 7, α = atan(14/11), z₀ = 7,65, wariant A;
odbicie Z ↦ 14 − Z. Torusy: C₁ = (0,0,5), C₂ = (0,0,9), R = 2,4,
r = 0,65. T1: θ+, ψ+; T2: θ−, ψ−. Nie ma deformacji.
Domyślny q = 0,055 jest ustawieniem prezentacji. Równania i punkty cięcia
nie zmieniły się; q = 0,4 z wcześniejszych nagrań nadal można ustawić.
Powierzchnie wykorzystują wybierane zakresy z etapu 7. Dla otwartych
powierzchni ku nieskończoności: z_min = min(0,008 z₀; σ/24; 0,8 z_lo),
z_max = max(1,5 z₀; 1,1 z_hi). Nie rysujemy okręgu zamykającego; przerywane
płaszczyzny oznaczają asymptoty z = 0 oraz odbitą z′ = 0.
Dla wycinków z okrągłymi podstawami: z_min = min(0,08 z₀; 0,8 z_lo),
z_max = max(1,5 z₀; 1,1 z_hi), próbki logarytmiczne. Siatka obejmuje cały
ten zakres, a oba okręgi podstaw są wyróżnione i podpisane. Okręgi
oznaczają granice renderowanego wycinka; nieskończona powierzchnia zr = 1
nie ma skończonej podstawy. Płaszczyzny i owale zachowują dokładnie
dotychczasowe współrzędne przy tym samym q. Starsze podglądy etapów 10–11
nadal domyślnie rysują otoczenie przekrojów.

**Spirale po stożkach** to niezależna warstwa cząstek i smug. Ruch ma
cztery obroty wzdłuż lokalnego z, z promieniem r = 1/z. Drugi tor jest
odbiciem pierwszego przez `Stage8.transform(..., true)` w każdej klatce:
X′ = X, Y′ = Y, Z′ = 14 − Z; odbity wektor prędkości ma Vz′ = −Vz.
Nie stosujemy dodatkowego odwracania czasu ani zmiany zaakceptowanych
zwrotów θ/ψ torusów. Kierunek przestrzennej spirali odbija się wraz z
powierzchnią. Przy końcu otwartego toru cząstki gasną i wracają na początek;
smugi kończą się na granicy, nie łączą podstawy z wąską częścią.
To artystyczna animacja po powierzchni, nie model fizycznego przepływu.
Wspólny zegar, pauza, reset, prędkość i ograniczony ruch obejmują obie
rodziny cząstek. Wspólne istniejące bufory są używane kolejno przez cztery
obiekty, bez drugiej pętli animacji i bez narastającej historii smug.
Owal pozostaje rzeczywistym przecięciem; L/W = 1,619742961, błąd od φ
0,105620%, poza 0,1%. Torusy odsłaniamy osobno: nie ma wyprowadzonego
przekształcenia powierzchni w torus ani solvera Naviera–Stokesa.

Piramida ma delikatne wypełnienie; powierzchnie mają wyraźniejszą siatkę.
Przekroje są dodatkowo rysowane ponad liniami torusów, bez zmiany punktów.
Smugi i poświata są ograniczone. Podpis oraz autorstwo są rysowane w samym
Canvas, w wydzielonym pasie poza domyślnym kadrem geometrii.

## Nagranie

1. Wybierz **Widok jak na ilustracji** lub własne q i zakres.
   Wybierz rozmiar okna 1280×720 lub inny docelowy kadr, jakość średnią,
   **Reset kamery** i opcjonalnie **Powolny obrót kamery**.
2. Wyłącz ograniczony ruch, jeśli chcesz nagrać animację.
3. Naciśnij **Nagraj demo · 26 s**. Nagranie automatycznie przywraca
   wszystkie warstwy, odsłania pięć etapów i zapisuje 6 s finału.
   W trakcie utrzymuj kartę widoczną. Nagrywany jest tylko Canvas,
   bez paneli, przycisku powrotu i dźwięku, z oboma podpisami.
4. Po zakończeniu kliknij **Pobierz nagranie WebM**. Plik powstaje lokalnie,
   bez wysyłania. Esc kończy nagranie wcześniej i przywraca kontrolki.

Sam **Kadr do nagrania** ukrywa panele; powrót przez Esc lub przycisk
w prawym górnym rogu. Do zewnętrznego nagrania wybierz w OBS źródło
przeglądarkowe 1280×720 z adresem lokalnego pokazu, ukryj panele,
rozpocznij zapis i pokaż cały przebieg oraz przynajmniej 6 s finału.
Sprawdź czy film rzeczywiście zawiera:
„Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych” oraz
„Koncepcja: Michał Przybylski — prylski.dev”.

Aktualny demonstrator z niezależną skalą stożków i lustrzanymi spiralami:
[demo-spirals.webm](demo-spirals.webm), q = 0,055, stały kadr,
1280×720, VP9, 9 333 610 B, 764 klatki, ostatni znacznik 25,939 s.
[Odtwarzacz](evidence/spirals-video.html),
[metadane/SHA-256](evidence/spirals-video-metadata.json).
Pełna struktura EBML oraz odkodowanie finału w przeglądarce PASS.
29,45 zakodowanych klatek/s to średnia tego pliku, nie pomiar telefonu.

Wcześniejszy plik z całymi stożkami i podstawami przy q = 0,08,
przed rozdzieleniem kadru i dodaniem spiral:
[demo-full-cones.webm](demo-full-cones.webm), 1280×720, VP9,
około 26 s, 4 281 583 bajty. Zapis zawiera 756 klatek; ostatni znacznik
czasu to 25,970 s.
[Odtwarzacz kontrolny](evidence/full-cones-video.html) oraz
[metadane i SHA-256](evidence/full-cones-video-metadata.json).
Kontrola EBML potwierdziła kompletność struktury; przeglądarka odtworzyła
plik bez błędu dekodowania. Średnia 29,11 zapisanych klatek/s dotyczy
pliku, nie jest pomiarem FPS ani temperatury fizycznego telefonu.
Najstarszy [demo.webm](demo.webm) pokazuje q = 0,4 i tylko otoczenie
przekrojów, przed rozszerzeniem siatki o całe stożki z podstawami.
Nie edytuj plików projektu podczas nagrania: Vite może przeładować stronę.
Przy uśpionym/zasłoniętym oknie przeglądarka może ograniczać animację;
eksport informuje, jeśli pokaz nie dotarł do finału.

## Sprawdzenie

```powershell
node --test docs/etap-7/animation.test.mjs docs/etap-10/vortex.test.mjs docs/etap-11/particles.test.mjs education/show.test.mjs
npm run typecheck
npm run test:run
```

Nowe testy wykonują rzeczywisty współdzielony renderer i kontrolki w
symulatorze DOM, sprawdzają pięć faz, identyczność geometrii źródłowej,
zwroty, finał, warstwy, pojedynczy zegar, pauzę kamery/cząstek, reset,
ograniczony ruch, jakość i zachowanie ustawienia do filmu. Rozszerzenie
sprawdzono w 26/26 testach (17 wspólnej sceny i 9 zastanych etapów 10–11),
w tym równanie powierzchni, okrągłe podstawy i pełny kadr przy q =
0,005 / 0,08 / 0,4 / 1 / 2, obrotach i trzech widokach. Nowe testy
porównują ekranowe współrzędne piramidy/torusów przy edycji q i zakresu,
pozycje oraz wektory ruchu lustrzanych spiral, równanie powierzchni,
pojedynczy zegar, stały bufor, pauzę i niezależne przełączniki cząstek.
Nowe testy obejmują niezależne odwracanie czterech wirów bez przeskoku,
rozmiary i rozstaw torusów, zgodność cząstek z torusem, siatki obrotowe
jaj, dokładne południki na owalu, odbicie, zamknięte końce, jednolite
skalowanie i osobną przezroczystość bez zmiany punktów przekroju.
Testy stereo sprawdzają kolejność oczu, różnicę projekcji zależną od głębi,
brak różnicy pionowych współrzędnych, identyczne światowe współrzędne
obu kadrów, synchronizację cząstek i jaj, jedną pętlę, wspólną pauzę,
powrót do pojedynczego widoku, dopasowanie na 320/390/844/1280 px,
ograniczony ruch i wyjście z układu pełnoekranowego. Podpis jest rysowany
raz pod parą; pomiar CPU i liczba rysowanych cząstek obejmują oba kadry.
Testy PL/EN obejmują zmianę języka podczas odtwarzania bez resetu geometrii,
kamery i faz, zachowanie jednego zegara, podpisy Canvas i stereo,
zapamiętanie po odświeżeniu, działanie bez localStorage, nowe komunikaty,
błędy, etykiety dostępności i kompletność tłumaczenia polskich tekstów strony.
Browser i wyniki CPU opisano w [STATUS](../docs/STATUS.md).
Viewport telefonu na komputerze nie jest odbiorem fizycznego urządzenia.
Na telefonie pozostaje sprawdzić dotyk/przeciąganie, przewijanie poza
sceną, +/−, pauzę/wznowienie, tło/wznowienie, obrót pion/poziom i 5 minut
pokazu pod kątem płynności i nagrzewania. Zacznij od jakości niskiej.

Strona `education/` jest rozszerzeniem istniejących podglądów, dostępnym
lokalnie ze źródeł oraz na osobnej stronie `great-pyramid-11-7-lab-edu`.
Kod znajduje się w gałęzi `codex/education-show`.
Standardowy build aplikacji i obecny skrypt wydania nie dołączają jej
do głównej strony laboratorium ani APK. Podłączenie do ich wydania wymaga
osobnego zlecenia. Statyczny eksport dla osobnego repozytorium wykonuje
`node scripts/export-education.mjs <nowy-pusty-katalog>`; pliki sceny
i zależności etapów 7–11 są kopiowane, a lokalne odnośniki HTML sprawdzane.

Koncepcja: **Michał Przybylski — prylski.dev**.
