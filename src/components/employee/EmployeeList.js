import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider";
import { Employee } from "./Employee";
import "./Employee.css"

export const EmployeeList = (props) => {
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  useEffect(() => {
    getEmployees().then(getLocations)
  }, [])

  return (
    <>
      <button onClick={() => props.history.push("/employees/create")}>
            Add Employee
      </button>
      <article className="employees">
        {
          employees.map(employee => {
            const employeeLocation = locations.find(loc => loc.id === employee.locationId) || {}
            return <Employee key={employee.id} location={employeeLocation} employee={employee}/>
          })
        }
      </article>
    </>
  )
}