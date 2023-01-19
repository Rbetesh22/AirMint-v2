"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _LoginButton = _interopRequireDefault(require("./LoginButton"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _jsxRuntime = require("react/jsx-runtime");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Leaderboard = function Leaderboard() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(LeaderboardComponent, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoginButton["default"], {})
  });
};
var _default = Leaderboard;
exports["default"] = _default;
var LeaderboardComponent = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    width: 60rem;\n    height: 40rem;\n    background-color: white;\n    border-radius: 15px;\n    border: solid 3px black;\n    padding: 2rem;\n    color: black;\n"])));