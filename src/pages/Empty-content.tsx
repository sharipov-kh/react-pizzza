import { FC } from "react";
import { Link } from "react-router-dom";

type EmptyContentProps = {
  text: string;
  title: string;
  img: string;
  text2: string;
};

export const EmptyContent: FC<EmptyContentProps> = ({
  text,
  title,
  img,
  text2,
}) => {
  return (
    <div className="cart cart--empty">
      <h2>{title}</h2>
      <p>
        {text}
        <br />
        {text2}
      </p>
      <img src={img} alt={title} />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
