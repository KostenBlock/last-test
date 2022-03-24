import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteElement,
    getElements,
    rollBackElement,
    selectElementsState,
    setElement,
    setState
} from "~/store/reducers/elements.slice";

import classes from "./home-page.module.scss";
import PlainLoader from "~/components/ui-components/loaders/plain-loader";
import ElementComponent from "~/components/page-components/home-page/element-component";
import SecureComponent from "~/components/page-components/home-page/secure-component";
import ChangeComponent from "~/components/page-components/home-page/change-component";

export default function HomePage() {
    const dispatch = useDispatch<Function>();
    const { elements, isPending, idToDelete, activeIndex } = useSelector(selectElementsState);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [backUpElement, setBackUpElement] = useState<Object>();

    useEffect(() => {
        dispatch(getElements());
    }, []);

    const getBackUpElement = (index: number) => {
        const temp = { ...elements[index]};
        setBackUpElement({ ...temp });
    };

    if (isPending) {
        return (
            <div className={`${classes.wrapper}`}>
                <div className={`${classes.loader}`}>
                    <PlainLoader className={""}/>
                </div>
            </div>
        )
    }

    if (elements.length === 0) {
        return <h1>Задач нет</h1>
    }

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content}`}>
                <div className={`${classes.todos__container}`}>
                    {elements.map((element: any, index: number) => {
                        const { id, title, completed } = element;
                        return (
                            <ElementComponent
                                key={`${id}-${title}`}
                                id={id}
                                title={title}
                                completed={completed}
                                preDeleteEvent={() => {
                                    dispatch(setState({idToDelete: id}));
                                    setIsDeleted(true);
                                }}
                                changeEvent={() => {
                                    dispatch(setState({activeIndex: index}));
                                    getBackUpElement(index);
                                    setIsChanged(true);
                                }}
                            />
                        )
                    })}
                </div>
            </div>
            {isDeleted
                ? <SecureComponent
                    closeEvent={() => {
                        setIsDeleted(false);
                        dispatch(setState({ idToDelete: null }));
                    }}
                    deleteEvent={() => {
                        setIsDeleted(false);
                        dispatch(deleteElement(idToDelete));
                        dispatch(setState({ idToDelete: null }));
                    }}
                />
                : null}
            {isChanged
                ? <ChangeComponent
                    element={elements[activeIndex]}
                    changeEvent={(value: string | boolean, filed: string) => dispatch(setElement({ content: {[filed]: value }}))}
                    saveEvent={() => {
                        setIsChanged(false);
                        dispatch(setState({ activeIndex: null }));
                    }}
                    closeEvent={() => {
                        setIsChanged(false);
                        dispatch(rollBackElement({ element: backUpElement }));
                        dispatch(setState({ activeIndex: null }));
                    }}
                />
                : null}
        </div>
    )
}
