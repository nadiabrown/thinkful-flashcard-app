import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then((fetchedDecks) => {
      setDecks(fetchedDecks);
    });
  }, []);

  const deleteDeck = async (id) => {
    await fetch(`/api/decks/${id}`, {
      method: "DELETE",
    });

    setDecks(decks.filter((deck) => deck.id !== id));
  };

  return (
    <div>
      <Link to="decks/new" className="create-deck-button">
        Create Deck
      </Link>
      {decks.map((deck, index) => (
        <div key={index} class="deck">
          <h2>{deck.name}</h2>
          <p>{deck.cards.length} cards</p>
          <p>{deck.description}</p>
          <div class="buttons">
            <div>
              <Link
                class="gray-button"
                className="sub-button"
                to={`decks/${deck.id}/study`}
              >
                Study
              </Link>
              <Link
                class="blue-button"
                className="sub-button"
                to={`decks/${deck.id}`}
              >
                View
              </Link>
            </div>
            <div>
              <button
                className="delete-button"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this deck?")
                  ) {
                    deleteDeck(deck.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
