import { useState, useRef, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType } from "../../redux/Slice/FilterSlice";
import { MouseEvent } from "react";
import { RootState } from "../../redux/store";

type sortItem = {
  name: string;
  sort: "rating" | "price" | "name" | "-rating" | "-price" | "-name";
};

export const list: sortItem[] = [
  { name: "популярности (desc)", sort: "rating" },
  { name: "популярности (asc)", sort: "-rating" },
  { name: "цене (desc)", sort: "price" },
  { name: "цене (asc)", sort: "-price" },
  { name: "алфавиту (desc)", sort: "name" },
  { name: "алфавиту (asc)", sort: "-name" },
];

const Sort: FC = () => {
  const SortType = useSelector((state: RootState) => state.filter.sortType);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSort = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (sortRef.current && !sortRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const listener = handleClickOutside as unknown as EventListener;

    document.body.addEventListener("click", listener);
    return () => {
      document.body.removeEventListener("click", listener);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onClickSort}>{SortType.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => {
                  dispatch(setSortType(obj));
                  setOpen(false);
                }}
                className={SortType.name === obj.name ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
