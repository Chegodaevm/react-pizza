import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

// import components
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // redux filter
  const dispatch = useDispatch();
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') || sort.sortProperty === 'title' ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      // @ts-ignore
      fetchPizzas({
        order,
        category,
        search,
        sortBy,
        currentPage,
      }),
    );
  };

  // If the parameters were changed and there was a first render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage, navigate]);

  // If there was a first render, check the parameters and save in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // If there was a first render, then we will request pizzas
  React.useEffect(() => {
    getPizzas();

    isSearch.current = false;

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const nameCategory = () => {
    // eslint-disable-next-line default-case
    switch (categoryId) {
      case 0:
        return 'Все';
      case 1:
        return 'Мясные';
      case 2:
        return 'Вегетарианские';
      case 3:
        return 'Гриль';
      case 4:
        return 'Острые';
      case 5:
        return 'Закрытые';
    }
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <div>
        <h2 className="content__title">{nameCategory()} пиццы</h2>
      </div>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка, пиццеед</h2>
          <p>
            Пиццы не грузятся :( <br /> Попробуйте зайти позже
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
