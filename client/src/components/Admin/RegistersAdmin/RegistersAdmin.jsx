import * as React from "react";
import styles from "./RegistersAdmin.module.css";
import { Button } from 'antd';
import { Select } from 'antd';
import { Input, Space } from 'antd';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
export default function RegistersAdmin() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const filterOption = (input, option) => {
      const label = typeof option.label === 'string' ? option.label : option.label.props.children;
      return label.toLowerCase().includes(input.toLowerCase());
    };
  return (
    <>
      <div>
        <div className={styles.search}>
        <div>
       <Button style={{background: '#000', color: '#fff', width: 200,height:70,borderRadius:10, fontSize:'20px'}} variant="contained">En sitios privados</Button>
       </div>
       <div className={styles.text}>
          <h2>
          Información general de Sitios - Anfitriones

          </h2>
       </div>
        </div>

        <div className={styles.search}>
        <Select
  className={styles.select}
  /*  showSearch */
  placeholder="Seleccionar continente"
  optionFilterProp="children"
  onChange={onChange}
  onSearch={onSearch}
  filterOption={filterOption}
  options={[
      {
          value: 'America',
          label: <div className={styles.label}> America</div>,
          
        },
        {
            value: 'Europa',
            label: <div className={styles.label}>Europa</div>,
            
        },
        {
          value: `Africa`,
          label: <div className={styles.label}> Africa</div>,
        },
    ]}
    />

<Select
className={styles.select}
/* showSearch */
placeholder="Seleccionar país"
optionFilterProp="children"
onChange={onChange}
onSearch={onSearch}
filterOption={filterOption}
options={[
    {
        value: 'Argentina',
        label: <div className={styles.label}><img src={require("../../../assets/images/logo.png")} className={styles.img_country} alt=''/> Argentina</div>,
        
    },
    {
        value: 'Mexico',
        label: <div className={styles.label}><img src={require("../../../assets/images/logo.png")} className={styles.img_country} alt=''/> Mexico</div>,
        
    },
    {
        value: `Guatemala`,
        label: <div className={styles.label}><img src={require("../../../assets/images/logo.png")} className={styles.img_country} alt=''/> Guatemala</div>,
    },
]}
/>


<Search placeholder="input search text" onSearch={onSearch} style={{ width: 400, }} />
        </div>

        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>No. Sitios</th>
                <th>Nombre de Sitios</th>
                <th>Anfitrión</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>

                <td>TAJ MAHAL</td>
                <td>Rubén Cano</td>
              </tr>
              <tr>
                <td>2</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>
              <tr>
                <td>3</td>

                <td>IRTRA PETAPA</td>
                <td>asdasdRubén Canoasd</td>
              </tr>

              <tr>
                <td>4</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>
              <tr>
                <td>5</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>6</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>7</td>

                <td>TAJ MAHAL</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>8</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>9</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>10</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>11</td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>

              <tr>
                <td>Total: <strong>150</strong> </td>

                <td>IRTRA PETAPA</td>
                <td>Rubén Cano</td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
