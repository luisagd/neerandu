import json
import unicodedata
from alive_progress import alive_bar

# Define the input and output file paths
input_file = "input.txt"
output_file_gn = "diccionario_gn.json"
output_file_es = "diccionario_es.json"
corpus_file = 'corpus.json'
wordlist_es_file = 'wordlist_es.json'
wordlist_gn_file = 'wordlist_gn.json'

# Initialize an empty list to store word definitions
word_definitions = []
dictionary = {}

# Reading each line
with open(input_file, "r", encoding="utf-8") as file:
    for line in file:
        # Split each line into word and definition
        parts = line.strip().split(".", 1)
        
        # Ensure the line has at least two parts for now (word and definition)
        if len(parts) == 2:
            word = parts[0]
            definition = parts[1]
            # Create a dictionary for the word and definition
            word_definition = {"word": word, "definition": definition}
            # Append the word definition to the list
            word_definitions.append(word_definition)

def getmeaning(definition:str):
    result = []
    x = 2
    number = str(x)+"."
    while definition.find(number) >0:
        found = definition.find(number)
        result.append(unicodedata.normalize("NFC",definition[:found].replace(number, "").strip()))
        definition=definition[found+2:]
        x+=1
        number = str(x)+"."
    # for i in result:
    result.append(unicodedata.normalize("NFC",definition.replace(str(x-1)+".", "").strip())) 
    return gettype(result)
def gettype(meaning:[str]):
    result = []
    for translation in meaning:
        if translation.lower().find("pron. ") >=0:
            wordtype="pronombre"
            wordtranslation	= translation[translation.lower().find("pron. ")+5:].strip()
        elif translation.lower().find("pref. ") >=0:
            wordtype="prefijo"
            wordtranslation	= translation[translation.lower().find("pref. ")+5:].strip()
        elif translation.lower().find("interj. ") >=0:
            wordtype="interjecion"
            wordtranslation	= translation[translation.lower().find("interj. ")+7:].strip()
        elif translation.lower().find("adj. pos.")>=0:
            wordtype="adjetivo posesivo"
            wordtranslation	= translation[translation.lower().find("adj. pos.")+9:].strip()
        elif translation.lower().find("adj.")>=0:
            wordtype="adjetivo"
            wordtranslation	= translation[translation.lower().find("adj.")+4:].strip()
        elif translation.lower().find("adv.")>=0:
            wordtype="adverbio"
            wordtranslation	= translation[translation.lower().find("adv.")+4:].strip()
        elif translation.lower().find("v. ")>=0:
            wordtype="verbo"
            wordtranslation	= translation[translation.lower().find("v. ")+2:].strip()
        elif translation.lower().find("conj. ")>=0:
            wordtype="conjuncion"
            wordtranslation	= translation[translation.lower().find("conj. ")+5:].strip()
        elif translation.lower().find("exp. ")>=0:
            wordtype="expresion"
            wordtranslation	= translation[translation.lower().find("exp. ")+4:].strip()      
        elif translation.lower().find("p. ")>=0:
            wordtype="posposicion"
            wordtranslation	= translation[translation.lower().find("p. ")+2:].strip()
        elif translation.lower().find(" s. ")>=0:
            wordtype="sustantivo"
            wordtranslation	= translation[translation.lower().find(" s. ")+3:].strip()
        elif translation.lower().find("s.") == 0:
            wordtype="sustantivo"
            wordtranslation	= translation[2:].strip()
        else:
            wordtype="sustantivo"
            wordtranslation	= translation.strip()                    
        result.append({"type":wordtype, "translation":wordtranslation})
    return result

corpus= []
with open(corpus_file, "r", encoding="utf8") as file:
    corpus = json.load(file)

def word_in_sentence(word, sentence):
    # Split the string into words
    words = sentence.lower().split()
    # Check if the word is in the list of words
    return word.lower() in words    

def getexample(word, lang, n :int):
    examples = []
    for pair in corpus:
        if lang == 'gn':
            if word_in_sentence(word, pair[0]):
                examples.append(pair)
        elif lang == 'es':
            if word_in_sentence(word, pair[1]):
                examples.append(pair)
        else:
            raise
    examples.sort(key=lambda x: len(x[0]))            
    return examples[0:n-1]

data_gn = []
data_es = []
lang='gn'
with alive_bar(len(word_definitions)) as bar:  # your expected total
    for word in word_definitions:
        x = {"word": unicodedata.normalize("NFC", word["word"]) , "meaning":getmeaning(word["definition"]), "example":getexample(word["word"], lang, 5)}
        if lang=='gn':
            data_gn.append(x)
        elif lang == 'es':
            data_es.append(x)
        if word["word"] == 'yvyvovo':
            lang = 'es'
        bar()

with open(output_file_gn, "w", encoding="utf8") as output:
    json.dump(data_gn, fp=output, ensure_ascii=False)
with open(output_file_es, "w", encoding="utf8") as output:
    json.dump(data_es, fp=output, ensure_ascii=False)

print(f"Dictionary saved at {output_file_gn} and {output_file_es}")

wordlist_gn = []
for word in data_gn:
    wordlist_gn.append(word["word"])
wordlist_es = []
for word in data_es:
    wordlist_es.append(word["word"])

with open(wordlist_es_file, "w", encoding="utf8") as output:
    json.dump(wordlist_es, fp=output, ensure_ascii=False)
with open(wordlist_gn_file, "w", encoding="utf8") as output:
    json.dump(wordlist_gn, fp=output, ensure_ascii=False)
print(f"Wordlist dumped at {wordlist_es_file} and {wordlist_gn_file}")