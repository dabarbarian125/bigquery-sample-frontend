"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
// dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.use('/api', routes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
});
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
