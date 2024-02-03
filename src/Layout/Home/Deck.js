import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState(null);
  const { deckId } = useParams();

  useEffect(() => {
    readDeck(Number(deckId)).then((fetchedDeck) => {
      setDeck(fetchedDeck);
      console.log(fetchedDeck);
    });
  }, [deckId]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <p>/{deck.name}</p>
      </div>

      <div className="deck-info">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`}>Edit</Link>
        <Link to={`/decks/${deckId}/study`}>Study</Link>
        <button>Add Cards</button>
        <button>Delete</button>
      </div>

      <div className="cards">
        <h1>Cards</h1>
        {deck.cards.map((card, index) => (
          <div key={index} className="card">
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Deck;
