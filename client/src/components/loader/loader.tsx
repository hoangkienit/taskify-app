import { HashLoader } from "react-spinners"
import './loader.css';
import type { FC } from "react";

interface LoaderProps {
    color: string,
    size: number,
    loading: boolean
}

export const Loading: FC<LoaderProps> = ({color, size, loading}) => {

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