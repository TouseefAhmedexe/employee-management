import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../api/employeeApi'
import EmployeeForm from '../components/EmployeeForm'
import styles from './FormPage.module.css'

function getErrorMessage(err) {
  if (err.response) {
    const status = err.response.status
    const message = err.response.data && err.response.data.message
    if (message) return `Error ${status}: ${message}`
    if (status === 422) return 'Validation failed (422). Check the fields and try again.'
    if (status === 500) return 'Server error (500). Please try again later.'
    return `Request failed with status ${status}.`
  }
  if (err.request) return 'No response from server. Check your connection.'
  return err.message || 'An unexpected error occurred.'
}

function AddEmployeePage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData) {
    setSubmitting(true)
    setError('')
    try {
      await createEmployee(formData)
      navigate('/')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  )
}

export default AddEmployeePage
