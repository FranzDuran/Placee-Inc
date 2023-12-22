// GalleryModal.js
import React, { useState } from "react";
import styles from "./GalleryModal.module.scss";
import {
  dataPersonal,
  DetailsPostTuristic,
  DeletePost,
} from "../../redux/action";
import { useSelector, useDispatch } from "react-redux";

const GalleryModal = ({ images, onClose }) => {
  const dispatch = useDispatch();
  const datapersonal = useSelector((state) => state.datapersonal);
  console.log(datapersonal);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handlePreviewClick = (image) => {
    setSelectedImage(image);
  };

  const handleDeleteClick = (image) => {
    // Implement logic to delete the image
    console.log("Deleting image:", image);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    // No longer close the upload modal here
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <i class="ri-close-line"></i>
        </button>
        <div className={styles.gallery}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <img
                src={image}
                alt={`Image ${index}`}
                className={styles.image}
              />
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.btnImagen}
                  onClick={() => handlePreviewClick(image)}
                >
                  <i className="ri-picture-in-picture-exit-line"></i>
                </button>
                <button
                  className={styles.btnImagen}
                  onClick={() => handleDeleteClick(image)}
                >
                  <i className="ri-delete-bin-6-line"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className={styles.previewModal}>
            <button className={styles.closeButton} onClick={handleClosePreview}>
              <i className="ri-close-line"></i>
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className={styles.previewImage}
            />
          </div>
        )}
        <button className={styles.uploadButton} onClick={handleUploadClick}>
          Subir imagenes
        </button>
        {isUploadModalOpen && (
          <div className={styles.uploadModal}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            <button className={styles.btnCancelar} onClick={handleCloseUploadModal}><i className="ri-close-line"></i></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryModal;
