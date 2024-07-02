const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { TranslationServiceClient } = require('@google-cloud/translate').v3;

admin.initializeApp();

const projectId = 'digniti-adb20';
const location = 'us-central1';

const translationClient = new TranslationServiceClient();

exports.translateHrEn = functions.firestore
    .document('apps/xemktCwPk8hba9q5pZq3/batch/{batchId}/cards/{cardId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        const { articleSummary, articleTitle, shortTitle } = data;

        // console.log(`New document created: ${context.params.cardId}`);
        // console.log(`Article Summary: ${articleSummary}`);
        // console.log(`Article Title: ${articleTitle}`);
        // console.log(`Short Title: ${shortTitle}`);

        try {
            let translations = {};

            if (articleSummary) {
                // console.log('Translating article summary...');
                const [summaryTranslation] = await translationClient.translateText({
                    parent: `projects/${projectId}/locations/${location}`,
                    contents: [articleSummary],
                    mimeType: 'text/plain',
                    sourceLanguageCode: 'hr',
                    targetLanguageCode: 'en',
                });
                // console.log(`Summary translation: ${summaryTranslation.translations[0].translatedText}`);
                translations.articleSummaryEn = summaryTranslation.translations[0].translatedText;
            }

            if (articleTitle) {
                // console.log('Translating article title...');
                const [titleTranslation] = await translationClient.translateText({
                    parent: `projects/${projectId}/locations/${location}`,
                    contents: [articleTitle],
                    mimeType: 'text/plain',
                    sourceLanguageCode: 'hr',
                    targetLanguageCode: 'en',
                });
                // console.log(`Title translation: ${titleTranslation.translations[0].translatedText}`);
                translations.articleTitleEn = titleTranslation.translations[0].translatedText;
            }

            if (shortTitle) {
                // console.log('Translating short title...');
                const [shortTitleTranslation] = await translationClient.translateText({
                    parent: `projects/${projectId}/locations/${location}`,
                    contents: [shortTitle],
                    mimeType: 'text/plain',
                    sourceLanguageCode: 'hr',
                    targetLanguageCode: 'en',
                });
                // console.log(`Short title translation: ${shortTitleTranslation.translations[0].translatedText}`);
                translations.shortTitleEn = shortTitleTranslation.translations[0].translatedText;
            }

            // console.log('Updating document with translations...');
            await snap.ref.update(translations);

            // console.log('Translation and update successful');
        } catch (error) {
            console.error('Error translating text:', error);
        }
    });