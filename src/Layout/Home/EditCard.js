import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(Number(deckId)).then((fetchedDeck) => {
      setDeck(fetchedDeck);
    });
  }, [deckId]);

  useEffect(() => {
    readCard(Number(cardId)).then((fetchedCard) => {
      setCard(fetchedCard);
      setFront(fetchedCard.front);
      setBack(fetchedCard.back);
    });
  }, [cardId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "front") {
      setFront(value);
    } else if (name === "back") {
      setBack(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const updatedCard = {
      ...card,
      front,
      back,
    };

    updateCard(updatedCard)
      .then((response) => {
        console.log("Card updated successfully:", response);
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Failed to update card:", error);
      });
  };

  if (!card || !deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <p>/{deck.name}</p>
        <p>/Edit Card {card.id}</p>
      </div>

      <CardForm
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        initialCardDetails={{ front, back }}
      />

      <Link to={`/decks/${deckId}`}>Cancel</Link>
    </div>
  );
}

export default EditCard;
