var should = require('should');
var RingBuffer = require('../lib/ringbuffer');

describe('#len', function () {
    it('constructor', function () {
        var buf = new RingBuffer(3);
        buf.len.should.equal(3);
    });
});

describe('#push', function () {
    it('size < length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.at(0).should.equal(100);
    });

    it('size == length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.at(0).should.equal(100);
        buf.at(1).should.equal(200);
        buf.at(2).should.equal(300);
    });

    it('size < length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.at(0).should.equal(400);
        buf.at(1).should.equal(200);
        buf.at(2).should.equal(300);
    });

    it('size == length * 2', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.push(500);
        buf.push(600);
        buf.at(0).should.equal(400);
        buf.at(1).should.equal(500);
        buf.at(2).should.equal(600);
    });
});

describe('#pop', function () {
    it('push * n + pop * n (n < len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.pop().should.equal(100);
        buf.pop().should.equal(200);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
    });

    it('push * n + pop * (n-1) (n < len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.pop().should.equal(100);
        should.equal(buf.at(0), null);
        buf.at(1).should.equal(200);
    });

    it('push * n + pop * (n+1) (n < len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.pop().should.equal(100);
        buf.pop().should.equal(200);
        should.equal(buf.pop(), null);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
    });

    it('push * n + pop * n (n == len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.pop().should.equal(100);
        buf.pop().should.equal(200);
        buf.pop().should.equal(300);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        should.equal(buf.at(2), null);
    });

    it('push * n + pop * (n-1) (n == len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.pop().should.equal(100);
        buf.pop().should.equal(200);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        buf.at(2).should.equal(300);
    });

    it('push * n + pop * (n+1) (n == len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.pop().should.equal(100);
        buf.pop().should.equal(200);
        buf.pop().should.equal(300);
        should.equal(buf.pop(), null);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        should.equal(buf.at(2), null);
    });

    it('push * n + pop * n (n > len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.pop().should.equal(400);
        buf.pop().should.equal(200);
        buf.pop().should.equal(300);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        should.equal(buf.at(2), null);
    });

    it('push * n + pop * (n-1) (n-1 >= len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.pop().should.equal(400);
        buf.pop().should.equal(200);
        buf.pop().should.equal(300);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        should.equal(buf.at(2), null);
    });

    it('push * n + pop * (n-1) (n-1 < len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.pop().should.equal(100);
        buf.pop().should.equal(200);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        buf.at(2).should.equal(300);
    });

    it('push * n + pop * (n+1) (n > len)', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.pop().should.equal(400);
        buf.pop().should.equal(200);
        buf.pop().should.equal(300);
        should.equal(buf.pop(), null);
        should.equal(buf.pop(), null);
        should.equal(buf.at(0), null);
        should.equal(buf.at(1), null);
        should.equal(buf.at(2), null);
    });
});

describe('#asArray', function () {
    it('size < length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.asArray().should.be.eql([100]);
        buf.asArray().length.should.equal(1);
    });

    it('size == length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.asArray().should.be.eql([100, 200, 300]);
        buf.asArray().length.should.equal(3);
    });

    it('size > length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.asArray().should.be.eql([400, 200, 300]);
        buf.asArray().length.should.equal(3);
    });

    it('size == length * 2', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.push(500);
        buf.push(600);
        buf.asArray().should.be.eql([400, 500, 600]);
        buf.asArray().length.should.equal(3);
    });
});


describe('#iterator', function () {
    it('size < length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);

        var it = buf.iterator();
        it.next().should.equal(100);
        it.next().should.equal(100);
    });

    it('size == length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);

        var it = buf.iterator();
        it.next().should.equal(100);
        it.next().should.equal(200);
        it.next().should.equal(300);
        it.next().should.equal(100);
        it.next().should.equal(200);
        it.next().should.equal(300);
    });

    it('size < length', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);

        var it = buf.iterator();
        it.next().should.equal(400);
        it.next().should.equal(200);
        it.next().should.equal(300);
        it.next().should.equal(400);
        it.next().should.equal(200);
        it.next().should.equal(300);
    });

    it('size == length * 2', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.push(400);
        buf.push(500);
        buf.push(600);

        var it = buf.iterator();
        it.next().should.equal(400);
        it.next().should.equal(500);
        it.next().should.equal(600);
        it.next().should.equal(400);
        it.next().should.equal(500);
        it.next().should.equal(600);
    });

    it('push push push pop', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.pop();

        var it = buf.iterator();
        it.next().should.equal(200);
        it.next().should.equal(300);
        it.next().should.equal(200);
        it.next().should.equal(300);
    });

    it('push push push pop', function () {
        var buf = new RingBuffer(3);
        buf.push(100);
        buf.push(200);
        buf.push(300);
        buf.pop();

        var it = buf.iterator();
        it.next().should.equal(200);
        it.next().should.equal(300);
        it.next().should.equal(200);
        it.next().should.equal(300);
    });
});