// server/src/bigqueryClient.ts
import {BigQuery} from '@google-cloud/bigquery';

const projectId = process.env.BIGQUERY_PROJECT_ID || '';
const datasetId = process.env.BIGQUERY_DATASET || '';
const tableId = process.env.BIGQUERY_TABLE || '';
const credentialsPath = process.env.BIGQUERY_CREDENTIALS || '';

// Log environment variables for debugging (remove in production)
console.log('Project ID:', projectId);
console.log('Dataset ID:', datasetId);
console.log('Table ID:', tableId);
console.log('Credentials Path:', credentialsPath);

const bigquery = new BigQuery({
  projectId,
  keyFilename: credentialsPath,
});

export async function getAllData() {
  const query = `SELECT * FROM \`${projectId}.${datasetId}.${tableId}\``;
  const [rows] = await bigquery.query(query);
  return rows;
}

export async function insertData(intValue: number, stringValue: string) {
  const table = bigquery.dataset(datasetId).table(tableId);
  await table.insert([{ int_field: intValue, string_field: stringValue }]);
}
