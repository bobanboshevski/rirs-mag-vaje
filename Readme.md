# RIRS - Optimizacije cevovodov
---
## 🔍 1. Datadog – Analiza CI/CD cevovodov

### Nastavitve
- Nadzorna plošča (Dashboard)
- Uporabil sem razdelek **Software Delivery → CI Visibility / CI Health**

### Analiza
- Ročno je bil izveden **Re-run all jobs** na *production* veji.
- Datadog je uspešno analiziral **oba pipeline-a**.
- V razdelkih *CI Health* in *Pipeline Executions* je mogoče videti:
  - skupni čas izvajanja posameznega cevovoda,
  - trajanje posameznih job-ov,
  - čase čakanja (waiting time),
  - zaporedje izvajanja korakov.
 
### Ugotovitve
- Nekateri job-i imajo daljši *waiting time*.
- Glavni razlog za to ni tehnična neučinkovitost, temveč:
  - **ročna odobritev za produkcijski deploy**, ki je namensko nastavljena kot varnostni mehanizem.
- Datadog Dashboard jasno prikazuje statistike:
  - za vsak cevovod,
  - za vsako opravilo znotraj cevovoda,
  - ter omogoča hitro identifikacijo potencialnih ozkih grl.

<img width="2062" height="599" alt="Screenshot 2026-01-14 at 20 54 34" src="https://github.com/user-attachments/assets/567d1fd5-b1b4-40b2-92a9-e0c22a9dfbc3" />

<img width="2067" height="576" alt="Screenshot 2026-01-14 at 20 55 37" src="https://github.com/user-attachments/assets/2859850d-6bdd-4697-85a7-14202f704b46" />

<img width="2065" height="1209" alt="Screenshot 2026-01-14 at 20 55 10" src="https://github.com/user-attachments/assets/6a685756-c8a4-40e5-a6b3-e3d2e26206d7" />

<img width="2064" height="1208" alt="Screenshot 2026-01-14 at 20 55 29" src="https://github.com/user-attachments/assets/346d898c-588a-4df2-9564-60cd7e1df591" />

 ---
## 🔐 2. GitHub Code Scanning Alerts

### Nastavitev
- Code Scanning sem že imel omogočen v zavihku **Security** na GitHubu.
- Uporabljen je bil GitHubov privzeti mehanizem za statično analizo kode.

### Rezultati
- **Ni bilo zaznanih nobenih varnostnih opozoril ali ranljivosti**. 

<img width="1331" height="587" alt="Screenshot 2026-01-14 at 21 00 57" src="https://github.com/user-attachments/assets/75d270d4-781a-4cdf-aeff-fb3e4abf781f" />

---

## 🛡️ 3. Snyk – Analiza Docker zabojnikov

### Nastavitev
- GitHub projekt je bil dodan v Snyk.
- Snyk je samodejno zaznal:
  - `Dockerfile` za **backend**
  - `Dockerfile` za **frontend**

<img width="2218" height="904" alt="Screenshot 2026-01-14 at 21 03 50" src="https://github.com/user-attachments/assets/fa73d673-1acf-4367-ae8c-ef203d0c8f55" />

### Ugotovljene ranljivosti (Backend)

Pri backend Dockerfile-u so bile zaznane naslednje ranljivosti, povezane z uporabo **Node.js verzije 20.19.6**:

#### 1. Race Condition (Critical)
- **Opis:** Nepravilna sinhronizacija pri sočasnem dostopu do skupnih virov.
- **CWE:** CWE-362  
- **CVE:** CVE-2025-55131  
- **CVSS:** 9.2 (CRITICAL)
- **Vzrok:** `node@20.19.6`
- **Popravek na voljo v:**  
  `node@20.20.0`, `@22.22.0`, `@24.13.0`, `@25.3.0`

#### 2. Uncaught Exception (High)
- **Opis:** Neobravnavane izjeme lahko povzročijo sesutje aplikacije.
- **CWE:** CWE-248  
- **CVE:** CVE-2025-59465  
- **CVSS:** 8.7 (HIGH)
- **Vzrok:** `node@20.19.6`
- **Popravek:** nadgradnja Node.js

#### 3. UNIX Symbolic Link Following (High)
- **Opis:** Nepravilno ravnanje s simbolnimi povezavami lahko vodi v nepooblaščen dostop.
- **CWE:** CWE-61  
- **CVE:** CVE-2025-55130  
- **CVSS:** 7.7 (HIGH)

---

### Ugotovljene ranljivosti (Frontend)

Pri frontend Dockerfile-u so bile zaznane **enake ranljivosti** kot pri backendu:

- **Race Condition (CWE-362, CVSS 9.2 – Critical)**
- **Uncaught Exception (CWE-248, CVSS 8.7 – High)**
- **UNIX Symlink Following (CWE-61, CVSS 7.7 – High)**

Vse ranljivosti izvirajo iz uporabe iste Node.js verzije (`20.19.6`).

---

### Odprava ranljivosti
- Rešitev za vse zaznane ranljivosti je:
  - **nadgradnja Node.js na popravljeno verzijo** (npr. `20.20.0` ali novejšo).
- S tem se ranljivosti odpravijo na ravni osnovne slike Docker zabojnika.

<img width="1986" height="1247" alt="Screenshot 2026-01-14 at 21 05 50" src="https://github.com/user-attachments/assets/03aba6be-f797-4014-b5f2-bbcd408a1457" />

---
## Povzetek

- Datadog je omogočil jasen vpogled v delovanje CI/CD cevovodov in identifikacijo ozkih grl.
- GitHub Code Scanning ni zaznal varnostnih težav v kodi.
- Snyk je uspešno identificiral kritične in visoke ranljivosti v Docker zabojnikih, povezane z Node.js verzijo.


