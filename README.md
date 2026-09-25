# API CI/CD Workflow

This project is a lightweight API test automation setup built with Node.js and Newman (Postman CLI). It runs Postman collections in CI/CD pipelines and validates API responses against expected status codes, response times, and response content.

## Overview

The workflow uses:

- Node.js
- Newman for executing Postman collections
- dotenv for loading environment variables
- A custom script to inject the base URL at runtime

The main test runner is:

- `run-newman.js`
- `package.json`

It executes the default collection:

- `collection.postman_collection.json`

Additional collections included in the repository:

- `Smoke test.postman_collection.json`
- `Regression test.postman_collection.json`

## Project Structure

```text
API-CI-CD-workflow/
├── collection.postman_collection.json
├── Smoke test.postman_collection.json
├── Regression test.postman_collection.json
├── run-newman.js
├── package.json
├── .env.example (optional, add if needed)
├── README.md
└── node_modules/ (generated after install)
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- Access to the target API base URL

## Installation

Install dependencies:

```bash
npm install
```

## Configuration

Set your API base URL in a `.env` file:

```env
BASE_URL=https://jsonplaceholder.typicode.com
```

You can also set it directly in the terminal before running the tests:

```bash
export BASE_URL=https://jsonplaceholder.typicode.com
```

On Windows PowerShell:

```powershell
$env:BASE_URL = "https://jsonplaceholder.typicode.com"
```

## Run Tests

Run the default API test suite:

```bash
npm test
```

This executes:

```bash
node run-newman.js
```

The script:

1. Loads the `.env` file if present
2. Reads `BASE_URL` from the environment or `.env`
3. Runs the Postman collection with `newman`
4. Passes the base URL using `--env-var baseURL={{value}}`

## What the tests validate

The test collections check things like:

- HTTP status code
- Response time
- Response body is not empty
- Response format matches expectations
- Specific fields exist in the returned JSON

## Example

The default collection targets endpoints such as:

```text
{{baseURL}}/posts
{{baseURL}}/posts/1
```

The project is configured for the JSONPlaceholder API by default but can be adapted to any REST API by changing the `BASE_URL`.

## Notes

- The script exits with an error if `BASE_URL` is missing.
- The default collection is `collection.postman_collection.json`.
- You can run smoke and regression collections separately in Postman or adapt the script to execute any one of them.

## Useful Commands

```bash
npm install
npm test
```

## CI/CD Usage

This project is suitable for pipeline-based API validation in tools such as:

- GitHub Actions
- GitLab CI
- Jenkins
- Azure DevOps

You can run:

```bash
npm test
```

as a validation step before deployment.
