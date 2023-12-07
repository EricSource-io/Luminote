import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/layout.css';
import {
    IconoirProvider, MultiplePagesEmpty, CloudSync, ShareAndroid,
    UserCircle, GithubCircle, Settings,
    NavArrowRight, NavArrowDown, Page,
    AddFolder, SortDown, ArrowUnionVertical, PageEdit
} from 'iconoir-react';

// Sidebar component
function Sidebar ({ isOpen }) {
     // Extracting notebookId and noteId from URL params
    const { notebookId, noteId } = useParams();
    const location = useLocation();

     // Effect to log the current route when it changes
    useEffect(() => {
        // Log the current route when the component mounts or when the route changes
        console.log('Current Route:', location.pathname);
    }, [location.pathname]);

    // Sample notebook data
    const notebook = {
        id: notebookId,
        createdAt: 0,
        folder: [
            {
                id: 1,
                name: 'Folder 1',
                isExpanded: true,
                notes: [
                    { id: 'note-1', title: 'Note 1' },
                    { id: 'note-2', title: 'Note 2' },
                ],
            },
            {
                id: 2,
                name: 'Folder 2',
                isExpanded: false,
                notes: [
                    { id: 'note-3', title: 'Note 3' },
                    { id: 'note-4', title: 'Note 4' },

                ],
                folder: [
                    {
                        id: 3,
                        name: 'Subfolder 1',
                        isExpanded: false,
                        notes: [
                            { id: 'note-3', title: 'Note 3' },
                            { id: 'note-4', title: 'Note 4' },
                        ],
                    },
                ],
            },
        ]
    }

    // Note component
    const Note = ({ note, notebookId }) => {
        const isSelected = noteId == note.id;
        return (<li key={note.id}>
            <Link className={isSelected ? 'note note-selected' : 'note'} to={`/notebook/${notebookId}/${note.id}`}>
                <div className='note-title '>{note.title}</div>
            </Link>
        </li>)
    }

    // Folder component
    const Folder = ({ folder, depth = 0, notebookId }) => {
        const [isExpanded, setIsExpanded] = useState(folder.isExpanded);

        // Function to toggle folder expansion
        const toggleFolder = () => {
            setIsExpanded(!isExpanded);
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
                            height: '1rem',
                        }}
                    >
                        {isExpanded ? <NavArrowDown /> : <NavArrowRight />}
                    </IconoirProvider>
                    {folder.name}
                </div>
                {isExpanded && (
                    <ul>

                        {
                            folder.notes.map((note) => (
                                <div key={note.id}>
                                    <Note note={note} notebookId={notebookId} />
                                </div>
                            ))}
                        {folder.folder && (folder.folder.map((subfolder) => (
                            <li key={subfolder.id}>
                                <Folder folder={subfolder} depth={depth + 1} notebookId={notebookId} />
                            </li>
                        )))}
                    </ul>
                )}
            </div>
        );
    };

    // Function to count folders and notes
    function countFolderAndNotes (folders) {
        let folderCount = 0;
        let noteCount = 0;

        for (const folder of folders) {
            folderCount += 1; // Count the current folder
            noteCount += folder.notes ? folder.notes.length : 0;

            if (folder.folder && folder.folder.length > 0) {
                for (const subfolder of folder.folder) {
                    const { folderCount: subfolderCount, noteCount: subnoteCount } = countFolderAndNotes([subfolder]);
                    folderCount += subfolderCount;
                    noteCount += subnoteCount;
                }
            }
        }

        return { folderCount, noteCount };
    }

     // Destructuring folderCount and noteCount from the countFolderAndNotes result
    const { folderCount, noteCount } = countFolderAndNotes(notebook.folder);

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
                        <Link to="/">
                            <MultiplePagesEmpty />
                        </Link>
                        <Link to="/">
                            <ShareAndroid />
                        </Link>
                        <Link to="/">
                            <CloudSync /></Link>
                    </div>
                    <div className='action-buttons' >
                        <UserCircle />
                        <GithubCircle />
                        <Settings />
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
                    {notebook.folder.map((folder) => (
                        <Folder key={folder.id} folder={folder} notebookId={notebook.id} />
                    ))}
                </div>

            </div>)}

        </div>
    );
}

export default Sidebar;
