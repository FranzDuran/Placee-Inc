import * as React from "react";
import Card from "react-bootstrap/Card";
import styles from "./Historial.module.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
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
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

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

const columns = [
  {
    width: 200,
    label: "No. Resevación",
    dataKey: "dessert",
  },
  {
    width: 120,
    label: "Calories\u00A0(g)",
    dataKey: "calories",
    numeric: true,
  },
  {
    width: 120,
    label: "Fat\u00A0(g)",
    dataKey: "fat",
    numeric: true,
  },
  {
    width: 120,
    label: "Carbs\u00A0(g)",
    dataKey: "carbs",
    numeric: true,
  },
  {
    width: 120,
    label: "Protein\u00A0(g)",
    dataKey: "protein",
    numeric: true,
  },
];

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
    <TableRow >
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
        }}
        className={styles["table-item-title"]}
      >
        <h3 className={styles["no-reservation"]}>No. Resevación</h3>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
        }}
        className={styles["table-item-title"]}
      >
        <h3 className={styles["no"]}>Fecha</h3>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
        }}
        className={styles["table-item-title"]}
      >
        <h3 className={styles["no"]}>Nombre</h3>
      </TableCell>
      <TableCell
        variant="head"
        sx={{
          backgroundColor: "background.paper",
        }}
        className={styles["table-item-title"]}
      >
        <h3 className={styles["no"]}>Total</h3>
      </TableCell>
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <>
      <React.Fragment>
        <TableCell
          sx={{
            backgroundColor: "background.paper",
          }}
          className={styles["table-item-content"]}
        >
          55
        </TableCell>
        <TableCell className={styles["table-item-content"]}>15 mar. 2024 20:30</TableCell>
        <TableCell className={styles["table-item-content"]}>Ariel alegre</TableCell>
        <TableCell className={styles["table-item-content"]}>$200.00</TableCell>
      </React.Fragment>
    </>
  );
}

const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: "right",
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);
const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});
const options = [
  {
    label: renderTitle("Libraries"),
    options: [
      renderItem("AntDesign", 10000),
      renderItem("AntDesign UI", 10600),
    ],
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010),
    ],
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)],
  },
];
function Historial() {
  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  return (
    <div className={styles["container-hitorial"]}>
      <Card className={styles["card-container"]}>
        <h1>Historial de reservas, reembolso. </h1>
        <div className={styles["months-years"]}>
          <div className={styles["carrusel-months"]}>
            <div className={styles["days-month"]}>Abril</div>
          </div>
          <div className={styles["carrusel-months"]}>
            <div className={styles["days-month"]}>25</div>
          </div>
        </div>
      </Card>
      <Card className={styles["card2"]}>
        <div className={styles["box-card2"]}>
          <div className={styles["icon-none"]}>
            <CalendarMonthIcon id={styles["icons-clendar-expand"]} />
          </div>
          <div>
            <h2 className={styles["all-reservations"]}>
              Todas las reservaciones
            </h2>
            <h2 className={styles["length-reservation-remmbols"]}>80</h2>
          </div>
          <div className={styles["icon-none"]}>
            <CurrencyExchangeIcon id={styles["icons-transfer"]} />
          </div>
          <div>
            <h2 className={styles["all-reservations"]}>Reembolso</h2>
            <h2 className={styles["length-reservation-remmbols"]}>5</h2>
          </div>
          <div>
            <h2 className={styles["all-reservations"]} id={styles["h2-none"]}>Buscar nombre</h2>
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={500}
              /* style={{
                width: 250,
              }} */
              options={options}
              size="large"
              className={styles["container-input"]}
            >
              <Input.Search
                size="large"
                placeholder="Buscar nombre"
                className={styles["input"]}
              />
            </AutoComplete>
          </div>
        </div>
      </Card>

      <Card className={styles["bottom-mobile"]}>
        <Paper
          /* style={{ height: 560, width: "100%", marginTop: "2rem" }} */ className={
            styles["container-paper"]
          }
        >
          <h3 id={styles["fecha-historial"]}>Marzo 17 de 2024</h3>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            className={styles["tablet-virtuoso"]}
          />
        </Paper>
      </Card>
    </div>
  );
}

export default Historial;
