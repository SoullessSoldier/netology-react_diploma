import { useParams } from "react-router-dom";

const ProductCard = () => {
  const { id } = useParams();
  return (
    <>
      <h1>This is Product {id}</h1>
    </>
  );
};

export default ProductCard;
