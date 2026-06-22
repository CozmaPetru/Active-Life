##  Active Life — Site Web Centru Fitness

##  Descriere
Active Life este un site web complet și responsive pentru un centru fitness fictiv, dezvoltat ca proiect pentru practica tehnologică. Site-ul prezintă programele de antrenament, antrenorii, orarul săptămânal, pachetele de abonament și un calculator BMI interactiv.


## Demo online
(https://cozmapetru.github.io/Active-Life/)


## Tehnologii utilizate
<pre>
| Categorie         | Tehnologie |

| Marcare           | HTML5 (structură semantică) |
| Stilizare         | CSS3 (Flexbox, Grid, animații, media queries) |
| Framework CSS     | Tailwind CSS |
| Programare client | JavaScript (Vanilla JS, manipulare DOM) |
| Design            | Figma |
| Editor            | Visual Studio Code |
| Versionare        | Git + GitHub |
| Hosting           | GitHub Pages|
| Fonturi           | Google Fonts (Bebas Neue / Roboto) |
| Iconițe           | Font Awesome 6 |
</pre>

## Structura proiectului
<pre>
ACTIVE LIFE/
│
├── index.html              # Home page pagina Acasa
├── programs.html           # Programs page pagina Programe
├── trainers.html           # Trainers page pagina Antrenori
├── schedule.html           # Schedule page pagina Orar
├── memberships.html        # Memberships page pagina Abonamente
├── contact.html            # Contact page pagina Contact
├── README.md
├── package.json
├── package-lock.json
│
├── src/
│   ├── input.css
│   └── output.css
│
├── js/
│   ├── main.js             # funcționalități comune
│   ├── validation.js       # validare formular contact
│   ├── calculator.js       # calculator BMI
│   ├── programs.js         # filtrare programe
│   └── schedule.js         # filtrare orar
│
└── img/
    ├── hero/               # imagini secțiunea Hero
    ├── programs/           # imagini Programe
    ├── trainers/           # imagini Antrenori
    ├── gallery/            # galerie de imagini
    └── transformations/    # imagini Înainte/După

</pre>
## Paginile site-ului
| Pagină        | Fișier             | Conținut principal |
|---            |---                 |---|
| Acasă         | `index.html`       | Hero, programe populare, avantaje, transformări, contoare animate |
| Programe      | `programs.html`    | Grid programe cu filtrare și accordion detalii |
| Antrenori     | `trainers.html`    | Carduri antrenori cu filtrare pe specializare |
| Orar          | `schedule.html`    | Tabel orar cu tabs interactive pe zile |
| Abonamente    | `memberships.html` | Pachete comparative, calculator BMI, slider before/after |
| Contact       | `contact.html`     | Formular validat, hartă interactivă, informații contact |


## Funcționalități JavaScript
1.Validare formular de contact (câmpuri obligatorii, regex email)
2.Meniu responsive (hamburger toggle, închidere la click în exterior)
3.Slider before/after transformări membri
4.Smooth scroll pentru navigare internă
5.Buton Back to Top (vizibil la scroll > 300px)
6.Filtrare programe pe tip (cardio, forță, flexibilitate, grup)
7.Tabs orar interactiv pe zile ale săptămânii
8.Calculator BMI interactiv
9.Counter animat (numere care cresc la scroll-in-view)
10.Accordion cu detalii pentru fiecare program


## Design
- **Culoare principală:** `#E53935` (roșu energic)
- **Culoare accent:** `#212121` (negru)
- **Nuanțe neutre:** gri deschis / gri mediu
- **Fonturi:** Bebas Neue (titluri) + Roboto (corp text)
- **Breakpoint-uri responsive:** mobil `<768px` · tabletă `768–1199px` · desktop `≥1200px`



## Performanță și optimizare
- Imagini comprimate cu TinyPNG / Squoosh (max 200 KB/imagine)
- Fișiere JavaScript încărcate cu atribut `defer`
- CSS fără reguli duplicate
- Testat cu **Google PageSpeed Insights** (scor minim 70 pe mobil)
- Validat cu **W3C Markup Validator**

## SEO on-page
- Tag `<title>` unic și descriptiv pe fiecare pagină (max 60 caractere)
- Meta `description` unic pe fiecare pagină (max 160 caractere)
- Structură heading-uri ierarhică (`h1` → `h2` → `h3`)
- Atribut `alt` descriptiv pe toate imaginile
- URL-uri descriptive și linkuri interne relevante


## Testare
Site-ul a fost testat pe:
- **Rezoluții:** 375px · 768px · 1440px
- **Browsere:** Chrome · Firefox · Edge · Safari (mobile)
- **Dispozitive:** desktop · tabletă · telefon mobil


## Bibliografie
- [Documentație Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs — HTML, CSS, JavaScript](https://developer.mozilla.org/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome 6](https://fontawesome.com/)
- [W3C Markup Validator](https://validator.w3.org/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [TinyPNG — comprimare imagini](https://tinypng.com/)
- [FormSpree — gestionare formular](https://formspree.io/)


##  Autor
Nume Prenume: Cozma Petru AAW 2331,  
IP Colegiul „Iulia Hasdeu" din Cahul, 
Conducător: Bodlev Veaceslav,  
Cahul, 2026