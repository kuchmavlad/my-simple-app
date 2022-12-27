import React, { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { UserItem } from "dtos/UserItem";
import { useAuth } from "hooks/useAuth";

import "./loginPage.css";

export const LoginPage: React.FC = () => {
  const user = useActionData() as UserItem;
  const navigate = useNavigate();
  const location = useLocation();
  const [fromPath, setFromPath] = useState(
    location.state?.from?.pathname || "/"
  );
  const { signIn } = useAuth();

  useEffect(() => {
    if (user) {
      signIn(user, () => navigate(fromPath, { replace: true }));
    }
  }, [user, fromPath, navigate, signIn]);

  useEffect(() => {
    const fromPage = location.state?.from?.pathname || "/";
    setFromPath(fromPage);
  }, []);

  return (
    <Form id="login-form" method="post">
      <input
        id="email"
        placeholder="Example@.com"
        type="text"
        name="email"
        required
        onInvalid={() => alert("Please Fill all input field!")}
      />

      <button type="submit">Login</button>
    </Form>
  );
};

export async function loginAction({ request }: any) {
  const formData = await request.formData();
  const email = formData.get("email");

  const result = await fetch(`http://localhost:3001/users?email=${email}`).then(
    (resp) => resp.json()
  );

  if (!result.length) {
    alert(`User ${email} does not exist`);
  } else {
    return result[0];
  }
}