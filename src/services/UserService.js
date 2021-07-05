import axios from "axios";

const server = axios.create({
  baseURL: `http://localhost:3000`,
});

export default {
  login(user) {
    return server
      .post("/users/login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },

  register(user) {
    return server.post("users/register", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },
};
