import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

export const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        let data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (err) {
        setError(err);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, [deckId]);

  function nextCard() {
    if (cardIndex === deck.cards.length - 1) {
      const result = window.confirm("Do you want to restart the deck?");
      if (result) {
        setCardIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setCardIndex(cardIndex + 1);
    }
    setFlipped((prevState) => !prevState);
  }

  function flipCard() {
    setFlipped((prevState) => !prevState);
  }

  if (deck) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href={`/decks/${deck.id}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        <div className="col-sm-12">
          {deck.cards.length > 2 ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Card {cardIndex + 1} of {deck.cards.length}
                </h5>
                <p className="card-text">
                  {!flipped
                    ? `${deck.cards[cardIndex].front}`
                    : `${deck.cards[cardIndex].back}`}
                </p>
                <button className="btn btn-secondary m-2" onClick={flipCard}>
                  Flip
                </button>
                {flipped && (
                  <button
                    className="btn btn-primary float-right"
                    onClick={nextCard}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3>Not enough cards.</h3>
              <p>
                You need at least 3 cards to study. There are{" "}
                {deck.cards.length} cards in this deck.
              </p>
              <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary"
              >
                <span className="oi oi-plus" /> Add Cards
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default Study;
