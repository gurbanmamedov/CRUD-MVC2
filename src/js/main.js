import "../style.css";

import { UserModel } from "./model/userModel.js";
import { UserView } from "./view/userView.js";
import { UserController } from "./controller/userController.js";

document.addEventListener("DOMContentLoaded", () => {
  const userModel = new UserModel();
  const userView = new UserView();
  new UserController(userModel, userView);
});
