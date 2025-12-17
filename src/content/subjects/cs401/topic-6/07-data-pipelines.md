---
title: "Data Pipelines"
description: "ETL processes, data lakes, data warehouses, and orchestration with Apache Airflow"
---

# Data Pipelines

Data pipelines are the automated workflows that move and transform data from sources through various processing stages to destinations. Modern data pipelines must handle diverse data sources, scale to petabytes, ensure data quality, and provide observability. This chapter explores ETL patterns, data lakes, data warehouses, and pipeline orchestration with tools like Apache Airflow.

## ETL: Extract, Transform, Load

ETL is the traditional pattern for data integration, moving data from operational systems into analytical systems.

### Extract Phase

```javascript
class DataExtractor {
  constructor(sources) {
    this.sources = sources;
  }
  
  async extract(source, params) {
    console.log(`Extracting from ${source.name}...`);
    
    switch (source.type) {
      case 'database':
        return await this.extractFromDatabase(source, params);
      
      case 'api':
        return await this.extractFromAPI(source, params);
      
      case 'files':
        return await this.extractFromFiles(source, params);
      
      case 'stream':
        return await this.extractFromStream(source, params);
    }
  }
  
  async extractFromDatabase(source, params) {
    const connection = await this.connectToDatabase(source);
    
    // Incremental extraction using watermarks
    const lastExtracted = await this.getWatermark(source.name);
    
    const query = `
      SELECT * FROM ${params.table}
      WHERE updated_at > '${lastExtracted}'
      ORDER BY updated_at
      LIMIT ${params.batchSize || 10000}
    `;
    
    const data = await connection.query(query);
    
    // Update watermark
    if (data.length > 0) {
      const newWatermark = data[data.length - 1].updated_at;
      await this.setWatermark(source.name, newWatermark);
    }
    
    console.log(`Extracted ${data.length} records`);
    
    return data;
  }
  
  async extractFromAPI(source, params) {
    const client = new HTTPClient(source.baseURL);
    const data = [];
    let page = 1;
    
    while (true) {
      const response = await client.get(params.endpoint, {
        page,
        pageSize: params.pageSize || 100
      });
      
      data.push(...response.data);
      
      if (!response.hasMore) break;
      page++;
      
      // Rate limiting
      await this.sleep(source.rateLimitDelay || 1000);
    }
    
    return data;
  }
  
  async extractFromFiles(source, params) {
    const files = await this.listFiles(source.path, params.pattern);
    const data = [];
    
    for (const file of files) {
      const content = await this.readFile(file);
      const parsed = this.parseFile(content, params.format);
      data.push(...parsed);
    }
    
    return data;
  }
}
```

### Transform Phase

```javascript
class DataTransformer {
  constructor(rules) {
    this.rules = rules;
  }
  
  async transform(data) {
    console.log(`Transforming ${data.length} records...`);
    
    let transformed = data;
    
    // Apply transformation rules in sequence
    for (const rule of this.rules) {
      transformed = await this.applyRule(transformed, rule);
    }
    
    // Data quality checks
    transformed = await this.validateData(transformed);
    
    console.log(`Transformation complete: ${transformed.length} valid records`);
    
    return transformed;
  }
  
  async applyRule(data, rule) {
    switch (rule.type) {
      case 'map':
        return data.map(rule.function);
      
      case 'filter':
        return data.filter(rule.predicate);
      
      case 'aggregate':
        return this.aggregate(data, rule.groupBy, rule.aggregations);
      
      case 'join':
        return await this.join(data, rule.rightData, rule.on);
      
      case 'deduplicate':
        return this.deduplicate(data, rule.key);
    }
  }
  
  // Common transformations
  
  cleanData(record) {
    return {
      ...record,
      // Trim strings
      name: record.name?.trim(),
      
      // Normalize phone numbers
      phone: this.normalizePhone(record.phone),
      
      // Parse dates
      created_at: new Date(record.created_at),
      
      // Handle nulls
      email: record.email || 'unknown@example.com',
      
      // Type conversion
      age: parseInt(record.age),
      amount: parseFloat(record.amount)
    };
  }
  
  enrichData(record, lookupTables) {
    return {
      ...record,
      
      // Add derived fields
      full_name: `${record.first_name} ${record.last_name}`,
      age_group: this.getAgeGroup(record.age),
      
      // Lookup enrichment
      country_name: lookupTables.countries.get(record.country_code),
      category_name: lookupTables.categories.get(record.category_id)
    };
  }
  
  aggregate(data, groupByKeys, aggregations) {
    const groups = new Map();
    
    // Group data
    for (const record of data) {
      const key = groupByKeys.map(k => record[k]).join('|');
      
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      
      groups.get(key).push(record);
    }
    
    // Aggregate each group
    const results = [];
    
    for (const [key, records] of groups) {
      const aggregated = {};
      
      // Set group keys
      groupByKeys.forEach((k, i) => {
        aggregated[k] = key.split('|')[i];
      });
      
      // Compute aggregations
      for (const agg of aggregations) {
        aggregated[agg.as] = this.computeAggregation(
          records,
          agg.column,
          agg.function
        );
      }
      
      results.push(aggregated);
    }
    
    return results;
  }
  
  computeAggregation(records, column, func) {
    const values = records.map(r => r[column]);
    
    switch (func) {
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      
      case 'avg':
        return values.reduce((a, b) => a + b, 0) / values.length;
      
      case 'count':
        return values.length;
      
      case 'min':
        return Math.min(...values);
      
      case 'max':
        return Math.max(...values);
    }
  }
  
  deduplicate(data, keyFields) {
    const seen = new Set();
    return data.filter(record => {
      const key = keyFields.map(f => record[f]).join('|');
      
      if (seen.has(key)) {
        return false;
      }
      
      seen.add(key);
      return true;
    });
  }
  
  async validateData(data) {
    const valid = [];
    const invalid = [];
    
    for (const record of data) {
      const errors = this.validateRecord(record);
      
      if (errors.length === 0) {
        valid.push(record);
      } else {
        invalid.push({ record, errors });
      }
    }
    
    if (invalid.length > 0) {
      console.warn(`${invalid.length} invalid records found`);
      await this.logInvalidRecords(invalid);
    }
    
    return valid;
  }
  
  validateRecord(record) {
    const errors = [];
    
    // Required fields
    if (!record.id) errors.push('Missing required field: id');
    if (!record.timestamp) errors.push('Missing required field: timestamp');
    
    // Data types
    if (record.age && !Number.isInteger(record.age)) {
      errors.push('Invalid type for age: expected integer');
    }
    
    // Value constraints
    if (record.age && (record.age < 0 || record.age > 150)) {
      errors.push('Invalid age value: must be between 0 and 150');
    }
    
    // Format validation
    if (record.email && !this.isValidEmail(record.email)) {
      errors.push('Invalid email format');
    }
    
    return errors;
  }
}
```

### Load Phase

```javascript
class DataLoader {
  constructor(destination) {
    this.destination = destination;
  }
  
  async load(data, params) {
    console.log(`Loading ${data.length} records to ${this.destination.type}...`);
    
    switch (this.destination.type) {
      case 'database':
        return await this.loadToDatabase(data, params);
      
      case 'dataWarehouse':
        return await this.loadToWarehouse(data, params);
      
      case 'dataLake':
        return await this.loadToDataLake(data, params);
      
      case 'cache':
        return await this.loadToCache(data, params);
    }
  }
  
  async loadToDatabase(data, params) {
    const connection = await this.connectToDatabase(this.destination);
    
    // Batch inserts for efficiency
    const batchSize = 1000;
    const batches = this.chunkArray(data, batchSize);
    
    let loaded = 0;
    
    for (const batch of batches) {
      const query = this.buildBulkInsertQuery(params.table, batch);
      
      await connection.query(query);
      
      loaded += batch.length;
      console.log(`Loaded ${loaded} / ${data.length} records`);
    }
    
    return { loaded };
  }
  
  async loadToWarehouse(data, params) {
    // Use COPY command for efficient loading
    const tempFile = `/tmp/load-${Date.now()}.csv`;
    
    // Write data to temp file
    await this.writeTempFile(tempFile, data);
    
    // Execute COPY command
    const copySQL = `
      COPY ${params.schema}.${params.table}
      FROM '${tempFile}'
      CSV HEADER
      DELIMITER ','
    `;
    
    await this.destination.execute(copySQL);
    
    // Clean up
    await this.deleteTempFile(tempFile);
    
    console.log(`Loaded ${data.length} records to warehouse`);
  }
  
  async loadToDataLake(data, params) {
    // Write as partitioned Parquet files
    const partitions = this.partitionData(data, params.partitionBy);
    
    for (const [partitionKey, partitionData] of partitions) {
      const path = this.getPartitionPath(params.basePath, partitionKey);
      
      // Convert to Parquet
      const parquetData = await this.toParquet(partitionData);
      
      // Write to data lake (S3, HDFS, etc.)
      await this.destination.write(path, parquetData);
    }
    
    console.log(`Loaded ${data.length} records to data lake in ${partitions.size} partitions`);
  }
  
  partitionData(data, partitionKeys) {
    const partitions = new Map();
    
    for (const record of data) {
      const key = partitionKeys.map(k => `${k}=${record[k]}`).join('/');
      
      if (!partitions.has(key)) {
        partitions.set(key, []);
      }
      
      partitions.get(key).push(record);
    }
    
    return partitions;
  }
}
```

## Data Lakes

Data lakes store raw, unstructured data at scale, enabling exploratory analysis and schema-on-read.

```javascript
class DataLake {
  constructor(storage) {
    this.storage = storage;  // S3, HDFS, Azure Data Lake
    this.catalog = new DataCatalog();
  }
  
  async ingest(data, metadata) {
    // Generate unique path
    const path = this.generatePath(metadata);
    
    // Write raw data
    await this.storage.write(path, data);
    
    // Register in catalog
    await this.catalog.register({
      path,
      format: metadata.format,
      schema: this.inferSchema(data),
      partitions: metadata.partitions,
      size: data.length,
      created: Date.now(),
      tags: metadata.tags
    });
    
    console.log(`Ingested data to ${path}`);
  }
  
  generatePath(metadata) {
    const { source, date, format } = metadata;
    
    // Organized by source, date, and format
    // e.g., /lake/web-logs/2024/01/15/events.parquet
    return `/lake/${source}/${date.year}/${date.month}/${date.day}/events.${format}`;
  }
  
  async query(params) {
    // Schema-on-read: apply schema when querying
    const files = await this.catalog.findFiles(params.filters);
    
    const results = [];
    
    for (const file of files) {
      const data = await this.storage.read(file.path);
      const parsed = this.applySchema(data, params.schema);
      const filtered = this.filterData(parsed, params.where);
      
      results.push(...filtered);
    }
    
    return results;
  }
  
  inferSchema(data) {
    // Infer schema from sample data
    if (data.length === 0) return [];
    
    const sample = data[0];
    const schema = [];
    
    for (const [key, value] of Object.entries(sample)) {
      schema.push({
        name: key,
        type: typeof value,
        nullable: true
      });
    }
    
    return schema;
  }
}

class DataCatalog {
  constructor() {
    this.datasets = new Map();
  }
  
  async register(metadata) {
    this.datasets.set(metadata.path, metadata);
  }
  
  async findFiles(filters) {
    const results = [];
    
    for (const [path, metadata] of this.datasets) {
      if (this.matchesFilters(metadata, filters)) {
        results.push(metadata);
      }
    }
    
    return results;
  }
  
  matchesFilters(metadata, filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (metadata[key] !== value) {
        return false;
      }
    }
    return true;
  }
}
```

## Data Warehouses

Data warehouses store structured, cleaned data optimized for analytical queries.

```javascript
class DataWarehouse {
  constructor(database) {
    this.database = database;
    this.starSchema = new StarSchema();
  }
  
  async createFactTable(name, dimensions, measures) {
    // Create fact table with foreign keys to dimensions
    const columns = [
      ...dimensions.map(d => `${d.name}_key INTEGER`),
      ...measures.map(m => `${m.name} ${m.type}`)
    ];
    
    const sql = `
      CREATE TABLE ${name} (
        ${columns.join(',\n        ')},
        timestamp TIMESTAMP,
        PRIMARY KEY (${dimensions.map(d => `${d.name}_key`).join(', ')})
      )
    `;
    
    await this.database.execute(sql);
    
    console.log(`Created fact table: ${name}`);
  }
  
  async createDimensionTable(name, attributes) {
    const columns = [
      `${name}_key INTEGER PRIMARY KEY`,
      ...attributes.map(a => `${a.name} ${a.type}`)
    ];
    
    const sql = `
      CREATE TABLE dim_${name} (
        ${columns.join(',\n        ')}
      )
    `;
    
    await this.database.execute(sql);
    
    console.log(`Created dimension table: dim_${name}`);
  }
  
  async loadFacts(tableName, data) {
    // Slowly changing dimensions (SCD Type 2)
    for (const record of data) {
      // Look up or create dimension keys
      const dimensionKeys = await this.resolveDimensions(record);
      
      // Insert fact
      await this.insertFact(tableName, {
        ...dimensionKeys,
        ...this.extractMeasures(record),
        timestamp: record.timestamp
      });
    }
  }
  
  async resolveDimensions(record) {
    const keys = {};
    
    for (const [dimName, dimValue] of Object.entries(record.dimensions)) {
      // Look up existing dimension
      let key = await this.lookupDimension(dimName, dimValue);
      
      if (!key) {
        // Create new dimension record
        key = await this.insertDimension(dimName, dimValue);
      }
      
      keys[`${dimName}_key`] = key;
    }
    
    return keys;
  }
}
```

## Apache Airflow Orchestration

Airflow orchestrates complex data pipelines as Directed Acyclic Graphs (DAGs).

```javascript
// DAG definition
class AirflowDAG {
  constructor(id, schedule, defaultArgs) {
    this.id = id;
    this.schedule = schedule;
    this.defaultArgs = defaultArgs;
    this.tasks = [];
  }
  
  addTask(task) {
    this.tasks.push(task);
  }
  
  setDependencies(dependencies) {
    for (const [upstream, downstream] of dependencies) {
      this.setDependency(upstream, downstream);
    }
  }
  
  setDependency(upstream, downstream) {
    downstream.upstreamTasks.push(upstream);
  }
}

// Example DAG
const dailyETL = new AirflowDAG('daily_sales_etl', '0 2 * * *', {
  owner: 'data-team',
  retries: 3,
  retryDelay: 300
});

// Tasks
const extractTask = new BashOperator({
  taskId: 'extract_sales',
  bashCommand: 'python /scripts/extract_sales.py'
});

const transformTask = new PythonOperator({
  taskId: 'transform_sales',
  pythonCallable: transformSales
});

const loadTask = new PostgresOperator({
  taskId: 'load_warehouse',
  sql: 'COPY sales_fact FROM /tmp/transformed.csv'
});

const validationTask = new SQLCheckOperator({
  taskId: 'validate_load',
  sql: 'SELECT COUNT(*) FROM sales_fact WHERE date = CURRENT_DATE',
  minRows: 1000
});

// Set up dependencies
dailyETL.addTask(extractTask);
dailyETL.addTask(transformTask);
dailyETL.addTask(loadTask);
dailyETL.addTask(validationTask);

dailyETL.setDependencies([
  [extractTask, transformTask],
  [transformTask, loadTask],
  [loadTask, validationTask]
]);
```

Data pipelines form the backbone of modern data infrastructure, automating the flow of data from sources through transformations to analytical destinations, with orchestration tools like Airflow providing scheduling, monitoring, and error handling.
