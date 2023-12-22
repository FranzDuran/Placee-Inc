import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataPersonal } from "../../redux/action";
import "./PreRegister.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ImgCrop from "antd-img-crop";
import { updatePersonal } from "../../redux/action";
import { countries } from "../../assets/codeCountry/countries";
import Avatar from "@mui/material/Avatar";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function PreRegisterForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [animate, setAnimate] = useState(false);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [imagePreview, setImagePreview] = useState(null);

  const [update, setUpdate] = useState({
    avatar: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    aboutMe: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    setAnimate(true);
    dispatch(dataPersonal(token));
  }, [token]);

  useEffect(() => {
    if (datapersonal) {
      setUpdate({
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

  const handleName = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      name: e.target.value,
    });
  };

  const handleLastName = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      lastName: e.target.value,
    });
  };

  const handleAboutMe = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      aboutMe: e.target.value,
    });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      password: e.target.value,
    });
  };

  const handlePhone = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      phone: e.target.value,
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCountryChange = (event) => {
    const selectedCountryIndex = event.target.selectedIndex;
    const selectedCountryCode = countries[selectedCountryIndex].phone;
    setSelectedCountry(selectedCountryCode);

    setUpdate((prevRegister) => ({
      ...prevRegister,
      phone: `+${selectedCountryCode}${" "}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", update);
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
    } catch (error) {
      console.error("Error:", error);
      message.error("Error updating the profile.");
    }
    setTimeout(async () => {
      navigate("/public");
    }, 1000);
  };

  return (
    <>
      <div /* className="isolate  px-6 py-24 sm:py-32 lg:px-8 bg-image" */
        className="bg-image"
      >
        <img
          src={require("../../assets/images/mosaico 1.png")}
          alt="Notfound"
          className="image-fondo"
        />
        <Link to="/">
          <div className="exit-preregister">
            <CancelIcon id="exit-icon" />
          </div>
        </Link>
        <div className={`box-preregister ${animate ? "animate-box" : ""}`}>
          <div className="logo-container-mobile">
            <div className="logo-preregister-mobile">
              <Link to="/">
                <img
                  src={require("../../assets/logo/Nudo.png")}
                  alt="Notfound"
                />
              </Link>
            </div>
            <div className="logo-text-mobile">
              <Link to="/">
                <img
                  srcSet={require("../../assets/logo/enc.png")}
                  alt="Notfound"
                />
              </Link>
            </div>
          </div>
          <div className="logo-preregister-container">
            <div className="logo-preregister">
              <Link to="/">
                <img
                  srcSet={require("../../assets/logo/Nudo.png")}
                  alt="Notfound"
                />
              </Link>
            </div>
            <div className="logo-text">
              <Link to="/">
                <img
                  srcSet={require("../../assets/logo/enc.png")}
                  alt="Notfound"
                />
              </Link>
            </div>
          </div>

          <div className="card-preregister">
            <div className="card-preregister-content">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl title-update">
                  Actualizar
                </h2>

                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Necesitamos que pongas tu foto de perfil porfavor.
                </p>
              </div>

              <form
                /* className="mx-auto mt-16 max-w-xl sm:mt-20 gap-input" */
                className="form"
                onSubmit={handleSubmit}
              >
                <div /* className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 " */
                  className=""
                >
                  <div className="avatar-preregister">
                    <div>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          background: update.avatar
                            ? `url(${imagePreview || update.avatar})`
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
                    <button onChange={handleImageChange} className="btn-edit-image-preregister" >
                      <i class="ri-camera-fill"></i>
                    </button>
                    {/* <div className="input-select-image">
                      <input
                        type="file"
                        name="avatar"
                        onChange={handleImageChange}
                        accept="image/jpeg, image/png"
                      />
                    </div> */}
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-input"
                        placeholder="Name"
                        value={update.name}
                        onChange={handleName}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-input"
                        placeholder="Last Name"
                        value={update.lastName}
                        onChange={handleLastName}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-input"
                        placeholder="Email"
                        value={update.email}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="password"
                        id="password"
                        autoComplete="text"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-input"
                        placeholder="Password"
                        value="********************"
                        /*   onChange={handlePassword}
                        required */
                        disabled
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="relative mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <select
                          id="code"
                          name="code"
                          className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-0 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm input-global"
                          onChange={handleCountryChange}
                        >
                          {countries.map((country, index) => (
                            <option key={index} value={country.phone}>
                              {country.code} (+{country.phone})
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 px-3.5 py-2 pl-36 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-global border-input"
                        value={update.phone}
                        onChange={handlePhone}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-input"
                        defaultValue={""}
                        placeholder="About Me (optional)"
                        value={update.aboutMe}
                        onChange={handleAboutMe}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="btn-preregister-container">
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 btn-preregister"
                    >
                      <span id="update-text">Actualizar</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
