import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider";
import { Animal } from "./Animal";
import "./Animal.css"
import { LocationContext } from "../location/LocationProvider";
import { CustomerContext } from "../customer/CustomerProvider";

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

  /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
  useEffect(() => {
    getAnimals().then(getLocations).then(getCustomers)
  }, [])

  return (
    <article className="animals">
      {
        animals.map(animal => {
          const owner = customers.find(c => c.id === animal.customerId) || {}
          const clinic = locations.find(l => l.id === animal.locationId) || {}

          return <Animal key={animal.id}
          location={clinic}
          customer={owner}
          animal={animal} />
        })
      }
    </article>
  )
}