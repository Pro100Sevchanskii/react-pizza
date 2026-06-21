import React, { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'

import styles from './Search.module.scss'
import { setSearchValue } from '../../redux/filter/slice'

export const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 250),
        []
    )

    return (
        <div className={styles.root}>
            <svg className={styles.icon} fill="#000000" width="800px" height="800px" viewBox="0 -0.24 28.423 28.423" id="_02_-_Search_Button" data-name="02 - Search Button" xmlns="http://www.w3.org/2000/svg">
                <path id="Path_215" data-name="Path 215" d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z" transform="translate(-2.31 -2.547)" fillRule="evenodd" />
                <path id="Path_216" data-name="Path 216" d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z" transform="translate(-2.31 -2.547)" fillRule="evenodd" />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder='Поиск пиццы...'
            />
            {value && (
                <svg onClick={onClickClear} className={styles.clearIcon} version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M58 167 l52 -52 -47 -47 c-61 -61 -50 -73 13 -14 l49 45 47 -46 c26 -26 51 -44 55 -40 4 4 -14 29 -40 55 l-46 47 45 49 c59 63 48 74 -14 13 l-48 -47 -44 45 c-24 25 -51 45 -59 45 -9 0 7 -22 37 -53z" />
                    </g>
                </svg>
            )}
        </div>
    )
}

