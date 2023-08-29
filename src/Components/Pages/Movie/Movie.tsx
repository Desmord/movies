import { useParams } from 'react-router';

const Movie = () => {
    const { name } = useParams();

    return (
        <div>Film: {name}</div>
    )
}

export default Movie