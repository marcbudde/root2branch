import { LinearBuilder } from "./LinearBuilder";

export interface ToLinearBuilderCloseable<P> {
  close(): LinearBuilder<P>;
}
