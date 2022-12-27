import React from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";

import { Favorite } from "components";
import { UserItem } from "dtos/UserItem";

import "./userPaage.css";

export const UserPage: React.FC = () => {
  const { name, username, email, address, phone, website, favorite } =
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
        </div>
      </div>
    </div>
  );
};

export const userLoader = async ({ params }: any) => {
  return await fetch(`http://localhost:3001/users/${params.id}`).then((resp) =>
    resp.json()
  );
};

export const createUserAction = async ({ params }: any) => {
  return await fetch(`http://localhost:3001/users/${params.id}`, {
    method: "DELETE",
  }).then(() => redirect("/users"));
};