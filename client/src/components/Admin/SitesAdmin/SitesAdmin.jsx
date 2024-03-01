import styles from "./SitesAdmin.module.css";
import ButtonMaterial from "@mui/material/Button";
import america from "../../../assets/icons/icons-america.png";
import europa from "../../../assets/icons/icons-europa.png";
import asia from "../../../assets/icons/icons-asia.png";
import africa from "../../../assets/icons/icons-africa.png";
import oceania from "../../../assets/icons/OCEANIA.png";
import { Button } from 'antd';


function SitesAdmin() {


  return (
    <>
    <div className={styles.button_general}>

       <Button style={{background: '#000', color: '#fff', width: 300,height:40,borderRadius:10, margin: '0 auto'}} variant="contained">Vista general</Button>
    </div>

      <div className={styles.continent_container}>
        <ButtonMaterial sx={{border:'1px solid violet', borderRadius:'20px', color:'#000'}}   >
          <div className={styles.continent}>
            <img src={america} alt="not found" id="continent" />
            <p>America</p>
          </div>
        </ButtonMaterial>
        <ButtonMaterial   sx={{border:'1px solid violet', borderRadius:'20px', color:'#000'}} >
        <div className={styles.continent}>

            <img src={europa} alt="not found" id="continent" />
            <p>Europa</p>
          </div>
        </ButtonMaterial>
        <ButtonMaterial  sx={{border:'1px solid violet', borderRadius:'20px', color:'#000'}} >
        <div className={styles.continent}>

            <img src={asia} alt="not found" id="continent"/>
            <p>Asia</p>
          </div>
        </ButtonMaterial>
        <ButtonMaterial  sx={{border:'1px solid violet', borderRadius:'20px', color:'#000'}}>
        <div className={styles.continent}>

            <img src={africa} alt="not found" id="continent" />
            <p>Africa</p>
          </div>
        </ButtonMaterial>
        <ButtonMaterial  sx={{border:'1px solid violet', borderRadius:'20px', color:'#000'}} >
        <div className={styles.continent}>

            <img src={oceania} alt="not found"  id={styles.oceania}/>
            <p>Oceania</p>
          </div>
        </ButtonMaterial>
      </div>
   
      
    </>
  );
}

export default SitesAdmin;
