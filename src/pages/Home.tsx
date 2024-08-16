import qs from "qs";
import { useEffect, useContext, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { list } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { Appcontext } from "../store/Context";
import { setCurrentPage, setFilters } from "../redux/Slice/FilterSlice";
import { fetchPizzas } from "../redux/Slice/pizzasSlice";
import { EmptyContent } from "./Empty-content";
import { RootState } from "../redux/store";

const Home: FC = () => {
  const { searchValue } = useContext(Appcontext);
  const isMounted = useRef<boolean>(false);
  const isSearch = useRef<boolean>(false);

  const { sortType, categoryId, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const { items: item, status } = useSelector(
    (state: RootState) => state.pizzas
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPizzas = async () => {
    const categoryBy = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const order = sortType.sort.replace("-", "");
    const category = sortType.sort.includes("-") ? "asc" : "desc";

    dispatch(
      // @ts-ignore
      fetchPizzas({
        categoryBy,
        search,
        order,
        category,
        currentPage,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as {
        sort?: string;
        categoryId?: string;
        currentPage?: string;
      };

      const sort = list.find((obj) => obj.sort === params.sort) || sortType;

      dispatch(
        setFilters({
          sortType: sort,
          categoryId: params.categoryId ? Number(params.categoryId) : categoryId,
          currentPage: params.currentPage ? Number(params.currentPage) : currentPage,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortType.sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType.sort, categoryId, currentPage]);

  type CartItemType = {
    id: number;
    name: string;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number;
    count: number;
  };

  const items = item.map((obj: CartItemType) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "failed" ? (
          <div className="EmptyContent">
            <EmptyContent
              img={
                "https://avatars.dzeninfra.ru/get-zen_doc/1118263/pub_6172505b0f89852d3c17527b_6172505c65ca2b65daf49038/scale_1200"
              }
              title={"Произошло ошибка 😕"}
              text={"К сожелению не удалос получить пиццы."}
              text2={" Попробуйте повторить попытку позже."}
            />
          </div>
        ) : (
          <>
            <>{status === "loading" ? skeletons : items}</>
            <Pagination setCurrentPage={setCurrentPage} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
