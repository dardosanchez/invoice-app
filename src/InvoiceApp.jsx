import { getInvoice } from "./services/getInvoice.js";
import { ClientView } from "./components/ClientView.jsx";
import { Companyview } from "./components/CompanyView.jsx";
import { InvoiceView } from "./components/InvoiceView.jsx";
import { ListItemView } from "./components/ListItemView.jsx";
import { TotalView } from "./components/TotalView.jsx";

export const InvoiceApp = () => {
  const { id, name, client, company, items , total} = getInvoice();

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
          </div>
        </div>
      </div>
    </>
  );
};
