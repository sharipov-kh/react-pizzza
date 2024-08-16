import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

export const Product: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `https://66ade952b18f3614e3b63450.mockapi.io/pizzas/${id}`
        );
        setData(data);
      } catch (err) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    })();
  }, []);

  if (!data) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <img src={data.imageUrl} alt="img" />
      <h2>{data.name}</h2>
      <p>{data.price}</p>
    </div>
  );
};
