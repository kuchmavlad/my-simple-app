import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";

import { formDataTransform } from "utils/formDataTransform";

export const UserCreatePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <div className="itemWrapper">
        <div className="itemTitle">Name:</div>
        <div>
          <input
            placeholder="Name"
            aria-label="Name"
            type="text"
            name="name"
            // defaultValue={name}
            required
          />
          <input
            placeholder="Username"
            aria-label="username"
            type="text"
            name="username"
            // defaultValue={username}
            required
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
            // defaultValue={email}
            required
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
            // defaultValue={phone}
            required
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
            // defaultValue={website}
            required
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
              // defaultValue={street}
              required
            />
            <input
              type="text"
              name="address.suite"
              placeholder="Suite"
              aria-label="Suite"
              // defaultValue={suite}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="address.city"
              placeholder="City"
              aria-label="City"
              // defaultValue={city}
              required
            />
            <input
              type="text"
              name="address.zipcode"
              placeholder="Zipcode"
              aria-label="Zipcode"
              // defaultValue={zipcode}
              required
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
  );
};

export const userCreateAction = async ({ request, params }: any) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const newUser = { ...updates, id: params.id };

  return fetch(`http://localhost:3001/users`, {
    method: "POST",
    body: JSON.stringify(formDataTransform(newUser)),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => redirect(`/users/${params.id}`));
};
