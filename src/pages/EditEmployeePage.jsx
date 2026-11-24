import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById, updateEmployee } from '../api/employeeApi'
import EmployeeForm from '../components/EmployeeForm'
import styles from './FormPage.module.css'

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
        setError('Failed to load employee data.')
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
      setError('Failed to update employee. Please try again.')
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
