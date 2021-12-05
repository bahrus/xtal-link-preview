import { html } from 'trans-render/lib/html.js';
import('be-definitive/be-definitive.js');
const splitURL = import.meta.url.split('/');
splitURL.pop();
const baseURL = splitURL.join('/') + '/';
const mainTemplate = html `


`;
const beDefinitiveProps = {
    config: {
        tagName: 'xtal-link-preview',
        propDefaults: {
            href: '',
            xslt: baseURL + 'xtal-link-preview.xsl',
        },
        propInfo: {}
    }
};
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
