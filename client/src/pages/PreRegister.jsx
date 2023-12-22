import PreRegisterForm from "../components/PreRegisterForm/PreRegisterForm";
import { useState, useEffect } from 'react';
import './../Loading.scss';
import BeatLoader from "react-loading";

export default function PreRegister() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false); // Cambiar el estado a "false" después de cierto tiempo
      }, 2000);
    }, []);
    return (
        <>
            {isLoading ? (
        <div className="loading-container">
          <BeatLoader color="#8B008B" size="80" />
        </div>
      ) : (
        <div>
            <PreRegisterForm/>
        </div>)}
        </>
    )
}