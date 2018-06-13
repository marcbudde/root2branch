import { DynaTreeBuilder} from "./DynaTreeBuilder";
import { TreeBuilder } from "./TreeBuilder";
import { EmptyDynaTreeBuilder} from "./EmptyDynaTreeBuilder";
import { ITreeBuilder} from "./ITreeBuilder";
import { IDynaTreeBuilder} from "./IDynaTreeBuilder";

export class BuilderFactory {
  public static seed <P> (payload: P): ITreeBuilder<P> {
    return new TreeBuilder<P>(null).hookIn(payload);
  }

  public static createDynaTreeBuilder<T, P>(builderToWrap: ITreeBuilder<P>,
      dataList: () => Array<T>,
      mapper: (data: T) => P): IDynaTreeBuilder<T, P> {
    return new DynaTreeBuilder<T, P>(builderToWrap, dataList, mapper)
  }

  public static createEmptyDynaTreeBuilder<T, P>(builderToWrap: ITreeBuilder<P>)
      : IDynaTreeBuilder<T, P> {
    return new EmptyDynaTreeBuilder<T, P>(builderToWrap);
  }
}
