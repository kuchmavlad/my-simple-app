import React, { useEffect, useState } from "react";
import {
  Form,
  LoaderFunctionArgs,
  useActionData,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { UserItem } from "dtos";
import { useAuth } from "hooks";
import { ENDPOINT_PATH, FORM_METHODS, PATHS } from "../../constants";

import "./loginPage.css";

export const LoginPage: React.FC = () => {
  const user = useActionData() as UserItem;
  const navigate = useNavigate();
  const location = useLocation();
  const [fromPath, setFromPath] = useState(
    location.state?.from?.pathname || PATHS.ROOT
  );
  const { signIn } = useAuth();

  useEffect(() => {
    if (user) {
      signIn(user, () => navigate(fromPath, { replace: true }));
    }
  }, [user, fromPath, navigate, signIn]);

  useEffect(() => {
    const fromPage = location.state?.from?.pathname || PATHS.ROOT;
    setFromPath(fromPage);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="loginWrapper">
      <h2>Login page</h2>
      <Form id="login-form" method={FORM_METHODS.POST}>
        <input
          id="email"
          placeholder="Example@.com"
          type="text"
          name="email"
          required
        />

        <button data-testid="loginButton" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  const result = await fetch(`${ENDPOINT_PATH.USERS}?email=${email}`).then(
    (resp) => resp.json()
  );

  if (!result.length) {
    window.alert(`User ${email} does not exist`);
  } else {
    return result[0];
  }
}
