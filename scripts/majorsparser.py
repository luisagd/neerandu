import csv
import json

input_file = 'carrerasAcreditadas.csv'
majors_output_file = 'majors.json'
output_file = 'universities_majors.json'

majors = []
with open(input_file, "r", encoding="utf-8") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            if row[0] not in majors:
                majors.append(row[0])
            line_count += 1
    print(f'Processed {line_count} lines.')
majors.sort()
print(f'Majors available: {majors} ({len(majors)})')

with open(majors_output_file, "w", encoding="utf-8") as json_file:
    json.dump(majors, json_file, ensure_ascii=False, indent=4)
    print(f'Majors available written at {majors_output_file}')

universities = {}
with open(input_file, "r", encoding="utf-8") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    sortedlist = sorted(csv_reader, key=lambda row: row[0], reverse=False)
    for row in sortedlist[:-1]:
        line_count += 1
        if row[1] in universities:
            if majors.index(row[0]) not in universities[row[1]]:
                universities[row[1]].append(majors.index(row[0]))
        else:
            universities[row[1]] =[majors.index(row[0])]                
             
with open(output_file, "w", encoding="utf-8") as json_file:
    json.dump(universities, json_file, ensure_ascii=False, indent=4)
    print(f'Output file saved as {output_file}')
