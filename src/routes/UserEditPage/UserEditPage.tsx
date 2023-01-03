import React from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { UserItem } from "dtos";
import { formDataTransform } from "utils/formDataTransform";

import "./userEditPage.css";

export const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { name, username, email, address, phone, website } =
    useLoaderData() as UserItem;

  const { street, suite, city, zipcode } = address;

  return (
    <div className="userWrapper">
      <h2>User edit</h2>
      <Form method="post" id="contact-form">
        <div className="itemWrapper">
          <div className="itemTitle">Name:</div>
          <div>
            <input
              placeholder="Name"
              aria-label="Name"
              type="text"
              name="name"
              defaultValue={name}
            />
            <input
              placeholder="Username"
              aria-label="username"
              type="text"
              name="username"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="itemWrapper">
          <div className="itemTitle">Email:</div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Example@.com"
              defaultValue={email}
            />
          </div>
        </div>

        <div className="itemWrapper">
          <div className="itemTitle">Phone:</div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="123-456-7890"
              defaultValue={phone}
            />
          </div>
        </div>

        <div className="itemWrapper">
          <div className="itemTitle">Website:</div>
          <div>
            <input
              type="text"
              name="website"
              placeholder="example.com"
              defaultValue={website}
            />
          </div>
        </div>
        <div className="itemWrapper">
          <div className="itemTitle">Address:</div>
          <div>
            <div>
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                aria-label="Street"
                defaultValue={street}
              />
              <input
                type="text"
                name="address.suite"
                placeholder="Suite"
                aria-label="Suite"
                defaultValue={suite}
              />
            </div>
            <div>
              <input
                type="text"
                name="address.city"
                placeholder="City"
                aria-label="City"
                defaultValue={city}
              />
              <input
                type="text"
                name="address.zipcode"
                placeholder="Zipcode"
                aria-label="Zipcode"
                defaultValue={zipcode}
              />
            </div>
          </div>
        </div>

        <p>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
};

export const userEditAction = async ({ request, params }: any) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  return fetch(`http://localhost:3001/users/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(formDataTransform(updates)),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => redirect(`/users/${params.id}`));
};
