import axios from "axios";

export const setSelectedCardId = (id) => ({
  type: "SET_SELECTED_CARD_ID",
  payload: id,
});

export const AllPostTuristic = () => {
  return async (dispach) => {
    const res = await axios.get("https://placee-inc.onrender.com/turistic");
    const data = res.data.User;
    return dispach({
      type: "ALL_POST_TURISTIC",
      payload: data,
    });
  };
};

export const DetailsPostTuristic = (idTuristic) => {
  return async (dispach) => {
    const res = await axios.get(
      `https://placee-inc.onrender.com/turistic/${idTuristic}`
    );
    const data = res.data.details;
    return dispach({
      type: "DETAIL_POST_TURISTIC",
      payload: data,
    });
  };
};
export const HostesstUser = (idHostess) => {
  return async (dispach) => {
    const res = await axios.get(`https://placee-inc.onrender.com/${idHostess}`);
    const data = res.data.details;
    return dispach({
      type: "HOSTESS_USER",
      payload: data,
    });
  };
};

// postActions.js

export const createPost = (postData, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://placee-inc.onrender.com/post",
        postData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

      dispatch({
        type: "POST_CREATED",
        payload: createdPost,
      });

      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
};

<<<<<<< HEAD
export const CommentPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://placee-inc.onrender.com/comment`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

      dispatch({
        type: "POST_COMMENT",
        payload: createdPost,
      });

      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
};

=======
>>>>>>> 9ff30d3e5bc83736212262b07bfaac541c4b0060
export const UserRegister = (payload) => {
  return async (dispach) => {
    const res = await axios.post(
      "https://placee-inc.onrender.com/auth/register",
      payload
    );
    const data = res.data;
    return dispach({
      type: "USER_REGISTER",
      payload: data,
    });
  };
};

export const UserLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://placee-inc.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.token,
        });
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
    }
  };
};

const checkServerStatus = async () => {
  try {
    const response = await axios.get("https://placee-inc.onrender.com/status");
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const UserLogout = (payload) => {
  return async (dispach) => {
    const res = await axios.post(
      "https://placee-inc.onrender.com/logout",
      payload
    );
    const data = res.data;
    return dispach({
      type: "LOGOUT_USER",
      payload: data,
    });
  };
};

export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
});
export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const dataPersonal = (token) => {
  return async (dispatch) => {
    const res = await axios.get("https://placee-inc.onrender.com/user", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.data;

    return dispatch({
      type: "SET_DATA_PERSONAL",
      payload: data,
    });
  };
};

export const updatePersonal = (userId, userData) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `https://placee-inc.onrender.com/user/preregister/${userId}`,
        userData
      );
      const data = await res.data;

      return dispatch({
        type: "UPDATE_PERSONAL",
        payload: data,
      });
    } catch (error) {
      // Maneja los errores apropiadamente
      console.error(error);
    }
  };
};

export const DeletePost = (postId) => {
  return async (dispatch) => {
    const res = await axios.delete(
      `https://placee-inc.onrender.com/post/${postId}`
    );
    const data = res.data;
    return dispatch({
      type: "DELETE_POST",
      payload: data,
    });
  };
};

export const OnlyAllPost = () => {
  return async (dispatch) => {
<<<<<<< HEAD
    const res = await axios.get(
      `https://placee-inc.onrender.com/allposts`
    );
    const data = res.data;
=======
    const res = await axios.get(`https://placee-inc.onrender.com/posthostess`);
    const data = res.data.OnlyPosts;
>>>>>>> 9ff30d3e5bc83736212262b07bfaac541c4b0060
    return dispatch({
      type: "ONLY_POST",
      payload: data,
    });
  };
};

export const UserPostDetails = (idUser) => {
  return async (dispatch) => {
    const res = await axios.get(
      `https://placee-inc.onrender.com/user/${idUser}`
    );
    const data = res.data.UserDetails;
    return dispatch({
      type: "USER_POST",
      payload: data,
    });
  };
};

export const updatepost = (postId, payload) => {
  console.log(postId)
  console.log(payload)
  return async (dispatch) => {
    const res = await axios.put(
      `https://placee-inc.onrender.com/post/${postId}`,
      payload
    );
    const data = res.data;
    console.log("data",data)
    return dispatch({
      type: "UPDATE_POST",
      payload: data,
    });
  };
};
export const paymentReserve = (idTuristic) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
<<<<<<< HEAD
        `https://placee-inc.onrender.com/create-checkout-session/${idTuristic}`);
=======
        `https://placee-inc.onrender.com/create-checkout-session/${idTuristic}`,
        payload
      );
>>>>>>> 9ff30d3e5bc83736212262b07bfaac541c4b0060
      const data = res.data;

      dispatch({
        type: "PAYMENT_POST",
        payload: data,
      });
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
<<<<<<< HEAD
=======
      // Puedes despachar otra acción de error si es necesario
    }
  };
};

export const CommentPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://placee-inc.onrender.com/comment`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

>>>>>>> 9ff30d3e5bc83736212262b07bfaac541c4b0060
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.message, // Otra información de error útil
      });
    }
  };
};


export const ReportsPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://placee-inc.onrender.com/reports`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

      dispatch({
        type: "POST_REPORTS",
        payload: createdPost,
      });

      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    // Redirige al usuario a la página de inicio de sesión de Google
    window.location.href = "https://placee-inc.onrender.com/auth/google";
  } catch (error) {
    console.error("Error en la acción loginWithGoogle:", error);
  }
};

export const fetchGoogleProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("https://placee-inc.onrender.com/profile", {
      withCredentials: true,
    });
    const data = res.data;

    dispatch({
      type: "DATA_GOOGLE",
      payload: data,
    });
  } catch (error) {
    console.error("Error al obtener la información del perfil:", error);
  }
<<<<<<< HEAD
};   






=======
};
>>>>>>> 9ff30d3e5bc83736212262b07bfaac541c4b0060














/* 



 export const setSelectedCardId = (id) => ({
  type: "SET_SELECTED_CARD_ID",
  payload: id,
});

export const AllPostTuristic = () => {
  return async (dispach) => {
    const res = await axios.get(
      "http://localhost:4000/turistic"
    );
    const data = res.data.User;
    return dispach({
      type: "ALL_POST_TURISTIC",
      payload: data,
    });
  };
};

export const DetailsPostTuristic = (idTuristic) => {
  return async (dispach) => {
    const res = await axios.get(
      `http://localhost:4000/turistic/${idTuristic}`
    );
    const data = res.data.details;
    return dispach({
      type: "DETAIL_POST_TURISTIC",
      payload: data,
    });
  };
};
export const HostesstUser = (idHostess) => {
  return async (dispach) => {
    const res = await axios.get(
      `http://localhost:4000/${idHostess}`
    );
    const data = res.data.details;
    return dispach({
      type: "HOSTESS_USER",
      payload: data,
    });
  };
};

// postActions.js

export const createPost = (postData, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/post",
        postData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

      dispatch({
        type: "POST_CREATED",
        payload: createdPost,
      });

      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
};

export const CommentPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/comment`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

      dispatch({
        type: "POST_COMMENT",
        payload: createdPost,
      });

      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
};

export const UserRegister = (payload) => {
  return async (dispach) => {
    const res = await axios.post(
      "http://localhost:4000/auth/register",
      payload
    );
    const data = res.data;
    return dispach({
      type: "USER_REGISTER",
      payload: data,
    });
  };
};

export const UserLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.token,
        });
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
    }
  };
};


const checkServerStatus = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/status"
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const UserLogout = (payload) => {
  return async (dispach) => {
    const res = await axios.post(
      "http://localhost:4000/logout",
      payload
    );
    const data = res.data;
    return dispach({
      type: "LOGOUT_USER",
      payload: data,
    });
  };
};

export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
});
export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const dataPersonal = (token) => {
  return async (dispatch) => {
    const res = await axios.get(
      "http://localhost:4000/user",
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.data;

    return dispatch({
      type: "SET_DATA_PERSONAL",
      payload: data,
    });
  };
};

export const updatePersonal = (userId, userData) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/user/preregister/${userId}`,
        userData
      );
      const data = await res.data;

      return dispatch({
        type: "UPDATE_PERSONAL",
        payload: data,
      });
    } catch (error) {
      // Maneja los errores apropiadamente
      console.error(error);
    }
  };
};

export const DeletePost = (postId) => {
  return async (dispatch) => {
    const res = await axios.delete(
      `http://localhost:4000/post/${postId}`
    );
    const data = res.data;
    return dispatch({
      type: "DELETE_POST",
      payload: data,
    });
  };
};

export const OnlyAllPost = () => {
  return async (dispatch) => {
    const res = await axios.get(
      `http://localhost:4000/allposts`
    );
    const data = res.data;
    return dispatch({
      type: "ONLY_POST",
      payload: data,
    });
  };
};

export const UserPostDetails = (idUser) => {
  return async (dispatch) => {
    const res = await axios.get(
      `http://localhost:4000/user/${idUser}`
    );
    const data = res.data.UserDetails;
    return dispatch({
      type: "USER_POST",
      payload: data,
    });
  };
};

export const updatepost = (postId, payload) => {
  return async (dispatch) => {
    const res = await axios.put(
      `http://localhost:4000/post/${postId}`,
      payload
    );
    const data = res.data;
    return dispatch({
      type: "UPDATE_POST",
      payload: data,
    });
  };
};
export const paymentReserve = (idTuristic) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/create-checkout-session/${idTuristic}`);
      const data = res.data;

      dispatch({
        type: "PAYMENT_POST",
        payload: data,
      });
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.message, // Otra información de error útil
      });
    }
  };
};


export const ReportsPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/reports`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const createdPost = response.data.post;

      dispatch({
        type: "POST_REPORTS",
        payload: createdPost,
      });

      return createdPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    // Redirige al usuario a la página de inicio de sesión de Google
    window.location.href = 'http://localhost:4000/auth/google';
  } catch (error) {
    console.error('Error en la acción loginWithGoogle:', error);
  }
};

export const fetchGoogleProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:4000/profile', { withCredentials: true });
    const data = res.data;

    dispatch({
      type: 'DATA_GOOGLE',
      payload: data,
    });
  } catch (error) {
    console.error('Error al obtener la información del perfil:', error);
  }
<<<<<<< HEAD
};    */
=======
};   */
>>>>>>> 9ff30d3e5bc83736212262b07bfaac541c4b0060
