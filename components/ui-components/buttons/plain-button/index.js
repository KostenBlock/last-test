import { useRef } from "react";
import PropTypes from 'prop-types'

import classes from './plain-button.module.scss'
import PlainLoader from "~/components/ui-components/loaders/plain-loader";

const PlainButton = ({children, isBlock, isDisabled, clickEvent, style, type, isMin, isLarge, isHidden, isLoading, isOutlined}) => {
    const buttonElement = useRef();

    return (
        <button
            ref={buttonElement}
            style={{
                ...style,
                opacity: isDisabled ? '0.5' : '1'
            }}
            disabled={isDisabled}
            onClick={() => {clickEvent(); buttonElement.current.focus()}}
            className={`
                ${classes.button__default} 
                ${isBlock ? classes.button__active : ''} 
                ${type === "danger" ? classes.danger : ''}
                ${type === "success" ? classes.success : ''} 
                ${type === "warning" ? classes.warning : ''}
                ${isMin ? classes.min : ''}
                ${isLarge ? classes.large : ''}
                ${isHidden ? classes.hidden : ''}
                ${isOutlined ? classes.outline : ''}
            `}
            onMouseLeave={() => buttonElement.current.blur()}
        >
            {isLoading ? <PlainLoader/> : children}
        </button>
    )
}

PlainButton.propTypes = {
    clickEvent: PropTypes.func,
    isBlock: PropTypes.bool,
    isDisabled: PropTypes.bool,
    children: PropTypes.node,
    type: PropTypes.string,
    isMin: PropTypes.bool,
    isLarge: PropTypes.bool,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    isOutlined: PropTypes.bool,
    style: PropTypes.object
}

PlainButton.defaultProps = {
    clickEvent: Function(),
    isBlock: false,
    isDisabled: false,
    children: null,
    type: "",
    isMin: false,
    isLarge: false,
    isHidden: false,
    isLoading: false,
    isOutlined: false,
    style: {}
}

export default PlainButton;
