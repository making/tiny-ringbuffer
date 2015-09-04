(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        root.RingBuffer = factory();
    }

}(this, function () {

    var RingBuffer = function (len) {
        this.len = len;
        this.head = 0;
        this.tail = 0;
        this.data = new Array(len);
    };

    RingBuffer.prototype.push = function (x) {
        this.data[this.tail] = x;
        this.tail = (this.tail + 1) % this.len;
    };

    RingBuffer.prototype.pop = function () {
        var x = this.data[this.head];
        this.data[this.head] = null;
        this.head = (this.head + 1) % this.len;
        return x;
    };

    RingBuffer.prototype.at = function (i) {
        return this.data[i];
    };

    RingBuffer.prototype.asArray = function () {
        var arr = [];
        var i = this.head;
        while (this.data[i]) {
            arr.push(this.data[i]);
            i++;
        }
        return arr;
    };

    return RingBuffer;
}));