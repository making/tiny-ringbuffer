## Tiny RingBuffer

### Usage

    var RingBuffer = require('tiny-ringbuffer');
    var buf = new RingBuffer(3);
    
    buf.push(100);
    buf.push(200);
    buf.push(300);
    
    buf.at(0); // 100
    buf.at(1); // 200
    buf.at(2); // 300
    buf.asArray(); // [100, 200, 300]
    
    buf.push(400);
    
    buf.at(0); // 400
    buf.at(1); // 200
    buf.at(2); // 300
    buf.asArray(); // [400, 200, 300]
    
    buf.pop(); // 400
    buf.pop(); // 200
   
    buf.at(0); // null
    buf.at(1); // null
    buf.at(2); // 300
    buf.asArray(); // [300]

Data can be set at the constructor with Array.
    
    var buf = new RingBuffer([100, 200, 300]);

Iterator is supported.

    var buf = new RingBuffer([100, 200, 300]);
    vat it = buf.iterator();
    it.next(); // 100
    it.next(); // 200
    it.next(); // 300
    it.next(); // 100
    it.next(); // 200
    it.next(); // 300

### Browser support

    <script src="<path to lib>/ringbuffer.js"></script>
    <script>
        var RingBuffer = window.RingBuffer;
        var buf = new RingBuffer(3);
        // ...
    </script>

### License

MIT.