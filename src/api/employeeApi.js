import axiosInstance from './axiosInstance'

export async function getAllEmployees() {
  const response = await axiosInstance.get('/employees')
  return response.data.data
}

export async function getEmployeeById(id) {
  const response = await axiosInstance.get(`/employee/${id}`)
  return response.data.data
}

export async function createEmployee(employeeData) {
  const response = await axiosInstance.post('/create', employeeData)
  return response.data.data
}

export async function updateEmployee(id, employeeData) {
  const response = await axiosInstance.put(`/update/${id}`, employeeData)
  return response.data.data
}

export async function deleteEmployee(id) {
  const response = await axiosInstance.delete(`/delete/${id}`)
  return response.data
}
