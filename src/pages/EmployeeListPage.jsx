import { useState, useEffect } from 'react'
import { getAllEmployees, deleteEmployee } from '../api/employeeApi'
import EmployeeTable from '../components/EmployeeTable'
import styles from './EmployeeListPage.module.css'

const PAGE_SIZE = 8

function EmployeeListPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('employee_name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterAge, setFilterAge] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function fetchEmployees() {
    setLoading(true)
    setError('')
    try {
      const data = await getAllEmployees()
      setEmployees(data)
    } catch (err) {
      setError('Failed to load employees. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    try {
      await deleteEmployee(id)
      setEmployees((prev) => prev.filter((emp) => emp.id !== id))
    } catch (err) {
      setError('Failed to delete employee. Please try again.')
    }
  }

  const filtered = employees
    .filter((emp) => {
      const matchesSearch = emp.employee_name
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesAge = filterAge
        ? emp.employee_age === Number(filterAge)
        : true
      return matchesSearch && matchesAge
    })
    .sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]
      if (sortField === 'employee_salary' || sortField === 'employee_age') {
        valA = Number(valA)
        valB = Number(valB)
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function handleSearchChange(e) {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  function handleFilterAgeChange(e) {
    setFilterAge(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Employees</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearchChange}
          className={styles.input}
        />

        <input
          type="number"
          placeholder="Filter by age"
          value={filterAge}
          onChange={handleFilterAgeChange}
          className={styles.input}
          min="0"
        />

        <select
          value={sortField}
          onChange={(e) => { setSortField(e.target.value); setCurrentPage(1) }}
          className={styles.select}
        >
          <option value="employee_name">Sort by Name</option>
          <option value="employee_salary">Sort by Salary</option>
          <option value="employee_age">Sort by Age</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1) }}
          className={styles.select}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p className={styles.message}>Loading employees...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && paginated.length === 0 && (
        <p className={styles.message}>No employees found.</p>
      )}

      {!loading && !error && paginated.length > 0 && (
        <>
          <EmployeeTable employees={paginated} onDelete={handleDelete} />

          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={styles.pageBtn}
            >
              Previous
            </button>

            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageBtn}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default EmployeeListPage
