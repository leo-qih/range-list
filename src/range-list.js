/**
 * @Author Qi Huang
 * @Date 2022-10-28 14:46:32
 * @Description Range List is a data structure that tracks the ranges represented as half-open intervals.
 *              A half-open interval [1, 5) denotes all the real numbers x where 1 <= x < 5
 *              A range list is an aggregate of these intervals: [1, 5), [10, 11), [100,201)
 */

class RangeList {

    constructor() {
        this._rangeList = [];
    }

    /**
     * Returns the range list
     * @return {Array<Array<Number>>}
     */
    get rangeList() {
        return this._rangeList;
    }

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        if (!this._isValidRange(range)) return;

        let left = range[0], right = range[1];
        let idx = this._findTargetRange(left);
        // remove all the ranges that are overlapping with the target range,
        // and get the new left and right boundary
        while (idx < this._rangeList.length && this._rangeList[idx][0] <= right) {
            left = Math.min(left, this._rangeList[idx][0]);
            right = Math.max(right, this._rangeList[idx][1]);
            this._rangeList.splice(idx, 1);
        }
        // add the new range into the list
        this._rangeList.splice(idx, 0, [left, right]);
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        if (!this._isValidRange(range)) return;

        let left = range[0], right = range[1];
        let idx = this._findTargetRange(range[0] + 1);
        // remove all the ranges that are overlapped with the target range
        while (idx < this._rangeList.length && this._rangeList[idx][0] <= right) {
            if (this._rangeList[idx][0] < left) {
                // current range is partially covered by the target range,
                // and there is a non-overlapping part in the left, insert the non-overlapping part into the list
                this._rangeList.splice(idx, 0, [this._rangeList[idx][0], left]);
                idx++;
            }
            if (this._rangeList[idx][1] > right) {
                // current range is partially covered by the target range,
                // and there is a non-overlapping part in the right,
                // update the left boundary of the current range to reflect the new range
                this._rangeList[idx][0] = right;
                // we can break here as the remaining ranges are not covered by the target range
                break;
            } else {
                // current range is fully covered by the target range, delete the current range
                this._rangeList.splice(idx, 1);
            }

        }
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        const listArr = this._rangeList.map(range => `[${range[0]}, ${range[1]})`);

        console.log(listArr.join(` `));
    }

    /**
     * Finds the first range with its right boundary greater or equal than the given number,
     * or the length of the range list if there is no such range
     * 
     * @param {Number} num - target number to be searched in the range list
     * @return {Number} Index of the range
     * @private
     */
    _findTargetRange(num) {
        for (const i in this._rangeList) {
            if (this._rangeList[i][1] >= num) {
                return i;
            }
        }

        return this._rangeList.length;
    }

    /**
     * Range validation check
     *
     * @param {Array<Number>} range - Array of two integers that specify beginning and end of range.
     * @returns {boolean} true if the range is valid, otherwise false
     * @private
     */
    _isValidRange(range) {
        return Number.isInteger(range[0]) && Number.isInteger(range[1]) && range[0] <= range[1];
    }
}

export default RangeList;