import styles from "./Comentarios.module.scss";
import React, { useState, useEffect } from "react";
import { data } from "./Data";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { dataPersonal, DetailsPostTuristic } from "../../../redux/action";
import Avatar from "@mui/material/Avatar";

export default function Comentarios({ onDelete }) {
  const [showOptions, setShowOptions] = useState(
    Array(data.length).fill(false)
  );

  const { idTuristic } = useParams();
  const dispatch = useDispatch();
  const detailpost = useSelector((state) => state.detailpost);
 // console.log(detailpost);

  useEffect(() => {
    dispatch(DetailsPostTuristic(idTuristic));
  }, [dispatch, idTuristic]);

  const [detailposts, setDetailPosts] = useState();

  useEffect(() => {
    const storedDetailPost = JSON.parse(localStorage.getItem("detailpost"));
    //console.log(storedDetailPost);

    if ((!storedDetailPost || (Array.isArray(storedDetailPost) && storedDetailPost.length === 0)) && detailpost.comments) {
      //console.log("1");
      localStorage.setItem("detailpost", JSON.stringify(detailpost));
      setDetailPosts(JSON.parse(localStorage.getItem("detailpost")));
      //console.log(detailposts);

    } else if ((!storedDetailPost || (Array.isArray(storedDetailPost) && storedDetailPost.length === 0)) && (!detailpost || (Array.isArray(detailpost) && detailpost.length === 0))) {
      //console.log("no hay comentarios");

    } else if (storedDetailPost.comments && detailpost.comments) {
      //console.log("2");
      if (storedDetailPost.id !== detailpost.id) {
        localStorage.setItem("detailpost", JSON.stringify(detailpost));
        setDetailPosts(JSON.parse(localStorage.getItem("detailpost")));
      }
    } else if (storedDetailPost.comments && (!detailpost || (Array.isArray(detailpost) && detailpost.length === 0))) {
      setDetailPosts(storedDetailPost);
      //console.log("3");
      //console.log(storedDetailPost);
    }
  }, [detailpost]);

  if (!detailposts || detailposts.length === 0) {
    return <p>No comments available.</p>;
  }

  const handleButtonClick = (index) => {
    // Toggle the state for the clicked card
    const updatedShowOptions = [...showOptions];
    updatedShowOptions[index] = !updatedShowOptions[index];
    setShowOptions(updatedShowOptions);
  };

  const handleDeleteClick = (index) => {
    // Handle delete logic here
    // onDelete();
    // After deleting, hide the options for the clicked card
    const updatedShowOptions = [...showOptions];
    updatedShowOptions[index] = false;
    setShowOptions(updatedShowOptions);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {detailposts.comments.map((item, index) => (
          <div
            className={styles.contentCard}
            key={index}
            style={
              item.emoji === "corazon"
                ? { borderColor: "#9363b7" }
                : item.emoji === "incognito"
                ? { borderColor: "#ff9b9b" }
                : { borderColor: "#b797cf" }
            }
          >
            <div className={styles.cardInfo}>
              <button
                className={styles["options-button"]}
                onClick={() => handleButtonClick(index)}
              >
                <i className="ri-more-2-fill"></i>
              </button>
              {showOptions[index] && (
                <div className={styles["options-dropdown"]}>
                  <div className={styles["option"]}>
                    Silenciar usuario <i className="ri-volume-mute-line"></i>
                  </div>
                  <div
                    className={styles["option"]}
                    onClick={() => handleDeleteClick(index)}
                  >
                    Eliminar comentario <i className="ri-delete-bin-6-line"></i>
                  </div>
                </div>
              )}
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
              <h2>
                {item.user.name}
                {item.user.lastName}
              </h2>
              <p>{item.text}</p>
              <span>
                {item.emoji === "corazon" ? (
                  <i className="ri-heart-fill" style={{ color: "#652c90" }}></i>
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
          </div>
        ))}
      </div>
    </div>
  );
}
