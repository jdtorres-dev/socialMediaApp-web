import http from "./http";

class UserService {
  getAxiosConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  checkUsernameAndEmail(username, email) {
    return http.post("/user/check-user", {
      username,
      email,
    });
  }

  checkUsername(username) {
    return http.get("/user/check-username", {
      params: { username },
    });
  }

  checkEmail(email) {
    return http.get("/user/check-email", {
      params: { email },
    });
  }

  createUser(user) {
    return http.post("/signup", user);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
