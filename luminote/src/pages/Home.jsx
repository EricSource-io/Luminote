import { Link } from 'react-router-dom';

import '../styles/home.css';

import Layout from '../components/Layout.jsx';

function Home () {

    const notebook = {
        id: 'My-Notebook',
        name: 'My Notebook',
        createdAt: '10-12-2021'
    }

    return (
        <Layout>
            <div className='home'>
                <h1 className='title'>Welcome to Luminote!</h1>
                <h4> The Best Note-Taking App, Period.</h4>
                <br />

                <b>Your Notebooks:</b>
                <br />
                <ul>
                    <li>
                        <Link to={`/notebook/${notebook.id}`}>{notebook.name}</Link>
                    </li>
                    <li><Link to={`/notebook/${notebook.id}`}>{notebook.name}</Link>
                   </li>
                </ul>
            </div>
        </Layout>
    );
}

export default Home;