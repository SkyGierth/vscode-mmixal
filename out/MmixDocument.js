"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AliasLabelDefinition_1 = require("./AliasLabelDefinition");
const SetOperation_1 = require("./SetOperation");
class MmixDocument {
    constructor() {
        this.segments = [];
    }
    getMatchingLabels(position) {
        const currentSegment = this.segments.find(segment => segment.range.contains(position));
        if (currentSegment instanceof SetOperation_1.SetOperation) {
            if (currentSegment.register.range.contains(position)) {
                return this.segments
                    .filter(segment => segment instanceof AliasLabelDefinition_1.AliasLabelDefinition)
                    .map(segment => segment);
            }
        }
        return [];
    }
}
exports.MmixDocument = MmixDocument;
//# sourceMappingURL=MmixDocument.js.map