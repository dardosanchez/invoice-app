import { getInvoice } from "./services/getInvoice.js";
import { ClientView } from "./components/ClientView.jsx";
import { Companyview } from "./components/CompanyView.jsx";
import { InvoiceView } from "./components/InvoiceView.jsx";
import { ListItemView } from "./components/ListItemView.jsx";
import { TotalView } from "./components/TotalView.jsx";
import { useState } from "react";

export const InvoiceApp = () => {
  const { id, name, client, company, items:itemsInitial , total} = getInvoice();

  const [productValue, setProductValue] = useState('');
  const [priceValue, setPricetValue] = useState(0);
  const [quantityValue, setQuantityValue] = useState(0);

  const [items, setItems] = useState(itemsInitial);

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
            
            <form className="w-50" onSubmit={event => {
              event.preventDefault();
              setItems([...items, {key:4 ,product: productValue,price: priceValue,quantity: quantityValue}])
            }}>
              <input type="text" name="product" placeholder="Producto" className="form-control m-3" onChange={event => {
                setProductValue(event.target.value);
              }}/> 
              <input type="text" name="price" placeholder="Precio" className="form-control m-3" onChange={event => {
                setPricetValue(event.target.value);
              }}/> 
              <input type="text" name="quantity" placeholder="Cantidad" className="form-control m-3" onChange={event => {
                setQuantityValue(event.target.value);
              }}/> 

              <button type="submit" className="btn btn-primary" >Crear Item</button>
            </form>

          </div>
          
        </div>
      </div>
    </>
  );
};
