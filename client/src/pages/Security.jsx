import Header from "../components/Header";
import LoginAndSecurity from "../components/login-and-security/login-and-security";
import { useState, useEffect } from "react";
import BeatLoader from "react-loading";
export default function Security() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Cambiar el estado a "false" después de cierto tiempo
    }, 1000);
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="loading-container">
          <BeatLoader color="#8B008B" size="80" />
        </div>
      ) : (
        <div>
          <LoginAndSecurity />
        </div>
      )}
    </div>
  );
}
