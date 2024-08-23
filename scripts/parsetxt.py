import json
import unicodedata

# Define the input and output file paths
input_file = "input.txt"
output_file = "diccionario.json"

# Initialize an empty list to store word definitions
word_definitions = []
dictionary = {}

# Read the input file and process each line
with open(input_file, "r", encoding="utf-8") as file:
    for line in file:
        # Split each line into word and definition
        parts = line.strip().split(".", 1)
        
        # Ensure the line has at least two parts (word and definition)
        if len(parts) == 2:
            word = parts[0]
            definition = parts[1]
            # Create a dictionary for the word and definition
            word_definition = {"word": word, "definition": definition}
            # Append the word definition to the list
            word_definitions.append(word_definition)

# Write the list of word definitions to a JSON file
with open(output_file, "w", encoding="utf-8") as json_file:
    json.dump(word_definitions, json_file, ensure_ascii=False, indent=4)


print(f"Conversion completed. JSON file saved as {output_file}")

with open(output_file, "r", encoding="utf8") as file:
    inputjson = json.load(file)

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

data = []
for word in inputjson:
    x = {"word": unicodedata.normalize("NFC", word["word"]) , "meaning":getmeaning(word["definition"])}
    data.append(x)

with open(output_file, "w", encoding="utf8") as output:
    json.dump(data, fp=output, ensure_ascii=False)

print("Second part complete.")

wordlist = []
for word in data:
    wordlist.append(word["word"])

with open("wordlist.json", "w", encoding="utf8") as output:
    json.dump(wordlist, fp=output, ensure_ascii=False)
