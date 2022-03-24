import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface Elements {
    elements: {
        userId: number | null;
        id: number | null;
        title: string;
        completed: boolean;
    }[];
    activeIndex: number | null;
    idToDelete: number | null;
    isPending: boolean;
    isError?: boolean;
}

const initialState: Elements = {
    elements: [],
    activeIndex: null,
    idToDelete: null,
    isPending: true,
    isError: false
};

export const elementsSlice = createSlice({
    name: "elements",
    initialState,
    reducers: {
        setState: (state: any, action: any) => {
            try {
                const valueArg = action.payload;
                for (const key in valueArg) {
                    if (Object.hasOwnProperty.call(valueArg, key) && Object.hasOwnProperty.call(state, key)) {
                        state[key] = valueArg[key];
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        setElement: (state: any, action) => {
            try {
                const { content } = action.payload;
                for (const key in content) {
                    if (Object.hasOwnProperty.call(content, key) && Object.hasOwnProperty.call(state.elements[state.activeIndex], key)) {
                        state.elements[state.activeIndex][key] = content[key];
                    }
                }
            } catch (e) {
                console.error(e);
            }
        },
        deleteElement: (state: any, action) => {
            try {
                const { payload } = action;
                const temp = state.elements.filter((element: any) => element.id !== payload);
                state.elements = [...temp];
            } catch (e) {
                console.error(e);
            }
        },
        rollBackElement: (state: any, action) => {
            try {
                const { element } = action.payload;
                state.elements[state.activeIndex] = element;
            } catch (e) {
                console.error(e);
            }
        },
    },
});

export const getElements = () => async (dispatch = Function) => {
            try {
                // @ts-ignore
                dispatch(setState({ isPending: true }));
                const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
                if (Array.isArray(data)) {
                    // @ts-ignore
                    dispatch(setState({ elements: data.filter((element: any, index: number) => {
                        if (index < 10) return element;
                    })}));
                }
            } catch (error) {
                // @ts-ignore
                dispatch(setState({ isPending: false }));
                console.error(error);
            } finally {
                // @ts-ignore
                dispatch(setState({ isPending: false }));
            }
        };

export const { setState, setElement, deleteElement, rollBackElement } = elementsSlice.actions;
export const selectElementsState = (state: any) => state.elements;
export default elementsSlice.reducer;
