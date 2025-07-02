import { HashLoader } from "react-spinners"
import './loader.css';
import type { FC } from "react";

interface LoaderProps {
    color: string,
    size: number,
    loading: boolean
}

export const Loading: FC<LoaderProps> = ({ color = "#5c70f3", size, loading }) => {

    return (
        <div className="loader-container">
            <HashLoader
                loading={loading}
                color={color}
                size={size}
            />
        </div>
    )
}

export const FullPageLoader = ({size, loading }: LoaderProps, color = '#5c70f3') => {
    return (
        <div className='loading-loader'>
        <Loading
            size={size}
            color={color}
            loading={loading}
        />
    </div>
    )
}