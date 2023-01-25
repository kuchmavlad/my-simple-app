import React from "react";
import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { Favorite } from "components";

import { UserItem } from "dtos";
import {
  ENDPOINT_PATH,
  FORM_METHODS,
  HTTP_METHODS,
  PATHS,
} from "../../constants";

import "./userPage.css";

export const UserPage: React.FC = () => {
  const { name, username, email, address, phone, website, favorite, id } =
    useLoaderData() as UserItem;

  const { street, suite, city, zipcode } = address;

  return (
    <div id="contact" data-testid="userPage">
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
          <Form action={PATHS.EDIT}>
            <button type="submit">Edit</button>
          </Form>
          <Form
            method={FORM_METHODS.POST}
            action={PATHS.DESTROY}
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
          <Form action={`/${PATHS.POSTS}/${id}`}>
            <button type="submit">My posts</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  return await fetch(`${ENDPOINT_PATH.USERS}/${params.userId}`).then((resp) =>
    resp.json()
  );
};

export const userAction = async ({ request, params }: LoaderFunctionArgs) => {
  let formData = await request.formData();

  const favorite = {
    favorite: formData.get("favorite") === "true",
  };

  return await fetch(`${ENDPOINT_PATH.USERS}/${params.userId}`, {
    method: HTTP_METHODS.PATCH,
    body: JSON.stringify(favorite),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
