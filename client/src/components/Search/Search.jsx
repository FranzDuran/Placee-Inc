import Drawer from "@mui/material/Drawer";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./Search.scss";
import FilterCard from "../FilterCard/FilterCard";
import InputSearch from "../InputSearch/InputSearch";
import { useState, Fragment } from "react";
import { AudioOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Input, Space } from "antd";
const { Search } = Input;
export default function SearchMobile() {
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: "#1677ff",
          width: "50px",
        }}
      />
    );

    return (
      <>
        <Button variant="primary" onClick={handleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Input placeholder="large size" size="large" />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  return (
    <div className="search-container">
      {["top"].map((anchor) => (
        <Fragment key={anchor}>
          <div className="search-button">
            <button
              onClick={toggleDrawer(anchor, true)}
              sx={{}}
              className="btn-search"
            >
              Buscar por tipo
            </button>
            <div class="vertical-line"></div>

            <div className="input-container">
              <input type="text" placeholder="Buscar..." />
              <button>
                <SearchRoundedIcon />
              </button>
            </div>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className="container-modal-filter"
          >
            <h3
              className="x-search"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              &times;
            </h3>
            <div className="content-input-search" >
              <InputSearch />
            </div>
            <div className="content-filter-card">
              <FilterCard />
            </div>
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
