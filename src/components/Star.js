import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";

const Star = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <>
        {[...Array(fullStars)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gold" }} />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "gold" }} />}
        {[...Array(emptyStars)].map((_, i) => (
            <FontAwesomeIcon key={i + fullStars} icon={faEmptyStar} style={{ color: "lightgray" }} />
        ))}
        </>
    );
};

export default Star;