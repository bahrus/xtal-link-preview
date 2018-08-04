import { CorsAnywhere } from "./node_modules/ava-pwar/cors-anywhere.js"; // http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true

var cs = document.currentScript;
var customStyle = ''; // const href = 'href';
// const service_url = 'service-url';

var preview = 'preview'; // const fetch_in_progress = 'fetch-in-progress';
// const fetch_complete = 'fetch-complete';
// const title = 'title';

/**
* `xtal-link-preview`
* Provide preview of URL.
*
*
* @customElement
* @polymer
* @demo demo/index.html
*/

export var XtalLinkPreview =
/*#__PURE__*/
function (_CorsAnywhere) {
  babelHelpers.inherits(XtalLinkPreview, _CorsAnywhere);

  function XtalLinkPreview() {
    var _this;

    babelHelpers.classCallCheck(this, XtalLinkPreview);
    _this = babelHelpers.possibleConstructorReturn(this, (XtalLinkPreview.__proto__ || Object.getPrototypeOf(XtalLinkPreview)).call(this));
    _this._serviceUrl = 'https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=';
    _this._preview = false;
    var template = document.createElement('template');
    template.innerHTML = "\n          <style>\n            :host {\n              display: block;\n            }\n            ".concat(customStyle, "\n          </style>\n          <div id=\"slot\">\n          <slot>\n           \n          </slot>\n          </slot>\n        ");

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.style.display = "block";
    return _this;
  }
  /**
  * @type {string} Must be true to preview the url specified by href
  *
  */


  babelHelpers.createClass(XtalLinkPreview, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this._upgradeProperties([preview]);

      babelHelpers.get(XtalLinkPreview.prototype.__proto__ || Object.getPrototypeOf(XtalLinkPreview.prototype), "connectedCallback", this).call(this);
    }
  }, {
    key: "calculateURL",
    value: function calculateURL() {
      return this._serviceUrl + this._href + '&image_no=1&css=true';
    }
  }, {
    key: "onPropsChange",
    value: function onPropsChange() {
      if (!this._connected || !this._preview || this.disabled || !this._href || !this._serviceUrl) return;
      this.doFetch();
    }
  }, {
    key: "processResponse",
    value: function processResponse(response) {
      var _this2 = this;

      response.text().then(function (respText) {
        _this2.fetchInProgress = false;
        var massagedText = respText; //console.log(massagedText);

        var replacements = [['html', 'div'], ['head', 'header'], ['body', 'main']];
        replacements.forEach(function (s) {
          massagedText = massagedText.replace('<' + s[0] + '>', '<' + s[1] + ' id="root">').replace('</' + s[0] + '>', '</' + s[1] + '>');
        });
        massagedText = massagedText.replace('<a href="', '<a target="_blank" href="'); //console.log(massagedText);

        massagedText = massagedText.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>', ''); //const massagedText = respText.replace('<html>', '<div>')

        var div = document.createElement('div');
        div.innerHTML = massagedText;

        _this2.shadowRoot.appendChild(div);

        _this2.shadowRoot.querySelector('div#slot').innerHTML = '';

        var titleSpan = _this2.shadowRoot.querySelector('span.title');

        if (titleSpan) _this2.title = titleSpan.innerText;
        _this2.fetchComplete = true;
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'preview':
          this._preview = newValue !== null;
          break;
      }

      babelHelpers.get(XtalLinkPreview.prototype.__proto__ || Object.getPrototypeOf(XtalLinkPreview.prototype), "attributeChangedCallback", this).call(this, name, oldValue, newValue);
    }
  }, {
    key: "preview",
    get: function get() {
      return this._preview;
    },
    set: function set(val) {
      this.attr(preview, val, '');
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return babelHelpers.get(XtalLinkPreview.__proto__ || Object.getPrototypeOf(XtalLinkPreview), "observedAttributes", this).concat([preview]);
    }
  }]);
  return XtalLinkPreview;
}(CorsAnywhere);

if (cs && cs.dataset.cssPath) {
  fetch(cs.dataset.cssPath).then(function (resp) {
    resp.text().then(function (css) {
      customStyle = css;
      initXtalLinkPreview();
    });
  });
} else {
  initXtalLinkPreview();
}

function initXtalLinkPreview() {
  customElements.define('xtal-link-preview', XtalLinkPreview);
} //# sourceMappingURL=xtal-link-preview.js.map