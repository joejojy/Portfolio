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
assert.equal(concepts.length, 14);
for (const concept of concepts) for (const file of concept.files) {
 assert.ok(fs.existsSync(`${__dirname}/assets/playground/${file}.png`), file);
 assert.ok(fs.existsSync(`${__dirname}/assets/playground/${file}-thumb.jpg`), file);
}
console.log('Passed: 10 local-hour boundaries, 14 gallery entries, all original images and previews present.');
