import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../api/employeeApi'
import EmployeeForm from '../components/EmployeeForm'
import styles from './FormPage.module.css'

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
      setError('Failed to create employee. Please try again.')
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
