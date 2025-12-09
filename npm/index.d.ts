declare module '@apiverve/sudoku' {
  export interface sudokuOptions {
    api_key: string;
    secure?: boolean;
  }

  export interface sudokuResponse {
    status: string;
    error: string | null;
    data: SudokuGeneratorData;
    code?: number;
  }


  interface SudokuGeneratorData {
      puzzle:     Puzzle;
      solution:   Puzzle;
      difficulty: string;
  }
  
  interface Puzzle {
      grid:  string;
      html:  string;
      image: Image;
  }
  
  interface Image {
      imageName:   string;
      format:      string;
      downloadURL: string;
      expires:     number;
  }

  export default class sudokuWrapper {
    constructor(options: sudokuOptions);

    execute(callback: (error: any, data: sudokuResponse | null) => void): Promise<sudokuResponse>;
    execute(query: Record<string, any>, callback: (error: any, data: sudokuResponse | null) => void): Promise<sudokuResponse>;
    execute(query?: Record<string, any>): Promise<sudokuResponse>;
  }
}
