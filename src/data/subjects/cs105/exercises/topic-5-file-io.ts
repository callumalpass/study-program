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
      { input: '', expectedOutput: '1 2 3 4 5 6 7 8 9 10', isHidden: false, description: 'Write and read numbers from file' },
      { input: '', expectedOutput: '1 2 3 4 5 6 7 8 9 10', isHidden: true, description: 'Verify file operations' }
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
      { input: '', expectedOutput: 'Hello File!', isHidden: false, description: 'Character I/O' }
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
      { input: '', expectedOutput: 'Number of lines: 3', isHidden: false, description: 'Count lines' }
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
      { input: '', expectedOutput: 'Hello World', isHidden: false, description: 'Append to file' }
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
      { input: '', expectedOutput: '10 20 30 40 50', isHidden: false, description: 'Binary read/write' }
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
      { input: '', expectedOutput: 'Position: 5\nFGHIJ', isHidden: false, description: 'Seek and read' }
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
      { input: '', expectedOutput: 'Error: Could not open file', isHidden: false, description: 'Handle missing file' }
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
      { input: '', expectedOutput: 'Name: Alice, Age: 20, Score: 95.5', isHidden: false, description: 'Structure I/O' }
    ],
    hints: ['fwrite(&struct, sizeof, 1, fp)', 'Binary files preserve exact byte representation'],
    language: 'c'
  }
];
