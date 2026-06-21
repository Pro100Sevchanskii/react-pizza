import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={475}
        viewBox="0 0 280 475"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

    >
        <circle cx="140" cy="130" r="130" />
        <rect x="0" y="275" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="322" rx="15" ry="15" width="280" height="88" />
        <rect x="128" y="430" rx="25" ry="25" width="152" height="45" />
        <rect x="0" y="439" rx="15" ry="15" width="90" height="27" />
    </ContentLoader>
)

