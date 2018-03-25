(function () {
    if (customElements.get('xtal-link-preview'))
        return;
    const cs = document.currentScript;
    let customStyle = '';
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
        /**
        * `xtal-link-preview`
        * Provide preview of URL.
        *
        *
        * @customElement
        * @polymer
        * @demo demo/index.html
        */
        class XtalLinkPreview extends HTMLElement {
            constructor() {
                super();
                this._serviceUrl = 'https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=';
                this._preview = false;
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
            get serviceUrl() {
                return this._serviceUrl;
            }
            set serviceUrl(val) {
                this.setAttribute('service-url', val);
            }
            set href(val) {
                this.setAttribute('href', val);
                //this._href = val;
                //this.loadHref();
            }
            get href() {
                return this._href;
            }
            set preview(val) {
                if (val) {
                    this.setAttribute('preview', '');
                }
                else {
                    this.removeAttribute('preview');
                }
            }
            get preview() {
                return this._preview;
            }
            static get observedAttributes() {
                return [
                    /** @type {string} Url to preview
                     *
                    */
                    'href',
                    /** @type {string} Must be true to preview the url specified by href
                     *
                    */
                    'preview',
                    /** @type {string} Url of service that gets preview.
                     *
                     */
                    'service-url',
                ];
            }
            loadHref() {
                //const _this = this;
                if (!this._preview)
                    return;
                if (!this._href)
                    return;
                if (!this._serviceUrl)
                    return;
                fetch(this._serviceUrl + this._href + '&image_no=1&css=true')
                    .then((response) => {
                    response.text().then(respText => {
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
                    });
                });
            }
            attributeChangedCallback(name, oldValue, newValue) {
                switch (name) {
                    case 'href':
                        this._href = newValue;
                        // if(this._once) this.loadHref();
                        this.loadHref();
                        break;
                    case 'preview':
                        this._preview = newValue !== null;
                        this.loadHref();
                        break;
                    case 'service-url':
                        this._serviceUrl = newValue;
                        this.loadHref();
                        break;
                }
            }
        }
        customElements.define('xtal-link-preview', XtalLinkPreview);
    }
})();
// http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true
//# sourceMappingURL=xtal-link-preview.js.map