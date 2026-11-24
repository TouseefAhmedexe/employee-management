import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById, updateEmployee } from '../api/employeeApi'
import EmployeeForm from '../components/EmployeeForm'
import styles from './FormPage.module.css'

function getErrorMessage(err) {
  if (err.response) {
    const status = err.response.status
    const message = err.response.data && err.response.data.message
    if (message) return `Error ${status}: ${message}`
    if (status === 404) return 'Employee not found (404).'
    if (status === 500) return 'Server error (500). Please try again later.'
    return `Request failed with status ${status}.`
  }
  if (err.request) return 'No response from server. Check your connection.'
  return err.message || 'An unexpected error occurred.'
}

function EditEmployeePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const data = await getEmployeeById(id)
        setEmployee(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    fetchEmployee()
  }, [id])

  async function handleSubmit(formData) {
    setSubmitting(true)
    setError('')
    try {
      await updateEmployee(id, formData)
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className={styles.message}>Loading...</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Employee</h1>
      {employee && (
        <EmployeeForm
          initialValues={employee}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={error}
        />
      )}
      {!employee && error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default EditEmployeePage
