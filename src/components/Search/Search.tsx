import {
  useContext,
  useRef,
  useCallback,
  useState,
  FC,
  ChangeEvent,
} from "react";
import { Appcontext } from "../../store/Context";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";

export const Search: FC = () => {
  const [value, setValue] = useState("");

  const { setSearchValue } = useContext(Appcontext);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((e) => {
      setSearchValue(e);
    }, 1000),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="25px"
        height="25px"
      >
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={styles.root}
        type="text"
        placeholder="Поиск пицци..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="25px"
          height="25px"
        >
          <path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z" />
        </svg>
      )}
    </div>
  );
};
