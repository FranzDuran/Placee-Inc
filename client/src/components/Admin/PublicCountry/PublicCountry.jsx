import React from 'react';
import { Select } from 'antd';
import styles from "./PublicCountry.module.css";
import { Button } from 'antd';
import logo from "../../../assets/images/logo.png";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
const App = () => (
    <div>

    <div className={styles.select_container}>
<div>

<Button  className={styles.select}>Editar</Button>
    </div>
    <div>

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
          label: <div className={styles.label}><img src={logo} className={styles.img_country} alt=''/> America</div>,
          
        },
        {
            value: 'Europa',
            label: <div className={styles.label}><img src={logo} className={styles.img_country} alt=''/>Europa</div>,
            
        },
        {
          value: `Africa`,
          label: <div className={styles.label}><img src={logo} className={styles.img_country} alt=''/> Africa</div>,
        },
    ]}
    />
    </div>

    <div>

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
  </div>
    </div>
    <div className={styles.card_inicio}>
        <div>

 <Input size="large" placeholder="País" value="Guatemala"   />
        </div>
        <div>

<Input size="large" placeholder="Continente" value="America"   />
       </div>
       <div>
        <input type="file" />
       </div>

       <div>
       <Button style={{background: '#000', color: '#fff', width: 300,height:40,borderRadius:20}} variant="contained">Publicar</Button>
       </div>

  </div>
</div>
);
export default App;