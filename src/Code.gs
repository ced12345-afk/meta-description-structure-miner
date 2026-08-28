/**
 * Varie certaines introductions répétitives de meta descriptions.
 * À utiliser sur une copie des données : cette fonction produit un résultat
 * aléatoire à chaque recalcul de Google Sheets.
 *
 * @param {string} metaDescription
 * @return {string}
 * @customfunction
 */
function MODIFY_META_DESCRIPTION(metaDescription) {
  if (typeof metaDescription !== 'string' || metaDescription.trim() === '') return 'Erreur: La méta description est vide ou non définie.';
  var lowerCaseMeta = metaDescription.toLowerCase();
  if (lowerCaseMeta.indexOf('découvrez') !== 0 && lowerCaseMeta.indexOf('explorez') !== 0) return metaDescription;
  var replacements = [
    'Illuminez vos murs avec nos ',
    'Sublimez chaque moment grâce à nos ',
    'Faites de chaque espace un chef-d’œuvre avec ',
    'Donnez vie à vos souvenirs grâce à ',
    'Mettez en valeur vos créations artistiques par '
  ];
  var rest = metaDescription.indexOf(' ') > -1 ? metaDescription.substring(metaDescription.indexOf(' ') + 1) : '';
  return replacements[Math.floor(Math.random() * replacements.length)] + rest;
}

/**
 * Génère une meta description depuis une URL.
 * Configuration requise : OPENAI_API_KEY et OPENAI_MODEL (optionnel) dans
 * Apps Script > Project Settings > Script Properties.
 *
 * @param {string} url
 * @return {string}
 * @customfunction
 */
function SheetGPT(url) {
  if (typeof url !== 'string' || url.trim() === '') return 'Erreur : L’URL est indéfinie ou vide.';

  var apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!apiKey) return 'Erreur : configurez OPENAI_API_KEY dans les propriétés du script.';
  var model = PropertiesService.getScriptProperties().getProperty('OPENAI_MODEL') || 'gpt-4.1-mini';
  var prompt = 'Générez une meta description SEO, en français, de 150 à 160 caractères maximum pour cette URL : ' + url +
    '. Commencez de manière variée et créative, sans formule générique répétée. Répondez avec la meta description uniquement.';

  try {
    var response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + apiKey },
      payload: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are an SEO consultant. Create unique, accurate and useful French meta descriptions.' },
          { role: 'user', content: prompt }
        ]
      }),
      muteHttpExceptions: true
    });
    if (response.getResponseCode() !== 200) return 'Erreur : impossible de générer le contenu.';
    var description = JSON.parse(response.getContentText()).choices[0].message.content.trim();
    return description.length > 160 ? description.substring(0, 160).trim() : description;
  } catch (error) {
    return 'Erreur : ' + String(error);
  }
}
