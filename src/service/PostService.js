import http from "./http";

class PostService{
    getAxiosConfig = () => {
        const token = localStorage.getItem("accessToken");
    
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      };
    

    createPost(post){
        return http.post("/post", post);
    }

}

export default new PostService();