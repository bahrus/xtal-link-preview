//@ts-check
(function () {
  function define(custEl) {
    var tagName = custEl.is;

    if (customElements.get(tagName)) {
      console.warn('Already registered ' + tagName);
      return;
    }

    customElements.define(tagName, custEl);
  }

  var disabled = 'disabled';
  /**
   * Base class for many xtal- components
   * @param superClass
   */

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

          /**
           * Set attribute value.
           * @param name
           * @param val
           * @param trueVal String to set attribute if true.
           */
          value: function attr(name, val, trueVal) {
            var v = val ? 'set' : 'remove'; //verb

            this[v + 'Attribute'](name, trueVal || val);
          }
          /**
           * Turn number into string with even and odd values easy to query via css.
           * @param n
           */

        }, {
          key: "to$",
          value: function to$(n) {
            var mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
          }
          /**
           * Increment event count
           * @param name
           */

        }, {
          key: "incAttr",
          value: function incAttr(name) {
            var ec = this._evCount;

            if (name in ec) {
              ec[name]++;
            } else {
              ec[name] = 0;
            }

            this.attr('data-' + name, this.to$(ec[name]));
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
          /**
           * Dispatch Custom Event
           * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
           * @param detail Information to be passed with the event
           * @param asIs If true, don't append event name with '-changed'
           */

        }, {
          key: "de",
          value: function de(name, detail, asIs) {
            var eventName = name + (asIs ? '' : '-changed');
            var newEvent = new CustomEvent(eventName, {
              detail: detail,
              bubbles: true,
              composed: false
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
          }
          /**
           * Needed for asynchronous loading
           * @param props Array of property names to "upgrade", without losing value set while element was Unknown
           */

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

          /**
           * Any component that emits events should not do so if it is disabled.
           * Note that this is not enforced, but the disabled property is made available.
           * Users of this mix-in should ensure not to call "de" if this property is set to true.
           */
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
  }

  var href = 'href';
  var service_url = 'service-url';
  var fetch_in_progress = 'fetch-in-progress';
  var fetch_complete = 'fetch-complete';
  var title = 'title';

  var CorsAnywhere =
  /*#__PURE__*/
  function (_XtallatX) {
    babelHelpers.inherits(CorsAnywhere, _XtallatX);

    function CorsAnywhere() {
      var _this3;

      babelHelpers.classCallCheck(this, CorsAnywhere);
      _this3 = babelHelpers.possibleConstructorReturn(this, (CorsAnywhere.__proto__ || Object.getPrototypeOf(CorsAnywhere)).apply(this, arguments));
      _this3._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
      _this3._connected = false;
      return _this3;
    } // _serviceUrl: string = 'https://crossorigin.me/';

    /** @type {string} Url of service that gets preview.
    *
    */


    babelHelpers.createClass(CorsAnywhere, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        babelHelpers.get(CorsAnywhere.prototype.__proto__ || Object.getPrototypeOf(CorsAnywhere.prototype), "attributeChangedCallback", this).call(this, name, oldValue, newValue);

        switch (name) {
          case 'href':
            this._href = newValue; // if(this._once) this.loadHref();

            break;

          case 'service-url':
            this._serviceUrl = newValue;
            break;
        }

        this.onPropsChange();
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this._upgradeProperties(['disabled', href, 'serviceUrl']);

        this._connected = true;
        this.de('connected', {
          value: this.href
        });
        this.onPropsChange();
      }
    }, {
      key: "doFetch",
      value: function doFetch() {
        var _this4 = this;

        var url = this.calculateURL();

        if (this._previousURL === url) {
          this.fetchComplete = false;
          this.fetchComplete = true;
          return;
        }

        this._previousURL = url;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        var init = null;

        if (AbortController) {
          this._controller = new AbortController();
          init = this._controller.signal;
        }

        fetch(url, {
          signal: init
        }).then(function (response) {
          _this4.fetchInProgress = false;

          _this4.processResponse(response);

          _this4.fetchComplete = true;
        });
      }
    }, {
      key: "calculateURL",
      value: function calculateURL() {
        var upLevels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var href = this._href;

        if (upLevels) {
          var split = href.split('/');

          if (upLevels === -1) {
            href = [split[0], split[1], split[2]].join('/');
          }
        }

        return this._serviceUrl + href;
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
    }, {
      key: "title",
      get: function get() {
        return this._title;
      },
      set: function set(val) {
        this._title = val;
        this.attr(title, val); // this.de(title,{
        //     value: val
        // })
      }
    }, {
      key: "abort",
      set: function set(val) {
        if (this._controller) {
          this._controller.abort();
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return babelHelpers.get(CorsAnywhere.__proto__ || Object.getPrototypeOf(CorsAnywhere), "observedAttributes", this).concat([href, service_url]);
      }
    }]);
    return CorsAnywhere;
  }(XtallatX(HTMLElement));

  function qsa(css, from) {
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

  var XtalLinkPreview =
  /*#__PURE__*/
  function (_CorsAnywhere) {
    babelHelpers.inherits(XtalLinkPreview, _CorsAnywhere);

    function XtalLinkPreview() {
      var _this5;

      babelHelpers.classCallCheck(this, XtalLinkPreview);
      _this5 = babelHelpers.possibleConstructorReturn(this, (XtalLinkPreview.__proto__ || Object.getPrototypeOf(XtalLinkPreview)).call(this));
      _this5._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
      _this5._preview = false;
      _this5._imageWidth = 150;
      _this5.style.display = "block";
      return _this5;
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
        var _this6 = this;

        response.text().then(function (respText) {
          _this6.fetchInProgress = false;
          var parser = new DOMParser();
          var htmlDoc = parser.parseFromString(respText, "text/html");

          var imageSrc = _this6.getMetaContent(htmlDoc, 'name', "twitter:image:src");

          if (!imageSrc) imageSrc = _this6.getMetaContent(htmlDoc, 'name', "twitter:image");
          if (!imageSrc) imageSrc = _this6.getMetaContent(htmlDoc, 'property', 'og:image');

          if (!imageSrc) {
            var img = htmlDoc.querySelector('img');

            if (img) {
              imageSrc = img.getAttribute('src');
              imageSrc = _this6.getAbsPath(imageSrc);
              console.log(imageSrc);
            }
          }

          if (!imageSrc) {
            var iconLink = htmlDoc.querySelector('link[rel="icon"]');

            if (iconLink) {
              imageSrc = iconLink.getAttribute('href');
              imageSrc = _this6.getAbsPath(imageSrc);
            }
          } //console.log(imageSrc);


          var titleEl = htmlDoc.querySelector('title');
          if (titleEl) _this6.title = titleEl.innerHTML;

          var description = _this6.getMetaContent(htmlDoc, 'name', 'description');

          if (!description) {
            description = '';
          } else {
            _this6.title = _this6.title.replace(description, '');
          }

          _this6.innerHTML =
          /* html */
          "\n                <div>\n                    <details open>\n                        <summary>".concat(_this6.title, "</summary>\n                        <p>").concat(description, "</p>\n                    </details>\n                    <img alt=\"").concat(_this6.title, "\" width=\"").concat(_this6._imageWidth, "\" src=\"").concat(imageSrc, "\"/>\n                </div>\n            ");
          _this6.fetchComplete = true;
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
          case 'preview':
            this._preview = newValue !== null;

            if (!this._preview) {
              this.abort = true;
            }

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

  define(XtalLinkPreview);
})();