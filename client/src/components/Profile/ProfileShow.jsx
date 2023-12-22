import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataPersonal, updatePersonal } from "../../redux/action";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import styles from "./ProfileShow.module.scss";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddNewUser = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [openSucces, setOpenSuccess] = React.useState(false);

  const [update, setUpdate] = useState({
    avatar: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    aboutMe: "",
  });
  useEffect(() => {
    if (datapersonal) {
      setUpdate({
        ...update,
        avatar: datapersonal.avatar,
        name: datapersonal.name,
        lastName: datapersonal.lastName,
        email: datapersonal.email,
        password: datapersonal.password,
        phone: datapersonal.phone,
        aboutMe: datapersonal.aboutMe,
      });
    }
  }, [datapersonal]);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleImageChange = useCallback(
    (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        getBase64(file, (imageUrl) => {
          setImagePreview(imageUrl);
          setUpdate({
            ...update,
            avatar: file,
          });
        });
      }
    },
    [update]
  );

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", update.avatar);
    formData.append("name", update.name);
    formData.append("lastName", update.lastName);
    formData.append("email", update.email);
    formData.append("password", update.password);
    formData.append("phone", update.phone);
    formData.append("aboutMe", update.aboutMe);

    try {
      dispatch(updatePersonal(datapersonal.id, formData));
      setOpenSuccess(true);
      /*    setTimeout(async () => {
        window.location.reload();
      }, 1000); */
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Box pt={2} pb={4}>
          <Card sx={{ padding: 4 }}>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12} className={styles.content}>
                <Card
                  /* sx={{
                    padding: 3,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }} */
                  className={styles.cardContent}
                >
                  <div>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        background: datapersonal.avatar
                          ? `url(${imagePreview || datapersonal.avatar})`
                          : datapersonal.backgroundColor,
                        backgroundSize: "cover",
                      }}
                    >
                      {update.avatar ? (
                        <span></span>
                      ) : (
                        <div>
                          {datapersonal.name &&
                            datapersonal.name[0].toUpperCase()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <ButtonWrapper>
                    <UploadButton>
                      <label htmlFor="upload-btn">
                        <input
                          accept="image/*"
                          id="upload-btn"
                          type="file"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                        <IconButton component="span">
                          <PhotoCamera sx={{ fontSize: 26, color: "#000" }} />
                        </IconButton>
                      </label>
                    </UploadButton>
                  </ButtonWrapper>
                </Card>
              </Grid>
              <Grid item md={8} xs={12}>
                <Card sx={{ padding: 3, boxShadow: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="name"
                        placeholder="Nombre"
                        value={update.name}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="lastName"
                        placeholder="Apellido"
                        value={update.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        placeholder="Country"
                        value={update.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="phone"
                        placeholder="Telefono"
                        value={update.phone}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="aboutMe"
                        placeholder="Sobre mi"
                        value={update.aboutMe}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
                      <Link to="/anfitrion">
                        <Button
                          variant="contained"
                          /* sx={{ background: "black" }} */ className={
                            styles.btnAnfitrion
                          }
                        >
                          Modo anfitrion
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        variant="contained"
                        /* sx={{ background: "#8b008b" }} */
                        className={styles.btnActualizar}
                      >
                        Actualizar
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <div>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={openSucces}
              autoHideDuration={4000}
              onClose={handleCloseSuccess}
            >
              <Alert
                onClose={handleCloseSuccess}
                severity="success"
                sx={{ width: "100%" }}
              >
                Guardado correctamente
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;
