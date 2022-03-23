

import classes from "./secure-component.module.scss";
import PlainButton from "~/components/ui-components/buttons/plain-button";

type ComponentProps = {
    deleteEvent: Function;
    closeEvent: Function;
};

export default function SecureComponent({ deleteEvent, closeEvent }: ComponentProps) {

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content}`}>
                <span className={`${classes.warning__text}`}>Вы уверены?</span>
                <div className={`${classes.buttons__container}`}>
                    <PlainButton
                        clickEvent={() => deleteEvent()}
                        type={"danger"}
                    >
                        Да
                    </PlainButton>
                    <PlainButton
                        clickEvent={() => closeEvent()}
                        style={{background: "white", color: "#333"}}
                    >
                        Нет
                    </PlainButton>
                </div>
            </div>
        </div>
    )
}
