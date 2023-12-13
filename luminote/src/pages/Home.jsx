import { Link } from 'react-router-dom';

import '../styles/home.css';

import Layout from '../components/Layout.jsx';

function Home(){
    // Sample list of notes 
    const notes = [
        {id: 'note-1', title: 'Note 1'},
        {id: 'note-2', title: 'Note 2'},
        {id: 'note-3', title: 'Note 3'},
        {id: 'note-4', title: 'Note 4'},
    ];

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
            <br/>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <Link to={`/notebook/${notebook.id}/${note.id}`}>{note.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
        </Layout>
    );
}

export default Home;