import Link from 'next/link';
import UpdateItem from '../components/UpdateItem';

//  we are destructuring props directly {query} = props
const Sell = ({query}) => (
    <div>
        <UpdateItem id={query.id} /> 
    </div>

);

export default Sell