import axios from "axios";
import authHeader from "./AuthHeader";

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
  updateUser(user) {
    const id = user.id || user._id;
    return server
      .put(`users/${id}`, user, {
        headers: authHeader(),
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  },
  updatePassword(user, oldPassword, newPassword) {
    const id = user.id || user._id;
    return server
      .put(
        `users/${id}/updatePassword`,
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        // localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  },
  resendVerificationEmail(email) {
    return server.post("users/resend", { email: email }).then((response) => {
      return response.data;
    });
  },
};
