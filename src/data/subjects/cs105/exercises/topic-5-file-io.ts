import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs105-exercise-5',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Write and Read from File',
    difficulty: 2,
    description: 'Write a program that writes numbers 1-10 to a file, then reads and displays them.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    \n    // Write numbers 1-10 to file "numbers.txt"\n    \n    // Read and print numbers from file\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use fopen() with "w" mode to write and "r" mode to read', 'Use fprintf() to write formatted data to file', 'Use fscanf() to read formatted data from file', 'Always check if fopen() returns NULL'],
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int num;\n    \n    fp = fopen("numbers.txt", "w");\n    for (int i = 1; i <= 10; i++) {\n        fprintf(fp, "%d ", i);\n    }\n    fclose(fp);\n    \n    fp = fopen("numbers.txt", "r");\n    while (fscanf(fp, "%d", &num) != EOF) {\n        printf("%d ", num);\n    }\n    fclose(fp);\n    \n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-t5-ex02',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Character I/O',
    difficulty: 1,
    description: 'Write a string to a file character by character using fputc, then read it back with fgetc.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char *text = "Hello File!";\n    int c;\n    \n    // Write text using fputc\n    // Read back using fgetc\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char *text = "Hello File!";\n    int c;\n    \n    fp = fopen("char.txt", "w");\n    for (int i = 0; text[i] != \'\\0\'; i++) {\n        fputc(text[i], fp);\n    }\n    fclose(fp);\n    \n    fp = fopen("char.txt", "r");\n    while ((c = fgetc(fp)) != EOF) {\n        printf("%c", c);\n    }\n    fclose(fp);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['fputc(char, file) writes one character', 'fgetc returns int (for EOF check)'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex03',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Line I/O with fgets',
    difficulty: 2,
    description: 'Read lines from a file using fgets and count them.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char line[256];\n    int count = 0;\n    \n    // First create a file with 3 lines\n    fp = fopen("lines.txt", "w");\n    fprintf(fp, "Line 1\\nLine 2\\nLine 3\\n");\n    fclose(fp);\n    \n    // Read and count lines\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char line[256];\n    int count = 0;\n    \n    fp = fopen("lines.txt", "w");\n    fprintf(fp, "Line 1\\nLine 2\\nLine 3\\n");\n    fclose(fp);\n    \n    fp = fopen("lines.txt", "r");\n    while (fgets(line, sizeof(line), fp) != NULL) {\n        count++;\n    }\n    fclose(fp);\n    \n    printf("Number of lines: %d", count);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['fgets reads until newline or buffer full', 'fgets returns NULL at EOF'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex04',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Append Mode',
    difficulty: 2,
    description: 'Demonstrate append mode by adding new content to an existing file.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    \n    // Create file with "Hello"\n    fp = fopen("append.txt", "w");\n    fprintf(fp, "Hello");\n    fclose(fp);\n    \n    // Append " World" using "a" mode\n    \n    // Read and print full content\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int c;\n    \n    fp = fopen("append.txt", "w");\n    fprintf(fp, "Hello");\n    fclose(fp);\n    \n    fp = fopen("append.txt", "a");\n    fprintf(fp, " World");\n    fclose(fp);\n    \n    fp = fopen("append.txt", "r");\n    while ((c = fgetc(fp)) != EOF) {\n        printf("%c", c);\n    }\n    fclose(fp);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['"a" mode adds to end of file', '"w" would overwrite existing content'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex05',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Binary File I/O',
    difficulty: 3,
    description: 'Write an array of integers to a binary file using fwrite, then read it back with fread.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int arr[5] = {10, 20, 30, 40, 50};\n    int buffer[5];\n    \n    // Write array to binary file\n    // Read it back into buffer\n    // Print buffer contents\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int arr[5] = {10, 20, 30, 40, 50};\n    int buffer[5];\n    \n    fp = fopen("data.bin", "wb");\n    fwrite(arr, sizeof(int), 5, fp);\n    fclose(fp);\n    \n    fp = fopen("data.bin", "rb");\n    fread(buffer, sizeof(int), 5, fp);\n    fclose(fp);\n    \n    for (int i = 0; i < 5; i++) {\n        printf("%d ", buffer[i]);\n    }\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use "wb" and "rb" for binary mode', 'fwrite(ptr, size, count, file)'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex06',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File Seek and Tell',
    difficulty: 3,
    description: 'Use fseek and ftell to navigate within a file.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    \n    // Create file with "ABCDEFGHIJ"\n    fp = fopen("seek.txt", "w");\n    fprintf(fp, "ABCDEFGHIJ");\n    fclose(fp);\n    \n    // Open for reading\n    // Use fseek to go to position 5\n    // Print current position with ftell\n    // Read and print remaining characters\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int c;\n    \n    fp = fopen("seek.txt", "w");\n    fprintf(fp, "ABCDEFGHIJ");\n    fclose(fp);\n    \n    fp = fopen("seek.txt", "r");\n    fseek(fp, 5, SEEK_SET);\n    printf("Position: %ld\\n", ftell(fp));\n    while ((c = fgetc(fp)) != EOF) {\n        printf("%c", c);\n    }\n    fclose(fp);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['SEEK_SET from beginning, SEEK_CUR from current, SEEK_END from end', 'ftell returns current position'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex07',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Error Handling',
    difficulty: 2,
    description: 'Demonstrate proper file error handling when file doesn\'t exist.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    \n    // Try to open a non-existent file for reading\n    // Check for NULL and print error message\n    // Use perror for detailed error\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    \n    fp = fopen("nonexistent.txt", "r");\n    if (fp == NULL) {\n        printf("Error: Could not open file\\n");\n        perror("fopen");\n        return 1;\n    }\n    \n    fclose(fp);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['fopen returns NULL on failure', 'perror prints system error message'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex08',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Write and Read Structure',
    difficulty: 4,
    description: 'Save a structure to a binary file and read it back.',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char name[30];\n    int age;\n    float score;\n} Student;\n\nint main() {\n    Student s1 = {"Alice", 20, 95.5};\n    Student s2;\n    \n    // Write s1 to binary file\n    // Read into s2\n    // Print s2\'s data\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char name[30];\n    int age;\n    float score;\n} Student;\n\nint main() {\n    Student s1 = {"Alice", 20, 95.5};\n    Student s2;\n    FILE *fp;\n    \n    fp = fopen("student.bin", "wb");\n    fwrite(&s1, sizeof(Student), 1, fp);\n    fclose(fp);\n    \n    fp = fopen("student.bin", "rb");\n    fread(&s2, sizeof(Student), 1, fp);\n    fclose(fp);\n    \n    printf("Name: %s, Age: %d, Score: %.1f", s2.name, s2.age, s2.score);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['fwrite(&struct, sizeof, 1, fp)', 'Binary files preserve exact byte representation'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex09',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File Copy Program (Written)',
    difficulty: 2,
    description: 'This is a written exercise. Write a complete program that copies one file to another, handling errors properly.',
    starterCode: '/* WRITTEN EXERCISE - Write a file copy program */\n\n#include <stdio.h>\n\n/*\n * Write a program that:\n * 1. Takes source and destination filenames as command line arguments\n * 2. Opens the source file for reading\n * 3. Opens the destination file for writing\n * 4. Copies content byte by byte (or use a buffer for efficiency)\n * 5. Handles all possible errors\n * 6. Reports success or failure\n *\n * Handle these error cases:\n * - Wrong number of arguments\n * - Source file doesn\'t exist\n * - Cannot create destination file\n * - Read/write errors\n *\n * Write your complete solution below:\n */\n\nint main(int argc, char *argv[]) {\n    // Your code here\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    if (argc != 3) {\n        fprintf(stderr, "Usage: %s <source> <destination>\\n", argv[0]);\n        return 1;\n    }\n    \n    FILE *src = fopen(argv[1], "rb");\n    if (src == NULL) {\n        perror("Error opening source file");\n        return 1;\n    }\n    \n    FILE *dst = fopen(argv[2], "wb");\n    if (dst == NULL) {\n        perror("Error creating destination file");\n        fclose(src);\n        return 1;\n    }\n    \n    char buffer[4096];\n    size_t bytes;\n    \n    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {\n        if (fwrite(buffer, 1, bytes, dst) != bytes) {\n            perror("Write error");\n            fclose(src);\n            fclose(dst);\n            return 1;\n        }\n    }\n    \n    if (ferror(src)) {\n        perror("Read error");\n        fclose(src);\n        fclose(dst);\n        return 1;\n    }\n    \n    fclose(src);\n    if (fclose(dst) != 0) {\n        perror("Error closing destination");\n        return 1;\n    }\n    \n    printf("File copied successfully\\n");\n    return 0;\n}',
    testCases: [],
    hints: ['Use binary mode for copying any file type', 'Buffer reads are more efficient than byte-by-byte'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex10',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Word Counter (Written)',
    difficulty: 3,
    description: 'This is a written exercise. Write a program that counts lines, words, and characters in a file.',
    starterCode: '/* WRITTEN EXERCISE - Write a word counter (like wc) */\n\n#include <stdio.h>\n#include <ctype.h>\n\n/*\n * Write a program that reads a file and counts:\n * - Number of lines\n * - Number of words (whitespace-separated)\n * - Number of characters\n *\n * Output format:\n *   Lines: X\n *   Words: Y\n *   Characters: Z\n *\n * A word is defined as a sequence of non-whitespace characters.\n *\n * Write your solution below:\n */\n\nint main(int argc, char *argv[]) {\n    // Your code here\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <ctype.h>\n\nint main(int argc, char *argv[]) {\n    if (argc != 2) {\n        fprintf(stderr, "Usage: %s <filename>\\n", argv[0]);\n        return 1;\n    }\n    \n    FILE *fp = fopen(argv[1], "r");\n    if (fp == NULL) {\n        perror(argv[1]);\n        return 1;\n    }\n    \n    int lines = 0, words = 0, chars = 0;\n    int inWord = 0;\n    int c;\n    \n    while ((c = fgetc(fp)) != EOF) {\n        chars++;\n        \n        if (c == \'\\n\') {\n            lines++;\n        }\n        \n        if (isspace(c)) {\n            inWord = 0;\n        } else if (!inWord) {\n            inWord = 1;\n            words++;\n        }\n    }\n    \n    fclose(fp);\n    \n    printf("Lines: %d\\n", lines);\n    printf("Words: %d\\n", words);\n    printf("Characters: %d\\n", chars);\n    \n    return 0;\n}',
    testCases: [],
    hints: ['Track state: are we inside a word or not?', 'Use isspace() to detect whitespace'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex11',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'CSV Parser (Written)',
    difficulty: 4,
    description: 'This is a written exercise. Write a program that reads a simple CSV file and prints formatted output.',
    starterCode: '/* WRITTEN EXERCISE - Write a CSV parser */\n\n#include <stdio.h>\n#include <string.h>\n\n/*\n * Given a CSV file with this format:\n *   Name,Age,City\n *   Alice,25,Boston\n *   Bob,30,New York\n *   Charlie,22,Chicago\n *\n * Output:\n *   Record 1: Name=Alice, Age=25, City=Boston\n *   Record 2: Name=Bob, Age=30, City=New York\n *   Record 3: Name=Charlie, Age=22, City=Chicago\n *\n * Assumptions:\n * - First line is header\n * - No commas within fields\n * - Max line length 256 characters\n * - Max 10 fields per line\n *\n * Write your solution below:\n */\n\nint main(int argc, char *argv[]) {\n    // Your code here\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\n#define MAX_LINE 256\n#define MAX_FIELDS 10\n\nint parseCSVLine(char *line, char *fields[], int maxFields) {\n    int count = 0;\n    char *token = strtok(line, ",\\n");\n    \n    while (token != NULL && count < maxFields) {\n        fields[count++] = token;\n        token = strtok(NULL, ",\\n");\n    }\n    return count;\n}\n\nint main(int argc, char *argv[]) {\n    if (argc != 2) {\n        fprintf(stderr, "Usage: %s <csvfile>\\n", argv[0]);\n        return 1;\n    }\n    \n    FILE *fp = fopen(argv[1], "r");\n    if (fp == NULL) {\n        perror(argv[1]);\n        return 1;\n    }\n    \n    char line[MAX_LINE];\n    char *headers[MAX_FIELDS];\n    char *fields[MAX_FIELDS];\n    int numHeaders = 0;\n    int recordNum = 0;\n    \n    // Read header line\n    if (fgets(line, sizeof(line), fp)) {\n        numHeaders = parseCSVLine(line, headers, MAX_FIELDS);\n        // Make copies of headers (strtok modifies string)\n        for (int i = 0; i < numHeaders; i++) {\n            headers[i] = strdup(headers[i]);\n        }\n    }\n    \n    // Read data lines\n    while (fgets(line, sizeof(line), fp)) {\n        int numFields = parseCSVLine(line, fields, MAX_FIELDS);\n        recordNum++;\n        \n        printf("Record %d: ", recordNum);\n        for (int i = 0; i < numFields && i < numHeaders; i++) {\n            printf("%s=%s", headers[i], fields[i]);\n            if (i < numFields - 1) printf(", ");\n        }\n        printf("\\n");\n    }\n    \n    fclose(fp);\n    return 0;\n}',
    testCases: [],
    hints: ['Use strtok to split on commas', 'First line contains field names'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex12',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File Modes Comparison (Written)',
    difficulty: 2,
    description: 'This is a written exercise. Explain what each file mode does and when to use it.',
    starterCode: '/* WRITTEN EXERCISE - Explain file modes */\n\n/*\n * For each file mode below, explain:\n * 1. What it does\n * 2. What happens if file exists / doesn\'t exist\n * 3. Where the file pointer starts\n * 4. A use case for this mode\n *\n * Modes:\n * "r"  - \n * "w"  - \n * "a"  - \n * "r+" - \n * "w+" - \n * "a+" - \n * "rb" - \n * "wb" - \n *\n * Bonus: What\'s the difference between "r+" and "w+"?\n *\n * Write your answers below:\n */',
    solution: '/* ANSWERS:\n *\n * "r" - Read only\n *   - Opens for reading only\n *   - File must exist (returns NULL if not)\n *   - Pointer starts at beginning\n *   - Use: Reading config files, data files\n *\n * "w" - Write only\n *   - Opens for writing only\n *   - Creates file if doesn\'t exist\n *   - TRUNCATES (erases) if file exists!\n *   - Pointer starts at beginning\n *   - Use: Creating new output files\n *\n * "a" - Append only\n *   - Opens for writing at end only\n *   - Creates file if doesn\'t exist\n *   - Preserves existing content\n *   - Pointer always at end (writes are always appended)\n *   - Use: Log files, adding to existing data\n *\n * "r+" - Read and write\n *   - Opens for both reading and writing\n *   - File must exist (returns NULL if not)\n *   - Pointer starts at beginning\n *   - Use: Modifying existing files in place\n *\n * "w+" - Read and write (truncate)\n *   - Opens for both reading and writing\n *   - Creates file if doesn\'t exist\n *   - TRUNCATES if file exists!\n *   - Pointer starts at beginning\n *   - Use: Creating new file to read/write\n *\n * "a+" - Read and append\n *   - Opens for reading anywhere, writing at end\n *   - Creates file if doesn\'t exist\n *   - Reading can be anywhere, writes are appended\n *   - Use: Reading log while adding entries\n *\n * "rb"/"wb" - Binary mode\n *   - Same as r/w but in binary mode\n *   - No newline translation\n *   - Use: Images, executables, any non-text\n *\n * Difference between "r+" and "w+":\n *   - r+ requires file to exist, w+ creates/truncates\n *   - r+ preserves content, w+ erases everything\n */',
    testCases: [],
    hints: ['Think about what happens to existing content', 'Consider the starting position of file pointer'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex13',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Binary vs Text Mode (Written)',
    difficulty: 3,
    description: 'This is a written exercise. Explain why binary mode matters and predict the output.',
    starterCode: '/* WRITTEN EXERCISE - Binary vs Text Mode */\n\n/*\n * Consider this code on Windows:\n */\n\n#include <stdio.h>\n\nint main() {\n    // Writing in text mode\n    FILE *text = fopen("text.txt", "w");\n    fprintf(text, "Hello\\nWorld\\n");\n    fclose(text);\n    \n    // Writing in binary mode\n    FILE *bin = fopen("bin.txt", "wb");\n    fprintf(bin, "Hello\\nWorld\\n");\n    fclose(bin);\n    \n    // What are the file sizes?\n    return 0;\n}\n\n/* Questions:\n *\n * 1. On Windows, what is the size of text.txt? bin.txt?\n *    Why are they different?\n *\n * 2. On Linux/Mac, what is the size of text.txt? bin.txt?\n *    Why?\n *\n * 3. What happens if you read a binary file in text mode\n *    on Windows?\n *\n * 4. When should you ALWAYS use binary mode?\n *\n * 5. This code has a subtle bug. What is it?\n *\n *    char data[100];\n *    FILE *f = fopen("image.jpg", "r");\n *    fread(data, 1, 100, f);\n *\n * Write your answers below:\n */',
    solution: '/* ANSWERS:\n *\n * 1. On Windows:\n *    text.txt = 14 bytes\n *    bin.txt = 12 bytes\n *    \n *    In text mode on Windows, \\n is translated to \\r\\n\n *    (carriage return + line feed). So each \\n becomes\n *    2 bytes instead of 1.\n *    Text: "Hello\\r\\nWorld\\r\\n" = 12 chars + 2 extra = 14\n *    Binary: "Hello\\nWorld\\n" = 12 chars exactly\n *\n * 2. On Linux/Mac:\n *    Both files are 12 bytes.\n *    Unix systems don\'t translate newlines in text mode.\n *    \\n is just \\n (LF only, no CR).\n *\n * 3. Reading binary in text mode on Windows:\n *    - \\r\\n pairs are converted to \\n\n *    - Ctrl+Z (0x1A) is treated as EOF!\n *    - File size may appear different\n *    - Binary data can be corrupted\n *\n * 4. ALWAYS use binary mode for:\n *    - Images, audio, video files\n *    - Executable files\n *    - Compressed files (zip, gzip)\n *    - Any file that\'s not plain text\n *    - When you need exact byte counts\n *    - When writing cross-platform code\n *\n * 5. Bug: Reading image.jpg without "rb" mode\n *    Should be: fopen("image.jpg", "rb")\n *    On Windows, bytes could be corrupted by\n *    newline translation or premature EOF.\n */',
    testCases: [],
    hints: ['Windows uses CRLF (\\r\\n) for newlines', 'Text mode does newline translation'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex14',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Random Access Database (Written)',
    difficulty: 4,
    description: 'This is a written exercise. Design a simple record-based database using random access.',
    starterCode: '/* WRITTEN EXERCISE - Design a record database */\n\n#include <stdio.h>\n#include <string.h>\n\n/*\n * Design a simple "database" that stores employee records\n * in a binary file with random access capabilities.\n *\n * Requirements:\n * 1. Fixed-size records for random access\n * 2. Add new employee\n * 3. Read employee by ID (record number)\n * 4. Update employee by ID\n * 5. Delete employee by ID (mark as deleted)\n *\n * Implement these functions:\n */\n\ntypedef struct {\n    int id;\n    char name[50];\n    float salary;\n    int active;  // 1 = active, 0 = deleted\n} Employee;\n\n// Initialize empty database file\nvoid initDatabase(const char *filename);\n\n// Add employee, return assigned ID\nint addEmployee(const char *filename, Employee *emp);\n\n// Read employee by ID (0-based)\nint readEmployee(const char *filename, int id, Employee *emp);\n\n// Update employee by ID\nint updateEmployee(const char *filename, int id, Employee *emp);\n\n// Delete employee by ID (mark as inactive)\nint deleteEmployee(const char *filename, int id);\n\n/*\n * Key insight: Since all records are the same size,\n * we can jump directly to record N using:\n *   fseek(file, N * sizeof(Employee), SEEK_SET);\n *\n * Write your implementation below:\n */',
    solution: '/* SOLUTION: */\n\n#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    int id;\n    char name[50];\n    float salary;\n    int active;\n} Employee;\n\nvoid initDatabase(const char *filename) {\n    FILE *f = fopen(filename, "wb");\n    if (f) fclose(f);  // Create empty file\n}\n\nint countRecords(const char *filename) {\n    FILE *f = fopen(filename, "rb");\n    if (!f) return 0;\n    fseek(f, 0, SEEK_END);\n    long size = ftell(f);\n    fclose(f);\n    return size / sizeof(Employee);\n}\n\nint addEmployee(const char *filename, Employee *emp) {\n    FILE *f = fopen(filename, "ab");\n    if (!f) return -1;\n    \n    int id = countRecords(filename);\n    emp->id = id;\n    emp->active = 1;\n    \n    fwrite(emp, sizeof(Employee), 1, f);\n    fclose(f);\n    return id;\n}\n\nint readEmployee(const char *filename, int id, Employee *emp) {\n    FILE *f = fopen(filename, "rb");\n    if (!f) return -1;\n    \n    fseek(f, id * sizeof(Employee), SEEK_SET);\n    size_t read = fread(emp, sizeof(Employee), 1, f);\n    fclose(f);\n    \n    return (read == 1 && emp->active) ? 0 : -1;\n}\n\nint updateEmployee(const char *filename, int id, Employee *emp) {\n    FILE *f = fopen(filename, "r+b");\n    if (!f) return -1;\n    \n    emp->id = id;\n    emp->active = 1;\n    \n    fseek(f, id * sizeof(Employee), SEEK_SET);\n    size_t written = fwrite(emp, sizeof(Employee), 1, f);\n    fclose(f);\n    \n    return (written == 1) ? 0 : -1;\n}\n\nint deleteEmployee(const char *filename, int id) {\n    Employee emp;\n    if (readEmployee(filename, id, &emp) != 0) return -1;\n    \n    emp.active = 0;\n    return updateEmployee(filename, id, &emp);\n}\n\n/* Usage example:\n *\n * initDatabase("employees.dat");\n * \n * Employee e1 = {0, "Alice", 50000, 1};\n * int id1 = addEmployee("employees.dat", &e1);\n * \n * Employee result;\n * readEmployee("employees.dat", id1, &result);\n * printf("Name: %s\\n", result.name);\n */',
    testCases: [],
    hints: ['Use fseek with record_number * sizeof(struct)', 'Use r+b mode for read/update operations'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex15',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Error Handling Best Practices (Written)',
    difficulty: 3,
    description: 'This is a written exercise. Identify error handling issues and fix them.',
    starterCode: '/* WRITTEN EXERCISE - Fix the error handling */\n\n/*\n * This code has poor error handling. Identify all issues\n * and write a corrected version.\n */\n\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid processFile(const char *filename) {\n    FILE *file = fopen(filename, "r");\n    \n    char buffer[100];\n    while (fgets(buffer, sizeof(buffer), file)) {\n        printf("%s", buffer);\n    }\n    \n    fclose(file);\n}\n\nvoid copyFiles(const char *src, const char *dst) {\n    FILE *in = fopen(src, "r");\n    FILE *out = fopen(dst, "w");\n    \n    int c;\n    while ((c = fgetc(in)) != EOF) {\n        fputc(c, out);\n    }\n    \n    fclose(in);\n    fclose(out);\n}\n\nint main() {\n    processFile("data.txt");\n    copyFiles("source.txt", "dest.txt");\n    return 0;\n}\n\n/* Issues to identify:\n * 1. \n * 2. \n * 3. \n * 4. \n * 5. \n *\n * Write the corrected code below:\n */',
    solution: '/* ISSUES:\n *\n * 1. No check if fopen returns NULL\n * 2. No check for read errors (ferror)\n * 3. No check for write errors\n * 4. No check if fclose fails\n * 5. In copyFiles: if out fails, in is not closed\n * 6. No error reporting to user\n * 7. No return values to indicate success/failure\n *\n * CORRECTED CODE:\n */\n\n#include <stdio.h>\n#include <stdlib.h>\n\nint processFile(const char *filename) {\n    FILE *file = fopen(filename, "r");\n    if (file == NULL) {\n        perror(filename);\n        return -1;\n    }\n    \n    char buffer[100];\n    while (fgets(buffer, sizeof(buffer), file) != NULL) {\n        printf("%s", buffer);\n    }\n    \n    if (ferror(file)) {\n        perror("Read error");\n        fclose(file);\n        return -1;\n    }\n    \n    if (fclose(file) != 0) {\n        perror("Close error");\n        return -1;\n    }\n    \n    return 0;\n}\n\nint copyFiles(const char *src, const char *dst) {\n    FILE *in = fopen(src, "rb");\n    if (in == NULL) {\n        perror(src);\n        return -1;\n    }\n    \n    FILE *out = fopen(dst, "wb");\n    if (out == NULL) {\n        perror(dst);\n        fclose(in);  // Clean up!\n        return -1;\n    }\n    \n    int c;\n    while ((c = fgetc(in)) != EOF) {\n        if (fputc(c, out) == EOF) {\n            perror("Write error");\n            fclose(in);\n            fclose(out);\n            return -1;\n        }\n    }\n    \n    if (ferror(in)) {\n        perror("Read error");\n        fclose(in);\n        fclose(out);\n        return -1;\n    }\n    \n    fclose(in);\n    if (fclose(out) != 0) {\n        perror("Error closing output");\n        return -1;\n    }\n    \n    return 0;\n}\n\nint main() {\n    if (processFile("data.txt") != 0) {\n        fprintf(stderr, "Failed to process file\\n");\n    }\n    \n    if (copyFiles("source.txt", "dest.txt") != 0) {\n        fprintf(stderr, "Failed to copy files\\n");\n    }\n    \n    return 0;\n}',
    testCases: [],
    hints: ['Every fopen needs a NULL check', 'Clean up resources on error paths'],
    language: 'c'
  },
  {
    id: 'cs105-t5-ex16',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Log File Rotation (Written)',
    difficulty: 4,
    description: 'This is a written exercise. Design and implement a log file rotation system.',
    starterCode: '/* WRITTEN EXERCISE - Log file rotation */\n\n#include <stdio.h>\n#include <time.h>\n\n/*\n * Design a logging system with these features:\n *\n * 1. Write timestamped log messages to a file\n * 2. Rotate log when file exceeds MAX_SIZE bytes\n * 3. Keep up to MAX_LOGS old log files\n * 4. Name pattern: app.log, app.log.1, app.log.2, etc.\n *\n * When rotating:\n *   app.log.2 -> deleted\n *   app.log.1 -> app.log.2\n *   app.log   -> app.log.1\n *   new       -> app.log\n *\n * Implement:\n */\n\n#define MAX_SIZE 10000  // 10KB\n#define MAX_LOGS 3\n#define LOG_FILE "app.log"\n\ntypedef struct {\n    FILE *file;\n    long currentSize;\n} Logger;\n\n// Initialize logger\nLogger *createLogger();\n\n// Write log message with timestamp\nvoid logMessage(Logger *log, const char *level, const char *msg);\n\n// Rotate logs if needed\nvoid rotateIfNeeded(Logger *log);\n\n// Close logger\nvoid closeLogger(Logger *log);\n\n/*\n * Write your implementation below.\n * Hint: Use rename() to move files.\n */',
    solution: '/* SOLUTION: */\n\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <time.h>\n\n#define MAX_SIZE 10000\n#define MAX_LOGS 3\n#define LOG_FILE "app.log"\n\ntypedef struct {\n    FILE *file;\n    long currentSize;\n} Logger;\n\nvoid rotateLogs() {\n    char oldName[64], newName[64];\n    \n    // Delete oldest log\n    snprintf(oldName, sizeof(oldName), "%s.%d", LOG_FILE, MAX_LOGS);\n    remove(oldName);\n    \n    // Shift logs: .2 -> .3, .1 -> .2, etc.\n    for (int i = MAX_LOGS - 1; i >= 1; i--) {\n        snprintf(oldName, sizeof(oldName), "%s.%d", LOG_FILE, i);\n        snprintf(newName, sizeof(newName), "%s.%d", LOG_FILE, i + 1);\n        rename(oldName, newName);\n    }\n    \n    // Current log becomes .1\n    snprintf(newName, sizeof(newName), "%s.1", LOG_FILE);\n    rename(LOG_FILE, newName);\n}\n\nLogger *createLogger() {\n    Logger *log = (Logger *)malloc(sizeof(Logger));\n    if (!log) return NULL;\n    \n    log->file = fopen(LOG_FILE, "a");\n    if (!log->file) {\n        free(log);\n        return NULL;\n    }\n    \n    // Get current size\n    fseek(log->file, 0, SEEK_END);\n    log->currentSize = ftell(log->file);\n    \n    return log;\n}\n\nvoid rotateIfNeeded(Logger *log) {\n    if (log->currentSize >= MAX_SIZE) {\n        fclose(log->file);\n        rotateLogs();\n        log->file = fopen(LOG_FILE, "a");\n        log->currentSize = 0;\n    }\n}\n\nvoid logMessage(Logger *log, const char *level, const char *msg) {\n    if (!log || !log->file) return;\n    \n    rotateIfNeeded(log);\n    \n    time_t now = time(NULL);\n    char timestamp[32];\n    strftime(timestamp, sizeof(timestamp), \n             "%Y-%m-%d %H:%M:%S", localtime(&now));\n    \n    int written = fprintf(log->file, "[%s] %s: %s\\n", \n                          timestamp, level, msg);\n    fflush(log->file);\n    \n    if (written > 0) {\n        log->currentSize += written;\n    }\n}\n\nvoid closeLogger(Logger *log) {\n    if (log) {\n        if (log->file) fclose(log->file);\n        free(log);\n    }\n}\n\n/* Usage:\n * Logger *log = createLogger();\n * logMessage(log, "INFO", "Application started");\n * logMessage(log, "ERROR", "Something went wrong");\n * closeLogger(log);\n */',
    testCases: [],
    hints: ['Use rename() to move files atomically', 'Track file size to know when to rotate'],
    language: 'c'
  }
];
