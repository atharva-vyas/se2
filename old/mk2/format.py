import json

# File name
file_name = 'output.json'

# Read the data from the file
with open(file_name, 'r') as file:
    data = json.load(file)

# Sort the data based on the 'epoch' key
sorted_data = sorted(data, key=lambda x: x['epoch'])

# Write the sorted data back to the same file
with open(file_name, 'w') as file:
    json.dump(sorted_data, file, indent=2)

print(f"Data in {file_name} has been sorted based on epoch values.")
