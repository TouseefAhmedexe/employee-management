import { useState, useEffect } from 'react'
import { getAllEmployees, deleteEmployee } from '../api/employeeApi'
import EmployeeTable from '../components/EmployeeTable'
import styles from './EmployeeListPage.module.css'

const PAGE_SIZE = 8

function getErrorMessage(err) {
  if (err.response) {
    const status = err.response.status
    const message = err.response.data && err.response.data.message
    if (message) return `Error ${status}: ${message}`
    if (status === 404) return 'Resource not found (404).'
    if (status === 500) return 'Server error (500). Please try again later.'
    return `Request failed with status ${status}.`
  }
  if (err.request) return 'No response from server. Check your connection.'
  return err.message || 'An unexpected error occurred.'
}

function EmployeeListPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
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
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    setDeletingId(id)
    setError('')
    try {
      await deleteEmployee(id)
      setEmployees((prev) => {
        const updated = prev.filter((emp) => emp.id !== id)
        const newTotalPages = Math.ceil(
          updated.filter((emp) => {
            const matchesSearch = emp.employee_name
              .toLowerCase()
              .includes(search.toLowerCase())
            const matchesAge = filterAge
              ? Number(emp.employee_age) === Number(filterAge)
              : true
            return matchesSearch && matchesAge
          }).length / PAGE_SIZE
        )
        setCurrentPage((p) => Math.min(p, Math.max(newTotalPages, 1)))
        return updated
      })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = employees
    .filter((emp) => {
      const matchesSearch = emp.employee_name
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesAge = filterAge
        ? Number(emp.employee_age) === Number(filterAge)
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

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1)
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
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

      {!loading && !error && filtered.length === 0 && (
        <p className={styles.message}>No employees found.</p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <EmployeeTable
            employees={paginated}
            onDelete={handleDelete}
            deletingId={deletingId}
          />

          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={safePage === 1}
              className={styles.pageBtn}
            >
              Previous
            </button>

            <span className={styles.pageInfo}>
              Page {safePage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={safePage === totalPages}
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
