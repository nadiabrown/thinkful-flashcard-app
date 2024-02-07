import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

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

    const controller = new AbortController();
    const signal = controller.signal;

    const updatedDeck = { ...deck, name: name, description: description };
    updateDeck(updatedDeck, signal)
      .then(() => {
        console.log("Deck updated successfully");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred while updating the deck:", error);
        }
      });
  };

  return (
    <div>
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
          value={name}
          onChange={handleInputChange}
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={handleInputChange}
        ></textarea>
        <Link to={`/decks/${deckId}`}>Cancel</Link>
        <button type="submit">Submit</button>
      </form>
      <Link to={`/decks/${deckId}`}></Link>
    </div>
  );
}

export default EditDeck;
