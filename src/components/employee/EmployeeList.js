import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { Employee } from "./Employee";
import "./Employee.css"

export const EmployeeList = () => {
  const { employees, getEmployees } = useContext(EmployeeContext)

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <article className="employees">
      {
        employees.map(employee => <Employee key={employee.id} employee={employee} />)
      }
    </article>
  )
}