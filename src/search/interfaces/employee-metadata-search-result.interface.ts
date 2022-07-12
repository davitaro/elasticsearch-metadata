import { EmployeeMetadataSearchBody } from "./employee-metadata-search-body.interface";

export interface EmployeeMetadataSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: EmployeeMetadataSearchBody;
    }>;
  };
}
