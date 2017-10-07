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
        static get observedAttributes() {
            return [
                /** @type {string} Url to preview
                 *
                */
                'href',
            ];
        }
        loadHref() {
            const _this = this;
            fetch('https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true')
                .then((response) => {
                response.text().then(respText => {
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.innerHTML = respText;
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
            }
        }
    }
    customElements.define('xtal-link-preview', XtalLinkPreview);
})();
// http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=onsen.io&image_no=1&css=true 
//# sourceMappingURL=xtal-link-preview.js.map