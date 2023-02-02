const Page = require("./page");

class HomePage extends Page {
  get homePageTitle() {
    return $("aria/My simple app");
  }

  open() {
    return super.open("");
  }
}

module.exports = new HomePage();
