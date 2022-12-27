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

export const favoriteAction = async ({ request, params }: any) => {
  let formData = await request.formData();

  const favorite = {
    favorite: formData.get("favorite") === "true",
  };

  return fetch(`http://localhost:3001/users/${params.id}`, {
    method: "PATCH",
    body: JSON.stringify(favorite),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
