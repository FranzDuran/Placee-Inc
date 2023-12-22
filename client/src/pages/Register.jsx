import RegisterForm from "../components/RegisterForm/RegisterForm";
import { useState, useEffect } from "react";
import BeatLoader from "react-loading";
export default function Register() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Cambiar el estado a "false" después de cierto tiempo
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <BeatLoader color="#8B008B" size="80" />
        </div>
      ) : (
        <div>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}
