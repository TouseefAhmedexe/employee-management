import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>Employee Management</span>
      <div className={styles.links}>
        <Link to="/">Employees</Link>
        <Link to="/add">Add Employee</Link>
      </div>
    </nav>
  )
}

export default Navbar
