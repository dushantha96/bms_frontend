import { Spinner } from "react-bootstrap";

const Loading = () => (
    <div className="empty-state">
        <Spinner animation="border" size="sm" />
        <h5>Please Wait</h5>
        <p>Data loading....</p>
    </div>
);

export default Loading;