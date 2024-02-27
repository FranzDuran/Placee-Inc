import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import { Flex, Box, CardBody, Text } from "@chakra-ui/react";
import "./Claims.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Card } from "antd";
import { PhoneOutlined, StopOutlined } from "@ant-design/icons";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";

export default function Claims() {
  return (
    <div className="claims-container">
      <Card
        /* style={{
          width: 300,
        }} */
        className="container-message-claims"
      >
        <div className="card-message">
          <div className="container-search-message">
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={500}
              /* style={{
                width: 250,
                bottom: 2,
              }} */
              size="large"
              className="content-input"
            >
              <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
          </div>
          <div className="people-claim">Personas</div>
          <div className="container-message">
            <Flex align="center" className="container-flex">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <Box ml="3" className="container-box">
                <Text fontWeight="bold">Segun Adebayo</Text>
                <Text fontSize="sm">Nuevo mensaje</Text>
              </Box>
            </Flex>
            <Flex align="center" className="container-flex">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <Box ml="3">
                <Text fontWeight="bold">Segun Adebayo</Text>
                <Text fontSize="sm">Nuevo mensaje</Text>
              </Box>
            </Flex>
            <Flex align="center" className="container-flex">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <Box ml="3">
                <Text fontWeight="bold">Segun Adebayo</Text>
                <Text fontSize="sm">Nuevo mensaje</Text>
              </Box>
            </Flex>
          </div>
        </div>
      </Card>

      <Card
        /*  style={{
          width: 1000,
          height: 1000,
        }} */
        className="container-reclamo"
      >
        <div className="reclamo-content">
          <div className="box-avatar">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <h3 /* id="name-claim" */>Segun Adebayo</h3>
          </div>
          <div className="asunto">
            <span>
              Asunto:{" "}
              <strong>
                {" "}
                Insatisfacción con el Servicio de Atención al Cliente
              </strong>
            </span>
          </div>
          <div className="message">
            <p>
              Estimado equipo de atención al cliente: Espero que este mensaje
              les encuentre bien. Fui una visitante en su sitio turístico.
              Lamentablemente, me veo en la necesidad de expresar mi profunda
              insatisfacción con el servicio de atención al cliente que he
              recibido recientemente. Cuando estaba disfrutando de las
              instalaciones el servicio se demoraba y los tratos de sus
              empleados dejan mucho que desear es muy lamentable que un sitio
              tan conocido esté brindando ese tipo de servicios. A pesar de mis
              intentos anteriores de resolver esta situación, sigo enfrentando
              la misma situación en varias ocasiones y me siento frustrada por
              la falta de atención y resolución de este problema Como cliente,
              valoro la calidad del servicio, y hasta ahora, mi experiencia ha
              sido decepcionante. Me gustaría solicitar una revisión inmediata
              de mi caso y una pronta resolución a este problema. Además,
              aprecio su pronta atención a este asunto para restaurar mi
              confianza en su empresa. Agradezco de antemano su cooperación y
              espero una pronta respuesta. Atentamente, Andrea Cifuentes.
            </p>
          </div>
          <div className="button-claim">
            {/* Tu contenido existente */}

            <Button
              /* sx={{
                bottom: 0,
                background: "#8B008B",
                color: "#fff",
                padding: "5px 15px",
                width: "15em",
                borderRadius: "2em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }} */
              className="button-claim-btn"
              disableElevation
            >
              Cerrar
            </Button>
          </div>
          <div className="send-claim">
            <Form.Group
              className="textarea-claim"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="container-textarea">
                <Form.Label>Nuevo mensaje</Form.Label>
                <Form.Control as="textarea" rows={3} className="content-form" />
              </div>
              <div className="button-textarea-enviar">
                {/* Tu contenido existente */}

                <Button
                  /* sx={{
                    bottom: 0,
                    background: "#8B008B",
                    color: "#fff",
                    padding: "5px 15px",
                     width: "15em",
                    borderRadius: "2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                     marginTop: "2em",
                  }} */
                  className="button-textarea-enviar-btn"
                  disableElevation
                >
                  Enviar
                </Button>
              </div>
            </Form.Group>
          </div>
        </div>
      </Card>
      <Card
        /* style={{
          width: 300,
          height: 1000,
        }} */
        className="container-contact"
      >
        <div className="container-contact-claim">
          <div className="contact-claim">
            <h3>Contacto</h3>
          </div>
          <div className="name-claim">
            <h3>Andrea Cifuentes</h3>
            <p>Cliente</p>
          </div>
          <div className="linea-claim"></div>
          <div className="phone-claim">
            <PhoneOutlined className="phone-icons" />
            <h3>502-15487632</h3>
          </div>
          <div className="phone-claim">
            <EmailIcon sx={{ fontSize: "2em" }} />
            <h3>andrea@gmail.com</h3>
          </div>
          <div className="linea-claim"></div>
          <div className="phone-claim">
            <StopOutlined className="phone-icons" />
            <h3>andrea@gmail.com</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
