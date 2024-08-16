import { Link } from "react-router-dom";
import React from "react";
const NotFoundBlock: React.FC = () => {
  return (
    <div className="not-found">
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/20230802153215/Error-404.png"
        alt="not-found"
      />
      <Link to="/">
        <button className="not-found__button">Вернуться на главную</button>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
