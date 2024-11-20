import axios from "axios";

class AuthService {
  async login(login) {
    try {
      const response = await axios.post("http://localhost:8080/login", login);

      console.log("response", response.data);

      if (response.data && response.data.token) {
        console.log("Token:", response.data.token);

        return {
          accessToken: response.data.token,
        };
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
