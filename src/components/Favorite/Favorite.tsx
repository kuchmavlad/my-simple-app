import React from "react";
import { Form } from "react-router-dom";

import "./favorite.css";

interface FavoriteProps {
  favorite: boolean | undefined;
}

export const Favorite: React.FC<FavoriteProps> = ({ favorite }) => {
  return (
    <Form method="post" id="favorite">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
