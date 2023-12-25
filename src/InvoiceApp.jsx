import { getInvoice, calculateTotal } from "./services/getInvoice.js";
import { ClientView } from "./components/ClientView.jsx";
import { Companyview } from "./components/CompanyView.jsx";
import { InvoiceView } from "./components/InvoiceView.jsx";
import { ListItemView } from "./components/ListItemView.jsx";
import { TotalView } from "./components/TotalView.jsx";
import { useEffect, useState } from "react";
import { FormItemsView } from "./components/FormItemsView.jsx";

const invoiceInitial = {
  id: 0,
  name: "",
  client: {
    name: "",
    lastname: "",
    address: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
  },
  company: {
    name: "",
    fiscalNumber: 0,
  },
  items: [],
};

export const InvoiceApp = () => {

  const [activeFrom,setActiveFrom] = useState(false);

  const [total, setTotal] = useState(0);

  const [counter, setcounter] = useState(4);

  const [invoice, setInvoice] = useState(invoiceInitial);

  const [items, setItems] = useState([]);

  const { id, name, client, company } = invoice;

  useEffect(() => {
    const data = getInvoice();
    console.log(invoice);
    setInvoice(data);
    setItems(data.items);
  }, []);

  useEffect(() => {}, [counter]);

  useEffect(() => {
    setTotal(calculateTotal(items));
  }, [items]);

  const handlerAddItems = ({ product, price, quantity }) => {

    setItems([
      ...items,
      {
        id: counter,
        product: product.trim(),
        price: +price.trim(),
        quantity: parseInt(quantity.trim(), 10),
      },
    ]);

    setcounter(counter + 1);
  };


  const handlerDeleteItem = (id) => {
      setItems(items.filter(item => item.id !== id));
  }


  const onActiveFrom = () => {
    setActiveFrom(!activeFrom);
  }

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
            <ListItemView name="Productos de la factura" items={items} handlerDeleteItem={id =>  handlerDeleteItem(id)} />
            <TotalView total={total} />
            <button className="btn btn-secondary"
            onClick={onActiveFrom}>
            { !activeFrom? 'Agregar Item ' : 'Cerrar From'}</button>
            { !activeFrom? '': <FormItemsView handler={handlerAddItems} />}
            

          </div>
        </div>
      </div>
    </>
  );
};
