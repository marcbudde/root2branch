import {ITreeBuilder} from "./ITreeBuilder";
import {IDynaTreeBuilder} from "./IDynaTreeBuilder";
import {DynaTreeBuilder} from "./DynaTreeBuilder";

export class EmptyDynaTreeBuilder<T, P>
    extends DynaTreeBuilder<T, P> implements IDynaTreeBuilder<T, P> {
  constructor(readonly parentBuilder: ITreeBuilder<P>) {
    super(parentBuilder, null, null);
  }
}
