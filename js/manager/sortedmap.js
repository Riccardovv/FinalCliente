const LIST             = Symbol ();
const LIST_DELETE      = Symbol ();
const LIST_FIND        = Symbol ();
const COMPARE_FUNCTION = Symbol ();

class SortedMap extends Map {

  constructor (data, compareFunction) {
    if (typeof data === 'function') {
      compareFunction = data;
      data            = [];
    }
    if (compareFunction) {
      data.unshift ([ COMPARE_FUNCTION, compareFunction ]);
    }
    super (data);
  }

  set (key, value) {
    if (!this[ LIST ]) {
      this[ LIST ] = [];
      if (key === COMPARE_FUNCTION) {
        return this[ COMPARE_FUNCTION ] = value;
      }
    }
    if (this.has (key)) {
      this[ LIST_DELETE ] (key);
    }
    super.set (key, value);
    this[ LIST ].splice (this[ LIST_FIND ] (key, value), 0, [ key, value ]);

  }

  delete (key) {
    if (this.has (key)) {
      this[ LIST_DELETE ] (key);
      super.delete (key);
    }
  }

  clear () {
    this[ LIST ] = [];
    super.clear ();
  }

  [ Symbol.iterator ] () {
    return this[ LIST ][ Symbol.iterator ] ();
  }

  entries () {
		if (ordered)
    	return [...this[ LIST ]].sort(ordered)[ Symbol.iterator ] ();
		else
		return this[ LIST ];
  }

  keys () {
		if (ordered)
    	return [...this[ LIST ]].sort(ordered).map (x => x[ 0 ]);
		else
			return this[ LIST ].map (x => x[ 0 ]);
  }

  values (ordered) {
		if (ordered)
    	return [...this[ LIST ]].sort(ordered).map (x => x[ 1 ]);
		else
			return this[ LIST ].map (x => x[ 1 ]);
  }

  forEach (callbackFn, thisArg) {
    const cb = callbackFn.bind (thisArg || this);
    for (let n = 0; n < this[ LIST ].length; n++) {
      cb (this[ LIST ][ n ][ 1 ], this[ LIST ][ n ][ 0 ], this || thisArg);
    }
  }

  [ LIST_DELETE ] (key) {
    const value  = this.get (key);
    let position = this[ LIST_FIND ] (key, value);
    let current  = position;
    while (current < this[ LIST ].length &&
           this[ LIST ][ current ][ 1 ] === value &&
           this[ LIST ][ current ][ 0 ] !== key)
    {
      current++;
    }
    if (this[ LIST ][ current ][ 0 ] !== key) {
      current = position;
      while (current > 0 &&
             this[ LIST ][ current ][ 1 ] === value &&
             this[ LIST ][ current ][ 0 ] !== key)
      {
        current--;
      }
    }
    this[ LIST ].splice (current, 1);
  }

  [ LIST_FIND ] (key, value) {
    const list = this[ LIST ];
    if (!list.length) {
      return 0;
    }
    const compareFunction = this[ COMPARE_FUNCTION ] ||
                            ((x, y) => x[ 1 ] > y[ 1 ] ? 1 : x[ 1 ] < y[ 1 ] ? -1 : 0);
    let start             = 0;
    let end               = list.length - 1;
    while (start < end && start < list.length && end > 0) {
      const position = start + Math.floor ((end - start) / 2);
      const result   = compareFunction (list[ position ], [ key, value ]);
      if (result === 0) {
        return position;
      }
      if (result < 0) {
        start = position + 1;
      } else if (result > 0) {
        end = position - 1;
      }
    }
    if (list[ start ] && compareFunction (list[ start ], [ key, value ]) >= 0) {
      return start
    }
    if (!list[ end ] || compareFunction (list[ end ], [ key, value ]) < 0) {
      return end + 1;
    }
  }

}

/*
// https://www.todojs.com/objeto-map-ordenado/
const sortedMap = new SortedMap (
  [ [ 'u', 22 ], [ 'r', 19 ], [ 'z', 27 ], [ 'd',  4 ],
    [ 'l', 12 ], [ 'y', 26 ], [ 'v', 23 ], [ 'e',  5 ],
    [ 'p', 17 ], [ 'f',  6 ], [ 'h',  8 ], [ 'x', 25 ],
    [ 'k', 11 ], [ 'c',  3 ], [ 'g',  7 ], [ 't', 21 ],
    [ 'i',  9 ], [ 'w', 24 ], [ 'b',  2 ], [ 'o', 16 ],
    [ 'q', 18 ], [ 'j', 10 ], [ 'ñ', 15 ], [ 's', 20 ],
    [ 'n', 14 ], [ 'a',  1 ], [ 'm', 13 ] ],
  (x, y) => x[ 0 ].localeCompare( y[ 0 ] )
);
sortedMap.set ('|', 0);

console.log (...sortedMap);
console.log (...sortedMap.entries ());
console.log (...sortedMap.keys ());
console.log (...sortedMap.values ());
*/
export {SortedMap}
