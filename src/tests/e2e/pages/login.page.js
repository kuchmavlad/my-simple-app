const Page = require("./page");

class LoginPage extends Page {
  get inputEmail() {
    return $("#email");
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  async login(userEmail) {
    await this.inputEmail.setValue(userEmail);
    await this.btnSubmit.click();
  }

  open() {
    return super.open("login");
  }
}

module.exports = new LoginPage();
