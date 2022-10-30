/**
 * @Author Qi Huang
 * @Date 2022-10-28 14:47:15
 * @Description Tests for the RangeList
 */

import RangeList from "../src/range-list.js";
import assert from "assert";

describe(`RangeList`, function () {
    const rl = new RangeList();
    it(`is empty on init`, function() {
        assert.equal(rl.rangeList.length, 0);
    });
    it(`add [1, 5], should equal to [1, 5)`, function () {
        rl.add([1, 5]);
        assert.deepEqual(rl.rangeList, [[1, 5]]);
    });
    it(`add [10, 20], should equal to [1, 5), [10, 20)`, function () {
        rl.add([10, 20]);
        assert.deepEqual(rl.rangeList, [[1, 5], [10, 20]]);
    });
    it(`add [10, 10], should equal to [1, 5), [10, 20)`, function () {
        rl.add([10, 10]);
        assert.deepEqual(rl.rangeList, [[1, 5], [10, 20]]);
    });
    it(`add [20, 20], should equal to [1, 5), [10, 20)`, function () {
        rl.add([20, 20]);
        assert.deepEqual(rl.rangeList, [[1, 5], [10, 20]]);
    });
    it(`add [20, 21], should equal to [1, 5), [10, 21)`, function () {
        rl.add([20, 21]);
        assert.deepEqual(rl.rangeList, [[1, 5], [10, 21]]);
    });
    it(`add [2, 4], should equal to [1, 5), [10, 21)`, function () {
        rl.add([2, 4]);
        assert.deepEqual(rl.rangeList, [[1, 5], [10, 21]]);
    });
    it(`add [3, 8], should equal to [1, 8), [10, 21)`, function () {
        rl.add([3, 8]);
        assert.deepEqual(rl.rangeList, [[1, 8], [10, 21]]);
    });
    it(`add [-8, 0], should equal to [-8, 0), [1, 8), [10, 21)`, function () {
        rl.add([-8, 0]);
        assert.deepEqual(rl.rangeList, [[-8, 0], [1, 8], [10, 21]]);
    });
    it(`add [-9, 1], should equal to [-9, 8), [10, 21)`, function () {
        rl.add([-9, 1]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [10, 21]]);
    });
    it(`add [5, 3], should equal to [-9, 8), [10, 21)`, function () {
        rl.add([5, 3]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [10, 21]]);
    });
    it(`remove [10, 10], should equal to [-9, 8), [10, 21)`, function () {
        rl.remove([10, 10]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [10, 21]]);
    });
    it(`remove [21, 21], should equal to [-9, 8), [10, 21)`, function () {
        rl.remove([21, 21]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [10, 21]]);
    });
    it(`remove [21, 25], should equal to [-9, 8), [10, 21)`, function () {
        rl.remove([21, 25]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [10, 21]]);
    });
    it(`remove [-15, -9], should equal to [-9, 8), [10, 21)`, function () {
        rl.remove([-15, -9]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [10, 21]]);
    });
    it(`remove [10, 11], should equal to [-9, 8), [11, 21)`, function () {
        rl.remove([10, 11]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [11, 21]]);
    });
    it(`remove [15, 17], should equal to [-9, 8), [11, 15), [17, 21)`, function () {
        rl.remove([15, 17]);
        assert.deepEqual(rl.rangeList, [[-9, 8], [11, 15], [17, 21]]);
    });
    it(`remove [3, 19], should equal to [-9, 3), [19, 21)`, function () {
       rl.remove([3, 19]);
       assert.deepEqual(rl.rangeList, [[-9, 3], [19, 21]]);
    });
    it(`remove [5, 3], should equal to [-9, 3), [19, 21)`, function () {
        rl.remove([5, 3]);
        assert.deepEqual(rl.rangeList, [[-9, 3], [19, 21]]);
    });
    it(`remove [-9, 21], should equal to an empty array`, function () {
        rl.remove([-9, 21]);
        assert.deepEqual(rl.rangeList, []);
    });
});