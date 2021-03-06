import Link from 'next/link';
import SingleItem from '../components/SingleItem';

const item = ({query}) => (
    <SingleItem id={query.id}/>
);

export default item