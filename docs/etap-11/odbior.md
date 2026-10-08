# Odbiór etapu 11

„Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych”.
Koncepcja: Michał Przybylski — prylski.dev, https://github.com/MichaelZP/.
To inspiracja Naviera–Stokesa, bez symulacji równań i dowodu fizycznej funkcji.
Położenie i oba zwroty zaakceptowano 2026-10-06; wygląd efektów do oceny.

Otwórz http://127.0.0.1:8088/etap-11/podglad.html. Jeśli serwer nie działa,
z katalogu android-offline uruchom:

```powershell
python -m http.server 8088 --bind 127.0.0.1 --directory docs
```

1. **Edukacyjny:** wybierz ten tryb, „Pokaż obiegi · 100%”, obejrzyj z boku
   i z góry. Sprawdź T1 θ+/ψ+, T2 θ−/ψ−, numer, okrąg/kwadrat i styl linii.
   Zachowaj deformację 0. Wybierz T1/T2/oba, wyłącz i przywróć warstwy.
   Naciśnij Odtwórz, Pauza, Reset; sprawdź wcześniejsze presety i A/B.
2. **Filmowy:** wybierz ten tryb, pełne obiegi i Odtwórz. Cząstki, smugi
   i delikatna poświata powinny pozwalać rozpoznać oba wiry i piramidę.
   Zmieniaj rozstaw 2–8, gęstość, długość smug, deformację 0–1 i poświatę.
   W trakcie zmiany naciśnij Pauza: także stan pośredni ma się zatrzymać.
3. W perspektywie włącz kamerę filmową. Pauza zatrzymuje kamerę.
   Przeciągnij scenę lub użyj strzałki/kółka/+−: automat musi się wyłączyć.
   Sam wybór trybu go nie włącza; świadomie zaznacz pole i odtwarzanie.
   Sprawdź „Reset kamery” i zwykły Reset. Ograniczony ruch blokuje automat.
4. Wybierz jakość niską/średnią/wysoką. Sprawdź limit/liczbę cząstek i panel
   pomiarów. „Zmierz 30 nieruchomych klatek” zatrzymuje pokaz i mierzy CPU
   rysowania; nie jest pomiarem FPS. Przy wolnym sprzęcie jakość może sama
   spaść. Wyłącz „Cząstki i smugi” oraz kamerę: regularny prototyp nadal działa.

**Fizyczny telefon — odbiór pozostaje otwarty.** Podłącz go przez USB z
aktywnym debugowaniem, sprawdź `adb devices -l`, następnie
`adb reverse tcp:8088 tcp:8088` i otwórz ten sam adres w jego przeglądarce.
Nie wymaga to pakowania/instalacji aplikacji. Po teście usuń przekierowanie
przez `adb reverse --remove tcp:8088`.

Na telefonie sprawdź pion/poziom, suwaki, poziomy drag kamery, pionowe
przewijanie, schowanie przeglądarki i powrót bez automatycznego nadrobienia.
Odtwarzaj oba tryby po co najmniej 5 minut; zapisz model urządzenia,
przeglądarkę, DPR, jakość efektywną, ustawienia, realny pomiar FPS/frame-time
narzędziami przeglądarki i kolejne pomiary pamięci. Panel CPU sam nie wystarcza
jako dowód płynności lub braku wycieku. Jeśli pamięć JS nie jest udostępniona,
panel pokaże null; użyj profilera dostępnego dla przeglądarki telefonu.

Ocena autora: czytelność obiegów i konstrukcji, poświata/smugi oraz spokojny
ruch kamery. A/B, α i q pozostają wcześniejszymi decyzjami. Zapisz PASS/FAIL
osobno dla geometrii, wyglądu, sterowania, płynności i pamięci. Aktualne wyniki
oraz ograniczenia są w ../plan-podwojnego-wiru.md i browser-checks.json.
