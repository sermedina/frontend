import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const apiBaseURL = process.env.REACT_APP_API_URL;

function HomeJefe() {
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

  const createItem = async () => {
    let newItemId = 0;
    if (inventory.length > 0) {
      let lastItem = inventory.map((el) => el.itemId).sort()[
        inventory.length - 1
      ];
      newItemId = lastItem + 1;
    }
    const apiEndpoint = `${apiBaseURL}/inventory`;
    const response = await axios.post(apiEndpoint, {
      itemId: newItemId,
      itemName: newItemName,
      quantity: newItemQuantity,
    });
    if (response.status === 201) {
      setInventory([
        ...inventory,
        { itemId: newItemId, itemName: newItemName, quantity: newItemQuantity },
      ]);
      alert("Item agregado satisfactoriamente");
    } else {
      alert("Error agregando el item al inventario.");
    }
    setShowModal(false);
  };

  const deleteItem = async (id) => {
    const apiEndpoint = `${apiBaseURL}/inventory/` + id;
    const response = await axios.delete(apiEndpoint, {});
    if (response.status === 204) {
      let inventory_ = [...inventory];
      let index = inventory_.map((el) => el.itemId).indexOf(id);

      setInventory(
        inventory_.slice(0, index).concat(inventory_.slice(index + 1))
      );
    } else {
      alert("Error borrando el item del inventario");
    }
  };

  const handleChangeQuantity = async (e, id) => {
    let value = e.target.value;
    if (value < 0) {
      value = 0;
    }
    const apiEndpoint = `${apiBaseURL}/inventory/` + id;
    const response = await axios.put(apiEndpoint, {
      quantity: value,
    });
    if (response.status === 200) {
      let inventory_ = [...inventory];
      let index = inventory_.map((el) => el.itemId).indexOf(id);
      let item_updated = {
        ...inventory_[index],
        quantity: e.target.value,
      };
      inventory_[index] = item_updated;
      setInventory(inventory_);
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
                        onChange={(e) => handleChangeQuantity(e, item.itemId)}
                      ></input>
                    </div>
                    <div className="col col-2">
                      <button onClick={() => deleteItem(item.itemId)}>
                        borrar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Sin inventario</div>
          )}
          <button onClick={() => setShowModal(true)}>Agregar nuevo item</button>
        </div>
      ) : (
        <div>Cargando</div>
      )}
      {showModal && (
        <div className="Home Home__modal">
          <h1>Ingresa la información del nuevo item</h1>
          <div className="col">
            <input
              type="text"
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={"Ingresa un nombre para el item"}
            ></input>
            <input
              type="number"
              onChange={(e) => setNewItemQuantity(e.target.value)}
              placeholder={"Ingresa la cantidad en inventario"}
            ></input>
          </div>
          <div className="row">
            <button onClick={() => setShowModal(false)}>Cancelar</button>
            <button
              style={{ backgroundColor: "#56568d" }}
              onClick={createItem}
              disabled={!(newItemName && newItemQuantity)}
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeJefe;
