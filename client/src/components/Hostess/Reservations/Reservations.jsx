import * as React from "react";
import "./Reservations.scss";
import Carousel from "react-bootstrap/Carousel";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Card } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <TableRow>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
        }}
        className="calendar-table"
      >
        <div className="icons-arrow">
          <div>
            <Space direction="vertical">
              <CalendarMonthIcon
                id="icons-clendar-expand"
                onChange={onChange}
              />
            </Space>
          </div>
          <div className="arrow-container">
            <ArrowsAltOutlined id="arrow-icons" />
          </div>
        </div>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
          borderWidth: "0.2rem",
        }}
        className="item-title-day"
      >
        <div className="data-calendar">
          <span className="day">LUN</span>
          <span className="date">25</span>
          <span className="months-calendar">ENE</span>
        </div>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
          borderWidth: "0.2rem",
        }}
        className="item-title-day"
      >
        <div className="data-calendar">
          <span className="day">MART</span>
          <span className="date">26</span>
          <span className="months-calendar">ENE</span>
        </div>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
          borderWidth: "0.2rem",
        }}
        className="item-title-day"
      >
        <div className="data-calendar">
          <span className="day">MIE</span>
          <span className="date">27</span>
          <span className="months-calendar">ENE</span>
        </div>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
          borderWidth: "0.2rem",
        }}
        className="item-title-day"
      >
        <div className="data-calendar">
          <span className="day">VIE</span>
          <span className="date">28</span>
          <span className="months-calendar">ENE</span>
        </div>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
          borderWidth: "0.2rem",
        }}
        className="item-title-day"
      >
        <div className="data-calendar">
          <span className="day">SAB</span>
          <span className="date">29</span>
          <span className="months-calendar">ENE</span>
        </div>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
          borderWidth: "0.2rem",
        }}
        className="item-title-day"
      >
        <div className="data-calendar">
          <span className="day">DOM</span>
          <span className="date">30</span>
          <span className="months-calendar">ENE</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

const rowContent = (_index, row) => {
  return (
    <>
      <React.Fragment>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
            borderWidth: "0rem",
            textAlign: "center",
            writingMode:
              "vertical-rl" /* Cambia la orientación del texto a vertical */,
            textOrientation:
              "mixed" /* Asegura que el texto se muestre de manera legible */,
            maxHeight: "400px",
            fontSize: "5px",
          }}
        >
          VISITANTES
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          id="clients"
        >
          Ariel alegre
        </TableCell>

        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          id="clients"
        >
          Ariel alegre
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          id="clients"
        >
          Ariel alegre
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          id="clients"
        >
          Ariel alegre
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          id="clients"
        >
          Ariel alegre
        </TableCell>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          id="clients"
        >
          Ariel alegre
        </TableCell>
      </React.Fragment>
    </>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Reservations = () => {
  const [day, setDay] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDayCalendar = (e) => {
    e.preventDefault();
    setDay(true);
  };

  // En el componente donde necesitas el ID seleccionado.
  const selectedCardId = useSelector((state) => state.selectedCardId);
  const datapersonal = useSelector((state) => state.datapersonal);
  const cardPersonal = selectedCardId ? datapersonal.Posts.filter((item) => item.id === selectedCardId) : "";

  return (
    <div className="container-reservation">
      <div className="tittle">
        <h1>Las Ilusiones {cardPersonal[0].title}</h1>
      </div>

      <div className="box-reservation">
        <div className="content-search-months">
          <div className="year-months">
            <div className="months-carrusel">
              <div className="years">2022</div>
            </div>
            <div className="months-carrusel">
              <div className="months">Enero</div>
            </div>
          </div>
          <div className="input-reservations">
            <input type="text" className="days-input" />
            <button className="btn-reservation-search">
              <SearchRoundedIcon id="icons-search-reservtion" />
            </button>
          </div>
        </div>

        <div className="days-container">
          <div className="days-carrusel" onClick={handleDayCalendar}>
            <div className="days">Ver en día </div>
          </div>
          {day && (
            <div className="num-carrusel">
              <div className="num-days">25</div>
            </div>
          )}
        </div>
        <div className="container-paper">
          <Paper
            /* style={{
              height: 560,
              width: "100%",
              marginTop: "2rem",
              overflow: "hidden",
            }} */
            className="paper"
          >
            <TableVirtuoso
              data={rows}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
              onClick={handleOpen}
            />
          </Paper>
        </div>
      </div>
      <div className="length-reservation">
        <div className="length-container">
          <div className="length">10</div>
        </div>
        <div className="length-container">
          <div className="length">20</div>
        </div>
        <div className="length-container">
          <div className="length">30</div>
        </div>
        <div className="length-container">
          <div className="length">40</div>
        </div>
        <div className="length-container">
          <div className="length">50</div>
        </div>
        <div className="length-container">
          <div className="length">60</div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box /* sx={style} */ className="modal-container">
          <div className="modal-reservation">
            <div>
              <p>
                Reserva <strong>LSA78Hjnha</strong> de{" "}
                <strong>LUIS CASAS </strong>
              </p>
              <p>
                <strong>Contacto</strong>
              </p>
              <div className="contact-reservation">
                <div>
                  <p>Correo electrónico:</p>
                  <p>
                    <a href="#">JoelLC10@gmail.com</a>
                  </p>
                </div>
                <div>
                  <p>Número:</p>
                  <p>5023025-2358</p>
                </div>
              </div>
              <div className="title-dtail-reserva">
                <strong>Detalles de la reserva</strong>
              </div>
              <div className="detail-reservation">
                <div>
                  <p>
                    <strong>Estancia:</strong>
                  </p>
                  <p>dia</p>
                </div>
                <div>
                  <p>
                    <strong>Hora de llegada:</strong>
                  </p>
                  <p>1/01/2024</p>
                  <p>7:30 am</p>
                </div>
              </div>
              <div className="contact-reservation">
                <div>
                  <p>
                    <strong>Servicios:</strong>
                  </p>
                  <p>Entrada al sitio parqueo</p>
                </div>
              </div>
            </div>

            <Card /* style={{ height: 200, marginTop: "8em" }} */>
              <div className="pago-total">
                <p>
                  <strong>Pago total</strong>
                </p>
                <p>Q.225.00</p>
                <span>factura</span>
              </div>

              <div>
                <Accordion sx={{ borderRadius: "150px", width: "200px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Accordion 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Card>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default Reservations;
