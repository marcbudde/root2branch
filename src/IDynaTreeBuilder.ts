import {ITreeBuilder} from "./ITreeBuilder";
import {IToDynaTreeCloseable} from "./IToDynaTreeCloseable";

export interface IDynaTreeBuilder<T, P> extends ITreeBuilder<P> {
  branch(payload: P): IToDynaTreeCloseable<T, P>;
  branchMapped(elementTransform:(data:T) => P): IToDynaTreeCloseable<T, P>;
  close(): IDynaTreeBuilder<T, P>;
}
