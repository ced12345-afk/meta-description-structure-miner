# Meta Description Helpers for Google Sheets

Fonctions Apps Script pour varier des introductions de meta descriptions et générer une proposition de snippet depuis une URL.

## Cas d’usage

- varier une introduction trop répétitive ;
- produire une première proposition depuis une URL ;
- préparer des variantes sans dupliquer les textes ;
- relire le résultat au regard de l’intention et de la promesse de la page.

## Documentation

[Analyser les structures de meta descriptions](https://www.consultant-geo.paris/outil-meta-descriptions).

## Installation

Ajoutez `src/Code.gs` à un projet Apps Script lié au tableur. `MODIFY_META_DESCRIPTION` varie une introduction existante. `SheetGPT` nécessite `OPENAI_API_KEY` dans les propriétés du script et utilise `OPENAI_MODEL` si cette propriété est définie.

## Licence

MIT.
