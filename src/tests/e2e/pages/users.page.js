const Page = require("./page");

class UsersPage extends Page {
  get usersPageTitle() {
    return $("aria/Users Page");
  }

  open() {
    return super.open("users");
  }
}

module.exports = new UsersPage();
