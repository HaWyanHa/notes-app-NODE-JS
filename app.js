/*jshint esversion: 6*/
const fs = require('fs');    //everytime you use require, just pass in ONE string
const _ = require('lodash');  //this is all it takes to install a third party package
const yargs = require('yargs');

const notes = require('./notes.js');


const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
}

const argv = yargs
	.command('add', 'Add a new note', {       //set up for the ADD command got to use YARG documentation
		title: {
			describe: 'Title of note',
			demand: true,
			alias: 't'
		},
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'List all notes')
	.command('read', 'read a note', {     //this is the options object
		describe: 'Title of note',
		demand: true,
		alias: 't'
	})
	.command('remove', 'Remove a note', {
		title: titleOptions               //this time I used a const equal to that object
	})
	.help()
	.argv;
var command = argv._[0]; //process.argv[2];
console.log('command', command);


//console.log('Process: ', process.argv); this is the original argv (not user friendly)
//console.log('Yargs', yargs.argv);



if (command === 'add') {

	var note = notes.addNote(argv.title, argv.body);

	if (note) {
		console.log('Note created');
		notes.logNote(note);

	} else if (!note) {
		console.log('Note title taken');
	}

} else if (command === 'list') {
	
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length}`);

	allNotes.forEach((note) => notes.logNote(note));


} else if(command === 'read') {

	var note = notes.getNote(argv.title);

	if(note) {
		console.log('Here is the Note');
		notes.logNote(note);
	} else {
		console.log('note not found');
	}
		
} else if (command === 'remove') {

	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);

} else {
	console.log('Command not recgonized');
}

