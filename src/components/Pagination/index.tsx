import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
    categoryId: number
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, categoryId }) => {
    const realPageCount = categoryId >= 0 && categoryId <= 1 ? 4 :
        categoryId === 2 ? 1 : 2
    return <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={realPageCount}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
    />
}



