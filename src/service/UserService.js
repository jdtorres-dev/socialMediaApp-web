import http from "./http";

class UserService {
  getAxiosConfig = () => {
    const token = localStorage.getItem("accessToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  checkUsername(username) {
    return http.get("/user/check-username", {
      params: { username },
    });
  }

  checkEmail(email) {
    return http.get("/user/check-email", { params: { email } });
  }

  getUserById(id) {
    return http.get("/user/id", { params: { id }, ...this.getAxiosConfig() });
  }

  createUser(user) {
    return http.post("/signup", user);
  }

  updateUser(id, user) {
    return http.put(`/user/${id}`, user, this.getAxiosConfig());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
