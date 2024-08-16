import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, CartItemType } from "../../redux/Slice/cartSlice";
import { Link } from "react-router-dom";
import { FC } from "react";
import { RootState } from "../../redux/store";

type PizzaBlockProps = {
  id: number;
  name: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
  count: number;
};

const PizzaBlock: FC<PizzaBlockProps> = ({
  id,
  name,
  imageUrl,
  types,
  sizes,
  price,
}) => {
  const initialActiveType = types.length > 0 ? types[0] : 1;

  const [activeType, setActiveType] = useState<number>(initialActiveType);

  const [activeSize, setActiveSize] = useState<number>(0);

  const pizzaTypes: string[] = ["тонкое", "традиционное"];

  //  redux хуки

  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  const addedItem = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      name,
      imageUrl,
      price,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={"pizza/" + id}>
        <img className="pizza-block__image" src={imageUrl} alt={name} />
        <h4 className="pizza-block__title">{name}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={activeType === type ? "active" : ""}
            >
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item, i) => (
            <li
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
              key={i}
            >
              {item} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedItem > 0 && <i>{addedItem}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
