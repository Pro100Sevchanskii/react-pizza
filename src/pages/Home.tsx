
import { Categories, Pagination, PizzaBlock, Skeleton, Sort } from '../components'

import React, { useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


import { useAppDispath } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';



const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispath()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const limit = categoryId ? '4' : '8'
        console.log(categoryId, limit)


        dispatch(
            fetchPizzas({
                limit,
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            })
        )
        window.scrollTo(0, 0)
    }

    // // Если был первый рендер то проверяем URL параметры и сохраняем в Redux
    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams
    //         const sort = sortList.find(obj => obj.sortProperty === params.sortBy)

    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId: Number(params.category),
    //             currentPage: Number(params.currentPage),
    //             sort: sort || sortList[0],
    //         }))
    //         isSearch.current = true
    //     }
    // }, [])

    //Если был первый рендер то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // //Если изменили параметры и был первый рендер то пихаем в строку
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage,
    //         })

    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [categoryId, sort.sortProperty, currentPage])

    const pizzas = items
        // .filter(obj =>
        //     obj.title.toLowerCase().includes(searchValue.toLowerCase())
        // )
        .map((obj: any) => (

            <PizzaBlock key={obj.id} {...obj} />

        ))

    const skeletons = [...new Array(categoryId ? 4 : 8)].map((_, index) => (
        <Skeleton key={index} />
    ))

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>Произошла ошибка(</h2>
                        <p>
                            К сожалению, не удалось получить питсы. Попробуйте повторить поытку позже.
                        </p>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}

                    </div>
                )
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} categoryId={categoryId} />
        </div>
    )
}

export default Home
