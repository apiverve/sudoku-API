APIVerve.API.SudokuGenerator API
============

Sudoku is a simple tool for generating Sudoku puzzles. It returns a Sudoku puzzle.

![Build Status](https://img.shields.io/badge/build-passing-green)
![Code Climate](https://img.shields.io/badge/maintainability-B-purple)
![Prod Ready](https://img.shields.io/badge/production-ready-blue)

This is a .NET Wrapper for the [APIVerve.API.SudokuGenerator API](https://apiverve.com/marketplace/sudoku)

---

## Installation

Using the .NET CLI:
```
dotnet add package APIVerve.API.SudokuGenerator
```

Using the Package Manager:
```
nuget install APIVerve.API.SudokuGenerator
```

Using the Package Manager Console:
```
Install-Package APIVerve.API.SudokuGenerator
```

From within Visual Studio:

1. Open the Solution Explorer
2. Right-click on a project within your solution
3. Click on Manage NuGet Packages
4. Click on the Browse tab and search for "APIVerve.API.SudokuGenerator"
5. Click on the APIVerve.API.SudokuGenerator package, select the appropriate version in the right-tab and click Install

---

## Configuration

Before using the sudoku API client, you have to setup your account and obtain your API Key.
You can get it by signing up at [https://apiverve.com](https://apiverve.com)

---

## Quick Start

Here's a simple example to get you started quickly:

```csharp
using System;
using APIVerve;

class Program
{
    static async Task Main(string[] args)
    {
        // Initialize the API client
        var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

        // Make the API call
        try
        {
            var response = await apiClient.ExecuteAsync(queryOptions);

            if (response.Error != null)
            {
                Console.WriteLine($"API Error: {response.Error}");
            }
            else
            {
                Console.WriteLine("Success!");
                // Access response data using the strongly-typed ResponseObj properties
                Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
        }
    }
}
```

---

## Usage

The APIVerve.API.SudokuGenerator API documentation is found here: [https://docs.apiverve.com/ref/sudoku](https://docs.apiverve.com/ref/sudoku).
You can find parameters, example responses, and status codes documented here.

### Setup

###### Authentication
APIVerve.API.SudokuGenerator API uses API Key-based authentication. When you create an instance of the API client, you can pass your API Key as a parameter.

```csharp
// Create an instance of the API client
var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");
```

---

## Usage Examples

### Basic Usage (Async/Await Pattern - Recommended)

The modern async/await pattern provides the best performance and code readability:

```csharp
using System;
using System.Threading.Tasks;
using APIVerve;

public class Example
{
    public static async Task Main(string[] args)
    {
        var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

        var response = await apiClient.ExecuteAsync(queryOptions);

        if (response.Error != null)
        {
            Console.WriteLine($"Error: {response.Error}");
        }
        else
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
    }
}
```

### Synchronous Usage

If you need to use synchronous code, you can use the `Execute` method:

```csharp
using System;
using APIVerve;

public class Example
{
    public static void Main(string[] args)
    {
        var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

        var response = apiClient.Execute(queryOptions);

        if (response.Error != null)
        {
            Console.WriteLine($"Error: {response.Error}");
        }
        else
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
    }
}
```

---

## Error Handling

The API client provides comprehensive error handling. Here are some examples:

### Handling API Errors

```csharp
using System;
using System.Threading.Tasks;
using APIVerve;

public class Example
{
    public static async Task Main(string[] args)
    {
        var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

        var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

        try
        {
            var response = await apiClient.ExecuteAsync(queryOptions);

            // Check for API-level errors
            if (response.Error != null)
            {
                Console.WriteLine($"API Error: {response.Error}");
                Console.WriteLine($"Status: {response.Status}");
                return;
            }

            // Success - use the data
            Console.WriteLine("Request successful!");
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
        }
        catch (ArgumentException ex)
        {
            // Invalid API key or parameters
            Console.WriteLine($"Invalid argument: {ex.Message}");
        }
        catch (System.Net.Http.HttpRequestException ex)
        {
            // Network or HTTP errors
            Console.WriteLine($"Network error: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Other errors
            Console.WriteLine($"Unexpected error: {ex.Message}");
        }
    }
}
```

### Comprehensive Error Handling with Retry Logic

```csharp
using System;
using System.Threading.Tasks;
using APIVerve;

public class Example
{
    public static async Task Main(string[] args)
    {
        var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

        // Configure retry behavior (max 3 retries)
        apiClient.SetMaxRetries(3);        // Retry up to 3 times (default: 0, max: 3)
        apiClient.SetRetryDelay(2000);     // Wait 2 seconds between retries

        var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

        try
        {
            var response = await apiClient.ExecuteAsync(queryOptions);

            if (response.Error != null)
            {
                Console.WriteLine($"API Error: {response.Error}");
            }
            else
            {
                Console.WriteLine("Success!");
                Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed after retries: {ex.Message}");
        }
    }
}
```

---

## Advanced Features

### Custom Headers

Add custom headers to your requests:

```csharp
var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

// Add custom headers
apiClient.AddCustomHeader("X-Custom-Header", "custom-value");
apiClient.AddCustomHeader("X-Request-ID", Guid.NewGuid().ToString());

var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

var response = await apiClient.ExecuteAsync(queryOptions);

// Remove a header
apiClient.RemoveCustomHeader("X-Custom-Header");

// Clear all custom headers
apiClient.ClearCustomHeaders();
```

### Request Logging

Enable logging for debugging:

```csharp
var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]", isDebug: true);

// Or use a custom logger
apiClient.SetLogger(message =>
{
    Console.WriteLine($"[LOG] {DateTime.Now:yyyy-MM-dd HH:mm:ss} - {message}");
});

var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

var response = await apiClient.ExecuteAsync(queryOptions);
```

### Retry Configuration

Customize retry behavior for failed requests:

```csharp
var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]");

// Set retry options
apiClient.SetMaxRetries(3);           // Retry up to 3 times (default: 0, max: 3)
apiClient.SetRetryDelay(1500);        // Wait 1.5 seconds between retries (default: 1000ms)

var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};

var response = await apiClient.ExecuteAsync(queryOptions);
```

### Dispose Pattern

The API client implements `IDisposable` for proper resource cleanup:

```csharp
using (var apiClient = new SudokuGeneratorAPIClient("[YOUR_API_KEY]"))
{
    var queryOptions = new SudokuGeneratorQueryOptions {
  difficulty = "medium"
};
    var response = await apiClient.ExecuteAsync(queryOptions);
    Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented));
}
// HttpClient is automatically disposed here
```

---

## Example Response

```json
{
  "status": "ok",
  "error": null,
  "data": {
    "puzzle": {
      "grid": "----6--2-8-5-9-7-6-6-4---81--6------318---469--46-9------15-83--83----5254--8----",
      "html": "<html><head><title>Sudoku Puzzle</title><style>table {border-collapse: collapse; width: 300px; height: 300px;}td {text-align: center; width: 30px; height: 30px; padding: 0;}input {width: 100%; height: 100%; text-align: center; font-size: 18px; border: none;}</style></head><body><table><tr><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='6' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='2' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='8' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='5' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='9' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='7' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='6' maxlength='1' disabled />                    </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='6' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='4' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='8' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='1' maxlength='1' disabled />                    </td></tr><tr><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='6' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='3' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='1' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='8' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='4' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='6' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='9' maxlength='1' disabled />                    </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='4' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='6' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='9' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td></tr><tr><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='1' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='5' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='8' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='3' maxlength='1' disabled />                    </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='8' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='3' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='5' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='2' maxlength='1' disabled />                    </td></tr><tr><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='5' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='4' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='8' maxlength='1' disabled />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                      <input type='text' value='' maxlength='1'  />                    </td></tr></table></body></html>",
      "image": {
        "imageName": "eda25e0e-6919-4e71-aa0e-3190ad10000d_puzzle.png",
        "format": ".png",
        "downloadURL": "https://storage.googleapis.com/apiverve.appspot.com/sudoku/eda25e0e-6919-4e71-aa0e-3190ad10000d_puzzle.png?GoogleAccessId=635500398038-compute%40developer.gserviceaccount.com&Expires=1761064869&Signature=aEF%2FbLp6X5vyN4ap6lUWN3cx4YJC8FqbFhSIkkar6MduT%2B5fiYukYEg%2BE5SKcrAjOIVB08%2FMNWywtr47%2Be1ZXsve0wbLRLs1LXvjbFUSG6BIfeq7%2F%2FeYKy5qXrp9NTiOryFJG5nwtrGdKMx759nj07mxwl9ND6VjGG5VUMcDoTh6%2BkRexBAxSRJ1rNVgi7OVdKT8aRRSLXRuLh%2BmMlGE1Ec%2FCOoG4tm6Y71rxK3KFE5pf0EpOchjF7Hxq971pnuDWDH9ZLbYEPC1tGq9xzPu80gsE398Ctjfcrey4rnlfnR4TAg4pRdVPkc%2BklrwCm0gNj7OFOrAyC%2FnrDVeyAHSkQ%3D%3D",
        "expires": 1761064869960
      }
    },
    "solution": {
      "grid": "471568923835291746269473581926814375318725469754639218697152834183947652542386197",
      "html": "<html><head><title>Sudoku Solution</title><style>table {border-collapse: collapse; width: 300px; height: 300px;}td {text-align: center; width: 30px; height: 30px; padding: 0;}input {width: 100%; height: 100%; text-align: center; font-size: 18px; border: none;}</style></head><body><table><tr><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td></tr><tr><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='5' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='4' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='2' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='3' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='8' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='6' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 3px solid #000;'>                        <input type='text' value='1' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;'>                        <input type='text' value='9' maxlength='1' disabled />                      </td><td style='border-top: 1px solid #000;border-bottom: 3px solid #000;border-left: 1px solid #000;border-right: 3px solid #000;'>                        <input type='text' value='7' maxlength='1' disabled />                      </td></tr></table></body></html>",
      "image": {
        "imageName": "d6adc543-c678-4d30-9840-cdcc43fef014_solution.png",
        "format": ".png",
        "downloadURL": "https://storage.googleapis.com/apiverve.appspot.com/sudoku/d6adc543-c678-4d30-9840-cdcc43fef014_solution.png?GoogleAccessId=635500398038-compute%40developer.gserviceaccount.com&Expires=1761064871&Signature=VSpC73U7soWFCzGHOCFgIiFkxFl0vfPd9EKUdys%2FJczyzSKUXjQ4pUVRRG8q0ZHt8Ol2iwaVeUTIUyj2mrWSil8bltNORvv%2BOozd9QDqQS%2FJDAgRc8imkQ3FM40D%2BEQYLga2ApHEEU%2Bvkx8RT9qOF0JegJmSw%2Foi4nCjZ1zMuzLaS7%2B3Cb0bBCghs7UJMOYJFJMoK4c2HoabDSQRwTqZkzNCediLSKK00o0A3RFFhfuWa40Oh0GyGCza%2Ft3WbfgNNHcFRfjjLOE1Ff3W3pVAjxO2qjgsKkEb9T7mVAltXgS0GenhOCP6brSeNA8tPogmcXaBdpTmNQN5mZY1%2B0whrQ%3D%3D",
        "expires": 1761064871671
      }
    },
    "difficulty": "medium"
  }
}
```

---

## Customer Support

Need any assistance? [Get in touch with Customer Support](https://apiverve.com/contact).

---

## Updates
Stay up to date by following [@apiverveHQ](https://twitter.com/apiverveHQ) on Twitter.

---

## Legal

All usage of the APIVerve website, API, and services is subject to the [APIVerve Terms of Service](https://apiverve.com/terms) and all legal documents and agreements.

---

## License
Licensed under the The MIT License (MIT)

Copyright (&copy;) 2025 APIVerve, and EvlarSoft LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
