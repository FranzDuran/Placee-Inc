import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import "./ProfilePublic.css";
import Card from "react-bootstrap/Card";

export default function ProfilePublicshow() {
  const datapersonal = useSelector((state) => state.datapersonal);
  console.log(datapersonal);
  return (
    <>
      <div className="profile-public-container">
        <div className="profile-public-avatar">
          <Avatar
            sx={{
              width: 150,
              height: 150,
              objectFit: "cover",
              background: datapersonal.avatar
                ? `url(${datapersonal.avatar})`
                : datapersonal.backgroundColor,
              backgroundSize: "cover",
            }}
          >
            {datapersonal.avatar ? (
              <span></span>
            ) : (
              <div>
                {datapersonal.name && datapersonal.name[0].toUpperCase()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          <h1>
            {datapersonal.name} {datapersonal.lastName}
          </h1>
        </div>
      </div>
      <div>
        <Card>
          <Card.Header as="h5">Sobre mi</Card.Header>
          <Card.Body>
            <Card.Text>{datapersonal.aboutMe}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
