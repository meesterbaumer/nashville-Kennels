import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider";
import { Animal } from "./Animal";
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
  useEffect(() => {
    getAnimals()
  }, [])

  return (
    <article className="animals">
      {
        animals.map(animal => <Animal key={animal.id} animal={animal} />)
      }
    </article>
  )
}