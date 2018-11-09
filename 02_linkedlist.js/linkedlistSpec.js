describe('Una linked list', function() {
  var linkedList;

  beforeEach(function() {
    linkedList = new LinkedList();
  });

  it('tiene metodos `addToTail`, `removeHead`, y `search`', function() {
    expect(typeof linkedList.addToTail).toBe('function');
    expect(typeof linkedList.removeHead).toBe('function');
    expect(typeof linkedList.search).toBe('function');
  });

  it('empiezan con head y tail como falsos', function () {
    expect(linkedList.head).toBeFalsy();
    expect(linkedList.tail).toBeFalsy();
    expect(linkedList.removeHead()).toBeFalsy();
  });

  it('tiene una clase Node para representar un nodo', function() {
    expect(typeof Node).toBe('function');
    // There is already an object called `Node` in the browser.
    // This spec makes sure you've defined your OWN `Node`.
    expect(isNative(Node)).toBe(false);
    function isNative(fn) {
      return (/\{\s*\[native code]\s*\}/).test('' + fn);
    }
  });

  it(' La clase Node deberia tomar un valor como argumento y definir next y previous como null por default', function() {
    var node = new Node('test');
    expect(node.value).toBe('test');
    expect(node.next).toBe(null);
    expect(node.previous).toBe(null);
  });

  it('linkedlist deberia usar la clase Node para agregar nodos', function() {
    linkedList.addToTail('first');
    expect(linkedList.tail instanceof Node).toBe(true);
  });

  it('si solo un nodo es agregado al head deberia estar tambien apuntado por el tail', function() {
    linkedList.addToHead('first');
    expect(linkedList.head.value).toBe('first');
    expect(linkedList.head.next).toBeFalsy();
    expect(linkedList.head.previous).toBeFalsy();
    expect(linkedList.head).toBe(linkedList.tail);
  });

  it('deberia devolver el head en removeHead', function() {
    linkedList.addToTail('first');
    linkedList.addToTail('second');
    linkedList.addToTail('third');
    expect(linkedList.removeHead()).toBe('first');
    expect(linkedList.removeHead()).toBe('second');
    expect(linkedList.removeHead()).toBe('third');
  });

  it('deberia estar seguro que la propiedad previous de un nuevo head sea null', function() {
    linkedList.addToTail('first');
    linkedList.addToTail('second');
    linkedList.addToTail('third');
    expect(linkedList.removeHead()).toBe('first');
    expect(linkedList.head.previous).toBe(null);
  });

  it('deberia asegurarse que el next de un nuevo tail sea null', function() {
    linkedList.addToTail('first');
    linkedList.addToTail('second');
    linkedList.addToTail('third');
    expect(linkedList.removeTail()).toBe('third');
    expect(linkedList.tail.next).toBe(null);
  });

  it('deberia poder agregar al head y al tail', function() {
    linkedList.addToTail('second');
    linkedList.addToHead('first');
    linkedList.addToTail('third');
    expect(linkedList.removeHead()).toBe('first');
    expect(linkedList.removeHead()).toBe('second');
    expect(linkedList.removeHead()).toBe('third');
  });

  it('deberia devolver el tail con removeTail', function() {
    linkedList.addToTail('second');
    linkedList.addToHead('third');
    linkedList.addToTail('first');
    expect(linkedList.removeTail()).toBe('first');
    expect(linkedList.removeTail()).toBe('second');
    expect(linkedList.removeTail()).toBe('third');
  });

  it('deberia eliminar el head y el tail cuando el ultimo nodo es', function() {
    expect(linkedList.removeHead()).toBeFalsy();
    linkedList.addToTail('one');
    expect(linkedList.removeHead()).toBe('one');
    expect(linkedList.removeHead()).toBeFalsy();
    expect(linkedList.head).toBeFalsy();
    expect(linkedList.tail).toBeFalsy();
  });


  it('deberia devolver los valores correctos para buscar', function() {
    linkedList.addToTail('one');
    linkedList.addToTail('two');
    linkedList.addToTail('three');
    linkedList.addToTail('four');
    linkedList.addToTail('one');
    expect(linkedList.search('two')).toBe('two');
    expect(linkedList.search('sdd')).toBe(null);
    expect(linkedList.search('one')).toBe('one');
    expect(linkedList.search('four')).toBe('four');
  });

  it('deberia poder tomar strings y functiones ambos como search inputs', function() {
    linkedList.addToTail('one');
    linkedList.addToTail('two');
    expect(linkedList.search(function(nodeValue) {
      return nodeValue === 'two';
    })).toBe('two');
  });

  // This spec demonstrates the utility of the previous spec.
  // If you are passing the last one correctly, this one should already pass!

  it('deberia poder buscar por lo tanto no solo strings pero tambien objetos', function() {
    function UserNode(name, email, city) {
      this.name = name;
      this.email = email;
      this.city = city;
    }

    linkedList.addToHead(new UserNode('Nimit', 'nimit@fs.com', 'New York'));
    linkedList.addToHead(new UserNode('David', 'david@fs.com', 'New York'));
    linkedList.addToHead(new UserNode('Paul', 'paul@yc.com', 'Mountain View'));

    expect(linkedList.search(function (userNode) {
      return userNode.name === 'Nimit';
    }).email).toBe('nimit@fs.com');

    expect(linkedList.search(function (userNode) {
      return userNode.email === 'david@fs.com';
    }).city).toBe('New York');

    expect(linkedList.search(function (userNode) {
      return userNode.city === 'Mountain View';
    }).name).toBe('Paul');
  });

});
