import json

file_name = 'src/data/data.json'

def change(e):
    return {
      'city': e['city'],
      'change': round((((e['y2022'] - e['y2017']) / e['y2017']) * 100), 2)
    }

with open(file_name, 'r', encoding='utf-8') as f:
    data = json.load(f)
    values = list(map(change, data))

print(json.dumps(values))