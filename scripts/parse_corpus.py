# Define the input and output file paths
import json


input_gn = "gn.txt"
input_es = "es.txt"
output_gn = "gn_sanitized.txt"
output_es = "es_sanitized.txt"
output_file = "output.txt"

def start_digit(input_str:str):
    return input_str.strip()[:1].isdigit()

# Read the input file and process each line
def split_versicle(input_str:str):
    n = ""
    v = ""
    if start_digit(input_str):
        for i in range(6):
            if input_str[i].isdigit():
                n += input_str[i]
            elif input_str[i]=="-" and input_str[i+1].isdigit():
                n += input_str[i]
            else:
                return (n, input_str[len(n):].strip())
    else:
        raise "ONLY VERSICLES THAT START WITH A NUMBER ARE ACCEPTED"

sanitized_gn = []
with open(input_gn, "r", encoding="utf-8") as file:
    for line in file:
        if start_digit(line):
            sanitized_gn.append(split_versicle(line))

sanitized_es = []
with open(input_es, "r", encoding="utf-8") as file:
    for line in file:
        if start_digit(line):
            sanitized_es.append(split_versicle(line))


with open(output_gn, "w", encoding="utf-8") as file:
    for line in sanitized_gn:
        file.write(f"{line}\n")
with open(output_es, "w", encoding="utf-8") as file:
    for line in sanitized_es:
        file.write(f"{line}\n")

final_output = []
for i in range(len(sanitized_gn)):
    if i>=len(sanitized_gn):
        break
    gn_index : str = sanitized_gn[i][0]
    es_index : str = sanitized_es[i][0]
    if sanitized_gn[i][1]==sanitized_es[i][1]:
        pass
    if gn_index==es_index:
        final_output.append((sanitized_gn[i][1], sanitized_es[i][1]))
    elif "-" in gn_index:
        numbers = gn_index.split("-")
        n1 = int(numbers[0])
        n2 = int(numbers[1])
        diff = n2-n1
        new_line = sanitized_es[i][1]
        for j in range(diff):
            new_line += sanitized_es[i+1][1]
            del sanitized_es[i+1]
        sanitized_es[i] = (gn_index, new_line)
        final_output.append((sanitized_gn[i][1], new_line))

    elif "-" in es_index:
        numbers = es_index.split("-")
        n1 = int(numbers[0])
        n2 = int(numbers[1])
        diff = n2-n1
        new_line = sanitized_gn[i][1]
        for j in range(diff):
            new_line += sanitized_gn[i+1][1]
            del sanitized_gn[i+1]
        sanitized_gn[i] = (es_index, new_line)
        final_output.append((sanitized_es[i][1], new_line))        
    else:
        print("There has been an error. Pls fix. Line:"+str(i))
        print(sanitized_gn[i][0]+ sanitized_gn[i][1])
        print(sanitized_es[i][0]+ sanitized_es[i][1])
        raise 

corups_file = 'corpus.json'
# Write the list of word definitions to a JSON file
with open(corups_file, "w", encoding="utf-8") as json_file:
    json.dump(final_output, json_file, ensure_ascii=False, indent=4)

with open(output_file, "w", encoding="utf-8") as file:
    for line in final_output:
        file.write(f"{line}\n")
    print(f"Conversion completed. File saved as {output_file} and {corups_file}")