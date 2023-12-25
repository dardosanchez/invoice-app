export const TotalView = ({ total }) => {
  return (
    <>
      <div className="text-end d-flex justify-content-end align-items-center">
        <h5 className="me-2">Total:</h5>
        <span className="badge bg-success">{total}</span>
      </div>
    </>
  );
};
