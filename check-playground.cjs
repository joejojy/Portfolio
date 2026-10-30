const fs = require('fs');
const vm = require('vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/playground.js', 'utf8');
const moodSource = source.match(/function localMood\(date=new Date\(\)\)\{[^}]+\}/)[0];
const getMood = vm.runInNewContext(`(${moodSource})`);
for (const [hour, expected] of [[0,'night'],[5,'night'],[6,'morning'],[8,'morning'],[9,'day'],[16,'day'],[17,'sunset'],[19,'sunset'],[20,'night'],[23,'night']]) {
 assert.equal(getMood({getHours:()=>hour}), expected);
}
const concepts = vm.runInNewContext(source.match(/const concepts = (\[[\s\S]*?\n \]);/)[1]);
assert.equal(concepts.length, 15);
const layout = vm.runInNewContext(source.match(/const layout=(\[[\s\S]*?\n \]);/)[1]);
assert.equal(layout.length, concepts.length, 'Every gallery entry needs a camera position');
for (const concept of concepts) for (const file of concept.files) {
 assert.ok(fs.existsSync(`${__dirname}/assets/playground/${file}.png`), file);
 assert.ok(fs.existsSync(`${__dirname}/assets/playground/${file}-thumb.jpg`), file);
}
console.log('Passed: 10 local-hour boundaries, 15 gallery entries, matching camera positions, all original images and previews present.');
// Exercise slow and out-of-order image loads across consecutive selections.
const loads=[];
const media={firstElementChild:null,replaceChildren(image){this.firstElementChild=image;},classList:{remove(){}}};
const controls={};
const viewer=vm.createContext({concepts,selected:0,slide:0,root:'./assets/playground/',
 Image:class {constructor(){loads.push(this);}},
 dialog:{querySelector(selector){return selector==='.pg-dialog-media'?media:(controls[selector]??={});}}
});
vm.runInContext(source.slice(source.indexOf(' function renderSlide()'),source.indexOf(' function openConcept(')),viewer);
vm.runInContext('renderSlide()',viewer);
assert.match(media.firstElementChild.src,/f1-live-thumb\.jpg$/);
vm.runInContext('selected=1;renderSlide()',viewer);
assert.match(media.firstElementChild.src,/\/1-thumb\.jpg$/);
loads[1].onload(); // The old F1 download finishes after Maps was selected.
assert.match(media.firstElementChild.src,/\/1-thumb\.jpg$/);
loads[3].onload();
assert.match(media.firstElementChild.src,/\/1\.png$/);
vm.runInContext('selected=7;slide=1;renderSlide()',viewer);
assert.match(media.firstElementChild.src,/12\.2-thumb\.jpg$/);
// Failed full-size loads leave the correct preview available.
assert.match(media.firstElementChild.alt,/Booking reminders/);
console.log('Passed: immediate selection preview, stale-load protection, and multi-image switching.');
