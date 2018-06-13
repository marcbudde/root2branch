import { BuilderFactory } from "./BuilderFactory"
import { ITreeBuilder } from "./ITreeBuilder";
import { expect } from 'chai';
import 'mocha';

describe('seed operation', () => {
  it('should yield root node with payload on 1st level', () => {
    let builder : ITreeBuilder<string> = BuilderFactory.seed("test data");
    expect(builder.node.data).to.equal('test data');
  });
});

describe('close operation on root builder', () => {
  it('should return root builder itself', () => {
    let builder : ITreeBuilder<string> =
    BuilderFactory.seed("test data")
      .close();
    expect(builder.node.data).to.equal('test data');
  });
});

describe('branch and close operations on root builder', () => {
  it('should yield node with payload on 2nd level', () => {
    let builder : ITreeBuilder<string> =
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
    let builder : ITreeBuilder<string> =
    BuilderFactory.seed("root data")
      .leaf("leaf data");
    expect(builder.node.data).to.equal('root data');
    expect(builder.node.children[0].data).to.equal('leaf data');
  });
});

describe('branch and close operations twice on root builder', () => {
  it('should yield two nodes with payload on 2nd level', () => {
    let builder : ITreeBuilder<string> =
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
    let builder : ITreeBuilder<string> =
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
    let builder : ITreeBuilder<string> =
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
    let builder : ITreeBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (n) => '' + n)
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
   ' and child nodes for each dataList node on 3rd level',
  () => {
    let list: Array<number> = [1, 5];
    let builder : ITreeBuilder<string> =
    BuilderFactory.seed("root data")
      .multibranch(() => list, (n) => '' + n)
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

/*
  Wdh. vorherigen Test mit leaf, multiclose
*/
