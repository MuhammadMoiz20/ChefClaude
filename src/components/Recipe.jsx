import React from "react";

export default function Recipe({ markdownRecipe }) {
  return (
    <section>
      <h2>Chef Claude Recommends:</h2>
      <article
        className="suggested-recipe-container"
        aria-live="polite"
        dangerouslySetInnerHTML={{ __html: markdownRecipe }}
      />
    </section>
  );
}