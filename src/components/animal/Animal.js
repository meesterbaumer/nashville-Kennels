import React from "react"
import "./Animal.css"

export const Animal = ({animal, location, customer}) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">breed: {animal.breed}</div>
        <div className="animal__location">Location: {location.name}</div>
        <div className="animal__customer">Customer: {customer.name}</div>
    </section>
)