//@ts-check
(function () {
  var disabled = 'disabled';

  function XtallatX(superClass) {
    return (
      /*#__PURE__*/
      function (_superClass) {
        babelHelpers.inherits(_class, _superClass);

        function _class() {
          var _this;

          babelHelpers.classCallCheck(this, _class);
          _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
          _this._evCount = {};
          return _this;
        }

        babelHelpers.createClass(_class, [{
          key: "attr",
          value: function attr(name, val, trueVal) {
            if (val) {
              this.setAttribute(name, trueVal || val);
            } else {
              this.removeAttribute(name);
            }
          }
        }, {
          key: "incAttr",
          value: function incAttr(name) {
            var ec = this._evCount;

            if (name in ec) {
              ec[name]++;
            } else {
              ec[name] = 0;
            }

            this.attr(name, ec[name].toString());
          }
        }, {
          key: "attributeChangedCallback",
          value: function attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
              case disabled:
                this._disabled = newVal !== null;
                break;
            }
          }
        }, {
          key: "de",
          value: function de(name, detail) {
            var eventName = name + '-changed';
            var newEvent = new CustomEvent(eventName, {
              detail: detail,
              bubbles: true,
              composed: false
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
          }
        }, {
          key: "_upgradeProperties",
          value: function _upgradeProperties(props) {
            var _this2 = this;

            props.forEach(function (prop) {
              if (_this2.hasOwnProperty(prop)) {
                var value = _this2[prop];
                delete _this2[prop];
                _this2[prop] = value;
              }
            });
          }
        }, {
          key: "disabled",
          get: function get() {
            return this._disabled;
          },
          set: function set(val) {
            this.attr(disabled, val, '');
          }
        }], [{
          key: "observedAttributes",
          get: function get() {
            return [disabled];
          }
        }]);
        return _class;
      }(superClass)
    );
  } //# sourceMappingURL=xtal-latx.js.map
  // http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true


  var cs = document.currentScript;
  var customStyle = '';
  var href = 'href';
  var service_url = 'service-url';
  var preview = 'preview';
  var fetch_in_progress = 'fetch-in-progress';
  var fetch_complete = 'fetch-complete';
  var title = 'title';
  /**
  * `xtal-link-preview`
  * Provide preview of URL.
  *
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  */

  var XtalLinkPreview =
  /*#__PURE__*/
  function (_XtallatX) {
    babelHelpers.inherits(XtalLinkPreview, _XtallatX);

    function XtalLinkPreview() {
      var _this3;

      babelHelpers.classCallCheck(this, XtalLinkPreview);
      _this3 = babelHelpers.possibleConstructorReturn(this, (XtalLinkPreview.__proto__ || Object.getPrototypeOf(XtalLinkPreview)).call(this));
      _this3._serviceUrl = 'https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=';
      _this3._preview = false;
      _this3._connected = false;
      var template = document.createElement('template');
      template.innerHTML = "\n          <style>\n            :host {\n              display: block;\n            }\n            ".concat(customStyle, "\n          </style>\n          <div id=\"slot\">\n          <slot>\n           \n          </slot>\n          </slot>\n        ");

      _this3.attachShadow({
        mode: 'open'
      });

      _this3.shadowRoot.appendChild(template.content.cloneNode(true));

      _this3.style.display = "block";
      return _this3;
    }
    /** @type {string} Url of service that gets preview.
    *
    */


    babelHelpers.createClass(XtalLinkPreview, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._upgradeProperties(['disabled', preview, href, 'serviceUrl']);

        this._connected = true;
        this.de('connected', {
          value: this.href
        });
        this.onPropsChange();
      }
    }, {
      key: "onPropsChange",
      value: function onPropsChange() {
        var _this4 = this;

        if (!this._connected || !this._preview || this.disabled || !this._href || !this._serviceUrl) return;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        fetch(this._serviceUrl + this._href + '&image_no=1&css=true').then(function (response) {
          response.text().then(function (respText) {
            _this4.fetchInProgress = false;
            var massagedText = respText; //console.log(massagedText);

            var replacements = [['html', 'div'], ['head', 'header'], ['body', 'main']];
            replacements.forEach(function (s) {
              massagedText = massagedText.replace('<' + s[0] + '>', '<' + s[1] + ' id="root">').replace('</' + s[0] + '>', '</' + s[1] + '>');
            });
            massagedText = massagedText.replace('<a href="', '<a target="_blank" href="'); //console.log(massagedText);

            massagedText = massagedText.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>', ''); //const massagedText = respText.replace('<html>', '<div>')

            var div = document.createElement('div');
            div.innerHTML = massagedText;

            _this4.shadowRoot.appendChild(div);

            _this4.shadowRoot.querySelector('div#slot').innerHTML = '';

            var titleSpan = _this4.shadowRoot.querySelector('span.title');

            if (titleSpan) _this4.title = titleSpan.innerText;
            _this4.fetchComplete = true;
          });
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        babelHelpers.get(XtalLinkPreview.prototype.__proto__ || Object.getPrototypeOf(XtalLinkPreview.prototype), "attributeChangedCallback", this).call(this, name, oldValue, newValue);

        switch (name) {
          case 'href':
            this._href = newValue; // if(this._once) this.loadHref();

            break;

          case 'preview':
            this._preview = newValue !== null;
            break;

          case 'service-url':
            this._serviceUrl = newValue;
            break;
        }

        this.onPropsChange();
      }
    }, {
      key: "serviceUrl",
      get: function get() {
        return this._serviceUrl;
      },
      set: function set(val) {
        this.attr('service-url', val);
      }
      /** @type {string} Url to preview
      *
      */

    }, {
      key: "href",
      get: function get() {
        return this._href;
      },
      set: function set(val) {
        this.attr('href', val);
      }
    }, {
      key: "fetchInProgress",
      get: function get() {
        return this._fetchInProgress;
      },
      set: function set(val) {
        this._fetchInProgress = val;
        this.attr(fetch_in_progress, val, '');
        this.de(fetch_in_progress, {
          value: val
        });
      }
    }, {
      key: "fetchComplete",
      get: function get() {
        return this._fetchComplete;
      },
      set: function set(val) {
        this._fetchComplete = val;
        this.attr(fetch_complete, val, '');
        this.de(fetch_complete, {
          value: val
        });
      }
      /**
      * @type {string} Must be true to preview the url specified by href
      *
      */

    }, {
      key: "preview",
      get: function get() {
        return this._preview;
      },
      set: function set(val) {
        this.attr(preview, val, '');
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      },
      set: function set(val) {
        this._title = val;
        this.attr(title, val);
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return babelHelpers.get(XtalLinkPreview.__proto__ || Object.getPrototypeOf(XtalLinkPreview), "observedAttributes", this).concat([href, preview, service_url]);
      }
    }]);
    return XtalLinkPreview;
  }(XtallatX(HTMLElement));

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

})();