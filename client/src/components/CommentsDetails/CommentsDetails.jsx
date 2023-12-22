import styles from "./CommentsDetails.module.scss";
import { data } from "../Hostess/Comentarios/Data";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailsPostTuristic } from "../../redux/action";
import Avatar from "@mui/material/Avatar";

export default function CommentsDetails() {
  const { idTuristic } = useParams();
  const dispatch = useDispatch();
  const detailpost = useSelector((state) => state.detailpost);

  useEffect(() => {
    dispatch(DetailsPostTuristic(idTuristic));
  }, [dispatch, idTuristic]);
  if (!detailpost.comments) {
    return null; // Puedes mostrar un mensaje de carga aquí si lo deseas
  }
  return (
    <div className={styles.container} id="comentarios">
      <div className={styles.commentsContainer}>
        {detailpost.comments &&
          detailpost.comments.map((item, index) => (
            <div className={styles.contentComment} key={index}>
              <div className={styles.contentInfoPerfil} >
                <div>
                  {item.user && (
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        background:
                          item.user.avatar && item.user.avatar
                            ? `url(${item.user.avatar})`
                            : item.user.backgroundColor,
                        backgroundSize: "cover",
                      }}
                    >
                      {item.user.avatar ? (
                        <div></div>
                      ) : (
                        <div>
                          {item.user.name && item.user.name[0].toUpperCase()}
                        </div>
                      )}
                    </Avatar>
                  )}
                </div>
                <h3>
                  {item.user && `${item.user.name} ${item.user.lastName}`}
                </h3>
                <span>
                  {item.emoji === "corazon" ? (
                    <i
                      className="ri-heart-fill"
                      style={{ color: "#652c90" }}
                    ></i>
                  ) : item.emoji === "incognito" ? (
                    <i
                      className="ri-error-warning-fill"
                      style={{ color: "#7e00e5" }}
                    ></i>
                  ) : (
                    <i
                      className="ri-emotion-normal-fill"
                      style={{ color: "#9463ec" }}
                    ></i>
                  )}
                </span>
              </div>
              <p>{item.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
