import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.css';
import {
    IconoirProvider, MultiplePagesEmpty, CloudSync, ShareAndroid,
    UserCircle, GithubCircle, Settings,
    NavArrowRight, NavArrowDown, Page,
    AddFolder, SortDown, ArrowUnionVertical, PageEdit
} from 'iconoir-react';



function Sidebar ({ isOpen }) {

    const folders = [
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
            folders: [
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
    ];

    const Note = ({ note }) => {

        return (<li key={note.id}>

            <a className='note' href={`/notes/${note.id}`}>
                <Page width={'1.25rem'} height={'1.25rem'} strokeWidth={1.5} />
                <div className='note-title '>{note.title}</div>
            </a>
        </li>)
    }

    const Folder = ({ folder, depth = 0 }) => {
        const [isExpanded, setIsExpanded] = useState(folder.isExpanded);
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
                                <Note note={note} />
                            ))}
                        {folder.folders && (folder.folders.map((subfolder) => (
                            <li key={subfolder.id}>
                                <Folder folder={subfolder} depth={depth + 1} />
                            </li>
                        )))}
                    </ul>
                )}
            </div>
        );
    };

    function countFoldersAndNotes (folder) {
        let folderCount = 1; // Start with 1 to count the current folder
        let noteCount = folder.notes ? folder.notes.length : 0;

        if (folder.folders) {
            for (const subfolder of folder.folders) {
                const { folderCount: subfolderCount, noteCount: subnoteCount } = countFoldersAndNotes(subfolder);
                folderCount += subfolderCount;
                noteCount += subnoteCount;
            }
        }

        return { folderCount, noteCount };
    }

    const { folderCount, noteCount } = countFoldersAndNotes({ folders });

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
                    <p className='info'>{noteCount} notes, {folderCount} folders</p>
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
                    {folders.map((folder) => (
                        <Folder key={folder.id} folder={folder} />
                    ))}
                </div>

            </div>)}

        </div>
    );
}

export default Sidebar;
