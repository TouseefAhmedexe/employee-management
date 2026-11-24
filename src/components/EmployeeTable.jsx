import { useNavigate } from 'react-router-dom'
import styles from './EmployeeTable.module.css'

function EmployeeTable({ employees, onDelete, deletingId }) {
  const navigate = useNavigate()

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <tr key={emp.id}>
            <td>{index + 1}</td>
            <td>{emp.employee_name}</td>
            <td>${Number(emp.employee_salary).toLocaleString()}</td>
            <td>{emp.employee_age}</td>
            <td className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => navigate(`/edit/${emp.id}`)}
                disabled={deletingId === emp.id}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(emp.id)}
                disabled={deletingId === emp.id}
              >
                {deletingId === emp.id ? 'Deleting...' : 'Delete'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default EmployeeTable
