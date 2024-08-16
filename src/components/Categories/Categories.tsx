import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../../redux/Slice/FilterSlice";
import { FC } from "react";
import { RootState } from "../../redux/store";
const Categories: FC = () => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();

  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            onClick={() => dispatch(setCategoryId(idx))}
            className={categoryId === idx ? "active" : ""}
            key={idx}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
