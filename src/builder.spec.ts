import { BuilderFactory } from "./BuilderFactory"
import { LinearBuilder } from "./LinearBuilder";
import { expect } from 'chai';
import 'mocha';

describe('seed operation', () => {
  it('should yield root node with payload on 1st level', () => {
    let builder : LinearBuilder<string> = BuilderFactory.seed("test data");
    expect(builder.node.data).to.equal('test data');
  });
});

describe('close operation on root builder', () => {
  it('should return root builder itself', () => {
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("test data")
      .close();
    expect(builder.node.data).to.equal('test data');
  });
});

describe('branch and close operations on root builder', () => {
  it('should yield node with payload on 2nd level', () => {
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .branch("leaf data").close();
    expect(builder.node.data).to.equal('root data');
    expect(builder.node.children[0].data).to.equal('leaf data');
  });
});

/*
  alternative to previous
*/
describe('leaf operation on root builder', () => {
  it('should yield node with payload on 2nd level (like previous)', () => {
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .leaf("leaf data");
    expect(builder.node.data).to.equal('root data');
    expect(builder.node.children[0].data).to.equal('leaf data');
  });
});

describe('branch and close operations twice on root builder', () => {
  it('should yield two nodes with payload on 2nd level', () => {
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .branch("leaf1 data").close()
      .branch("leaf2 data").close();
    expect(builder.node.data).to.equal('root data');
    expect(builder.node.children.length).to.equal(2);
    expect(builder.node.children[0].data).to.equal('leaf1 data');
    expect(builder.node.children[1].data).to.equal('leaf2 data');
  });
});

/*
  alternative to previous
*/
describe('leaf operation twice on root builder', () => {
  it('should yield two nodes with payload on 2nd level (like previous)', () => {
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .leaf("leaf1 data")
      .leaf("leaf2 data");
    expect(builder.node.data).to.equal('root data');
    expect(builder.node.children.length).to.equal(2);
    expect(builder.node.children[0].data).to.equal('leaf1 data');
    expect(builder.node.children[1].data).to.equal('leaf2 data');
  });
});

describe('branch operation twice (no close in between) on root builder', () => {
  it('should yield nodes with payload on 2nd and 3rd level', () => {
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .branch("leaf1 data")
        .branch("leaf2 data");
    expect(builder.node.children.length).to.equal(0);
    expect(builder.node.data).to.equal('leaf2 data');
    builder = builder.close();
    expect(builder.node.children.length).to.equal(1);
    expect(builder.node.data).to.equal('leaf1 data');
    builder = builder.close();
    expect(builder.node.children.length).to.equal(1);
    expect(builder.node.data).to.equal('root data');
  });
});

/*
  dynamic trees following
*/
describe('multibranch operation on root builder', () => {
  it('should yield nodes with payload on 2nd level for each dataList element',
  () => {
    let list: Array<number> = [1, 5, 9, 0];
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (n) => n.toString())
      .close();
    expect(builder.node.children.length).to.equal(4);
    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[2].data).to.equal('9');
    expect(builder.node.children[3].data).to.equal('0');
  });
});

describe('multibranch operation on root builder with subsequent branch', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and one child node on 3rd level for each node on 2nd level',
  () => {
    let list: Array<number> = [1, 5];
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (n) => n.toString())
        .branch('3rd level branch')
        .close()
      .close();
    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(1);
    expect(builder.node.children[0].children[0].data).to.equal('3rd level branch');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(1);
    expect(builder.node.children[1].children[0].data).to.equal('3rd level branch');
  });
});

describe('multibranch operation on root builder with subsequent leaf', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and one child node on 3rd level for each node on 2nd level (like previous)',
  () => {
    let list: Array<number> = [1, 5];
    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (n) => n.toString())
        .leaf('3rd level branch')
      .close();
    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(1);
    expect(builder.node.children[0].children[0].data).to.equal('3rd level branch');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(1);
    expect(builder.node.children[1].children[0].data).to.equal('3rd level branch');
  });
});

describe('multibranch operation twice in a row', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and n child nodes on 3rd level for each node on 2nd level',
  () => {
    let list: Array<number> = [1, 5];
    let sublist : Array<string> = ["6", "7"];

    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (t) => t.toString())
        .multibranch(() => sublist, (u) => u)
        .close()
      .close();

    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].data).to.equal('6');
    expect(builder.node.children[0].children[1].data).to.equal('7');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].data).to.equal('6');
    expect(builder.node.children[1].children[1].data).to.equal('7');
  });
});

describe('multibranch operation twice in a row', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and n child nodes on 3rd level for each node on 2nd level',
  () => {
    let list: Array<number> = [1, 5];
    let sublists : { [key:number]:Array<number> } = {
      [1]: [6, 7],
      [5]: [8, 9]};

    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (t) => t.toString())
        .multibranchOnSelection((t) => sublists[t], (u) => u.toString())
        .close()
      .close();

    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].data).to.equal('6');
    expect(builder.node.children[0].children[1].data).to.equal('7');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].data).to.equal('8');
    expect(builder.node.children[1].children[1].data).to.equal('9');
  });
});

describe('multibranch operation twice in a row with subsequent' +
  ' branch, close and leaf', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and n child nodes on 3rd level for each node on 2nd level' +
   ' and two child nodes on 4th level for each node on 3rd level',
  () => {
    let list: Array<number> = [1, 5];
    let sublists : { [key:number]:Array<number> } = {
      [1]: [6, 7],
      [5]: [8, 9]};

    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (t) => t.toString())
        .multibranchOnSelection((t) => sublists[t], (u) => u.toString())
          .branch('4th level leaf 1').close()
          .leaf('4th level leaf 2')
        .close()
      .close();


    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].data).to.equal('6');
    expect(builder.node.children[0].children[1].data).to.equal('7');
    expect(builder.node.children[0].children[0].children[0].data).to.equal('4th level leaf 1');
    expect(builder.node.children[0].children[0].children[1].data).to.equal('4th level leaf 2');
    expect(builder.node.children[0].children[1].children[0].data).to.equal('4th level leaf 1');
    expect(builder.node.children[0].children[1].children[1].data).to.equal('4th level leaf 2');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].data).to.equal('8');
    expect(builder.node.children[1].children[1].data).to.equal('9');
    expect(builder.node.children[1].children[0].children[0].data).to.equal('4th level leaf 1');
    expect(builder.node.children[1].children[0].children[1].data).to.equal('4th level leaf 2');
    expect(builder.node.children[1].children[1].children[0].data).to.equal('4th level leaf 1');
    expect(builder.node.children[1].children[1].children[1].data).to.equal('4th level leaf 2');
  });
});

describe('multibranch operation three times in a row', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and n child nodes on 3rd level for each node on 2nd level' +
   ' and m child nodes on 4th level for each node on 3rd level',
  () => {
    let list: Array<number> = [1, 5];
    let sublists : { [key:number]:Array<number> } = {
      [1]: [6, 7],
      [5]: [8, 9]};
    let subsublist : Array<string>  = ['a', 'b'];

    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (t) => t.toString())
        .multibranchOnSelection((t) => sublists[t], (u) => u.toString())
          .multibranch(() => subsublist, (v) => v)
          .close()
        .close()
      .close();

    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].data).to.equal('6');
    expect(builder.node.children[0].children[1].data).to.equal('7');
    expect(builder.node.children[0].children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[1].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].children[0].data).to.equal('a');
    expect(builder.node.children[0].children[0].children[1].data).to.equal('b');
    expect(builder.node.children[0].children[1].children[0].data).to.equal('a');
    expect(builder.node.children[0].children[1].children[1].data).to.equal('b');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].data).to.equal('8');
    expect(builder.node.children[1].children[1].data).to.equal('9');
    expect(builder.node.children[1].children[0].children.length).to.equal(2);
    expect(builder.node.children[1].children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].children[0].data).to.equal('a');
    expect(builder.node.children[1].children[0].children[1].data).to.equal('b');
    expect(builder.node.children[1].children[1].children[0].data).to.equal('a');
    expect(builder.node.children[1].children[1].children[1].data).to.equal('b');
  });
});

describe('multibranch operation three times in a row', () => {
  it('should yield nodes with payload on 2nd level for each dataList element' +
   ' and n child nodes on 3rd level for each node on 2nd level' +
   ' and m child nodes on 4th level for each node on 3rd level',
  () => {
    let list: Array<number> = [1, 5];
    let sublists : { [key:number]:Array<number> } = {
      [1]: [6, 7],
      [5]: [8, 9]};
    let subsublists : { [key:number]:Array<string> } = {
      [6]: ['a', 'b'],
      [7]: ['c', 'd'],
      [8]: ['e', 'f'],
      [9]: ['g', 'h']};

    let builder : LinearBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (t) => t.toString())
        .multibranchOnSelection((t) => sublists[t], (u) => u.toString())
          .multibranchOnSelection((u) => subsublists[u], (v) => v)
          .close()
        .close()
      .close();

    expect(builder.node.children.length).to.equal(2);

    expect(builder.node.children[0].data).to.equal('1');
    expect(builder.node.children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].data).to.equal('6');
    expect(builder.node.children[0].children[1].data).to.equal('7');
    expect(builder.node.children[0].children[0].children.length).to.equal(2);
    expect(builder.node.children[0].children[1].children.length).to.equal(2);
    expect(builder.node.children[0].children[0].children[0].data).to.equal('a');
    expect(builder.node.children[0].children[0].children[1].data).to.equal('b');
    expect(builder.node.children[0].children[1].children[0].data).to.equal('c');
    expect(builder.node.children[0].children[1].children[1].data).to.equal('d');

    expect(builder.node.children[1].data).to.equal('5');
    expect(builder.node.children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].data).to.equal('8');
    expect(builder.node.children[1].children[1].data).to.equal('9');
    expect(builder.node.children[1].children[0].children.length).to.equal(2);
    expect(builder.node.children[1].children[1].children.length).to.equal(2);
    expect(builder.node.children[1].children[0].children[0].data).to.equal('e');
    expect(builder.node.children[1].children[0].children[1].data).to.equal('f');
    expect(builder.node.children[1].children[1].children[0].data).to.equal('g');
    expect(builder.node.children[1].children[1].children[1].data).to.equal('h');
  });
});
