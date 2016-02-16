function NotesManager(){

    function addNote(note) {
        $notes.prepend(
            $("<a href='#'></a>")
            .addClass("note")
            .text(note)
        );
    }

    this.addCurrentNote = function() {
        var current_note = $new_note.val();

        if (current_note) {
            this.notes.push(current_note);
            addNote(current_note);
            $new_note.val("");
        }
    }

    function showHelp() {
        $help.show();

        document.addEventListener("click",function __handler__(evt){
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();

            document.removeEventListener("click",__handler__,true);
            hideHelp();
        },true);
    }

    function hideHelp() {
        $help.hide();
    }

    function handleOpenHelp(evt) {
        if (!$help.is(":visible")) {
            evt.preventDefault();
            evt.stopPropagation();

            showHelp();
        }
    }

    function handleAddNote(evt) {
        // this == notesManager
        this.addCurrentNote();
    }

    function handleEnter(evt) {
        if (evt.which == 13) {
            this.addCurrentNote();
        }
    }

    function handleDocumentClick(evt) {
        $notes.removeClass("active");
        $notes.children(".note").removeClass("highlighted");
    }

    function handleNoteClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        $notes.addClass("active");
        $notes.children(".note").removeClass("highlighted");
        $(evt.target).addClass("highlighted");
    }

    NotesManager.prototype.loadData = function(data) {
        for (var i=0; i<data.length; i++) {
            this.notes.push(data[i]);
        }
    }

    NotesManager.prototype.init = function(opts) {
        // cache references to the DOM elements we need to manage
        $notes = $(opts.notes);
        $new_note = $(opts.new_note);
        $add_note = $(opts.add_note);
        $help = $(opts.help);
        $open_help = $(opts.open_help);

        // build the initial list from the existing `notes` data
        var html = "";

        for (i=0; i<this.notes.length; i++) {
            html += "<a href='#' class='note'>" + this.notes[i] + "</a>";
        }
        $notes.html(html);

        // listen to "help" button
        $open_help.bind("click",handleOpenHelp.bind(this));

        // listen to "add" button
        $add_note.bind("click",handleAddNote.bind(this));

        // listen for <enter> in text box
        $new_note.bind("keypress",handleEnter.bind(this));

        // listen for clicks outside the notes box
        $(document).bind("click",handleDocumentClick.bind(this));

        // listen for clicks on note elements
        $notes.on("click",".note",handleNoteClick.bind(this));
    }

    this.notes = [];

    var
        // DOM refs
        $notes,
        $new_note,
        $add_note,
        $help,
        $open_help;
}
