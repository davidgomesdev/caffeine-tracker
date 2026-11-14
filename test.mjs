// Run: node test.mjs  (checks the pure logic in index.html)
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const src=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const code=src.split('// <pure>')[1].split('// </pure>')[0];
const {ITEMS,ymd,bump,toCSV}=new Function(code+';return {ITEMS,ymd,bump,toCSV}')();

assert.equal(ymd(new Date(2026,10,3,23,59)),'2026-11-03'); // local date, zero-padded
const db={};
bump(db,'2026-11-14','coffee',1);bump(db,'2026-11-14','coffee',1);bump(db,'2026-11-14','choc',1);
bump(db,'2026-11-13','tea',1);bump(db,'2026-11-13','tea',-1);bump(db,'2026-11-13','tea',-1); // never negative, zero days skipped
assert.equal(toCSV(db),'date,dark_chocolate,coffee,tea\n2026-11-14,1,2,0\n');
assert.equal(ITEMS.length,3);
console.log('ok');
