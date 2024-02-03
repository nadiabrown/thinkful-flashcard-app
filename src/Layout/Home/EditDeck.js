import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(Number(deckId)).then((fetchedData) => {
      setDeck(fetchedData);
      setName(fetchedData.name);
      setDescription(fetchedData.description);
    });
  }, [deckId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <p>/{name}</p>
        <p>/Edit Deck</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name} // Bind the value to the state variable
          onChange={handleInputChange}
        ></input>
        <label htmlFor="description">Description</label>
        <textarea
          name="description" // Add name attribute to textarea
          id="description"
          value={description} // Bind the value to the state variable
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditDeck;
