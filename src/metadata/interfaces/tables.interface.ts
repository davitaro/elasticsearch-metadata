export interface Table {
  tablename: string;
  schemaname: string;
  tableowner: string;
}

export interface TableObj {
  total_number_tables: number;
  table_data: any[];
}
