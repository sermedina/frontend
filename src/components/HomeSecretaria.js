import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const apiBaseURL = process.env.REACT_APP_API_URL;

function HomeSecretaria() {
  // const [inventory, setInventory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newItemName, setNewItemName] = useState(null);
  const [newItemQuantity, setNewItemQuantity] = useState(null);
  const [inventory, setInventory] = useState(null);
  const navigate = useNavigate();

  const listInventory = async () => {
    const apiEndpoint = `${apiBaseURL}/inventory`;
    const response = await axios.get(apiEndpoint, {});
    if (response.status === 200) {
      let inventory_ = response.data;
      setInventory(inventory_);
    } else {
      alert("Error consultando el inventario.");
    }
  };

  useEffect(() => {
    if (inventory === null) {
      listInventory();
    }
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      {inventory !== null ? (
        <div className="Home">
        <button
         style={{ backgroundColor: "#56568d" }}
         onClick={logout}
         >
         Cerrar sesión
       </button>
          <img src={logo}></img>
          <h1>Inventario</h1>
          <div className="row Home__table-header">
            <div className="col col-2">ID</div>
            <div className="col col-4">Nombre</div>
            <div className="col col-4">Cantidad</div>
            <div className="col col-2"></div>
          </div>
          {inventory.length !== 0 ? (
            <div>
              {inventory.map(function (item) {
                return (
                  <div
                    key={"item-" + item.itemId}
                    className="Home__table-row row"
                  >
                    <div className="col col-2">{item.itemId}</div>
                    <div className="col col-4">{item.itemName}</div>
                    <div className="col col-4">
                      <input
                        type="number"
                        defaultValue={item.quantity}
                      ></input>
                    </div>
                    <div className="col col-2">
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Sin inventario</div>
          )}
        </div>
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
}

export default HomeSecretaria;
