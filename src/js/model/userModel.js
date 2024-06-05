export class UserModel {
  constructor() {
    this.apiUrl = "https://jsonplaceholder.typicode.com/users";
  }

  async fetchUsers() {
    console.log("Fetching users from API...");
    try {
      const response = await fetch(this.apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      console.log("Users fetched successfully:", users);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }
}
