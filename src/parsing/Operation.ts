import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
import { Label } from "./Label";

export class Operation<TArgs = Primitive[]> extends Element {
    public readonly type = ElementType.Operation;
    constructor(public operationCode: string, public operationArguments: TArgs, public readonly range: Range) {
        super();
    }

    public isMatchingArgument(element: Primitive, position: number, labelDefinitions: Label[] = []): boolean {
        return true;
    }
}

export class OperationWith1Arg<TArg1 extends Primitive> extends Operation<[TArg1]>
{
    constructor(operationCode: string, public arg: TArg1, range: Range){
        super(operationCode, [arg], range);
    }
}

export class OperationWith2Args<TArg1 extends Primitive, TArg2 extends Primitive> extends Operation<[TArg1, TArg2]>
{
    constructor(operationCode: string, public arg1: TArg1, public arg2: TArg2, range: Range){
        super(operationCode, [arg1, arg2], range);
    }
}
export class OperationWith3Args<TArg1 extends Primitive, TArg2 extends Primitive, TArg3 extends Primitive> extends Operation<[TArg1, TArg2, TArg3]>
{
    constructor(operationCode: string, public arg1: TArg1, public arg2: TArg2, public arg3: TArg3, range: Range){
        super(operationCode, [arg1, arg2, arg3], range);
    }
}