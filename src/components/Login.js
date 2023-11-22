import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const navigate = useNavigate(); // Hook para la redirección
  const [role, setRole] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Lee el endpoint base de la API del archivo .env
    const apiBaseURL = process.env.REACT_APP_API_URL;

    // Concatena el endpoint específico para la autenticación
    const apiEndpoint = `${apiBaseURL}/auth`; // Asume que tu endpoint de autenticación es /auth

    try {
      // Haz una solicitud POST para la autenticación
      const response = await axios.post(apiEndpoint, {
        email,
        password,
      });

      // Si la respuesta es exitosa, asumimos que el objeto 'user' está presente
      console.log("Usuario autenticado:", response.data.user);
      const role =response.data.user.role;

      switch (role) {
        case 'SECRETARIA':
          navigate("/basic"); 
          break;
        case 'JEFE':
          navigate("/home"); 
          break;
        case 'ENCARGADO_DE_ALMACEN':
          navigate("/admin"); 
          break;
        default:
          navigate("/basic");
      }

      
    } catch (error) {
      // Aquí manejas el error según su código de estado
      if (error.response && error.response.status === 401) {
        // Error de credenciales incorrectas
        setErrorMessage("Usuario o contraseña inválido.");
      } else {
        // Otros errores
        setErrorMessage("Error de autenticación. Por favor, intente de nuevo.");
      }
      console.error("Error al intentar autenticar al usuario", error);
    }
  };

  return (
    <div className="Login">
      <img src={logo}></img>
      <h2>Iniciar sesión</h2>
      {errorMessage && <p className="Login__error">{errorMessage}</p>}{" "}
      <form className="Login__form" onSubmit={handleSubmit}>
        <div className="Login__input">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => {
              setErrorMessage("");
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="Login__input">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => {
              setErrorMessage("");
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;
