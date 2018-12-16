
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';
/**
 * Base class for many xtal- components
 * @param superClass
 */
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        /**
         * Any component that emits events should not do so if it is disabled.
         * Note that this is not enforced, but the disabled property is made available.
         * Users of this mix-in should ensure not to call "de" if this property is set to true.
         */
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        /**
         * Set attribute value.
         * @param name
         * @param val
         * @param trueVal String to set attribute if true.
         */
        attr(name, val, trueVal) {
            const v = val ? 'set' : 'remove'; //verb
            this[v + 'Attribute'](name, trueVal || val);
        }
        /**
         * Turn number into string with even and odd values easy to query via css.
         * @param n
         */
        to$(n) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        /**
         * Increment event count
         * @param name
         */
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
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
        de(name, detail, asIs = false) {
            const eventName = name + (asIs ? '' : '-changed');
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        /**
         * Needed for asynchronous loading
         * @param props Array of property names to "upgrade", without losing value set while element was Unknown
         */
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
const href = 'href';
const service_url = 'service-url';
const fetch_in_progress = 'fetch-in-progress';
const fetch_complete = 'fetch-complete';
const title = 'title';
class CorsAnywhere extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
        this._connected = false;
    }
    // _serviceUrl: string = 'https://crossorigin.me/';
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
    get title() {
        return this._title;
    }
    set title(val) {
        this._title = val;
        this.attr(title, val);
        // this.de(title,{
        //     value: val
        // })
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([href, service_url,]);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'href':
                this._href = newValue;
                // if(this._once) this.loadHref();
                break;
            case 'service-url':
                this._serviceUrl = newValue;
                break;
        }
        this.onPropsChange();
    }
    connectedCallback() {
        this._upgradeProperties(['disabled', href, 'serviceUrl']);
        this._connected = true;
        this.de('connected', {
            value: this.href
        });
        this.onPropsChange();
    }
    set abort(val) {
        if (this._controller)
            this._controller.abort();
    }
    doFetch() {
        const url = this.calculateURL();
        if (this._previousURL === url) {
            this.fetchComplete = false;
            this.fetchComplete = true;
            return;
        }
        this._previousURL = url;
        this.title = "Loading...";
        this.fetchInProgress = true;
        this.fetchComplete = false;
        let init = null;
        if (AbortController) {
            this._controller = new AbortController();
            init = this._controller.signal;
        }
        fetch(url, {
            signal: init,
        }).then(response => {
            this.fetchInProgress = false;
            this.processResponse(response);
            this.fetchComplete = true;
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
                delete this._previousURL;
            }
        });
    }
    calculateURL(upLevels = 0) {
        let href = this._href;
        if (upLevels) {
            const split = href.split('/');
            if (upLevels === -1) {
                href = [split[0], split[1], split[2]].join('/');
            }
        }
        return this._serviceUrl + href;
    }
}
function qsa(css, from) {
    return [].slice.call((from ? from : this).querySelectorAll(css));
}
const preview = 'preview';
const image_width = 'image-width';
/**
* `xtal-link-preview`
* Provide preview of URL.
*
*
* @customElement
* @polymer
* @demo demo/index.html
*/
class XtalLinkPreviewBase extends CorsAnywhere {
    constructor() {
        super();
        this._serviceUrl = 'https://cors-anywhere.herokuapp.com/';
        this._preview = false;
        this._imageWidth = 150;
        this.style.display = "block";
    }
    static get is() { return 'xtal-link-preview-base'; }
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
    get imageWidth() {
        return this._imageWidth;
    }
    set imageWidth(val) {
        this.attr(image_width, val.toString());
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([preview, image_width]);
    }
    connectedCallback() {
        this._upgradeProperties([preview, 'imageWidth']);
        super.connectedCallback();
    }
    calculateURL() {
        return this._serviceUrl + this._href;
    }
    onPropsChange() {
        if (!this._connected || !this._preview || this.disabled || !this._href || !this._serviceUrl)
            return;
        this.doFetch();
    }
    getMetaContent(htmlDoc, name, val) {
        let metas = qsa('meta[' + name + '="' + val + '"]', htmlDoc);
        let meta = metas.filter(item => item.content);
        if (meta && meta.length > 0)
            return meta[0].content;
        return null;
    }
    getAbsPath(imageSrc) {
        let newSrc = imageSrc;
        let href = this._href;
        const iPosOfHash = href.indexOf('#');
        if (iPosOfHash > -1)
            href = href.substr(0, iPosOfHash);
        if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data')) {
            if (imageSrc.startsWith('/')) {
                newSrc = href.split('/').slice(0, 3).join('/') + imageSrc;
            }
            else {
                const mid = href.endsWith('/') ? '' : '/';
                if (newSrc.startsWith('/'))
                    newSrc.replace('/', '');
                newSrc = href + mid + imageSrc;
            }
        }
        return newSrc;
    }
    processResponse(response) {
        response.text().then(respText => {
            this.fetchInProgress = false;
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(respText, "text/html");
            let imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image:src");
            if (!imageSrc)
                imageSrc = this.getMetaContent(htmlDoc, 'name', "twitter:image");
            if (!imageSrc)
                imageSrc = this.getMetaContent(htmlDoc, 'property', 'og:image');
            if (!imageSrc) {
                const img = htmlDoc.querySelector('img');
                if (img) {
                    imageSrc = img.getAttribute('src');
                    //imageSrc = this.getAbsPath(imageSrc);
                    //console.log(imageSrc);
                }
            }
            if (!imageSrc) {
                const iconLink = htmlDoc.querySelector('link[rel="icon"]');
                if (iconLink) {
                    imageSrc = iconLink.getAttribute('href');
                    //imageSrc = this.getAbsPath(imageSrc);
                }
            }
            if (imageSrc)
                imageSrc = this.getAbsPath(imageSrc);
            //console.log(imageSrc);
            let titleEl = htmlDoc.querySelector('title');
            if (titleEl)
                this.title = titleEl.innerHTML;
            let description = this.getMetaContent(htmlDoc, 'name', 'description');
            if (!description) {
                description = '';
            }
            else {
                this.title = this.title.replace(description, '');
            }
            this.setInnerHTML(/* html */ `
                <div>
                    <details open>
                        <summary>${this.title}</summary>
                        <p>${description}</p>
                    </details>
                    <img alt="${this.title}" width="${this._imageWidth}" src="${imageSrc}"/>
                </div>
            `);
            this.fetchComplete = true;
        });
    }
    setInnerHTML(html) {
        this.innerHTML = html;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'preview':
                this._preview = newValue !== null;
                if (!this._preview) {
                    this.abort = true;
                }
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
}
define(XtalLinkPreviewBase);
const template = document.createElement('template');
template.innerHTML = /* html */ `
<slot name="loading"></slot>
<main></main>
<style>
:host{
    display: block;
}
slot {
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
}
main {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
}

/* On mouse-over, add a deeper shadow */
main:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

main>div {
    display: flex;
    height: 100%;
    padding: 5px;
}
main img {
    object-fit: scale-down;
}
@media (min-width: 800px) {
    main>div {
        flex-direction: row-reverse;
        justify-content: space-around;
    }
    main img {
        align-self: stretch;
        filter: drop-shadow(0px 0px 1px rgba(0,0,0,.3))
        drop-shadow(0px 0px 10px rgba(0,0,0,.3));
    }

}

@media (max-width: 800px) {
    main>div {
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
    }
    main img {
        border: 1px solid #ccc;
    }

}

      main>div>details>summary{
        list-style:none;
      }

      main>div>details > summary::-webkit-details-marker {
        display: none;
      }


      main>div>details>summary {
        margin-top: 5px;
        font-weight: 800;
      }

      main>div>details p {
        text-align: left;
        margin-left: 5px;
      }
</style>
`;
class XtalLinkPreview extends XtalLinkPreviewBase {
    static get is() { return 'xtal-link-preview'; }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    setInnerHTML(html) {
        this.shadowRoot.querySelector('main').innerHTML = html;
        this.shadowRoot.querySelector('slot').style.display = 'none';
    }
}
define(XtalLinkPreview);
    })();  
        