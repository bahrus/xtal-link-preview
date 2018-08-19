import { CorsAnywhere } from "./node_modules/ava-pwar/cors-anywhere.js";
import { define } from "./node_modules/xtal-latx/define.js";
export function qsa(css, from) {
  return [].slice.call((from ? from : this).querySelectorAll(css));
}
var preview = 'preview';
var image_width = 'image-width';
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
    _this._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
    _this._preview = false;
    _this._imageWidth = 150;
    _this.style.display = "block";
    return _this;
  }

  babelHelpers.createClass(XtalLinkPreview, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this._upgradeProperties([preview, 'imageWidth']);

      babelHelpers.get(XtalLinkPreview.prototype.__proto__ || Object.getPrototypeOf(XtalLinkPreview.prototype), "connectedCallback", this).call(this);
    }
  }, {
    key: "calculateURL",
    value: function calculateURL() {
      return this._serviceUrl + this._href;
    }
  }, {
    key: "onPropsChange",
    value: function onPropsChange() {
      if (!this._connected || !this._preview || this.disabled || !this._href || !this._serviceUrl) return;
      this.doFetch();
    }
  }, {
    key: "getMetaContent",
    value: function getMetaContent(htmlDoc, name, val) {
      var metas = qsa('meta[' + name + '="' + val + '"]', htmlDoc);
      var meta = metas.filter(function (item) {
        return item.content;
      });
      if (meta && meta.length > 0) return meta[0].content;
      return null;
    }
  }, {
    key: "getAbsPath",
    value: function getAbsPath(imageSrc) {
      var newSrc = imageSrc;

      if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data')) {
        if (imageSrc.startsWith('/')) {
          newSrc = this._href.split('/').slice(0, 3).join('/') + imageSrc;
        } else {
          var mid = this._href.endsWith('/') ? '' : '/';
          if (newSrc.startsWith('/')) newSrc.replace('/', '');
          newSrc = this._href + mid + imageSrc;
        }
      }

      return newSrc;
    }
  }, {
    key: "processResponse",
    value: function processResponse(response) {
      var _this2 = this;

      response.text().then(function (respText) {
        _this2.fetchInProgress = false;
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(respText, "text/html");

        var imageSrc = _this2.getMetaContent(htmlDoc, 'name', "twitter:image:src");

        if (!imageSrc) imageSrc = _this2.getMetaContent(htmlDoc, 'name', "twitter:image");
        if (!imageSrc) imageSrc = _this2.getMetaContent(htmlDoc, 'property', 'og:image');

        if (!imageSrc) {
          var img = htmlDoc.querySelector('img');

          if (img) {
            imageSrc = img.getAttribute('src');
            imageSrc = _this2.getAbsPath(imageSrc);
            console.log(imageSrc);
          }
        }

        if (!imageSrc) {
          var iconLink = htmlDoc.querySelector('link[rel="icon"]');

          if (iconLink) {
            imageSrc = iconLink.getAttribute('href');
            imageSrc = _this2.getAbsPath(imageSrc);
          }
        } //console.log(imageSrc);


        var titleEl = htmlDoc.querySelector('title');
        if (titleEl) _this2.title = titleEl.innerText;

        var description = _this2.getMetaContent(htmlDoc, 'name', 'description');

        if (!description) {
          description = '';
        } else {
          _this2.title = _this2.title.replace(description, '');
        }

        _this2.innerHTML =
        /* html */
        "\n                <div>\n                    <details open>\n                        <summary>".concat(_this2.title, "</summary>\n                        <p>").concat(description, "</p>\n                    </details>\n                    <img alt=\"").concat(_this2.title, "\" width=\"").concat(_this2._imageWidth, "\" src=\"").concat(imageSrc, "\"/>\n                </div>\n            ");
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

    /**
    * @type {string} Must be true to preview the url specified by href
    *
    */
    get: function get() {
      return this._preview;
    },
    set: function set(val) {
      this.attr(preview, val, '');
    }
  }, {
    key: "imageWidth",
    get: function get() {
      return this._imageWidth;
    },
    set: function set(val) {
      this.attr(image_width, val.toString());
    }
  }], [{
    key: "is",
    get: function get() {
      return 'xtal-link-preview';
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return babelHelpers.get(XtalLinkPreview.__proto__ || Object.getPrototypeOf(XtalLinkPreview), "observedAttributes", this).concat([preview, image_width]);
    }
  }]);
  return XtalLinkPreview;
}(CorsAnywhere);
define(XtalLinkPreview); //# sourceMappingURL=xtal-link-preview.js.map