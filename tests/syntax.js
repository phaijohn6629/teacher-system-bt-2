/* 🧪 ពិនិត្យវាក្យសម្ព័ន្ធ JS ទាំងអស់ · jsc tests/syntax.js -- file1.js file2.js … */
var bad=0;arguments.forEach(function(f){try{new Function(read(f))}catch(e){print("SYNTAX "+f+": "+e);bad++}});print("syntax: files "+arguments.length+" bad "+bad);
