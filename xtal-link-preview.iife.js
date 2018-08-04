
    //@ts-check
    (function () {
    const disabled = 'disabled';
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        attr(name, val, trueVal) {
            if (val) {
                this.setAttribute(name, trueVal || val);
            }
            else {
                this.removeAttribute(name);
            }
        }
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr(name, ec[name].toString());
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        de(name, detail) {
            const eventName = name + '-changed';
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
//# sourceMappingURL=xtal-latx.js.map
// http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true
const cs = document.currentScript;
let customStyle = '';
const href = 'href';
const service_url = 'service-url';
const preview = 'preview';
const fetch_in_progress = 'fetch-in-progress';
const fetch_complete = 'fetch-complete';
const title = 'title';
/**
* `xtal-link-preview`
* Provide preview of URL.
*
*
* @customElement
* @polymer
* @demo demo/index.html
*/
class XtalLinkPreview extends XtallatX(HTMLElement) {
    constructor() {
        super();
        this._serviceUrl = 'https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=';
        this._preview = false;
        this._connected = false;
        const template = document.createElement('template');
        template.innerHTML = `
          <style>
            :host {
              display: block;
            }
            ${customStyle}
          </style>
          <div id="slot">
          <slot>
           
          </slot>
          </slot>
        `;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.style.display = "block";
    }
    /** @type {string} Url of service that gets preview.
    *
    */
    get serviceUrl() {
        return this._serviceUrl;
    }
    set serviceUrl(val) {
        this.attr('service-url', val);
    }
    /** @type {string} Url to preview
    *
    */
    get href() {
        return this._href;
    }
    set href(val) {
        this.attr('href', val);
    }
    get fetchInProgress() {
        return this._fetchInProgress;
    }
    set fetchInProgress(val) {
        this._fetchInProgress = val;
        this.attr(fetch_in_progress, val, '');
        this.de(fetch_in_progress, {
            value: val
        });
    }
    get fetchComplete() {
        return this._fetchComplete;
    }
    set fetchComplete(val) {
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
    get preview() {
        return this._preview;
    }
    set preview(val) {
        this.attr(preview, val, '');
    }
    get title() {
        return this._title;
    }
    set title(val) {
        this._title = val;
        this.attr(title, val);
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([href, preview, service_url,]);
    }
    connectedCallback() {
        this._upgradeProperties(['disabled', preview, href, 'serviceUrl']);
        this._connected = true;
        this.de('connected', {
            value: this.href
        });
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._connected || !this._preview || this.disabled || !this._href || !this._serviceUrl)
            return;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        fetch(this._serviceUrl + this._href + '&image_no=1&css=true')
            .then((response) => {
            response.text().then(respText => {
                this.fetchInProgress = false;
                let massagedText = respText;
                //console.log(massagedText);
                const replacements = [['html', 'div'], ['head', 'header'], ['body', 'main']];
                replacements.forEach(s => {
                    massagedText = massagedText.replace('<' + s[0] + '>', '<' + s[1] + ' id="root">').replace('</' + s[0] + '>', '</' + s[1] + '>');
                });
                massagedText = massagedText.replace('<a href="', '<a target="_blank" href="');
                //console.log(massagedText);
                massagedText = massagedText.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>', '');
                //const massagedText = respText.replace('<html>', '<div>')
                const div = document.createElement('div');
                div.innerHTML = massagedText;
                this.shadowRoot.appendChild(div);
                this.shadowRoot.querySelector('div#slot').innerHTML = '';
                const titleSpan = this.shadowRoot.querySelector('span.title');
                if (titleSpan)
                    this.title = titleSpan.innerText;
                this.fetchComplete = true;
            });
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'href':
                this._href = newValue;
                // if(this._once) this.loadHref();
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
}
if (cs && cs.dataset.cssPath) {
    fetch(cs.dataset.cssPath).then(resp => {
        resp.text().then(css => {
            customStyle = css;
            initXtalLinkPreview();
        });
    });
}
else {
    initXtalLinkPreview();
}
function initXtalLinkPreview() {
    customElements.define('xtal-link-preview', XtalLinkPreview);
}
//# sourceMappingURL=xtal-link-preview.js.map
    })();  
        