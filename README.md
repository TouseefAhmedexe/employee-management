# Employee Management

A React + Vite application for managing employees via a REST API.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the project root:
   ```
   VITE_API_BASE_URL=https://dummy.restapiexample.com/api/v1
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Features

- List all employees fetched from a REST API
- Search employees by name
- Filter employees by age
- Sort by name, salary, or age (ascending or descending)
- Frontend pagination (8 employees per page)
- Add a new employee (POST)
- Edit an existing employee (PUT)
- Delete an employee (DELETE)
- Loading and error states on all API calls
- Meaningful error messages that include HTTP status codes

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for the employee REST API |

## Project Structure

```
src/
  api/
    axiosInstance.js   - Axios instance with baseURL from env
    employeeApi.js     - Reusable API functions (GET, POST, PUT, DELETE)
  components/
    Navbar.jsx         - Top navigation bar
    EmployeeTable.jsx  - Table displaying employee rows
    EmployeeForm.jsx   - Shared form for create and edit
  pages/
    EmployeeListPage.jsx  - Main listing page with search, filter, sort, pagination
    AddEmployeePage.jsx   - Create employee page
    EditEmployeePage.jsx  - Edit employee page
```

## API

Uses [Dummy REST API Example](https://dummy.restapiexample.com) as the test backend.
