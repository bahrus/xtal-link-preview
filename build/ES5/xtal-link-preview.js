import { XtalLinkPreviewBase } from "./xtal-link-preview-base.js";
import { define } from "./node_modules/xtal-latx/define.js";
var template = document.createElement('template');
template.innerHTML =
/* html */
"\n<main ></main>\n<style>\n:host{\n    display: block;\n}\nmain {\n    /* Add shadows to create the \"card\" effect */\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n    transition: 0.3s;\n    height: 100%;\n    width: 100%;\n    display:flex;\n    flex-direction:column;\n    align-items: center;\n    justify-content: center;\n}\n\n/* On mouse-over, add a deeper shadow */\nmain:hover {\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);\n}\n\nmain>div {\n    display: flex;\n    height: 100%;\n    padding: 5px;\n}\nmain img {\n    object-fit: scale-down;\n}\n@media (min-width: 800px) {\n    main>div {\n        flex-direction: row-reverse;\n        justify-content: space-around;\n    }\n    main img {\n        align-self: stretch;\n        filter: drop-shadow(0px 0px 1px rgba(0,0,0,.3))\n        drop-shadow(0px 0px 10px rgba(0,0,0,.3));\n    }\n\n}\n\n@media (max-width: 800px) {\n    main>div {\n        flex-direction: column-reverse;\n        align-items: center;\n        justify-content: center;\n    }\n    main img {\n        border: 1px solid #ccc;\n    }\n\n}\n\n      main>div>details>summary{\n        list-style:none;\n      }\n\n      main>div>details > summary::-webkit-details-marker {\n        display: none;\n      }\n\n\n      main>div>details>summary {\n        margin-top: 5px;\n        font-weight: 800;\n      }\n\n      main>div>details p {\n        text-align: left;\n        margin-left: 5px;\n      }\n</style>\n";
export var XtalLinkPreview =
/*#__PURE__*/
function (_XtalLinkPreviewBase) {
  babelHelpers.inherits(XtalLinkPreview, _XtalLinkPreviewBase);
  babelHelpers.createClass(XtalLinkPreview, null, [{
    key: "is",
    get: function get() {
      return 'xtal-link-preview';
    }
  }]);

  function XtalLinkPreview() {
    var _this;

    babelHelpers.classCallCheck(this, XtalLinkPreview);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(XtalLinkPreview).call(this));

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    return _this;
  }

  babelHelpers.createClass(XtalLinkPreview, [{
    key: "setInnerHTML",
    value: function setInnerHTML(html) {
      this.shadowRoot.querySelector('main').innerHTML = html;
    }
  }]);
  return XtalLinkPreview;
}(XtalLinkPreviewBase);
define(XtalLinkPreview); //# sourceMappingURL=xtal-link-preview.js.map