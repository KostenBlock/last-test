
import classes from "./change-component.module.scss";
import PlainButton from "~/components/ui-components/buttons/plain-button";

type ComponentProps = {
    element: { title: string, completed: boolean} | any;
    changeEvent: Function;
    saveEvent: Function;
    closeEvent: Function;
};

export default function ChangeComponent({ element, saveEvent, closeEvent, changeEvent }: ComponentProps) {
    const { title, completed } = element;

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content}`}>
                <div className={`${classes.editor__container}`}>
                    <input
                        className={`${classes.input}`}
                        type={"text"}
                        value={title}
                        onChange={(event: any) => changeEvent(event.target.value, 'title')}
                    />
                    <div className={`${classes.checkbox__container}`}>
                        <input
                            type="checkbox"
                            onChange={() => changeEvent(!completed, 'completed')}
                            checked={completed}
                        />
                        <span className={`${classes.label}`}>Завершена</span>
                    </div>
                </div>
                <div className={`${classes.buttons__container}`}>
                    <PlainButton
                        clickEvent={() => saveEvent()}
                        type={"success"}
                    >
                        Сохранить
                    </PlainButton>
                    <PlainButton
                        clickEvent={() => closeEvent()}
                        style={{background: "white", color: "#333"}}
                    >
                        Отмена
                    </PlainButton>
                </div>
            </div>
        </div>
    )
}
