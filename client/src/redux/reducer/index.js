const initialState = {
  loginUser: {},
  loginError: null,
  token: localStorage.getItem("token"),
  datapersonal: [],
  posts: [],
  allPost: [],
  detailpost: [],
  hostessuser: [],
  onlypost: [],
  clientSecret: null,
  reservaEnProceso: false,
  reservaError: null,
  selectedCardId: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_CARD_ID":
      return {
        ...state,
        selectedCardId: action.payload,
      };
    case "USER_REGISTER":
      return {
        ...state,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
      };
    case "LOGOUT_USER":
      // Limpia el token en el estado
      return {
        ...state,
        token: null,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: true,
      };

    case "SET_DATA_PERSONAL":
      return {
        ...state,
        datapersonal: action.payload,
      };
    case "POST_CREATED":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case "ALL_POST_TURISTIC":
      return {
        ...state,
        allPost: action.payload,
      };

    case "DETAIL_POST_TURISTIC":
      return {
        ...state,
        detailpost: action.payload,
      };

    case "HOSTESS_USER":
      return {
        ...state,
        hostessuser: action.payload,
      };

    case "ONLY_POST":
      return {
        ...state,
        onlypost: action.payload,
      };

    case "DELETE_POST":
      // Filtra las publicaciones para eliminar la que coincide con el postId
      const updatedOnlyPost = state.onlypost.filter(
        (post) => post.id !== action.payload.id
      );
      return {
        ...state,
        onlypost: updatedOnlyPost,
      };

    case "UPDATE_PERSONAL":
      return {
        ...state,
        datapersonal: action.payload,
      };

    case "USER_POST":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_POST":
      return {
        ...state,
        detailpost: { ...state.detailpost, ...action.payload },
      };

    case "POST_COMMENT":
      return {
        ...state,
        detailpost: {
          ...state.detailpost,
          comments: [...state.detailpost.comments, action.payload],
        },
      };
    case "PAYMENT_POST":
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
        // Puedes manejar otros estados relacionados con la reserva aquí
      };

    default:
      return { ...state };
  }
};
