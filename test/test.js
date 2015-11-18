var expect =require('chai').expect;
var code = require('../mainTest.js');


describe('hello', function(){
  it('should say "hello"', function(){
    expect(code.hello()).to.equal('hello');
  });
});

describe('world', function(){
  it('should return "world"', function(){
    expect(code.world()).to.equal('World!');
  });
});

describe('arrayLength', function(){
  it('should return the length of an array', function(){
    expect(code.arrayLength([1,2,3,4,5])).to.equal(5);
  });
});

describe('arrayIndex', function(){
  it('should return the array indexes', function(){
    expect(code.arrayIndex([1,2,3,4,5])).to.equal(3);
  });
});

describe('forEachEx', function(){
  xit('should loop over an array using for each', function(){
    expect(code.forEachEx([1,2,3,4,5])).to.equal([2,3,4,5,6]);
  });
});

describe('forEach2', function(){
  xit('should push items from one array to another', function(){
    expect(code.forEach2([1,2,3])).to.equal([1,2,3]);
  });
});

describe('printing', function(){
  xit('should print every item in the array', function(){
    expect(code.printing([1, "two", "3"])).to.equal([1, "two", "3"]);
  });
});

describe('addToEnd', function(){
  it('adds items to the end of an array', function(){
    expect(code.addToEnd([1], [2])).to.equal('1,2');
  });
});

describe('removeEnd', function(){
  xit('removes items from the end of an array', function(){
    expect(code.removeEnd([1,2,3,4,5])).to.equal([1,2,3]);
  });
});

describe('findIndexOf', function(){
  xit('finds the index of n', function(){
    expect(code.findIndexOf([1,2,3], 2)).to.equal(3);
  });
});

describe('removeByIndex', function(){
  it('splices an array', function(){
    expect(code.removeByIndex([1,2,3,4])).to.equal('1,2')
  });
});

describe('copyArray', function(){
  it('copies an array', function(){
    expect(code.copyArray([1,2,3])).to.equal('1,2,3');
  });
});

describe('checkArray', function(){
  it('check to see if var is an array', function(){
    expect(code.checkArray([1,2])).to.equal(true);
  });
});

// describe('isBigEnough', function(){
//   xit('sees if every element satifies a condition', function(){
//     expect(code.isBigEnough([12, 5, 8, 130, 44])).to.equal(false);
//   });
// });


//NEED TO WRITE FILTER METHOS AND MAP METHODS


// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     });
//   });
// });
