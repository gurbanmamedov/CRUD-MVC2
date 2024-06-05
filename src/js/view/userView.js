export class UserView {
  constructor() {
    this.userListElement = document.getElementById("user-list");
    this.editModal = document.getElementById("edit-modal");
    this.editForm = document.getElementById("edit-form");
    this.editNameInput = document.getElementById("edit-name");
    this.editEmailInput = document.getElementById("edit-email");
    this.closeButton = this.editModal.querySelector(".close");

    this.closeButton.addEventListener("click", () => this.hideEditModal());
    window.addEventListener("click", (event) => {
      if (event.target == this.editModal) {
        this.hideEditModal();
      }
    });
  }

  renderUsers(users) {
    if (!this.userListElement) {
      console.error("userListElement is not defined!");
      return;
    }

    console.log("Rendering users:", users);
    this.userListElement.innerHTML = "";
    users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.className = "user-item";
      userElement.innerHTML = `
              <p>${user.name} (${user.email})</p>
              <button class="edit-btn" data-id="${user.id}">Изменить</button>
          `;
      this.userListElement.appendChild(userElement);
    });
  }

  showEditModal(user) {
    this.editNameInput.value = user.name;
    this.editEmailInput.value = user.email;
    this.editForm.dataset.userId = user.id;
    this.editModal.style.display = "block";
  }

  hideEditModal() {
    this.editModal.style.display = "none";
  }

  bindEditFormSubmit(handler) {
    this.editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userId = this.editForm.dataset.userId;
      const updatedUser = {
        id: userId,
        name: this.editNameInput.value,
        email: this.editEmailInput.value,
      };
      handler(updatedUser);
      this.hideEditModal();
    });
  }
}
