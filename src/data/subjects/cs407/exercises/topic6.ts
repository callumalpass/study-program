import { CodingExercise } from '../../../../core/types';

export const cs407Topic6Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-6-1',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Create Spark DataFrame',
    description: 'Write a function that creates a PySpark DataFrame from a list of tuples with column names.',
    difficulty: 1,
    language: 'python',
    starterCode: `from pyspark.sql import SparkSession

def create_spark_dataframe(data, columns):
    # data is a list of tuples
    # columns is a list of column names
    # Return a Spark DataFrame
    pass`,
    solution: `from pyspark.sql import SparkSession

def create_spark_dataframe(data, columns):
    spark = SparkSession.builder.appName("CreateDF").getOrCreate()
    df = spark.createDataFrame(data, columns)
    return df`,
    testCases: [
      {
        input: 'data=[(1, "Alice", 25), (2, "Bob", 30)], columns=["id", "name", "age"]',
        expectedOutput: 'Spark DataFrame with 2 rows',
        isHidden: false,
        description: 'Basic DataFrame creation'
      },
      {
        input: 'data=[(100, "Product A"), (200, "Product B")], columns=["price", "name"]',
        expectedOutput: 'Spark DataFrame with product data',
        isHidden: false,
        description: 'Product DataFrame'
      }
    ],
    hints: [
      'Get or create a SparkSession',
      'Use spark.createDataFrame(data, columns)',
      'data should be a list of tuples',
      'Return the DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-2',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Filter Spark DataFrame',
    description: 'Write a function that filters a Spark DataFrame based on a condition.',
    difficulty: 1,
    language: 'python',
    starterCode: `def filter_dataframe(df, column, value):
    # Filter df where column equals value
    # Return filtered DataFrame
    pass`,
    solution: `def filter_dataframe(df, column, value):
    return df.filter(df[column] == value)`,
    testCases: [
      {
        input: 'df with age column, filter age > 25',
        expectedOutput: 'Filtered DataFrame',
        isHidden: false,
        description: 'Filter by age'
      },
      {
        input: 'df with category column, filter category = "A"',
        expectedOutput: 'Filtered DataFrame with category A',
        isHidden: false,
        description: 'Filter by category'
      }
    ],
    hints: [
      'Use df.filter() method',
      'Access column with df[column]',
      'Use == for equality comparison',
      'Return the filtered DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-3',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Select and Rename Columns',
    description: 'Write a function that selects specific columns and renames them.',
    difficulty: 2,
    language: 'python',
    starterCode: `def select_and_rename(df, old_names, new_names):
    # Select columns in old_names and rename to new_names
    # Return transformed DataFrame
    pass`,
    solution: `def select_and_rename(df, old_names, new_names):
    selected = df.select(*old_names)
    for old, new in zip(old_names, new_names):
        selected = selected.withColumnRenamed(old, new)
    return selected`,
    testCases: [
      {
        input: 'df with columns, old_names=["col1", "col2"], new_names=["a", "b"]',
        expectedOutput: 'DataFrame with renamed columns',
        isHidden: false,
        description: 'Select and rename'
      }
    ],
    hints: [
      'Use df.select(*old_names) to select columns',
      'Use withColumnRenamed(old, new) for renaming',
      'Loop through old and new names together',
      'Return the transformed DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-4',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Add Computed Column',
    description: 'Write a function that adds a new column based on a computation from existing columns.',
    difficulty: 2,
    language: 'python',
    starterCode: `from pyspark.sql import functions as F

def add_computed_column(df, col1, col2, new_col_name):
    # Add a new column that is the sum of col1 and col2
    # Return DataFrame with new column
    pass`,
    solution: `from pyspark.sql import functions as F

def add_computed_column(df, col1, col2, new_col_name):
    return df.withColumn(new_col_name, F.col(col1) + F.col(col2))`,
    testCases: [
      {
        input: 'df with columns a and b, add column c = a + b',
        expectedOutput: 'DataFrame with new computed column',
        isHidden: false,
        description: 'Sum two columns'
      },
      {
        input: 'df with price and tax, add total = price + tax',
        expectedOutput: 'DataFrame with total column',
        isHidden: false,
        description: 'Calculate total'
      }
    ],
    hints: [
      'Use withColumn(new_col_name, expression)',
      'Use F.col() to reference columns',
      'Add columns with + operator',
      'Return the modified DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-5',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Group By and Aggregate',
    description: 'Write a function that groups data by a column and computes aggregates.',
    difficulty: 2,
    language: 'python',
    starterCode: `from pyspark.sql import functions as F

def group_and_aggregate(df, group_col, agg_col):
    # Group by group_col and compute sum, mean, and count of agg_col
    # Return aggregated DataFrame
    pass`,
    solution: `from pyspark.sql import functions as F

def group_and_aggregate(df, group_col, agg_col):
    return df.groupBy(group_col).agg(
        F.sum(agg_col).alias(f'{agg_col}_sum'),
        F.mean(agg_col).alias(f'{agg_col}_mean'),
        F.count(agg_col).alias(f'{agg_col}_count')
    )`,
    testCases: [
      {
        input: 'df with category and sales columns',
        expectedOutput: 'Aggregated DataFrame with sum, mean, count',
        isHidden: false,
        description: 'Sales aggregation'
      },
      {
        input: 'df with department and employee_count',
        expectedOutput: 'Aggregated by department',
        isHidden: false,
        description: 'Department statistics'
      }
    ],
    hints: [
      'Use df.groupBy(group_col)',
      'Use .agg() with multiple aggregation functions',
      'F.sum(), F.mean(), F.count() for aggregations',
      'Use .alias() to name aggregated columns'
    ]
  },
  {
    id: 'cs407-ex-6-6',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Join DataFrames',
    description: 'Write a function that performs an inner join between two Spark DataFrames.',
    difficulty: 2,
    language: 'python',
    starterCode: `def join_dataframes(df1, df2, join_column):
    # Perform inner join on join_column
    # Return joined DataFrame
    pass`,
    solution: `def join_dataframes(df1, df2, join_column):
    return df1.join(df2, on=join_column, how='inner')`,
    testCases: [
      {
        input: 'df1 with id and name, df2 with id and age, join on id',
        expectedOutput: 'Joined DataFrame',
        isHidden: false,
        description: 'Inner join on id'
      },
      {
        input: 'customers and orders DataFrames, join on customer_id',
        expectedOutput: 'Joined customer orders',
        isHidden: false,
        description: 'Customer orders join'
      }
    ],
    hints: [
      'Use df1.join(df2, on=join_column)',
      'Set how="inner" for inner join',
      'Both DataFrames must have the join_column',
      'Return the joined DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-7',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Handle Null Values',
    description: 'Write a function that removes rows with null values in specific columns.',
    difficulty: 2,
    language: 'python',
    starterCode: `def remove_nulls(df, columns):
    # Remove rows where any of the specified columns have null values
    # Return cleaned DataFrame
    pass`,
    solution: `def remove_nulls(df, columns):
    return df.dropna(subset=columns)`,
    testCases: [
      {
        input: 'df with nulls, columns=["age", "name"]',
        expectedOutput: 'DataFrame without nulls in age or name',
        isHidden: false,
        description: 'Drop nulls in specific columns'
      },
      {
        input: 'df with nulls, columns=["price"]',
        expectedOutput: 'DataFrame without nulls in price',
        isHidden: false,
        description: 'Drop nulls in price'
      }
    ],
    hints: [
      'Use df.dropna() to remove null values',
      'Specify subset=columns to target specific columns',
      'This removes entire rows with nulls',
      'Return the cleaned DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-8',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Window Functions',
    description: 'Write a function that adds a ranking column using window functions.',
    difficulty: 3,
    language: 'python',
    starterCode: `from pyspark.sql import Window
from pyspark.sql import functions as F

def add_rank_column(df, partition_col, order_col, rank_col_name):
    # Add ranking within each partition
    # Rank by order_col (descending)
    # Return DataFrame with rank column
    pass`,
    solution: `from pyspark.sql import Window
from pyspark.sql import functions as F

def add_rank_column(df, partition_col, order_col, rank_col_name):
    window_spec = Window.partitionBy(partition_col).orderBy(F.col(order_col).desc())
    return df.withColumn(rank_col_name, F.rank().over(window_spec))`,
    testCases: [
      {
        input: 'df with category and sales, rank sales within each category',
        expectedOutput: 'DataFrame with rank column',
        isHidden: false,
        description: 'Rank sales by category'
      },
      {
        input: 'df with department and score, rank by score',
        expectedOutput: 'DataFrame with rankings',
        isHidden: false,
        description: 'Rank employees by score'
      }
    ],
    hints: [
      'Create Window.partitionBy(partition_col)',
      'Add .orderBy(F.col(order_col).desc())',
      'Use F.rank().over(window_spec)',
      'Add column with withColumn()'
    ]
  },
  {
    id: 'cs407-ex-6-9',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Pivot Table',
    description: 'Write a function that creates a pivot table in Spark.',
    difficulty: 3,
    language: 'python',
    starterCode: `from pyspark.sql import functions as F

def create_pivot_table(df, index_col, pivot_col, value_col):
    # Create pivot table with index_col as rows,
    # pivot_col values as columns, and sum of value_col as values
    # Return pivoted DataFrame
    pass`,
    solution: `from pyspark.sql import functions as F

def create_pivot_table(df, index_col, pivot_col, value_col):
    return df.groupBy(index_col).pivot(pivot_col).sum(value_col)`,
    testCases: [
      {
        input: 'df with date, product, sales - pivot by product',
        expectedOutput: 'Pivoted DataFrame with products as columns',
        isHidden: false,
        description: 'Sales pivot table'
      },
      {
        input: 'df with region, year, revenue - pivot by year',
        expectedOutput: 'Pivoted by year',
        isHidden: false,
        description: 'Regional revenue by year'
      }
    ],
    hints: [
      'Use df.groupBy(index_col)',
      'Chain .pivot(pivot_col)',
      'Apply aggregation like .sum(value_col)',
      'Return the pivoted result'
    ]
  },
  {
    id: 'cs407-ex-6-10',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Read and Write Parquet',
    description: 'Write functions to read from and write to Parquet format.',
    difficulty: 2,
    language: 'python',
    starterCode: `def write_parquet(df, path):
    # Write DataFrame to parquet format at path
    pass

def read_parquet(spark, path):
    # Read parquet file from path
    # Return DataFrame
    pass`,
    solution: `def write_parquet(df, path):
    df.write.parquet(path, mode='overwrite')

def read_parquet(spark, path):
    return spark.read.parquet(path)`,
    testCases: [
      {
        input: 'df and path="/tmp/data.parquet"',
        expectedOutput: 'DataFrame written and read successfully',
        isHidden: false,
        description: 'Parquet I/O'
      }
    ],
    hints: [
      'Use df.write.parquet(path) to write',
      'Use spark.read.parquet(path) to read',
      'Set mode="overwrite" when writing',
      'Parquet is a columnar storage format'
    ]
  },
  {
    id: 'cs407-ex-6-11',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'SQL Query on DataFrame',
    description: 'Write a function that executes a SQL query on a Spark DataFrame.',
    difficulty: 3,
    language: 'python',
    starterCode: `def execute_sql_query(df, table_name, query):
    # Register df as a temporary table
    # Execute SQL query
    # Return result DataFrame
    pass`,
    solution: `def execute_sql_query(df, table_name, query):
    df.createOrReplaceTempView(table_name)
    spark = df.sparkSession
    return spark.sql(query)`,
    testCases: [
      {
        input: 'df, "people", "SELECT * FROM people WHERE age > 25"',
        expectedOutput: 'Filtered DataFrame',
        isHidden: false,
        description: 'SQL SELECT with WHERE'
      },
      {
        input: 'df, "sales", "SELECT category, SUM(amount) FROM sales GROUP BY category"',
        expectedOutput: 'Aggregated DataFrame',
        isHidden: false,
        description: 'SQL GROUP BY'
      }
    ],
    hints: [
      'Use df.createOrReplaceTempView(table_name)',
      'Get SparkSession with df.sparkSession',
      'Execute query with spark.sql(query)',
      'Return the result DataFrame'
    ]
  },
  {
    id: 'cs407-ex-6-12',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Union DataFrames',
    description: 'Write a function that combines multiple DataFrames vertically.',
    difficulty: 2,
    language: 'python',
    starterCode: `def union_dataframes(dfs):
    # dfs is a list of DataFrames
    # Union all DataFrames
    # Return combined DataFrame
    pass`,
    solution: `def union_dataframes(dfs):
    if not dfs:
        return None
    result = dfs[0]
    for df in dfs[1:]:
        result = result.union(df)
    return result`,
    testCases: [
      {
        input: 'list of 3 DataFrames with same schema',
        expectedOutput: 'Combined DataFrame with all rows',
        isHidden: false,
        description: 'Union multiple DataFrames'
      },
      {
        input: 'list of 2 DataFrames',
        expectedOutput: 'Combined DataFrame',
        isHidden: false,
        description: 'Union two DataFrames'
      }
    ],
    hints: [
      'Start with the first DataFrame',
      'Loop through remaining DataFrames',
      'Use result.union(df) to combine',
      'All DataFrames must have same schema'
    ]
  },
  {
    id: 'cs407-ex-6-13',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Distinct Values',
    description: 'Write a function that returns distinct values from a column.',
    difficulty: 1,
    language: 'python',
    starterCode: `def get_distinct_values(df, column):
    # Get distinct values from column
    # Return list of distinct values
    pass`,
    solution: `def get_distinct_values(df, column):
    distinct_rows = df.select(column).distinct()
    return [row[column] for row in distinct_rows.collect()]`,
    testCases: [
      {
        input: 'df with category column having ["A", "B", "A", "C"]',
        expectedOutput: '["A", "B", "C"]',
        isHidden: false,
        description: 'Distinct categories'
      },
      {
        input: 'df with status column',
        expectedOutput: 'List of unique statuses',
        isHidden: false,
        description: 'Unique statuses'
      }
    ],
    hints: [
      'Use df.select(column) to select the column',
      'Use .distinct() to get unique values',
      'Use .collect() to get rows',
      'Extract values from rows and return as list'
    ]
  },
  {
    id: 'cs407-ex-6-14',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Cache and Persist',
    description: 'Write a function that caches a DataFrame for better performance.',
    difficulty: 2,
    language: 'python',
    starterCode: `from pyspark import StorageLevel

def cache_dataframe(df, storage_level='MEMORY_AND_DISK'):
    # Cache the DataFrame with specified storage level
    # Return cached DataFrame
    pass`,
    solution: `from pyspark import StorageLevel

def cache_dataframe(df, storage_level='MEMORY_AND_DISK'):
    if storage_level == 'MEMORY_ONLY':
        return df.cache()
    elif storage_level == 'MEMORY_AND_DISK':
        return df.persist(StorageLevel.MEMORY_AND_DISK)
    elif storage_level == 'DISK_ONLY':
        return df.persist(StorageLevel.DISK_ONLY)
    return df.cache()`,
    testCases: [
      {
        input: 'df, storage_level="MEMORY_ONLY"',
        expectedOutput: 'Cached DataFrame in memory',
        isHidden: false,
        description: 'Memory caching'
      },
      {
        input: 'df, storage_level="MEMORY_AND_DISK"',
        expectedOutput: 'Persisted DataFrame',
        isHidden: false,
        description: 'Memory and disk persistence'
      }
    ],
    hints: [
      'Use df.cache() for memory-only caching',
      'Use df.persist(StorageLevel.X) for other levels',
      'Common levels: MEMORY_ONLY, MEMORY_AND_DISK, DISK_ONLY',
      'Caching improves performance for repeated operations'
    ]
  },
  {
    id: 'cs407-ex-6-15',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Broadcast Join',
    description: 'Write a function that performs a broadcast join for joining a large DataFrame with a small one.',
    difficulty: 3,
    language: 'python',
    starterCode: `from pyspark.sql.functions import broadcast

def broadcast_join(large_df, small_df, join_column):
    # Perform broadcast join
    # Broadcast the small DataFrame
    # Return joined DataFrame
    pass`,
    solution: `from pyspark.sql.functions import broadcast

def broadcast_join(large_df, small_df, join_column):
    return large_df.join(broadcast(small_df), on=join_column, how='inner')`,
    testCases: [
      {
        input: 'large transaction df, small product lookup df',
        expectedOutput: 'Joined DataFrame with product info',
        isHidden: false,
        description: 'Broadcast small lookup table'
      }
    ],
    hints: [
      'Use broadcast(small_df) to mark for broadcasting',
      'Use .join() as normal',
      'Broadcasting avoids shuffling the large DataFrame',
      'Only broadcast small DataFrames that fit in memory'
    ]
  },
  {
    id: 'cs407-ex-6-16',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'ETL Pipeline',
    description: 'Write a function that implements a simple ETL pipeline: Extract from CSV, Transform data, Load to Parquet.',
    difficulty: 4,
    language: 'python',
    starterCode: `from pyspark.sql import functions as F

def etl_pipeline(spark, input_path, output_path, filter_col, filter_value):
    # Extract: Read CSV from input_path
    # Transform: Filter rows where filter_col > filter_value, add processed_date column
    # Load: Write to Parquet at output_path
    # Return the transformed DataFrame
    pass`,
    solution: `from pyspark.sql import functions as F

def etl_pipeline(spark, input_path, output_path, filter_col, filter_value):
    # Extract
    df = spark.read.csv(input_path, header=True, inferSchema=True)

    # Transform
    filtered_df = df.filter(F.col(filter_col) > filter_value)
    transformed_df = filtered_df.withColumn('processed_date', F.current_date())

    # Load
    transformed_df.write.parquet(output_path, mode='overwrite')

    return transformed_df`,
    testCases: [
      {
        input: 'CSV with sales data, filter amount > 100',
        expectedOutput: 'Filtered and transformed data in Parquet',
        isHidden: false,
        description: 'Sales ETL pipeline'
      },
      {
        input: 'CSV with user data, filter age > 18',
        expectedOutput: 'Adult users in Parquet',
        isHidden: false,
        description: 'User filtering pipeline'
      }
    ],
    hints: [
      'Extract: spark.read.csv() with header=True',
      'Transform: Use .filter() and .withColumn()',
      'Add current_date with F.current_date()',
      'Load: df.write.parquet() with mode="overwrite"',
      'Return the transformed DataFrame'
    ]
  }
];
