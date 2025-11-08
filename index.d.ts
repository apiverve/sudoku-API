declare module '@apiverve/sudoku' {
  export interface sudokuOptions {
    api_key: string;
    secure?: boolean;
  }

  export interface sudokuResponse {
    status: string;
    error: string | null;
    data: any;
    code?: number;
  }

  export default class sudokuWrapper {
    constructor(options: sudokuOptions);

    execute(callback: (error: any, data: sudokuResponse | null) => void): Promise<sudokuResponse>;
    execute(query: Record<string, any>, callback: (error: any, data: sudokuResponse | null) => void): Promise<sudokuResponse>;
    execute(query?: Record<string, any>): Promise<sudokuResponse>;
  }
}
