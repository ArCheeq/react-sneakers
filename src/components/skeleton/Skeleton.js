import "./skeleton.scss";

import skeleton from "../../resources/img/Skeleton.png";

const Skeleton = () => {
    return (
        <img className="skeleton" width={210} height={300} src={skeleton} alt="sneakers" />
    )
}

export default Skeleton;