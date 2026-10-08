# ETAP G1 — wykonanie i granice weryfikacji

Data: 2026-10-08. Materiały lokalne do oceny autora.
Koncepcja projektu: Michał Przybylski — prylski.dev.  
GitHub: https://github.com/MichaelZP/

## Rezultat i dostępne drogi wykonania

Powstał rzeczywisty plik [piramida-11-7-G1.ggb](piramida-11-7-G1.ggb),
wyeksportowany przez oficjalny silnik **GeoGebra Classic 5.4.920.0**
działający w przeglądarce, z panelem Graphics i widokiem 3D (`GT`).
Po przeładowaniu strony do nowej instancji silnika wczytano **plik z dysku**
przyciskiem „Otwórz zapisany model G1” i ponowiono sprawdzenia.
Ponadto sama kontrola wykonuje eksport i ponowne wczytanie przez API.
Nie jest to ręcznie spreparowane archiwum ani sama lista poleceń.

Sprawdzono dokumentację API GeoGebra dotyczącą tworzenia obiektów,
widoczności 3D, suwaków, skryptów przycisków oraz eksportu/importu Base64.
Wybrano oficjalny osadzony Classic, ponieważ pozwala umieścić suwaki,
teksty i przyciski w osobnym panelu obok konstrukcji 3D. Plik ma natywne
skrypty GeoGebra; reset i wybór lekcji nie wymagają warsztatu JavaScript.
Źródła i ich autorzy: [README.md](README.md#źródła-i-autorstwo).

Załączono również uporządkowane [commands.txt](commands.txt),
[ustawienia i instrukcję odtworzenia](README.md#pełne-odtworzenie-ręczne),
[reset-script.txt](reset-script.txt), źródło konstrukcji i lokalny warsztat.
Warsztat wymaga sieci do załadowania silnika GeoGebra; nie jest rozwiązaniem
offline. Nie publikowano na koncie GeoGebra ani na stronie projektu.

## Porównanie z obecną aplikacją

Wartości odniesienia wygenerował [prepare.mjs](prepare.mjs), importując
**rzeczywisty** `geoFromBH` i `evaluateRelations` z
[engine.ts](../../src/lib/pyramid/engine.ts), a nie kopię wzorów.
Wybrano rzeczywiste pozycje #1 `pi`, #10 `phi`, #5 `sqrt2`.
Generator wykonano przy Node 24.19.0; audyt pakietu przy Python 3.12.

- Repozytorium w chwili wykonania: HEAD `1ae5f97299ae20d1f04bf96516c7ded691af2f21`.
- SHA-256 silnika: `72496508b2d8c4911915ef44c77224ebd3cf79a055e887cf62388071dca2e7de`.
- 8 kształtów q: `11/7`, `1`, `2`, `3`, `π/2`, `2/√φ`, `0,5`, `4`.
- Każdy kształt w 4 skalach: `0,25`, `1`, `1,5`, `2`; razem **32 konfiguracje**.
- **936/936 sprawdzeń PASS**, w tym 480 porównań liczbowych długości,
  trzech proporcji, trzech błędów i trzech klasyfikacji.
- Dopuszczona różnica numeryczna: `2e-12 × max(1, |wartość aplikacji|)`.
  Największa zaobserwowana różnica bezwzględna: **7,105427357601002e−15**.
  To granica porównania implementacji, oddzielna od tolerancji edukacyjnej 0,1%.

Pełne dane: [engine-cases.json](engine-cases.json) oraz
[geogebra-checks.json](geogebra-checks.json). Wynik JSON zawiera każdą
asercję, wartości rzeczywiste i oczekiwane oraz różnicę. Niezaokrąglone
wyniki decydują o `ε ≤ 0,001`.

Wartości **aplikacji** przy s=1, poniżej zaokrąglone wyłącznie do prezentacji.
Model GeoGebra spełnił powyższe porównania dla każdego wiersza i wszystkich skal.

| q | Rπ | Rφ | R√2 | επ w % | εφ w % | π / φ / √2 w 0,1% |
|---|---:|---:|---:|---:|---:|---|
| 11/7 | 3,142857142857 | 1,618590346797 | 1,414213562373 | 0,040249943 | 0,034384818 | TAK / TAK / TAK |
| 1 | 2 | 2,236067977500 | 1,414213562373 | 36,338022763 | 38,196601125 | NIE / NIE / TAK |
| 2 | 4 | 1,414213562373 | 1,414213562373 | 27,323954474 | 12,596795110 | NIE / NIE / TAK |
| 3 | 6 | 1,201850425155 | 1,414213562373 | 90,985931710 | 25,721558786 | NIE / NIE / TAK |
| π/2 | 3,141592653590 | 1,618993186606 | 1,414213562373 | 0 | 0,059281688 | TAK / TAK / TAK |
| 2/√φ | 3,144605511030 | 1,618033988750 | 1,414213562373 | 0,095902231 | ≈0 | TAK / TAK / TAK |
| 0,5 | 1 | 4,123105625618 | 1,414213562373 | 68,169011382 | 154,821941584 | NIE / NIE / TAK |
| 4 | 8 | 1,118033988750 | 1,414213562373 | 154,647908947 | 30,901699437 | NIE / NIE / TAK |

Przy 11:7 zapisany GeoGebra zwraca Rφ=1,6185903467968052,
aplikacja 1,6185903467968048 — różnica około 4,44e−16.
R√2 w GeoGebra jest 1,414213562373095, a w aplikacji
1,4142135623730951. Śladowy błąd 1,57e−16 to arytmetyka zmiennoprzecinkowa;
matematycznie przekątna kwadratu / bok to dokładnie √2.

Zgodność kilku celów w progu 0,1% nie wyróżnia jedynego q.
π i φ są porównaniami przybliżonymi dla 11:7; √2 jest tożsamością każdego
kwadratu. Nie są to trzy niezależne potwierdzenia historycznej hipotezy.

## Konstrukcja, interfejs i odtworzenie

Kontrola silnika obejmuje niezależność suwaków q/s, definicje odcinków,
kwadrat podstawy, wysokość V, równość czterech apotem, warunki widoczności
lekcji, ukrycie geometrii w panelu 2D, dodatkowe apotemy wyłącznie w φ,
przełącznik bryły, trzy przyciski lekcji oraz reset przed i po eksporcie.

Oględziny w przeglądarce: panel π, φ i √2 z bieżącymi wynikami;
przełączenie na √2 ukrywa apotemy, także gdy ich checkbox pozostaje aktywny.
Ręczne przesunięcie q zmienia kształt. Po ponownym otwarciu pliku ręcznie
wyłączono bryłę, pozostawiając odcinki proporcji. Ręczne przesunięcie samego
s z 1 do 1,45 przy q=11/7 zmieniło B z 11 do 15,95 i h z 7 do 10,15,
a Rπ i jego błąd pozostały takie same. Natywny przycisk resetu przywrócił
B=11, h=7, lekcję π i widoczność bryły. [model.png](model.png) dokumentuje
stan początkowy. Przy dużych rozmiarach trzeba oddalić kamerę.

Dodatkowa kontrola **zapisanego pakietu**:

```powershell
python education/geogebra/verify-artifacts.py
```

Sprawdza CRC archiwum ZIP, XML, niezależność i zakresy suwaków, początkowe
wartości względem raportu, cztery zapisane skrypty, podpis autora i GitHub,
warunki widoczności, ukrycie płaszczyzny xOy, integralność danych silnika,
kompletność raportu oraz niezmienność proporcji między skalami. Wynik PASS.
Ta kontrola strukturalna nie zastępuje uruchomienia GeoGebra.

## Elementy nieweryfikowane i pozostały zakres

- Nie uruchomiono pliku w osobno zainstalowanym GeoGebra Classic 6 na komputerze.
  Zapis i odczyt sprawdzono w oficjalnym silniku przeglądarkowym poprzez API.
- Nie zweryfikowano samodzielnego kalkulatora GeoGebra 3D ani jego układu
  kontrolek; zalecany jest Classic z dwoma widokami. Pasek narzędzi może
  ponownie pojawić się po otwarciu pliku, zależnie od ustawień aplikacji.
- Nie sprawdzono telefonu, dotyku, czytnika ekranu, obsługi wyłącznie klawiaturą,
  druku ani pełnego działania offline w natywnej aplikacji GeoGebra.
- Instrukcja ręczna nie została osobno odtworzona przez wpisywanie każdej
  linii w interfejsie; polecenia wykonano przez API, a styl i skrypty dołożono
  przez konfigurator. Ustawienia ręczne są jawnie podane w README.
- Pozostałych dziesięciu pozycji nie zaimplementowano w G1. Cały inwentarz
  przeanalizowano; [EXPANSION-13.md](EXPANSION-13.md) opisuje następne etapy,
  zależności i osobny model `eggLW`, który przy 11:7 nie spełnia 0,1%.
- Akceptacja czytelności i sposobu nauczania przez autora pozostaje otwarta.

Euklides I.47 i VI definicja 3 w opracowaniu Davida E. Joyce’a zostały
przeczytane online. Potwierdzają zakres klasycznego twierdzenia i definicji;
nie dostarczają historycznego dowodu dla proporcji Piramidy 11:7.
W G1 nie wykonano nowej kwerendy historycznej wszystkich 13 pozycji:
wykorzystano zweryfikowane dokumenty projektu i ich jawne ograniczenia.
