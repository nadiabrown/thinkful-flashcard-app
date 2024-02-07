import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState(null);
  const [cardDetails, setCardDetails] = useState({ front: "", back: "" });
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(Number(deckId))
      .then((fetchedDeck) => {
        setDeck(fetchedDeck);
      })
      .catch((error) => {
        console.error("Failed to load deck:", error);
      });
  }, [deckId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    const signal = controller.signal;
    console.log(deckId);

    try {
      const card = { ...cardDetails, deckId: Number(deckId) };
      await createCard(deckId, card, signal);

      setCardDetails({ front: "", back: "" });
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("An error occurred while creating the card:", error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="breadcrumb-nav">
        <p>/</p>
        <p>{deck.name}</p>
      </div>
      <h1>{deck.name}: Add Card</h1>

      <CardForm
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        initialCardDetails={cardDetails}
      />

      <Link to={`/decks/${deckId}`}>Done</Link>
    </>
  );
}

export default AddCard;
