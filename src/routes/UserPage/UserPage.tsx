import React from "react";
import { Form, useLoaderData } from "react-router-dom";

import { Favorite } from "components";
import { UserItem } from "dtos";

import "./userPage.css";

export const UserPage: React.FC = () => {
  const { name, username, email, address, phone, website, favorite, id } =
    useLoaderData() as UserItem;

  const { street, suite, city, zipcode } = address;

  return (
    <div id="contact">
      <div>
        <img src="https://via.placeholder.com/150" alt="" />
      </div>

      <div>
        <h1>
          {name} <Favorite favorite={favorite} />
        </h1>
        <p>{`Username: ${username}`}</p>
        <p>{`Email: ${email}`}</p>
        <p>{`Address: ${city}, ${street}, ${suite}, ${zipcode}`}</p>
        <p>{`Phone: ${phone}`}</p>
        <p>{`Website: ${website}`}</p>

        <div id="contactButtons">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
          <Form action={`/posts/${id}`}>
            <button type="submit">My posts</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const userLoader = async ({ params }: any) => {
  return await fetch(`http://localhost:3001/users/${params.userId}`).then(
    (resp) => resp.json()
  );
};

export const userAction = async ({ request, params }: any) => {
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
