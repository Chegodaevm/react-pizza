import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

// import components
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  // const navigate = useNavigate();
  // const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);

  // redux filter
  const dispatch = useAppDispatch();
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const getPizzas = () => {
    const order = sort.sortProperty.includes('-') || sort.sortProperty === 'title' ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      fetchPizzas({
        order,
        category,
        search,
        sortBy,
        currentPage: String(currentPage),
      }),
    );
  };

  // If the parameters were changed and there was a first render
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as TFetchPizzasArgs));
  //   }

  //   isMounted.current = true;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // If there was a first render, check the parameters and save in redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as TFetchPizzasArgs;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         sort: sort ? sort : list[0],
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //       }),
  //     );

  //     isSearch.current = true;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // If there was a first render, then we will request pizzas
  React.useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
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
