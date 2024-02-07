import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, listDecks, deleteCard } from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    listDecks().then((fetchedDecks) => {
      setDecks(fetchedDecks);
    });
  }, []);

  useEffect(() => {
    readDeck(Number(deckId)).then((fetchedDeck) => {
      setDeck(fetchedDeck);
    });
  }, [deckId]);

  const deleteDeckHandler = async (id) => {
    try {
      await deleteDeck(id);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== id));
      history.push("/");
    } catch (error) {
      console.error("Failed to delete deck:", error);
    }
  };

  const deleteCardHandler = async (cardId) => {
    try {
      await deleteCard(cardId);
      setDeck({
        ...deck,
        cards: deck.cards.filter((card) => card.id !== cardId),
      });
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <p>/{deck.name}</p>
      </div>

      <div className="deck-info">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`}>Edit</Link>
        <Link to={`/decks/${deckId}/study`}>Study</Link>
        <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
        <button
          className="delete-button"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this deck?")) {
              deleteDeckHandler(deck.id);
            }
          }}
        >
          Delete
        </button>
      </div>

      <div className="cards">
        <h1>Cards</h1>
        {deck.cards.map((card, index) => (
          <div key={index} className="card">
            <p>{card.front}</p>
            <p>{card.back}</p>
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this card?")
                ) {
                  deleteCardHandler(card.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;
