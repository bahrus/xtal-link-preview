(function () {
    if (customElements.get('xtal-link-preview'))
        return;
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
            this._preview = false;
            this.attachShadow({ mode: 'open' });
            this.style.display = "block";
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
                'preview'
            ];
        }
        loadHref() {
            //const _this = this;
            if (!this._preview)
                return;
            if (!this._href)
                return;
            fetch('https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=' + this._href + '&image_no=1&css=true')
                .then((response) => {
                response.text().then(respText => {
                    let massagedText = respText;
                    const replacements = ['html', 'head', 'body'];
                    replacements.forEach(s => {
                        massagedText = massagedText.replace('<' + s + '>', '<div>').replace('</' + s + '>', '</div>');
                    });
                    //console.log(massagedText);
                    massagedText = massagedText.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>', '');
                    //const massagedText = respText.replace('<html>', '<div>')
                    this.shadowRoot.innerHTML = massagedText;
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
            }
        }
    }
    customElements.define('xtal-link-preview', XtalLinkPreview);
})();
// http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true 
//# sourceMappingURL=xtal-link-preview.js.map