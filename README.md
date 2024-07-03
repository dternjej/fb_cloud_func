# README translateHrEn

FB FUNKCIJA ZA PREVOĐENJE TEKSTA SA HR NA EN
IME FUNKCIJE: translateHrEn

Funkcija koristi 'Google Cloud Translation API'
Funkcija je enable-irana u Google Cloudu

Funkcija se automatski pokreće insertiranjem novog dokumenta u putanji:
'apps/xemktCwPk8hba9q5pZq3/batch/{batchId}/cards/{cardId}'

gdje je:
    - xemktCwPk8hba9q5pZq3 - ID NewsScraper App
    - {batchId} - auto-generated ID batch (pokrenute scrap batch obrade)
    - {cardId} - auto-generated ID news article

Funkcija prevodi tekst insertiran u atribute:
    - articleSummary
    - articleTitle
    - shortTitle

U skripti je specificirana lokacija 'us-central1'. To je zato što je 'Google Cloud Translation API' dostupan samo na lokacijama 'global' i 'us-central1'
const location = 'us-central1';

INSTALACIJA

mkdir ime_projekta
cd ime_projekta
firebase login
firebase init
    - Functions: Configure a Cloud Functions directory and its files
    - Use an existing project
    - digniti-adb20 (digniti)
    - JavaScript
    - Use ESLint? - No
    - Do you want to install dependencies with npm now? - Yes

cd ime_projekta/functions
npm install firebase-admin@latest firebase-functions@latest @google-cloud/translate

Provjeriti package.json
    "dependencies": {
        "@google-cloud/translate": "^8.3.0",
        "firebase-admin": "^12.2.0",
        "firebase-functions": "^5.0.1"
    },

/Users/dternjej/development/digniti_fb_func$ firebase deploy --only functions

Provjerimo jeli funkcija instalirana u Fb-u
https://console.firebase.google.com/project/digniti-adb20/functions

Pokrenemo Scrap batch obradu i provjerimo logove:
firebase functions:log


