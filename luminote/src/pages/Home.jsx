import React from 'react';
import '../styles/home.css';

function Home(){
    // Sample list of notes 
    const notes = [
        {id: 'note-1', title: 'Note 1'},
        {id: 'note-2', title: 'Note 2'},
        {id: 'note-3', title: 'Note 3'},
        {id: 'note-4', title: 'Note 4'},
    ];

    return (
        <div className='home'>
            <h1 className='title'>Welcome to Luminote!</h1>
            <h4> The Best Note-Taking App, Period.</h4>
            <br/>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <a href={`/notes/${note.id}`}>{note.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;