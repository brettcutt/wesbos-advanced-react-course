import Items from '../components/Items';

const items = ({query}) => (
    <div>
        <Items page={parseFloat(query.page) || 1} />
    </div>
);

export default items