import React, { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { UserItem } from "dtos";
import { formDataTransform, getUserInfo } from "utils";

import "./userActionsPage.css";

export const UserActionsPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useLoaderData() as UserItem;
  const { pathname } = useLocation();
  const [isEditPage, setIsEditPage] = useState(false);

  const {
    name,
    username,
    email,
    phone,
    website,
    street,
    suite,
    city,
    zipcode,
  } = getUserInfo(user, isEditPage);

  useEffect(() => {
    setIsEditPage(pathname.includes("edit"));
  }, [pathname]);

  return (
    <div className="userWrapper">
      <h2>User {isEditPage ? "edit" : "new"}</h2>
      <Form method="post" id="contact-form">
        <div className="itemWrapper">
          <div className="itemTitle">Name:</div>
          <div>
            <input
              placeholder="Name"
              aria-label="Name"
              type="text"
              name="name"
              required
              defaultValue={name}
            />
            <input
              placeholder="Username"
              aria-label="username"
              type="text"
              name="username"
              required
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
              required
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
              required
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
              required
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
                required
                defaultValue={street}
              />
              <input
                type="text"
                name="address.suite"
                placeholder="Suite"
                aria-label="Suite"
                required
                defaultValue={suite}
              />
            </div>
            <div>
              <input
                type="text"
                name="address.city"
                placeholder="City"
                aria-label="City"
                required
                defaultValue={city}
              />
              <input
                type="text"
                name="address.zipcode"
                placeholder="Zipcode"
                aria-label="Zipcode"
                required
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

export const userActions = async ({ request, params }: any) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const url = "http://localhost:3001/users";
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  if (request.url.includes("edit")) {
    return fetch(`${url}/${params.userId}`, {
      method: "PUT",
      body: JSON.stringify(formDataTransform(updates)),
      headers,
    }).then(() => redirect(`/users/${params.userId}`));
  } else if (request.url.includes("new")) {
    const newUser = { ...updates, id: +params.userId };

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(formDataTransform(newUser)),
      headers,
    }).then(() => redirect(`/users/${params.userId}`));
  } else if (request.url.includes("destroy")) {
    return await fetch(`${url}/${params.userId}`, {
      method: "DELETE",
    }).then(() => redirect("/users"));
  }
};
