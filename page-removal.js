let map = new Map();
let time = 0;
let faults = 0;

let add = function(page) {
  let frame = map.get(page);
  if (frame) {
    frame.time = time;
    console.log(`Tick ${time}: page ${page} is already loaded`);
  } else {
    if (map.size === 3) {
      let victim = null;
      for (let [page, frame] of map) {
        if (victim === null || frame.time > victim.frame.time) {
          victim = { page, frame };
        }
      }

      console.log(`Page fault ${++faults}: removing page ${victim.page}`);
      map.delete(victim.page);
    }

    console.log(`Tick ${time}: adding page ${page}`);
    map.set(page, { time });
  }

  console.log(`    RAM = ${Array.from(map.keys()).join(',')}`);
  console.log('-'.repeat(20));

  ++time;
};

['a', 'd', 'b', 'a', 'f', 'b', 'e', 'c', 'g', 'f', 'b', 'g'].forEach(page => add(page));
