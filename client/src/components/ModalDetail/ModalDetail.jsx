import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import './ModalDetail.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



const products = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Men", href: "#" },
      { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
      {
        src: "https://a0.muscache.com/im/pictures/1ef9b49c-6f99-4018-95f9-8471a9fbbd15.jpg?im_w=1200",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://a0.muscache.com/im/pictures/d3041174-4fd1-4199-a8ac-a44907d07bcc.jpg?im_w=720",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://a0.muscache.com/im/pictures/6f8e927e-c0d1-4952-ae0d-705ae391ff8a.jpg?im_w=720",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://a0.muscache.com/im/pictures/880cf735-ac0b-4ad8-93d4-c748564ec103.jpg?im_w=1200",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  };

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Skylodge Adventure Suites
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">

        {products.images.map(list => 
        <div className='image-container'>

      <img src={list.src} alt="" />
        </div>
            ) }
            </div>
      </Modal.Body>
 
    </Modal>
  );
}

export default  function ModalDetail() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className='button-modal'>
      <Button variant="primary"  onClick={() => setModalShow(true)}>
        Vista previa
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
        </div>
  );
}

