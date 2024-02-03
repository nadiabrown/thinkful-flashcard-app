import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study() {
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(Number(deckId)).then((fetchedDeck) => {
      setDeck(fetchedDeck);
    });
  }, [deckId]);

  const flipCard = () => {
    if (isFlipped) {
      setIsFlipped(false);
    } else {
      setIsFlipped(true);
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex + 1 < deck.cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      const restart = window.confirm(
        "You have finished studying this deck. Would you like to restart?"
      );
      if (restart) {
        // Restart the deck
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        // Return to the home screen
        history.push("/");
      }
    }
  };

  const restartDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const goBackToHome = () => {
    history.push("/");
  };

  const addCardsToDeck = () => {
    // Logic to add cards to the deck
    // This could involve redirecting to a page where users can add cards
    history.push(`/decks/${deckId}/add`);
  };

  if (!deck || !deck.cards || deck.cards.length === 0) {
    return <div>Loading...</div>;
  }

  if (deck.cards.length <= 2) {
    return (
      <div className="not-enough-cards">
        <p>Not enough cards in this deck.</p>
        <button onClick={addCardsToDeck}>Add Cards</button>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  return (
    <>
      <h1>Study: {deck.name}</h1>
      <div className="card-container">
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
          {isFlipped ? (
            <div className="back">{currentCard.back}</div>
          ) : (
            <div className="front">{currentCard.front}</div>
          )}
        </div>
        <button onClick={flipCard}>Flip Card</button>
        {isFlipped && <button onClick={goToNextCard}>Next</button>}
      </div>
    </>
  );
}

export default Study;
