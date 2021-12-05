import {html} from 'trans-render/lib/html.js';
import {DefineArgs} from 'xtal-element/src/types';
import ('be-definitive/be-definitive.js');
const splitURL = import.meta.url.split('/');
splitURL.pop();
const baseURL = splitURL.join('/') + '/'

const mainTemplate = html`
    <slot be-ferried='{
        "xslt": ".xslt"
    }'
    ></slot>
    <div></div>
    <be-hive></be-hive>
`;

const beDefinitiveProps: DefineArgs = {
    config:{
        tagName: 'xtal-link-preview',
        propDefaults: {
            href: '',
            xslt: baseURL + 'xtal-link-preview.xsl',

        },
        propInfo:{

        }
    }
};

mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);