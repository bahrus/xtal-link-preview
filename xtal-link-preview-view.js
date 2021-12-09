import { html } from 'trans-render/lib/html.js';
import('be-definitive/be-definitive.js');
import('be-ferried/be-ferried.js');
import('be-hive/be-hive.js');
const splitURL = import.meta.url.split('/');
splitURL.pop();
const baseURL = splitURL.join('/') + '/';
const mainTemplate = html `
<style>
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
            xslt: baseURL + 'xtal-link-preview.xsl',
            css: baseURL + 'xtal-link-preview.css'
        }
    }
};
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);
