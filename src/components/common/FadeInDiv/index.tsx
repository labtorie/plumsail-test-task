import React from 'react'
import styles from './styles.module.sass'
import cn from 'classnames'

interface IProps {
    isFetching: boolean | undefined,
    className?: string | undefined,
    [key: string]: any
    [key: number]: any
}

const FadeInDiv = ({isFetching=false, ...props}: IProps) => {

    function getVisibility(isFetching: boolean): {opacity: number} {
        return {opacity: isFetching ? 0 : 1}
    }

    return <div style={{...props?.style, ...getVisibility(isFetching)}}
                className={cn(styles.fadeInScreen, props.className)}>
        {props.children}
    </div>
}

export default FadeInDiv
