export class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.users = [];

    this.init();
  }

  async init() {
    try {
      this.users = await this.model.fetchUsers();
      console.log("Users fetched:", this.users);
      this.view.renderUsers(this.users);
      this.bindEditButtons();
      this.view.bindEditFormSubmit(this.updateUser.bind(this));
    } catch (error) {
      console.error("Error initializing UserController:", error);
    }
  }

  bindEditButtons() {
    const buttons = document.querySelectorAll(".edit-btn");
    console.log(`Found ${buttons.length} edit buttons.`);
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const userId = event.target.dataset.id;
        const user = this.users.find((u) => u.id == userId);
        this.view.showEditModal(user);
      });
    });
  }

  updateUser(updatedUser) {
    console.log(`Updating user with ID: ${updatedUser.id}`);
    const userIndex = this.users.findIndex((u) => u.id == updatedUser.id);
    if (userIndex !== -1) {
      this.users[userIndex] = updatedUser;
      this.view.renderUsers(this.users);
      this.bindEditButtons();
    }
  }
}
