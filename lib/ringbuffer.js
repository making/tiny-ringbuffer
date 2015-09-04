/*
 The MIT License (MIT)

 Copyright (c) 2015 Toshiaki Maki

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        root.RingBuffer = factory();
    }

}(this, function () {
    var RingBuffer = function (lenOrData) {
        if (typeof lenOrData == 'number') {
            this.data = new Array(lenOrData);
            this.len = lenOrData;
        } else {
            this.data = lenOrData;
            this.len = lenOrData.length;
        }
        this.head = 0;
        this.tail = 0;
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

    RingBuffer.prototype.iterator = function () {
        var data = this.data.filter(function (x) {
            return x != null
        });
        var i = 0;
        var len = data.length;
        var next = function () {
            var x = data[i];
            i = (i + 1) % len;
            return x;
        }.bind(this);

        return {
            next: next
        };
    };

    return RingBuffer;
}));