import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider";
import "./Employee.css"
import { Link } from "react-router-dom";

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
            return <Link key={employee.id} to={`/employees/${employee.id}`}>
                            <h3>{employee.name}</h3>
                        </Link>
          })
        }
      </article>
    </>
  )
}