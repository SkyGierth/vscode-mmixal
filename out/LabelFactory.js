"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JumpLabel_1 = require("./JumpLabel");
const AliasLabel_1 = require("./AliasLabel");
class LabelFactory {
    static createLabel(labelData, position) {
        const { name, def1, def2 } = labelData;
        if (def1 === "IS") {
            return new AliasLabel_1.AliasLabel(position, name, def2);
        }
        else {
            return new JumpLabel_1.JumpLabel(position, name);
        }
    }
}
exports.LabelFactory = LabelFactory;
//# sourceMappingURL=LabelFactory.js.map