import { useState } from 'react'
import styles from './EmployeeForm.module.css'

function EmployeeForm({ initialValues, onSubmit, submitting, error }) {
  const [form, setForm] = useState(
    initialValues || { employee_name: '', employee_salary: '', employee_age: '' }
  )

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label htmlFor="employee_name">Name</label>
        <input
          id="employee_name"
          name="employee_name"
          type="text"
          value={form.employee_name}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="employee_salary">Salary</label>
        <input
          id="employee_salary"
          name="employee_salary"
          type="number"
          value={form.employee_salary}
          onChange={handleChange}
          required
          min="0"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="employee_age">Age</label>
        <input
          id="employee_age"
          name="employee_age"
          type="number"
          value={form.employee_age}
          onChange={handleChange}
          required
          min="18"
          max="65"
          className={styles.input}
        />
      </div>

      <button type="submit" disabled={submitting} className={styles.submitBtn}>
        {submitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default EmployeeForm
