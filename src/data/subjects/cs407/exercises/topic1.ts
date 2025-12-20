import { CodingExercise } from '../../../../core/types';

export const cs407Topic1Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-1-1',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Data Quality Checker',
    description: 'Write a function that analyzes a pandas DataFrame and returns a dictionary with data quality metrics: total rows, missing values per column, and completeness percentage.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def analyze_data_quality(df):
    # Return dict with 'total_rows', 'missing_per_column' (dict), 'completeness_pct' (overall)
    pass`,
    solution: `import pandas as pd

def analyze_data_quality(df):
    total_rows = len(df)
    missing_per_column = df.isnull().sum().to_dict()
    total_cells = df.size
    missing_cells = df.isnull().sum().sum()
    completeness_pct = ((total_cells - missing_cells) / total_cells * 100) if total_cells > 0 else 100.0

    return {
        'total_rows': total_rows,
        'missing_per_column': missing_per_column,
        'completeness_pct': round(completeness_pct, 2)
    }`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2, None], "b": [4, None, 6]})',
        expectedOutput: "{'total_rows': 3, 'missing_per_column': {'a': 1, 'b': 1}, 'completeness_pct': 66.67}",
        isHidden: false,
        description: 'DataFrame with some missing values'
      },
      {
        input: 'pd.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})',
        expectedOutput: "{'total_rows': 3, 'missing_per_column': {'x': 0, 'y': 0}, 'completeness_pct': 100.0}",
        isHidden: false,
        description: 'Complete DataFrame'
      }
    ],
    hints: [
      'Use df.isnull() to detect missing values',
      'Use .sum() on boolean DataFrame to count True values',
      'Calculate completeness as (total_cells - missing_cells) / total_cells * 100'
    ]
  },
  {
    id: 'cs407-ex-1-2',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'API Data Fetcher',
    description: 'Write a function that makes a GET request to a JSON API endpoint and returns the parsed data. Handle errors gracefully.',
    difficulty: 2,
    language: 'python',
    starterCode: `import requests

def fetch_api_data(url):
    # Return parsed JSON data or None if error
    pass`,
    solution: `import requests

def fetch_api_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException:
        return None`,
    testCases: [
      {
        input: '"https://api.example.com/data"',
        expectedOutput: 'dict or None',
        isHidden: false,
        description: 'Fetch from valid endpoint'
      }
    ],
    hints: [
      'Use requests.get() to make HTTP requests',
      'Use response.json() to parse JSON',
      'Wrap in try-except to handle errors',
      'Use response.raise_for_status() to check for HTTP errors'
    ]
  },
  {
    id: 'cs407-ex-1-3',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'JSON Data Parser',
    description: 'Write a function that parses a JSON string and extracts specific nested fields. Handle malformed JSON gracefully.',
    difficulty: 2,
    language: 'python',
    starterCode: `import json

def extract_nested_field(json_string, field_path):
    # field_path is a list like ['user', 'address', 'city']
    # Return the value at that path or None if not found
    pass`,
    solution: `import json

def extract_nested_field(json_string, field_path):
    try:
        data = json.loads(json_string)
        for field in field_path:
            data = data[field]
        return data
    except (json.JSONDecodeError, KeyError, TypeError):
        return None`,
    testCases: [
      {
        input: '\'{"user": {"address": {"city": "NYC"}}}\', ["user", "address", "city"]',
        expectedOutput: '"NYC"',
        isHidden: false,
        description: 'Valid nested JSON'
      },
      {
        input: '\'{"user": {"name": "John"}}\', ["user", "address", "city"]',
        expectedOutput: 'None',
        isHidden: false,
        description: 'Missing nested field'
      },
      {
        input: '\'{invalid json}\', ["user"]',
        expectedOutput: 'None',
        isHidden: false,
        description: 'Malformed JSON'
      }
    ],
    hints: [
      'Use json.loads() to parse JSON string',
      'Iterate through field_path to access nested fields',
      'Catch json.JSONDecodeError, KeyError, and TypeError',
      'Return None for any error'
    ]
  },
  {
    id: 'cs407-ex-1-4',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'CSV to DataFrame Loader',
    description: 'Write a function that loads a CSV file into a pandas DataFrame and handles common issues (encoding, delimiters, missing headers).',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def load_csv_robust(filepath, delimiter=',', encoding='utf-8', has_header=True):
    # Return DataFrame or None if error
    pass`,
    solution: `import pandas as pd

def load_csv_robust(filepath, delimiter=',', encoding='utf-8', has_header=True):
    try:
        if has_header:
            df = pd.read_csv(filepath, delimiter=delimiter, encoding=encoding)
        else:
            df = pd.read_csv(filepath, delimiter=delimiter, encoding=encoding, header=None)
        return df
    except Exception:
        return None`,
    testCases: [
      {
        input: '"data.csv", ",", "utf-8", True',
        expectedOutput: 'DataFrame or None',
        isHidden: false,
        description: 'Standard CSV with header'
      },
      {
        input: '"data.tsv", "\\t", "utf-8", True',
        expectedOutput: 'DataFrame or None',
        isHidden: false,
        description: 'Tab-separated file'
      }
    ],
    hints: [
      'Use pd.read_csv() with appropriate parameters',
      'Set header=None when has_header is False',
      'Wrap in try-except to handle file/encoding errors',
      'Return None on any exception'
    ]
  },
  {
    id: 'cs407-ex-1-5',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Web Scraper - Extract Links',
    description: 'Write a function that extracts all hyperlinks from an HTML string using BeautifulSoup.',
    difficulty: 2,
    language: 'python',
    starterCode: `from bs4 import BeautifulSoup

def extract_links(html_string):
    # Return list of URLs from all <a> tags
    pass`,
    solution: `from bs4 import BeautifulSoup

def extract_links(html_string):
    soup = BeautifulSoup(html_string, 'html.parser')
    links = []
    for a_tag in soup.find_all('a', href=True):
        links.append(a_tag['href'])
    return links`,
    testCases: [
      {
        input: '\'<html><a href="http://example.com">Link1</a><a href="http://test.com">Link2</a></html>\'',
        expectedOutput: '["http://example.com", "http://test.com"]',
        isHidden: false,
        description: 'HTML with two links'
      },
      {
        input: '\'<html><p>No links here</p></html>\'',
        expectedOutput: '[]',
        isHidden: false,
        description: 'HTML with no links'
      }
    ],
    hints: [
      'Create BeautifulSoup object with html.parser',
      'Use .find_all("a", href=True) to find anchor tags with href',
      'Extract href attribute from each tag',
      'Return list of URLs'
    ]
  },
  {
    id: 'cs407-ex-1-6',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'REST API Pagination Handler',
    description: 'Write a function that fetches paginated API data by making multiple requests until all pages are retrieved.',
    difficulty: 3,
    language: 'python',
    starterCode: `import requests

def fetch_paginated_data(base_url, page_param='page', max_pages=10):
    # Return list of all items from paginated API
    # Stop when response is empty or max_pages reached
    pass`,
    solution: `import requests

def fetch_paginated_data(base_url, page_param='page', max_pages=10):
    all_items = []
    page = 1

    while page <= max_pages:
        try:
            response = requests.get(base_url, params={page_param: page}, timeout=10)
            response.raise_for_status()
            data = response.json()

            if not data or (isinstance(data, list) and len(data) == 0):
                break

            if isinstance(data, list):
                all_items.extend(data)
            elif isinstance(data, dict) and 'items' in data:
                all_items.extend(data['items'])
                if not data['items']:
                    break

            page += 1
        except requests.exceptions.RequestException:
            break

    return all_items`,
    testCases: [
      {
        input: '"https://api.example.com/data", "page", 5',
        expectedOutput: 'list of items from all pages',
        isHidden: false,
        description: 'Paginated API with multiple pages'
      }
    ],
    hints: [
      'Use a loop to fetch pages sequentially',
      'Pass page number as query parameter',
      'Stop when response is empty or max_pages reached',
      'Accumulate items from all pages in a list',
      'Handle both list responses and dict with items key'
    ]
  },
  {
    id: 'cs407-ex-1-7',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Data Type Validator',
    description: 'Write a function that validates if DataFrame columns match expected data types and returns a report of mismatches.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def validate_column_types(df, expected_types):
    # expected_types is dict like {'col1': 'int64', 'col2': 'object'}
    # Return dict with mismatched columns and their actual types
    pass`,
    solution: `import pandas as pd

def validate_column_types(df, expected_types):
    mismatches = {}

    for col, expected_type in expected_types.items():
        if col not in df.columns:
            mismatches[col] = 'missing'
        elif str(df[col].dtype) != expected_type:
            mismatches[col] = str(df[col].dtype)

    return mismatches`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2], "b": ["x", "y"]}), {"a": "int64", "b": "object"}',
        expectedOutput: '{}',
        isHidden: false,
        description: 'All types match'
      },
      {
        input: 'pd.DataFrame({"a": [1.0, 2.0], "b": ["x", "y"]}), {"a": "int64", "b": "object"}',
        expectedOutput: '{"a": "float64"}',
        isHidden: false,
        description: 'Type mismatch for column a'
      },
      {
        input: 'pd.DataFrame({"a": [1, 2]}), {"a": "int64", "c": "object"}',
        expectedOutput: '{"c": "missing"}',
        isHidden: false,
        description: 'Missing column c'
      }
    ],
    hints: [
      'Iterate through expected_types dictionary',
      'Check if column exists in DataFrame',
      'Compare str(df[col].dtype) with expected type',
      'Store mismatches in result dictionary'
    ]
  },
  {
    id: 'cs407-ex-1-8',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'HTML Table Extractor',
    description: 'Write a function that extracts the first HTML table from a webpage and converts it to a pandas DataFrame.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd
from bs4 import BeautifulSoup

def extract_table_to_dataframe(html_string):
    # Return first table as DataFrame or None if no table found
    pass`,
    solution: `import pandas as pd
from bs4 import BeautifulSoup

def extract_table_to_dataframe(html_string):
    soup = BeautifulSoup(html_string, 'html.parser')
    table = soup.find('table')

    if not table:
        return None

    rows = []
    for tr in table.find_all('tr'):
        cells = [td.get_text(strip=True) for td in tr.find_all(['td', 'th'])]
        if cells:
            rows.append(cells)

    if not rows:
        return None

    # First row as header
    return pd.DataFrame(rows[1:], columns=rows[0]) if len(rows) > 1 else pd.DataFrame(rows)`,
    testCases: [
      {
        input: '\'<table><tr><th>Name</th><th>Age</th></tr><tr><td>John</td><td>30</td></tr></table>\'',
        expectedOutput: 'DataFrame with columns Name, Age and one row',
        isHidden: false,
        description: 'Valid HTML table'
      },
      {
        input: '\'<html><p>No table here</p></html>\'',
        expectedOutput: 'None',
        isHidden: false,
        description: 'HTML with no table'
      }
    ],
    hints: [
      'Use BeautifulSoup to parse HTML',
      'Find first table element with soup.find("table")',
      'Extract rows with find_all("tr")',
      'Extract cells with find_all(["td", "th"])',
      'Use first row as column headers'
    ]
  },
  {
    id: 'cs407-ex-1-9',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'JSON Array Flattener',
    description: 'Write a function that flattens a nested JSON structure into a flat dictionary with dot-notation keys.',
    difficulty: 3,
    language: 'python',
    starterCode: `def flatten_json(nested_dict, parent_key='', sep='.'):
    # Return flattened dict like {'user.name': 'John', 'user.age': 30}
    pass`,
    solution: `def flatten_json(nested_dict, parent_key='', sep='.'):
    items = []

    for key, value in nested_dict.items():
        new_key = f"{parent_key}{sep}{key}" if parent_key else key

        if isinstance(value, dict):
            items.extend(flatten_json(value, new_key, sep=sep).items())
        elif isinstance(value, list):
            for i, item in enumerate(value):
                if isinstance(item, dict):
                    items.extend(flatten_json(item, f"{new_key}[{i}]", sep=sep).items())
                else:
                    items.append((f"{new_key}[{i}]", item))
        else:
            items.append((new_key, value))

    return dict(items)`,
    testCases: [
      {
        input: '{"user": {"name": "John", "age": 30}}',
        expectedOutput: '{"user.name": "John", "user.age": 30}',
        isHidden: false,
        description: 'Nested dictionary'
      },
      {
        input: '{"user": {"name": "John", "hobbies": ["reading", "coding"]}}',
        expectedOutput: '{"user.name": "John", "user.hobbies[0]": "reading", "user.hobbies[1]": "coding"}',
        isHidden: false,
        description: 'Dictionary with array'
      }
    ],
    hints: [
      'Use recursion to handle nested dictionaries',
      'Build new keys by concatenating with separator',
      'Handle lists by adding index notation [i]',
      'Accumulate flattened items in a list of tuples'
    ]
  },
  {
    id: 'cs407-ex-1-10',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'API Rate Limiter',
    description: 'Write a function that fetches data from multiple URLs while respecting a rate limit (requests per second).',
    difficulty: 4,
    language: 'python',
    starterCode: `import requests
import time

def fetch_with_rate_limit(urls, requests_per_second=2):
    # Return list of responses (or None for failed requests)
    pass`,
    solution: `import requests
import time

def fetch_with_rate_limit(urls, requests_per_second=2):
    results = []
    delay = 1.0 / requests_per_second

    for url in urls:
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            results.append(response.json())
        except requests.exceptions.RequestException:
            results.append(None)

        if url != urls[-1]:  # Don't delay after last request
            time.sleep(delay)

    return results`,
    testCases: [
      {
        input: '["https://api.example.com/1", "https://api.example.com/2"], 1',
        expectedOutput: 'list of 2 responses or None values',
        isHidden: false,
        description: 'Two URLs with 1 request per second'
      }
    ],
    hints: [
      'Calculate delay as 1.0 / requests_per_second',
      'Use time.sleep(delay) between requests',
      'Store each response in results list',
      'Append None for failed requests',
      'Do not delay after the last request'
    ]
  },
  {
    id: 'cs407-ex-1-11',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'CSV Encoding Detector',
    description: 'Write a function that detects the encoding of a CSV file by trying multiple common encodings.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd

def detect_csv_encoding(filepath):
    # Try encodings: utf-8, latin-1, cp1252, iso-8859-1
    # Return the first encoding that works or None
    pass`,
    solution: `import pandas as pd

def detect_csv_encoding(filepath):
    encodings = ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1']

    for encoding in encodings:
        try:
            pd.read_csv(filepath, encoding=encoding, nrows=5)
            return encoding
        except (UnicodeDecodeError, Exception):
            continue

    return None`,
    testCases: [
      {
        input: '"data_utf8.csv"',
        expectedOutput: '"utf-8"',
        isHidden: false,
        description: 'UTF-8 encoded file'
      },
      {
        input: '"data_latin1.csv"',
        expectedOutput: '"latin-1"',
        isHidden: false,
        description: 'Latin-1 encoded file'
      }
    ],
    hints: [
      'Define list of common encodings to try',
      'Use pd.read_csv() with nrows=5 to test quickly',
      'Catch UnicodeDecodeError and other exceptions',
      'Return first encoding that works',
      'Return None if all encodings fail'
    ]
  },
  {
    id: 'cs407-ex-1-12',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Web Scraper - Extract Metadata',
    description: 'Write a function that extracts metadata (title, description, keywords) from HTML meta tags.',
    difficulty: 2,
    language: 'python',
    starterCode: `from bs4 import BeautifulSoup

def extract_metadata(html_string):
    # Return dict with 'title', 'description', 'keywords'
    pass`,
    solution: `from bs4 import BeautifulSoup

def extract_metadata(html_string):
    soup = BeautifulSoup(html_string, 'html.parser')

    metadata = {
        'title': None,
        'description': None,
        'keywords': None
    }

    # Extract title
    title_tag = soup.find('title')
    if title_tag:
        metadata['title'] = title_tag.get_text(strip=True)

    # Extract description
    desc_tag = soup.find('meta', attrs={'name': 'description'})
    if desc_tag and desc_tag.get('content'):
        metadata['description'] = desc_tag['content']

    # Extract keywords
    keywords_tag = soup.find('meta', attrs={'name': 'keywords'})
    if keywords_tag and keywords_tag.get('content'):
        metadata['keywords'] = keywords_tag['content']

    return metadata`,
    testCases: [
      {
        input: '\'<html><head><title>Test Page</title><meta name="description" content="A test"><meta name="keywords" content="test,page"></head></html>\'',
        expectedOutput: '{"title": "Test Page", "description": "A test", "keywords": "test,page"}',
        isHidden: false,
        description: 'HTML with all metadata'
      },
      {
        input: '\'<html><head><title>Only Title</title></head></html>\'',
        expectedOutput: '{"title": "Only Title", "description": None, "keywords": None}',
        isHidden: false,
        description: 'HTML with only title'
      }
    ],
    hints: [
      'Use soup.find("title") for title tag',
      'Use soup.find("meta", attrs={"name": "description"}) for description',
      'Extract content attribute from meta tags',
      'Return None for missing metadata'
    ]
  },
  {
    id: 'cs407-ex-1-13',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'JSON Schema Validator',
    description: 'Write a function that validates if a JSON object has all required fields and correct types.',
    difficulty: 3,
    language: 'python',
    starterCode: `def validate_json_schema(data, schema):
    # schema is dict like {'name': str, 'age': int, 'email': str}
    # Return (is_valid: bool, errors: list)
    pass`,
    solution: `def validate_json_schema(data, schema):
    errors = []

    if not isinstance(data, dict):
        return (False, ['Data must be a dictionary'])

    for field, expected_type in schema.items():
        if field not in data:
            errors.append(f"Missing required field: {field}")
        elif not isinstance(data[field], expected_type):
            errors.append(f"Field '{field}' must be {expected_type.__name__}, got {type(data[field]).__name__}")

    return (len(errors) == 0, errors)`,
    testCases: [
      {
        input: '{"name": "John", "age": 30}, {"name": str, "age": int}',
        expectedOutput: '(True, [])',
        isHidden: false,
        description: 'Valid data matching schema'
      },
      {
        input: '{"name": "John"}, {"name": str, "age": int}',
        expectedOutput: '(False, ["Missing required field: age"])',
        isHidden: false,
        description: 'Missing required field'
      },
      {
        input: '{"name": "John", "age": "30"}, {"name": str, "age": int}',
        expectedOutput: '(False, ["Field \'age\' must be int, got str"])',
        isHidden: false,
        description: 'Wrong type for field'
      }
    ],
    hints: [
      'Check if data is a dictionary',
      'Iterate through schema fields',
      'Check if field exists in data',
      'Check if field type matches expected type using isinstance()',
      'Accumulate errors in a list'
    ]
  },
  {
    id: 'cs407-ex-1-14',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'API Response Cache',
    description: 'Write a function that caches API responses to avoid redundant requests. Use a dictionary to store responses.',
    difficulty: 3,
    language: 'python',
    starterCode: `import requests

class APICache:
    def __init__(self):
        self.cache = {}

    def get(self, url):
        # Return cached response or fetch if not cached
        pass`,
    solution: `import requests

class APICache:
    def __init__(self):
        self.cache = {}

    def get(self, url):
        if url in self.cache:
            return self.cache[url]

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()
            self.cache[url] = data
            return data
        except requests.exceptions.RequestException:
            return None`,
    testCases: [
      {
        input: 'cache = APICache(); cache.get("https://api.example.com/data")',
        expectedOutput: 'dict or None (fetched)',
        isHidden: false,
        description: 'First request - fetch'
      },
      {
        input: 'cache = APICache(); cache.get("https://api.example.com/data"); cache.get("https://api.example.com/data")',
        expectedOutput: 'dict or None (from cache)',
        isHidden: false,
        description: 'Second request - cached'
      }
    ],
    hints: [
      'Check if URL is in cache dictionary',
      'Return cached value if found',
      'Otherwise fetch from API using requests.get()',
      'Store response in cache before returning',
      'Return None on errors'
    ]
  },
  {
    id: 'cs407-ex-1-15',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Multi-format Data Loader',
    description: 'Write a function that loads data from CSV, JSON, or Excel files based on file extension.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd
import json

def load_data_file(filepath):
    # Return DataFrame for CSV/Excel, dict/list for JSON, or None on error
    pass`,
    solution: `import pandas as pd
import json

def load_data_file(filepath):
    try:
        if filepath.endswith('.csv'):
            return pd.read_csv(filepath)
        elif filepath.endswith('.json'):
            with open(filepath, 'r') as f:
                return json.load(f)
        elif filepath.endswith('.xlsx') or filepath.endswith('.xls'):
            return pd.read_excel(filepath)
        else:
            return None
    except Exception:
        return None`,
    testCases: [
      {
        input: '"data.csv"',
        expectedOutput: 'DataFrame',
        isHidden: false,
        description: 'Load CSV file'
      },
      {
        input: '"data.json"',
        expectedOutput: 'dict or list',
        isHidden: false,
        description: 'Load JSON file'
      },
      {
        input: '"data.xlsx"',
        expectedOutput: 'DataFrame',
        isHidden: false,
        description: 'Load Excel file'
      }
    ],
    hints: [
      'Check file extension with filepath.endswith()',
      'Use pd.read_csv() for CSV files',
      'Use json.load() for JSON files',
      'Use pd.read_excel() for Excel files',
      'Return None for unsupported formats or errors'
    ]
  },
  {
    id: 'cs407-ex-1-16',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Duplicate Data Detector',
    description: 'Write a function that detects duplicate rows in a DataFrame and returns statistics about duplicates.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def detect_duplicates(df, subset=None):
    # Return dict with 'total_duplicates', 'duplicate_percentage', 'duplicate_rows' (indices)
    pass`,
    solution: `import pandas as pd

def detect_duplicates(df, subset=None):
    duplicates = df.duplicated(subset=subset, keep=False)
    num_duplicates = duplicates.sum()
    total_rows = len(df)
    duplicate_pct = (num_duplicates / total_rows * 100) if total_rows > 0 else 0.0
    duplicate_indices = df[duplicates].index.tolist()

    return {
        'total_duplicates': int(num_duplicates),
        'duplicate_percentage': round(duplicate_pct, 2),
        'duplicate_rows': duplicate_indices
    }`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2, 1, 3], "b": [4, 5, 4, 6]})',
        expectedOutput: '{"total_duplicates": 2, "duplicate_percentage": 50.0, "duplicate_rows": [0, 2]}',
        isHidden: false,
        description: 'DataFrame with duplicates'
      },
      {
        input: 'pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})',
        expectedOutput: '{"total_duplicates": 0, "duplicate_percentage": 0.0, "duplicate_rows": []}',
        isHidden: false,
        description: 'DataFrame without duplicates'
      }
    ],
    hints: [
      'Use df.duplicated(keep=False) to mark all duplicates',
      'Count duplicates with .sum() on boolean series',
      'Calculate percentage as (duplicates / total_rows) * 100',
      'Get indices with df[duplicates].index.tolist()'
    ]
  }
];
