import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck({ name, description })
      .then((response) => {
        const deckId = response.id;
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Failed to create deck:", error);
      });
    setName("");
    setDescription("");
  };

  return (
    <div>
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <p>/Create Deck</p>
      </div>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input type="submit" value="submit" />
      </form>
      <button onClick={() => history.push("/")}>Cancel</button>
    </div>
  );
}

export default CreateDeck;
