import noresults from './no-results.png';

const EmptyState = () => (
    <div className="empty-state">
        <img src={noresults} alt="No results" />
        <h5>No results found</h5>
        <p>Results will appear here</p>
    </div>
);

export default EmptyState;