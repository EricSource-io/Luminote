import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    IconoirProvider, MultiplePagesEmpty, CloudSync, ShareAndroid,
    UserCircle, GithubCircle, Settings,
    NavArrowRight, NavArrowDown,
    AddFolder, SortDown, ArrowUnionVertical, PageEdit
} from 'iconoir-react';
import { getNotebookDataById, getNoteById } from '../utils/database';
import '../styles/layout.css';


// Sidebar component
function Sidebar ({ isOpen }) {
    const [expandedFolders, setExpandedFolders] = useState({});

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


    // Function to handle note movement
    const handleNoteMove = (noteId, sourceFolderId, destinationFolderId) => {
        // Implement the logic to update the data structure with the new folder assignment
        // For simplicity, you can use the local state and update it accordingly
    };

    // Note component
    const Note = ({ note, notebookId, folderId, handleNoteMove }) => {
        // Check if the note is selected
        const isSelected = noteId == note.id;

        // useDrag hook to enable dragging functionality
        const [{ isDragging }, drag] = useDrag({
            type: 'NOTE',
            item: { id: note.id, originalFolderId: folderId },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        });

        // Determine the margin-left style based on whether the note is in the notebook or a folder
        let style = {};
        if (folderId === notebookId) style = { marginLeft: '0px' };

        // Render the Note component
        return (
            <li key={note.id} ref={drag}>
                <Link style={style}
                    className={isSelected ? `note ${isDragging ? 'note-dragging' : 'note-selected'}` : 'note'}
                    to={`/notebook/${notebookId}/${note.id}`}>
                    <div className='note-title '>{note.title}</div>
                </Link>
            </li>
        );
    }

    // Folder component
    const Folder = ({ folder, depth = 0, notebookId, handleNoteMove, expandedFolders, setExpandedFolders }) => {

        const toggleFolder = () => {
            const newIsExpanded = !expandedFolders[folder.id];
            setExpandedFolders({ ...expandedFolders, [folder.id]: newIsExpanded });
        };
        
        // Set up drop functionality for handling note movement
        const [, drop] = useDrop({
            accept: 'NOTE',
            drop: (item) => handleNoteMove(item.id, item.originalFolderId, folder.id)
        });

        // If the folder is the notebook itself
        if (folder.id === notebookId) {
            return (
                <div ref={drop} className='folder'>
                    <ul>
                        {folder.notes && folder.notes.map((note) => (
                            <Note key={note.id} note={note} notebookId={notebookId} folderId={folder.id} handleNoteMove={handleNoteMove} />
                        ))}
                        {folder.folders && folder.folders.length > 0 && folder.folders.map((subfolder) => (
                            <li key={subfolder.id}>
                                <Folder folder={subfolder} depth={0} notebookId={notebookId} handleNoteMove={handleNoteMove} expandedFolders={expandedFolders}
                                    setExpandedFolders={setExpandedFolders} />
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        // Style for adjusting the margin-left based on the folder depth
        const depthStyle = {
            marginLeft: `${depth * 20}px`,
        };

        // Render the Folder component
        return (
            <div ref={drop} className={expandedFolders[folder.id] ? 'folder folder-vertical-line' : 'folder'} style={depthStyle}>
                <div className='folder-header' onClick={toggleFolder}>
                    <IconoirProvider
                        iconProps={{
                            strokeWidth: 1.8,
                            width: '1rem',
                            height: '1.35rem',
                        }}
                    >
                        {expandedFolders[folder.id] ? <NavArrowDown /> : <NavArrowRight />}
                    </IconoirProvider>
                    {folder.name}
                </div>
                {expandedFolders[folder.id] && (
                    <ul>
                        {folder.notes && folder.notes.map((note) => (
                            <Note key={note.id} note={note} notebookId={notebookId} folderId={folder.id} handleNoteMove={handleNoteMove} />
                        ))}
                        {folder.folders && folder.folders.length > 0 && folder.folders.map((subfolder) => (
                            <li key={subfolder.id}>
                                <Folder folder={subfolder} depth={depth + 1} notebookId={notebookId} handleNoteMove={handleNoteMove} expandedFolders={expandedFolders}
                                    setExpandedFolders={setExpandedFolders} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    // Function to count folders and notes
    function countFolderAndNotes (folders, notes) {
        // Initialize counts with the number of folders and notes at the current level
        let folderCount = folders.length;
        let noteCount = notes.length;

        // Iterate through each folder at the current level
        for (const folder of folders) {
            // Check if the folder has subfolders
            if (folder.folders) {
                // Recursively call the function for subfolders and get their counts
                const { folderCount: subFolderCount, noteCount: subNoteCount } = countFolderAndNotes(folder.folders, folder.notes);

                // Update counts with the counts from subfolders
                folderCount += subFolderCount;

                // Add notes from subfolders
                noteCount += subNoteCount;
            } else {
                // If there are no subfolders, add notes at the current folder level
                noteCount += folder.notes.length;
            }
        }

        // Return the final counts for folders and notes at the current level
        return { folderCount, noteCount };
    }

    // Destructuring folderCount and noteCount from the countFolderAndNotes result
    const { folderCount, noteCount } = notebook ? countFolderAndNotes(notebook.folders, notebook.notes) : { folderCount: 0, noteCount: 0 };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className='sidebar-actions'>
                <IconoirProvider
                    iconProps={{
                        strokeWidth: 1.5,
                        width: '1.5rem',
                        height: '1.5rem',
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
                                strokeWidth: 1.5,
                                width: '1.4rem',
                                height: '1.4rem',
                            }}
                        >
                            <PageEdit />
                            <AddFolder />
                            <SortDown />
                            <ArrowUnionVertical />
                        </IconoirProvider>
                    </div>
                </div>
              
                <DndProvider backend={HTML5Backend}>
                    <div className='sidebar-note-explorer'>
                        <Folder key={notebook.id} folder={notebook} notebookId={notebook.id} handleNoteMove={handleNoteMove} expandedFolders={expandedFolders}
                            setExpandedFolders={setExpandedFolders} />
                    </div>
                </DndProvider>
            </div>)}

        </div>
    );
}

export default Sidebar;
