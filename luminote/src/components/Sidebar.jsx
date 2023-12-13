import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/layout.css';
import {
    IconoirProvider, MultiplePagesEmpty, CloudSync, ShareAndroid,
    UserCircle, GithubCircle, Settings,
    NavArrowRight, NavArrowDown, Page,
    AddFolder, SortDown, ArrowUnionVertical, PageEdit
} from 'iconoir-react';
import { getNotebookDataById, getNoteById } from '../utils/database';

// Sidebar component
function Sidebar ({ isOpen }) {
    // Extracting notebookId and noteId from URL params
    const { notebookId, noteId } = useParams();
    const location = useLocation();

    // Fetching notebook data
    const notebook = getNotebookDataById(notebookId);
    const selectedNote = getNoteById(notebookId, noteId);

    // Effect to log the current route when it changes
    useEffect(() => {
        // Log the current route when the component mounts or when the route changes
        console.log('Current Route:', location.pathname);
    }, [location.pathname]);

    // Note component
    const Note = ({ note, notebookId }) => {

        const isSelected = noteId == note.id;
        return (
            <li key={note.id}>
                <Link className={isSelected ? 'note note-selected' : 'note'} to={`/notebook/${notebookId}/${note.id}`}>
                    <div className='note-title '>{note.title}</div>
                </Link>
            </li>
        );
    }

    // Folder component
    const Folder = ({ folder, depth = 0, notebookId }) => {
        const localStorageKey = `folder-${folder.id}-isExpanded`;
        const storedIsExpanded = localStorage.getItem(localStorageKey);
        const [isExpanded, setIsExpanded] = useState(storedIsExpanded === 'true' || folder.isExpanded);

        // Function to toggle folder expansion
        const toggleFolder = () => {
            const newIsExpanded = !isExpanded;
            setIsExpanded(newIsExpanded);
            localStorage.setItem(localStorageKey, newIsExpanded.toString());
        };


        const depthStyle = {
            marginLeft: `${depth * 20}px`,
        };

        return (
            <div className={isExpanded ? 'folder folder-vertical-line' : 'folder'} style={depthStyle}>
                <div className='folder-header' onClick={toggleFolder}>
                    <IconoirProvider
                        iconProps={{
                            strokeWidth: 1.8,
                            width: '1rem',
                            height: '1.35rem',
                        }}
                    >
                        {isExpanded ? <NavArrowDown /> : <NavArrowRight />}
                    </IconoirProvider>
                    {folder.name}
                </div>
                {isExpanded && (
                    <ul>
                        {folder.notes && folder.notes.map((note) => (
                            <Note key={note.id} note={note} notebookId={notebookId} />
                        ))}
                        {folder.folders && folder.folders.length > 0 && folder.folders.map((subfolder) => (
                            <li key={subfolder.id}>
                                <Folder folder={subfolder} depth={depth + 1} notebookId={notebookId} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    // Function to count folders and notes
    function countFolderAndNotes (folders, notes) {
        let folderCount = 0;
        let noteCount = 0;

        noteCount = notes.length;


        for (const folder of folders) {
            folderCount += 1; // Count the current folder
            noteCount += folder.notes ? folder.notes.length : 0;

            if (folder.folder && folder.folder.length > 0) {
                const { folderCount: subfolderCount, noteCount: subnoteCount } = countFolderAndNotes(folder.folder);
                folderCount += subfolderCount;
                noteCount += subnoteCount;
            }
        }

        return { folderCount, noteCount };
    }

    // Destructuring folderCount and noteCount from the countFolderAndNotes result
    const { folderCount, noteCount } = notebook ? countFolderAndNotes(notebook.folders, notebook.notes) : { folderCount: 0, noteCount: 0 };

    return (
        <div className='sidebar'>
            <div className='sidebar-actions'>
                <IconoirProvider
                    iconProps={{
                        color: '',
                        strokeWidth: 1.5,
                        width: '1.75rem',
                        height: '1.75rem',
                    }}
                >
                    <div className='action-buttons'>
                        <Link to="/" className='selected'>
                            <MultiplePagesEmpty />
                        </Link>
                        <Link to="/">
                            <ShareAndroid />
                        </Link>
                        <Link to="/">
                            <CloudSync /></Link>
                    </div>
                    <div className='action-buttons' >
                        <Link to="/">
                            <UserCircle />
                        </Link>
                        <Link to="/">
                            <GithubCircle />
                        </Link>
                        <Link to="/">
                            <Settings />
                        </Link>
                    </div>
                </IconoirProvider>

            </div>

            {isOpen && (<div className='sidebar-content'>
                <div className='sidebar-header'>
                    <h3 className='title'>My Notes</h3>
                    <p className='info'>{noteCount} notes, {folderCount} folder</p>
                    <div className='action-buttons'>
                        <IconoirProvider
                            iconProps={{
                                color: '',
                                strokeWidth: 1.5,
                                width: '1.5rem',
                                height: '1.5rem',
                            }}
                        >
                            <PageEdit />
                            <AddFolder />
                            <SortDown />
                            <ArrowUnionVertical />
                        </IconoirProvider>
                    </div>


                </div>
                <b>Notes</b>
                <div className='sidebar-note-explorer'>
                    <ul className='notes'>
                        {notebook.notes.map((note) => (
                            <Note key={note.id} note={note} notebookId={notebook.id} />
                        ))}
                    </ul>
                    {notebook.folders.map((folder) => (
                        <Folder key={folder.id} folder={folder} notebookId={notebook.id} />
                    ))}
                </div>

            </div>)}

        </div>
    );
}

export default Sidebar;
