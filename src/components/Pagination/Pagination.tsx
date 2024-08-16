import { useDispatch } from "react-redux";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { FC } from "react";

type PaginationType = {
  setCurrentPage: any;
};

export const Pagination: FC<PaginationType> = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
