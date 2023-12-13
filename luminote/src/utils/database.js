const exampleNotes = {
    id: "My-Notebook",
    name: "My Notebook",
    createdAt: "2023-02-12",
    notes: [
        {
            id: "nATF124",
            title: "Test"
        },
        {
            id: "nAT3F124",
            title: "Test2"
        }
    ],
    folders: [
        {
            id: "fH213A23",
            name: "Folder 1",
            notes: [
                {
                    id: "nATF224",
                    title: "Todo!"
                },
                {
                    id: "nATA124",
                    title: "Todo!"
                }
            ]
        },
        {
            id: "fH232323",
            name: "Folder 2", // Changed the name to "Folder 2"
            notes: [
                {
                    id: "nAT314",
                    title: "Todo2!"
                }
            ],
            folders: [
                {
                id: "fH51255",
                name: "SubFolder 1",
                notes: [
                    {
                        id: "nA23124",
                        title: "Test!"
                    }
                ]
            }
            ],
        },
    ]
};

export function getAllNotebooks () {
    const notebooks = [exampleNotes];
    return notebooks;
}

export function getNotebookDataById (notebookId) {
    const notebook = exampleNotes.id === notebookId ? exampleNotes : null;
    return notebook;
}

export function getNoteById(notebookId, noteId) {
    const findNote = (folder) => {
        if (folder.notes) {
            const note = folder.notes.find((n) => n.id === noteId);
            if (note) return note;
        }

        if (folder.folders) {
            for (const subfolder of folder.folders) {
                const foundNote = findNote(subfolder);
                if (foundNote) return foundNote;
            }
        }

        return null;
    };

    const notebook = getNotebookDataById(notebookId);

    return notebook ? findNote(notebook) : null;
}