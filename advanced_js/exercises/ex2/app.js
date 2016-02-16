// assume this data came from the database
var data = ["This is the first note I've taken!",
    "Now is the time for all good men to come to the aid of their country.",
    "The quick brown fox jumped over the moon."];


var notesManager = new NotesManager();

notesManager.loadData(data);
notesManager.init({
    notes: "#notes",
    new_note: "#note",
    add_note: "#add_note",
    help: "#help",
    open_help: "#open_help"
});
