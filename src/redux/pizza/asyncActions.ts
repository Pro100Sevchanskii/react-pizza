import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage, limit } = params
        const { data } = await axios.get<Pizza[]>(
            `https://69f324d6bd2396bf530f78f1.mockapi.io/items?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data;
    }
)