import React from "react";

function CardForm({ handleFormSubmit, handleInputChange, initialCardDetails }) {
  const { front, back } = initialCardDetails || {};

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="front">Front:</label>
        <textarea
          name="front"
          id="front"
          value={front}
          onChange={handleInputChange}
        />

        <label htmlFor="back">Back:</label>
        <textarea
          name="back"
          id="back"
          value={back}
          onChange={handleInputChange}
        />
        <button onClick={handleFormSubmit}>Save</button>
      </form>
    </>
  );
}

export default CardForm;
