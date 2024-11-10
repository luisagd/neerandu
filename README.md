<h1>
 Ñe’ẽrandu
</h1>

Ñeerandu.com is an online dictionary for the Guarani language. This GitHub repository contains the source code for the website.
![image](https://github.com/user-attachments/assets/23d7c4d6-b47d-4698-a68f-3b09ebd86c48)

# Dataset

The dictionary in .json format is located at `scripts/diccionario.json`

# Q/A

<h2>Why is half the website static and the other half dynamic?</h2>
My host Cloudflare has a limit of 20,000 files per project. Gatsby generates at least two files for each static page (a .html and a page-data.json file). Because the dictionary has over 10,000 entries, building the whole website statically was not possible. I decided to keep the gn-es static and the es-gn dynamic because when searching online, es-gn results are more likely anyway to become mixed up between Spanish dictionaries such as the one from the RAE.

So, while searching for "[Spanish Word] translation to Guarani" (in Spanish, of course) may yield thousands of results explaining the meaning of [Spanish Word] in Spanish, searching for "[Guarani Word] translation to Spanish" will yield less results simply because [Guarani Word] excludes the Spanish dictionaries.

<h2>Why even try to build the website statically?</h2>
SEO. The likelihood of finding a website (and therefore its usefulness) is determined by the Search Engines. When a website is built dynamically (meaning, the actual website is finished only after the user downloads the page and searches for a query) the search engines have a hard time mapping all pages (here, the different words and meanings). Therefore, building a static .html page for each word guarantees that when someone searches for the meaning of that specific word in Google or Bing, they will find this website rightaway.
<h2>How can I use the Datasets?</h2>
The layout of the dictionary in .json format is as follows:

```json
[
    {"word": "WORD 1", "meaning":[
                                {"type": "TYPE", "translation": "TRANSLATION 1"},
                                {"type": "TYPE", "translation": "TRANSLATION 2"},
                                ...
                                ]
    },
    {"word": "WORD 2", "meaning":[
                                {"type": "TYPE", "translation": "TRANSLATION 1"},
                                {"type": "TYPE", "translation": "TRANSLATION 2"},
                                ...
                                ]
    },
    ...
]
```
