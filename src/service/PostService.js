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
        return http.post("/post/createPost", post);
    }

    getAllpost(){
      return http.get("/post/getPosts", this.getAxiosConfig());
    }

    getPostById(id){
      return http.get(`/post/getPost/${id}`, this.getAxiosConfig());
    }

    createComment(comment){
      return http.post("/post/createComment", comment);
    }

    getCommnetsByPostId(id){
      return http.get(`/post/getCommentsByPostId/${id}`, this.getAxiosConfig());
    }

}

export default new PostService();