

import classes from "./element-component.module.scss";
import PlainButton from "~/components/ui-components/buttons/plain-button";

type ComponentProps = {
    id: number;
    title: string;
    completed: boolean;
    preDeleteEvent: Function;
    changeEvent: Function;
};

export default function ElementComponent({id, title, completed, preDeleteEvent, changeEvent} : ComponentProps) {
    return (
        <div
            key={id}
            className={`${classes.todo__element}`}
        >
            <span className={`${classes.title}`}>{title}</span>
            <span className={`${classes.process}`}>{completed ? "Завершена" : "Не завершена"}</span>
            <PlainButton
                clickEvent={() => changeEvent()}
            >
                Изменить
            </PlainButton>
            <PlainButton
                clickEvent={() => {
                    preDeleteEvent();
                }}
                type={"danger"}
            >
                Удалить
            </PlainButton>
        </div>
    )
};
