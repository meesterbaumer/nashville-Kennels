import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const AnimalContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([])

  const getAnimals = () => {
    return fetch("http://localhost:8088/animals")
    .then(res => res.json())
    .then(setAnimals)
  }

  const getAnimalById = (id) => {
    return fetch(`http://localhost:8088/animals/${id}`)
      .then(res => res.json())
  }

  const addAnimal = animal => {
    return fetch("http://localhost:8088/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animal)
    })
    .then(getAnimals)
  }

  const updateAnimal = animal => {
    return fetch(`http://localhost:8088/animals/${animal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animal)
    })
    .then(getAnimals)
  }

  /*
        You return a context provider which has the
        `animals` state, the `addAnimal` function,
        and the `getAnimals` function as keys. This
        allows any child elements to access them.
    */
  return (
    <AnimalContext.Provider value={{
      animals, addAnimal, getAnimals, getAnimalById, updateAnimal
    }}>
      {props.children}
    </AnimalContext.Provider>
  )
}