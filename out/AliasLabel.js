"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AliasLabel {
    constructor(definition, name, aliasFor) {
        this.definition = definition;
        this.name = name;
        this.aliasFor = aliasFor;
    }
    canBeAppliedTo(operator, argPos) {
        return true;
    }
}
exports.AliasLabel = AliasLabel;
//# sourceMappingURL=AliasLabel.js.map