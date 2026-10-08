# ETAP G2 — dziesięć proporcji i kopie odcinków

Dalszy etap planu [G1](../README.md), 2026-10-08. Osobny model do oceny
autora; gotowy plik G1 pozostaje zachowany. G2 dodaje pozycje #2–4 oraz #6–9.
Wykonane są pierwsze dziesięć pozycji rzeczywistego inwentarza aplikacji.
Pozycje kątowe #11–12 i osobny owal #13 pozostają planem.

**Koncepcja projektu: Michał Przybylski — prylski.dev**.  
GitHub: https://github.com/MichaelZP/

## Otwieranie i obsługa

Widok publiczny: [otwórz G2 online](https://michaelzp.github.io/great-pyramid-11-7-lab-edu/education/geogebra/g2/).
Otwiera zapisany model automatycznie. W eksporcie strony techniczny warsztat
jest zachowany pod `workbench.html`; lokalnie nadal pod `index.html`.
Publikację na istniejącej stronie edukacyjnej zlecił autor 2026-10-08.

Plik: [piramida-11-7-G2.ggb](piramida-11-7-G2.ggb).
Zakres uruchomienia i porównania: [VERIFICATION.md](VERIFICATION.md).
Użyj GeoGebra Classic z widokiem 3D i Graphics 2. W pliku są wszystkie
obiekty i natywne skrypty; warsztat JavaScript służy budowie i kontroli.

Lokalny warsztat: http://127.0.0.1:8093/g2/index.html.
Uruchamiaj wspólny serwer z katalogu aplikacji:

```powershell
Set-Location 'C:\Users\user\Documents\ChatGPT\Piramida\android-offline'
$g2Node = 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $g2Node education/geogebra/g2/prepare.mjs
& $g2Node education/geogebra/server.mjs
```

Generator wymaga Node >=22.18, tutaj użyto 24.19.0. Serwer słucha wyłącznie
na 127.0.0.1. Zapisuje trzy nazwane artefakty G1 i trzy nazwane artefakty G2
z tej samej lokalnej strony. Warsztat wymaga internetu do załadowania
oficjalnego silnika GeoGebra, nie wysyła pliku na konto GeoGebra.

Kliknij **Zbuduj G2** albo **Otwórz zapisany G2**. Suwaki w konstrukcji:
q=0,5…4, krok 0,001; s=0,25…2, krok 0,05; pozycja=1…10, krok 1.
Początek i reset: q=11/7, s=1, pozycja **#2 γ**, widok piramidy.
B=11s, h=11s/q. Skala s zmienia całą bryłę, bez zmiany proporcji.

**Poprzednia/Następna** zmieniają jedną aktywną pozycję; zatrzymują się
na #1 i #10. Przyciski π, φ i √2 prowadzą bezpośrednio do #1, #10 i #5.
**Bryła** ukrywa ściany i kontekstowe krawędzie; odcinki użyte w wybranym
wzorze pozostają. Dodatkowe apotemy pojawiają się tylko dla #10.

**3D** pokazuje źródłowe odcinki na piramidzie (`GT`). **Kopie** pokazuje
osobny płaski widok porównania (`GD`). Panel wzoru, wyniku, celu, błędu
procentowego i tolerancji 0,1% pozostaje po lewej w obu układach.
Duże lub wysokie bryły wymagają ręcznego oddalenia kamery 3D.

## Co oznaczają kopie

Licznik i mianownik to dwa oddzielne poziome łańcuchy. Każdy składnik
ma podpis źródła, np. `h/s`, `D/s`, `D/s`, oraz odpowiadający mu kolor.
W **obu** łańcuchach zastosowano jeden współczynnik **1/s**. Ich długości
są długościami źródłowymi podzielonymi przez s, a nie nowymi naturalnymi
odcinkami bryły. Normalizacja zapewnia stały rozmiar rysunku przy zmianie s.

Wyniki „Licznik” i „Mianownik” są ponownie pomnożone przez s i podane
w jednostkach bryły. Iloraz długości kopii jest niezależnie mierzony z
odległości końców całych łańcuchów. Jest równy ilorazowi źródłowych długości,
ponieważ wspólny czynnik 1/s skraca się. Nie normalizujemy obu łańcuchów
oddzielnie i nie wymuszamy ich równej długości.

Kolory źródeł: B/A niebieski, h czerwony, D fioletowy, S złoty, E zielony.
Kopie położone obok siebie mają wspólny punkt końca/początku; nie dolicza
się do sumy odstępu graficznego. Składniki zerowe są ukrywane.
Odcinki źródłowe i kopie są konstrukcjami GeoGebra; JavaScript nie zastępuje
obliczeń geometrii ani bieżących wyników.

| # / ID | Łańcuch licznika / mianownika | Cel | Ograniczenie |
|---|---|---|---|
| 1 pi | B+B / h | π | przybliżenie; połowa obwodu |
| 2 gamma | B+B / h+D+D | 0,5772156649015329 | porównanie, nie definicja γ |
| 3 sqrt3 | h+D+D / B+B | √3 | odwrotność wyniku #2; cele nie są odwrotne |
| 4 sqrt6 | h+D+D / D | √6 | √2 razy wynik #3 |
| 5 sqrt2 | D / B | √2 | dokładna tożsamość kwadratu |
| 6 sqrt5 | S+B / S | √5 | 1+2/Rφ |
| 7 tribonacci | A+D+D / S+B | 1,8392867552141612 | funkcja S/A; cel T³−T²−T−1=0 |
| 8 brun | E / A | 1,902160583104 | przyjęte oszacowanie B₂; ścisły błąd celu nieustalony |
| 9 invPhi | S / S+A | 1/φ | Rφ/(Rφ+1), ogólnie nie 1/Rφ |
| 10 phi | S / A | (1+√5)/2 | przybliżenie dla 11:7 |

W każdym wierszu ukośnik oddziela **całe sumy** licznika i mianownika.
Wzory w modelu zawierają nawiasy. ε=|R−c|/|c|; próg ε≤0,001.
Wyświetlane procenty i liczby są zaokrąglone, klasyfikacja nie jest.
Dziesięć pozycji nie oznacza dziesięciu niezależnych odkryć ani dowodu
historycznej intencji lub funkcji fizycznej.

## Odtworzenie ręczne

1. Pusta GeoGebra Classic, język poleceń English. Wykonaj kolejno linie
   [commands.txt](commands.txt). Źródło: [construction.mjs](construction.mjs),
   które korzysta z geometrii G1 i jawnie dodaje siedem proporcji.
2. Zastosuj podstawowe ustawienia G1 z [instrukcji](../README.md#pełne-odtworzenie-ręczne):
   ukryte obiekty pomocnicze, auto-boki wielokątów, zablokowane punkty,
   panel 2D 0…23 × 0…29, osie i płaszczyzna xOy wyłączone,
   przezroczyste ściany, kolory i podpisy odcinków, dokładność 12 miejsc.
   W G2 suwak `lesson` ma zakres 1…10, początek 2, podpis `Pozycja #1–10 = %v`.
3. Piramida i źródłowe odcinki: tylko Graphics 3D. `eSeg` tylko przy lesson=8,
   kolor (41,128,86), podpis E, grubość 6. `edge1` jest wtedy ukryta,
   aby nie dublować krawędzi. Warunki pozostałych odcinków są na końcu listy.
4. `nCopy1…nCopy3`, `dCopy1…dCopy3`, ich teksty `nLabel…`/`dLabel…` oraz
   `copyTitle`, `copyNumeratorText`, `copyDenominatorText`, `copyResultText`,
   `copyNote` pokaż **tylko w Graphics 2**; punkty `CopyN…`/`CopyD…` ukryj.
   Każdy składnik i podpis widoczny tylko dla odpowiadającego `nLen…>0` lub
   `dLen…>0`. Widok Graphics 2: x=−3…59, y=−18…20, bez osi i siatki.
   Wszystkie łańcuchy mieszczą się w tym zakresie dla q=0,5…4.
   Pomocnicze teksty `nName1…3` i `dName1…3` ukryj we wszystkich widokach,
   z warunkiem widoczności `false`; ich wartości nadal zasilają podpisy kopii.
5. Kolory kopii ustaw według źródeł w tabeli, grubość 7. W automatycznej
   konstrukcji są dynamiczne i zależą od aktywnego źródła; pełne wyrażenia
   `SetDynamicColor` są w konfiguratorze. Nie pokazuj tych kopii w panelu
   sterowania ani w 3D. Pozostałe teksty i kontrolki: tylko Graphics.
6. Skrypty **GeoGebra / On Click**, bez zewnętrznych listenerów:
   resetButton → [reset-script.txt](reset-script.txt);
   piButton → `SetValue(lesson,1)`; phiButton → `SetValue(lesson,10)`;
   sqrtButton → `SetValue(lesson,5)`;
   previousButton → `SetValue(lesson,Max(1,lesson-1))`;
   nextButton → `SetValue(lesson,Min(10,lesson+1))`;
   view3dButton → `SetPerspective("GT")`;
   viewCopiesButton → `SetPerspective("GD")`.
7. Przyciski dodatkowego rzędu mają pozycje ekranowe x=25,130,235,300,
   y=380; włącz ich podpisy. Sprawdź wszystkie dziesięć pozycji w obu widokach,
   reset, zmianę q/s i odczyt lokalnego `.ggb` po zamknięciu konstrukcji.

Instrukcja ręczna jest drogą odtworzenia, nie dowodem jej osobnego wykonania.
Automatyczny warsztat wykonuje zarówno polecenia, jak i dodatkowe ustawienia.

## Źródła i następny etap

Dobór proporcji: Michał Przybylski, obecny
[engine.ts](../../../src/lib/pyramid/engine.ts),
[audyt wszystkich 13](../../../docs/matematyka-13-stalych.md),
[historia i rejestr źródeł](../../../docs/historia-13-pozycji.md).
Stałe mają własną historię: Euler/Mascheroni dla γ, Euklides dla klasycznej
geometrii, M. Feinberg i OEIS A058265 dla T, Viggo Brun / Thomas R. Nicely
i OEIS A065421 dla przyjętego B₂. Te źródła nie ustanawiają matematycznego
związku definicji γ, T lub B₂ z odcinkami piramidy.

GeoGebra Team: silnik i [Apps API](https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_API/),
[układy widoków](https://geogebra.github.io/docs/manual/en/commands/SetPerspective/).
Przejrzano dokumentację układów online 2026-10-08: `G` to Graphics,
`D` Graphics 2, `T` Graphics 3D. Pozostałe cytowania i warunki licencji
pozostają zgodne z [G1](../README.md#źródła-i-autorstwo).

Następny zakres z [planu 13 pozycji](../EXPANSION-13.md): #11–12 kąty,
następnie osobny owal #13. Nie zastępuj owalu elipsą i nie zmieniaj jego
parametru Z₀ jednostronnie przy skalowaniu. Nie publikowano G2 na koncie
GeoGebra. Przy budowie G2 nie wykonano wdrożenia; późniejszą publikację
na stronie edukacyjnej opisuje [status](../../../docs/STATUS.md).
