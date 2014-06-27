/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val // returns the argument from the _.identity call
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
    // if "n" is undefined, return the first item, else take the items from index 0 to n
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n === 0 ? [] : n >= array.length ? array : array.slice(-n)
// if "n" is undefined, return the last item, else if n = 0, return an empty array, else take the last n items (-n) 
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
      if (Array.isArray(collection)) {
        for (var i=0, len = collection.length; i < len; i++) {
        iterator(collection[i], i, collection)
        };
      }
      else {
        for (var i in collection) {
        iterator(collection[i], i, collection)
        }; 
      }
  // if collection is an array, for loop - run iterator on collection[i] (array element), i (index), collection
  // if collection is an object, for loop - run iterator on collection[i] (object value), i (key), collection
};

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
    // _indexOf takes an array and target as arguments
    // run _.each using anonymous function on each item in array
    // anonymous function (iterator) takes item and index as arguments; if item === target and result === -1, change result to the index
    // return index
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if(test(item)){
        result.push(item);

    };
  });
    return result
    // _.filter takes on collection and test args
    // use _.each to run call anonymous function on each item in collection
    // anon function: call test function on item in array; if result === true, push the item to the result array
    };
 
  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return !test(item)
    })
    // _.reject takes on collection and test args
    // call _.filter on collection using anonymous function
    // anon function: call test function on item, and return the opposite; filter pushes the false values to result instead of the true values

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var sorted = array.sort();
    var result = [];
    for (var i=0, len=array.length; i<len; i++){
      if (array[i] != array[i+1]) {
        result.push(array[i]);
      }
    }

    return result
    // _.uniq takes array as only arg
    // sort array
    // for-if loop: if item is not equal to next item, push first item to result array

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
       var results = [];
        _.each(collection, function(item) {
        results.push(iterator(item))
        });
        return results
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // _.map takes on collection and iterator args
    // call _.each on collection using anonymous function
    // anon function: call iterator on item, push result to result array (creates array of all the results)
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
    // _.pluck takes on collection and key args
    // call _.map on collection using anonymous function
    // anon funtion: return the item[key] for the item (value of key for that item)
    // _.map returns array of results
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

    // _.map takes collection and anonymous function as args
    // anonymous function uses .apply to run the functionOrKey to each item of array
    // if functionOrKey is a function: call function on each item of array using _.map
    // if functinoOrKey is a method name: call method (item.functionOrKey) on each item of array using _.map
      return _.map(collection, function(item){
        return typeof functionOrKey === 'function' ? functionOrKey.apply(item) : item[functionOrKey].apply(item)
      }) 
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    // _.reduce takes on collection, iterator, accumulator args
    // if accumulator is undefined, accumulator = first item in collection
    if (accumulator == undefined) {
      accumulator = collection[0]
    };
    // call _.each on collection using anonymous function - each has no return value, so don't "return _.each()"
    // anon function takes on item as parameter, makes accumulator = result of iterator run on accumulator and item
    _.each(collection, function(item){
    return accumulator = iterator(accumulator, item)
    });
    return accumulator
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
    //_.contains takes on collection and target as args
    //calls _.reduce(collection, anonymous function, false)
    //anon function: takes on wasFound and item as args; returns item === target for each item
    //item === target then becomes "wasFound" for the next item, but if item === target is true, then the anon function returns true and exits 
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // _.reduce takes on collection, anonymous function as args
    // anon function: if iterator(item)
    if(iterator === undefined){
      iterator = _.identity;
    }
    return _.reduce(collection, function(isTrue, item){
      return Boolean(iterator(item)) && isTrue;
    }, true);
    //if the iterator is undefined, use _.identity as the default
    //call reduce on the collection and an anonymous function
    //anon function: return (Boolean of iterator(item) AND isTrue) - only results in true if both values are true
    //default accumulator (aka isTrue) is true
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator === undefined){
      iterator = _.identity;
    }
    return _.reduce(collection, function(isTrue, item){
      return Boolean(iterator(item)) || isTrue;
    }, false);

  };
//if any of elements is true, return true
//if any element is false, return false
//_.every returns true if every item is true
//_.every returns false if any item is false

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i=1; i<arguments.length; i++){
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key]
      }
      
    };
   return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i=1; i<arguments.length; i++){
      for (var key in arguments[i]) {
        if (obj[key] == undefined) {
        obj[key] = arguments[i][key]
        }
      };
    return obj
    };
  };
  



  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};
    return function (arg) {
      if (arg in cache){
        return cache[arg];
      }
      else {return cache[arg] = func(arg)}
    }


  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for(var i = 2; i < arguments.length; i++){
      args.push(arguments[i])
    }
    var delayedFunc = function (){
      func.apply(this, args);
    }
    setTimeout(delayedFunc, wait)
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = [];
    for (var i = 0; i<array.length;i++) {
        var rand = Math.floor(Math.random() * (array.length-1));
        console.log(rand);
        result.splice(rand,0,array[i]);
    } 
    console.log(result)
    return result
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
