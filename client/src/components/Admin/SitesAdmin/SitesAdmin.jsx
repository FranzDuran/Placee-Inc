import "./SitesAdmin.scss";
import Button from "@mui/material/Button";
import america from "../../../assets/icons/icons-america.png";
import europa from "../../../assets/icons/icons-europa.png";
import asia from "../../../assets/icons/icons-asia.png";
import africa from "../../../assets/icons/icons-africa.png";
import oceania from "../../../assets/icons/OCEANIA.png";


function SitesAdmin() {


  return (
    <>
      <div className="continent-container">
        <Button   >
          <div className="continent">
            <img src={america} alt="not found" id="continent" />
            <p>America</p>
          </div>
        </Button>
        <Button  >
          <div className="continent">
            <img src={europa} alt="not found" id="continent" />
            <p>Europa</p>
          </div>
        </Button>
        <Button >
          <div className="continent" >
            <img src={asia} alt="not found" id="continent"/>
            <p>Asia</p>
          </div>
        </Button>
        <Button>
          <div className="continent" >
            <img src={africa} alt="not found" id="continent" />
            <p>Africa</p>
          </div>
        </Button>
        <Button >
          <div className="continent">
            <img src={oceania} alt="not found"  id="oceania"/>
            <p>Oceania</p>
          </div>
        </Button>
      </div>
   
      
    </>
  );
}

export default SitesAdmin;
