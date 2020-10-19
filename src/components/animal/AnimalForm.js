import React, { useContext, useEffect, useState } from "react";
import { AnimalContext } from "./AnimalProvider";
import { LocationContext } from "../location/LocationProvider";
import "./Animal.css";

export const AnimalForm = (props) => {
  const { addAnimal, animals, updateAnimal, getAnimals } = useContext(
    AnimalContext
  );
  const { locations, getLocations } = useContext(LocationContext);

  const [animal, setAnimal] = useState({});

  const editMode = props.match.params.hasOwnProperty("animalId");

  const handleControlledInputChange = (event) => {
    const newAnimal = Object.assign({}, animal);
    newAnimal[event.target.name] = event.target.value;
    setAnimal(newAnimal);
  };

  const getAnimalInEditMode = () => {
    if (editMode) {
      const animalId = parseInt(props.match.params.animalId);
      const selectedAnimal = animals.find((a) => a.id === animalId) || {};
      setAnimal(selectedAnimal);
    }
  };

  useEffect(() => {
    getAnimals();
    getLocations();
  }, []);

  useEffect(() => {
    getAnimalInEditMode();
  }, [animals]);

  const admitAnimal = () => {
    const locationId = parseInt(animal.locationId);

    if (locationId === 0) {
      window.alert("Please select a Location");
    } else {
      if (editMode) {
        updateAnimal({
          id: animal.id,
          name: animal.name,
          breed: animal.breed,
          locationId: locationId,
          status: animal.status,
          customerId: parseInt(localStorage.getItem("kennel_customer")),
        }).then(() => props.history.push("/animals"));
      } else {
        addAnimal({
          name: animal.name,
          breed: animal.breed,
          locationId: locationId,
          status: animal.status,
          customerId: parseInt(localStorage.getItem("kennel_customer")),
        }).then(() => props.history.push("/animals"));
      }
    }
  };

  return (
    <form>
      <h2 className="animalForm__title">
        {editMode ? "Update Animal" : "Admit Animal"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="animalName">Animal name: </label>
          <input
            type="text"
            name="name"
            id="animalName"
            required
            autoFocus
            className="form-control"
            placeholder="Animal name"
            defaultValue={animal.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="breed">Breed: </label>
          <input
            type="text"
            name="breed"
            id="breed"
            required
            autoFocus
            className="form-control"
            placeholder="Breed of animal"
            defaultValue={animal.breed}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="locationId">Assign to location: </label>
          <select
            proptype="int"
            value={animal.locationId}
            onChange={handleControlledInputChange}
            name="locationId"
            id="animalLocation"
            className="form-control"
          >
            <option value="0">Select a location</option>
            {locations.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="status">Treatments: </label>
          <textarea
            type="text"
            name="status"
            className="form-control"
            proptype="varchar"
            value={animal.status}
            onChange={handleControlledInputChange}
          ></textarea>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          admitAnimal();
        }}
        className="btn btn-primary"
      >
        {editMode ? "Save Updates" : "Make Reservation"}
      </button>
    </form>
  );
};
