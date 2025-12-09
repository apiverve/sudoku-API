using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace APIVerve.API.SudokuGenerator
{
    /// <summary>
    /// Query options for the Sudoku Generator API
    /// </summary>
    public class SudokuGeneratorQueryOptions
    {
        /// <summary>
        /// The difficulty level of the Sudoku puzzle to generate (easy, medium, hard, expert)
        /// Example: medium
        /// </summary>
        [JsonProperty("difficulty")]
        public string Difficulty { get; set; }
    }
}
