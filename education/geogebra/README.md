# ETAP G1 — Piramida 11:7 w GeoGebra 3D

Materiały do oceny autora, 2026-10-08. Dodatkowy model edukacyjny, obok
istniejącej aplikacji. Bieżący zakres weryfikacji zapisuje [VERIFICATION.md](VERIFICATION.md).

**Koncepcja projektu: Michał Przybylski — prylski.dev**.  
GitHub: https://github.com/MichaelZP/

## Model i wybrane pozycje

`q = B/h`, `s` jest jednolitą dodatnią skalą. `B = 11s`, `h = 11s/q`.
Początek: `q = 11/7`, `s = 1`, zatem `B = 11`, `h = 7`.
To inny parametr q niż skala powierzchni w starszym pokazie stożków.
Współrzędne GeoGebra mają oś Z pionową; aplikacja Three.js używa pionowej Y.

| Symbol | Obiekt / znaczenie |
|---|---|
| O, V | środek podstawy, wierzchołek |
| P1…P4 | kolejne narożniki kwadratowej podstawy |
| M1…M4 | środki kolejnych boków |
| B | bok b1 = P1P2; b2 = P2P3 ma tę samą długość |
| h | O V — pionowa wysokość, prostopadła do podstawy |
| A | O M1 = B/2 |
| S | M1 V — apotema / wysokość ściany; pozostałe trzy też skonstruowane |
| D | P1 P3 — pełna przekątna podstawy |
| E | P1 V — krawędź boczna |

| Pozycja rzeczywistej listy | Odcinki i wzór | Cel | Charakter |
|---|---|---|---|
| #1 `pi` | (b1+b2)/h = 2B/h | π | przybliżenie; licznik to **połowa** obwodu |
| #10 `phi` | S/A | (1+√5)/2 | przybliżenie przy 11:7 |
| #5 `sqrt2` | D/B | √2 | dokładna tożsamość kwadratu dla dowolnych q i s |

Zmiana s mnoży wszystkie współrzędne i długości przez ten sam czynnik.
Dlatego ilorazy są niezależne od s. `Rπ = 2q`, `Rφ = √(1+(2/q)²)`,
`R√2 = √2`. Wszystkie są liczone w GeoGebra z długości rzeczywistych
odcinków, bez zastępczego rysowania lub obliczania wyników w JavaScript.

W panelu wybranej lekcji są wzór, bieżący wynik, cel, odchylenie względne
`ε = |R−c|/|c|` oraz `TAK/NIE` dla `ε ≤ 0,001`, czyli 0,1%.
Błąd prezentowany jest jako `100ε` w procentach. Klasyfikacja wykorzystuje
niezaokrąglone liczby. Przy √2 śladowy błąd numeryczny może być zaokrąglony
do 0%; dokładność matematyczna wynika z twierdzenia o przekątnej kwadratu.
Zbieżność z celem nie dowodzi historycznej intencji ani funkcji fizycznej.
Wybrane pozycje nie są trzema niezależnymi odkryciami.

## Otwieranie i lokalny warsztat

Gotowy plik: [piramida-11-7-G1.ggb](piramida-11-7-G1.ggb), zapisany przez silnik
GeoGebra i ponownie wczytany; zakres sprawdzeń opisuje raport.
Otwórz go w GeoGebra Classic 6 z widokiem Grafika 3D. Preferowany układ
`GT` to dwuwymiarowy panel sterowania po lewej i grafika 3D po prawej.
Sam kalkulator 3D może inaczej rozmieszczać lub ukryć kontrolki; użyj Classic.
Nie zapisuj konstrukcji na koncie; lokalne „Pobierz .ggb” wystarcza.

Warsztat `index.html` buduje tę samą konstrukcję przez oficjalny silnik GeoGebra:

```powershell
Set-Location 'C:\Users\user\Documents\ChatGPT\Piramida\android-offline'
# Sprawdzony w tej sesji Node 24.19.0 (import TypeScript wymaga >=22.18):
$g1Node = 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $g1Node education/geogebra/prepare.mjs
& $g1Node education/geogebra/server.mjs
```

Otwórz http://127.0.0.1:8093/, kliknij **Zbuduj model**.
**Sprawdź model w GeoGebra** porównuje konstrukcję z zapisanymi wynikami
obecnej aplikacji i sprawdza eksport/ponowne wczytanie. **Pobierz .ggb**
i **Pobierz wynik kontroli JSON** zapisują pliki w tym katalogu (zastępując
poprzedni wynik G1). **Zapisz widok modelu** zapisuje `model.png`.
Serwer nasłuchuje tylko na 127.0.0.1; przyjmuje wyłącznie trzy nazwane
artefakty G1 oraz trzy osobne artefakty G2 z tej samej lokalnej strony.
Zatrzymanie: Ctrl+C w terminalu.
Alternatywa bez zapisu do katalogu: `python -m http.server 8092 --bind
127.0.0.1 --directory education/geogebra`, adres http://127.0.0.1:8092/;
wówczas przyciski pobierają pliki przez mechanizm przeglądarki.
Przycisk **Otwórz zapisany model G1** wczytuje gotowy plik z tego katalogu;
nie trzeba go najpierw budować. Pole „Otwórz lokalny .ggb” odczytuje wybrany
plik w przeglądarce, bez wysyłania na konto.
Warsztat wymaga internetu do załadowania GeoGebra z oficjalnego serwera;
nie jest paczką offline silnika GeoGebra. Nie skopiowano jego kodu do projektu.
Obszar warsztatu ma szerokość 860–1440 px i wysokość 900 px; służy odbiorowi
na komputerze. Na małym ekranie wymagane jest przewijanie.

## Suwaki i interfejs zapisany w konstrukcji

| Element | Zakres, krok, początek | Działanie |
|---|---|---|
| q | 0,5…4; krok 0,001; **11/7** | kształt; niezależny wolny parametr |
| s | 0,25…2; krok 0,05; **1** | jednolita skala całej bryły |
| lesson | 1…3; krok 1; **1** | tylko jedna lekcja naraz |
| Bryła | włączona | przezroczyste ściany i krawędzie boczne |
| Pozostałe apotemy | wyłączone | trzy dodatkowe wysokości ścian tylko w lekcji φ |
| π (#1) / φ (#10) / √2 (#5) | przyciski | ustawiają lesson = 1 / 2 / 3; numery # z pełnego inwentarza |
| Przywróć piramidę 11:7 | przycisk | q=11/7, s=1, lesson=1, bryła on, dodatkowe apotemy off |

Krok q służy ręcznemu przesuwaniu suwaka, a reset wpisuje pełne `11/7`;
nie zastępuje go wartością 1,571. Dokładne presety lub dowolną wartość
można wpisać w Algebrze / polu q lokalnego warsztatu.
Niebieski: B i A; czerwony: h; złoty: S; fioletowy: D.
Odcinki mają też podpisy, więc identyfikacja nie zależy wyłącznie od koloru.
W pi widać dwa sąsiednie boki B i wysokość; w φ półbok i apotemę;
w √2 przekątną i bok. Trzy pozostałe apotemy nie pojawiają się w innych lekcjach.

## Pełne odtworzenie ręczne

Źródło poleceń: [commands.txt](commands.txt), wygenerowane z
[construction.mjs](construction.mjs). Każda linia to jedno polecenie,
w kolejności wykonania. Dodatkowe ustawienia poniżej są częścią odtworzenia.

1. Otwórz pustą GeoGebra **Classic 6**, ustaw język poleceń English.
   Włącz Algebra, Graphics oraz 3D Graphics. Wykonuj linie `commands.txt`
   kolejno w polu wprowadzania; nie wklejaj komentarzy Markdown.
2. Ukryj automatycznie utworzone boki wielokątów oraz wszystkie pomocnicze
   liczby poza suwakami. Ustawienia widoczności na końcu listy dotyczą
   jawnie nazwanych odcinków i powierzchni; nie pokazuj auto-boków drugi raz.
3. Elementy tekstowe, suwaki, checkboxy i przyciski pokaż **tylko w Graphics**.
   Odcinki, powierzchnie i punkty pokaż **tylko w 3D** z warunkami z listy.
   Układ GT można odtworzyć poleceniem `SetPerspective("GT")`.
4. Panel Graphics: granice x = 0…23, y = 0…29, osie i siatka wyłączone.
   Dla 3D przyjmij zakres x,y ≈ −14…14, z ≈ −2…18, bez osi i płaszczyzny
   xOy. Wyłącz też płaszczyznę w ustawieniach 3D, jeśli polecenie jej nie ukryje.
   Domyślny widok G1 ma skalę 25 px/jednostkę; można użyć `SetActiveView(-1)`,
   `ZoomIn(0.5)`, `SetActiveView(1)` z domyślnej skali 50.
   Kamerę obracaj i przybliżaj ręcznie, zwłaszcza dla s=2 lub q=0,5.
5. Kolory: b1,b2,aSeg RGB(24,99,190); hSeg (199,49,58);
   sSeg i s2Seg…s4Seg (202,126,15); dSeg (126,67,178).
   Główne odcinki: grubość 6; dodatkowe apotemy: grubość 3, kreskowane.
   base i face1…face4: (143,172,194), wypełnienie 12%.
6. Ustaw Caption: b1 i b2 → B, hSeg → h, aSeg → A = B/2,
   sSeg → S, dSeg → D, s2Seg…s4Seg → S2…S4. Włącz etykiety Caption
   dla tych odcinków i Name dla P1,P2,P3,O,V,M1…M4.
7. Ustaw globalną dokładność wyświetlania **12 miejsc dziesiętnych**.
   Włącz podpisy checkboxów i przycisków. Podpis q: `q = B/h = %v`,
   s: `s — skala = %v`, lesson: `Lekcja 1–3 = %v` (tryb Caption).
   Zablokuj przesuwanie punktów, szczególnie wolnego O=(0,0,0), aby suwak
   pozostał jedyną drogą zmiany geometrii.
8. Właściwości resetButton → Scripting → On Click → **GeoGebra Script**:
   wklej [reset-script.txt](reset-script.txt). Dla piButton wklej
   `SetValue(lesson, 1)`, dla phiButton `SetValue(lesson, 2)`,
   dla sqrtButton `SetValue(lesson, 3)`. Zapisz ustawienia przycisków.
   To skrypty GeoGebra wewnątrz pliku, bez zależności od zewnętrznych listenerów.
9. Sprawdź B=11 i h=7, przełącz każdą lekcję, zmień q i s, wykonaj reset.
   Zapisz lokalny `.ggb`, zamknij konstrukcję, otwórz plik i powtórz kontrolę.
   Listy poleceń nie należy uznawać za gotowy model bez wykonania tych kroków.

## Ćwiczenia do oceny autora

1. Przy 11:7 porównaj wyniki z [raportem](VERIFICATION.md).
2. Zostaw q=11/7, zmień s=0,25 / 1 / 1,5 / 2: długości zmieniają się,
   a proporcje i klasyfikacje pozostają takie same.
3. Zmień q=1 / 2 / 3. Wyniki pi i phi opuszczają tolerancję; sqrt(2) pozostaje.
4. Ustaw q=π/2, s=1. Pi trafia w cel numerycznie; to inny kształt niż 11:7.
5. Ustaw q=2/√φ. Phi trafia w cel numerycznie; nie zmieniaj wzorca φ.
6. Kliknij każdą lekcję i Bryła; w lekcji phi włącz Pozostałe apotemy.
   Oceń czytelność oznaczeń i panelu przy obrocie kamery.
7. Użyj resetu, zapisz i ponownie otwórz plik. Reset ma działać w samym `.ggb`.

## Źródła i autorstwo

- Michał Przybylski — koncepcja projektu i synteza; istniejący silnik
  [engine.ts](../../src/lib/pyramid/engine.ts) i autorskie skoroszyty projektu
  są źródłem doboru proporcji. Implementacja G1 to adaptacja tej listy.
- [Zweryfikowany audyt 13 pozycji](../../docs/matematyka-13-stalych.md),
  [matematyka](../../docs/MATHEMATICS.md), [review](../../docs/REVIEW-13.md),
  [historia i zakres źródeł](../../docs/historia-13-pozycji.md),
  [AUTHORSHIP](../../AUTHORSHIP.md). Nie przenosimy historycznych twierdzeń
  na intencję budowniczych.
- Euklides, **Elementy**, VI definicja 3 oraz I.47; przekład i opracowanie
  **David E. Joyce**, Clark University:
  [złoty podział](https://mathcs.clarku.edu/~djoyce/elements/bookVI/defVI3.html),
  [twierdzenie o trójkącie prostokątnym](https://mathcs.clarku.edu/~djoyce/elements/bookI/propI47.html).
  Wzory z √ i współczesnymi symbolami są naszym algebraicznym zapisem.
- **GeoGebra Team** — silnik GeoGebra Classic/3D oraz oficjalna dokumentacja:
  [Apps API](https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_API/),
  [Slider](https://geogebra.github.io/docs/manual/en/commands/Slider/),
  [SetPerspective](https://geogebra.github.io/docs/manual/en/commands/SetPerspective/),
  [SetVisibleInView](https://geogebra.github.io/docs/manual/en/commands/SetVisibleInView/),
  [RunClickScript](https://geogebra.github.io/docs/manual/en/commands/RunClickScript/),
  [XML](https://geogebra.github.io/docs/reference/en/XML/).
  Dokumentację GeoGebra oraz oba wskazane źródła Euklidesa sprawdzono
  online 2026-10-08; zakres przeglądu opisuje raport weryfikacji.

Nie przypisujemy Michałowi autorstwa stałych matematycznych, Elementów
ani GeoGebra. Materiały nie ustanawiają nowej licencji projektu;
GeoGebra zachowuje własne [warunki licencji](https://www.geogebra.org/license).
Nie dołączono obcych artykułów, prywatnej korespondencji ani silnika GeoGebra.
Plan pełnych 13 pozycji: [EXPANSION-13.md](EXPANSION-13.md).

Kontynuacja: [G2 — dziesięć pozycji i kopie odcinków](g2/README.md).
Plik G1 zachowuje pierwotny zakres trzech lekcji.

Publikacja zlecona 2026-10-08: [model G2 online](https://michaelzp.github.io/great-pyramid-11-7-lab-edu/education/geogebra/g2/)
oraz pobieranie obu plików na osobnej stronie edukacyjnej GitHub Pages.
Nie opublikowano modelu na koncie GeoGebra.
