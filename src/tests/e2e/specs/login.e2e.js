const LoginPage = require("../pages/login.page");
const HomePage = require("../pages/home.page");
const UsersPage = require("../pages/users.page");

describe("Login page", () => {
  it("should login with valid credentials and rout to home page", async () => {
    await LoginPage.open();
    await LoginPage.login("1");

    await expect(HomePage.homePageTitle).toBeExisting();
  });

  it("should login with valid credentials and rout back", async () => {
    await UsersPage.open();
    await LoginPage.login("1");

    await expect(UsersPage.usersPageTitle).toBeExisting();
  });

  it("shouldn't login with invalid credentials", async () => {
    const wrongUserEmail = "11";

    await LoginPage.open();
    await LoginPage.login(wrongUserEmail);

    const alertText = await browser.getAlertText();
    const isAlertOpen = await browser.isAlertOpen();

    await expect(alertText).toEqual(`User ${wrongUserEmail} does not exist`);
    await expect(isAlertOpen).toEqual(true);
  });
});
