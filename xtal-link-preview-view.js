import { html } from 'trans-render/lib/html.js';
import 'be-loaded/be-loaded.js';
import('be-definitive/be-definitive.js');
import('be-ferried/be-ferried.js');
import('be-hive/be-hive.js');
const splitURL = import.meta.url.split('/');
splitURL.pop();
const baseURL = splitURL.join('/') + '/';
const fallbackCSS = baseURL + 'xtal-link-preview.css';
const mainTemplate = html `
<style be-loaded='{
    "preloadRef": "xtal-link-preview-css",
    "fallback": "${fallbackCSS}"
}'>
    :host{
        display: block;
    }
</style>
    <slot be-ferried='{
        "xslt": ".xslt"
    }'
    ></slot>
    <div></div>
    <be-hive></be-hive>
`;
const beDefinitiveProps = {
    config: {
        tagName: 'xtal-link-preview-view',
        propDefaults: {
            xslt: baseURL + 'xtal-link-preview.xsl'
        }
    }
};
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);
