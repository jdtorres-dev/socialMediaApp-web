import http from "./http";

class PostService {
  getAxiosConfig = () => {
    const token = localStorage.getItem("accessToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  createPost(post) {
    return http.post("/post/createPost", post);
  }

  getAllpost() {
    return http.get("/post/getPosts", this.getAxiosConfig());
  }

  getPostById(id) {
    return http.get(`/post/getPost/${id}`, this.getAxiosConfig());
  }

  createComment(comment) {
    return http.post("/post/createComment", comment);
  }

  getCommnetsByPostId(id) {
    return http.get(`/post/getCommentsByPostId/${id}`, this.getAxiosConfig());
  }

  deleteCommentById(id) {
    return http.put("/post/deleteComment", null, {
      params: { commentId: id },
    });
  }
  updateComment(id, cBody) {
    return http.put("/post/updateComment", null, {
      params: { commentId: id, commentBody: cBody },
    });
  }

  getCommentById(commentId) {
    return http.get("/post/getCommentById", {
      params: { id: commentId },
    });
  }

  likePost(like) {
    return http.post("/post/likePost", like);
  }

  likeComment(like) {
    return http.post("/post/likeComment", like);
  }

  unLikePost(likeId) {
    return http.put("/post/unlikePost", null, {
      params: { id: likeId },
    });
  }

  unlikeComment(likeId) {
    return http.put("/post/unlikeComment", null, {
      params: { id: likeId },
      ...this.getAxiosConfig(),
    });
  }

  getLikeUnlikePost(postId, userId) {
    return http.get("/post/getLikeUnlikePost", {
      params: { postId: postId, userId: userId },
    });
  }

  getLikeUnlikeComment(commentId, userId) {
    return http.get("/post/getLikeUnlikeComment", {
      params: { commentId, userId },
      ...this.getAxiosConfig(),
    });
  }

  getAllLikeComment(commentId) {
    return http.get("/post/getAllLikeComment", {
      params: { commentId },
      ...this.getAxiosConfig(),
    });
  }

  getAllLikePost(postId) {
    return http.get("/post/getAllLikePost", {
      params: { postId },
      ...this.getAxiosConfig(),
    });
  }

  getPostsByUserId(id) {
    return http.get(`/post/getPostsByUser/${id}`, this.getAxiosConfig());
  }

  deletePostById(id, post) {
    return http.put(`/post/deletePost/${id}`, post, this.getAxiosConfig());
  }

  updatePostById(id, post) {
    return http.put(`post/updatePost/${id}`, post, this.getAxiosConfig());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PostService();