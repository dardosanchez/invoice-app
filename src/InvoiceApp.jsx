import { getInvoice } from "./services/getInvoice.js";
import { ClientView } from "./components/ClientView.jsx";
import { Companyview } from "./components/CompanyView.jsx";
import { InvoiceView } from "./components/InvoiceView.jsx";
import { ListItemView } from "./components/ListItemView.jsx";
import { TotalView } from "./components/TotalView.jsx";
import { useState } from "react";

export const InvoiceApp = () => {
  const {
    id,
    name,
    client,
    company,
    items: itemsInitial,
    total,
  } = getInvoice();

  const [formItemsState, setFormItemsState] = useState({
    product: "",
    price: "",
    quantity: "",
  });

  const { product, price, quantity } = formItemsState;

  const [items, setItems] = useState(itemsInitial);
  const [counter, setcounter] = useState(4);

  const onInputChange = ({ target: { name, value } }) => {
    {
      setFormItemsState({
        ...formItemsState,
        [ name ]: value,
      });
    }
  };

  const onInvoiceItemsSubmit = (event) => {
    {
      event.preventDefault();

      if (product.trim().length <= 1) return;
      if (price.trim().length <= 1) return;
      if (isNaN(price.trim())) {
        alert("Error el precio no es un numero");
        return;
      }
      if (quantity.trim().length < 1) {
        alert("Error la cantidad no es un numero");
        return;
      }
      if (isNaN(quantity.trim())) return;

      setItems([
        ...items,
        {
          id: counter,
          product: product.trim(),
          price: +price.trim(),
          quantity: parseInt(quantity.trim(), 10),
        },
      ]);

      setFormItemsState({
        product: "",
        price: "",
        quantity: "",
      });
      setcounter(counter + 1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card my-3">
          <div className="card-header">Ejemplo Factura</div>
          <div className="card-body">
            <InvoiceView id={id} name={name} />

            <div className="row my-3">
              <div className="col">
                <ClientView title="Datos del Cliente" client={client} />
              </div>
              <div className="col">
                <Companyview title="Datos de la Empresa" company={company} />
              </div>
            </div>
            <ListItemView name="Productos de la factura" items={items} />
            <TotalView total={total} />

            <form className="w-50" onSubmit={onInvoiceItemsSubmit}>
              <input
                type="text"
                name="product"
                value={product}
                placeholder="Producto"
                className="form-control m-3"
                onChange={onInputChange}
              />
              <input
                type="text"
                name="price"
                value={price}
                placeholder="Precio"
                className="form-control m-3"
                onChange={(event) => onInputChange(event)}
              />
              <input
                type="text"
                name="quantity"
                value={quantity}
                placeholder="Cantidad"
                className="form-control m-3"
                onChange={onInputChange}
              />

              <button type="submit" className="btn btn-primary m-3">
                Nuevo Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
