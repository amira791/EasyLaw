import os

def count_files_in_range(directory):
    count = 0
    
    # Iterate over all files and directories in the specified directory
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            # Check if the file name is numeric and falls between 1983 and 2000
            if file_name.isdigit() and 1983 <= int(file_name) <= 2000:
                count += 1
    
    return count

# Specify the directory path where you want to start counting files
directory_path = r'F:\project 2cs\EasyLaw\back\jaraid'

# Call the function to count files within the specified range
total_files = count_files_in_range(directory_path)

print(f'Total number of files between 1983 and 2000: {total_files}')
