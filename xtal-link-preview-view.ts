import {html} from 'trans-render/lib/html.js';
import {DefineArgs} from 'xtal-element/src/types';
import 'be-loaded/be-loaded.js';
import 'be-verbose/be-verbose.js';
import ('be-definitive/be-definitive.js');
import ('be-ferried/be-ferried.js');
import ('be-hive/be-hive.js');

let xsltLink = (<any>self)['xtal-link-preview/xtal-link-preview.xsl'] as HTMLLinkElement | undefined;
let xsltPath: string | undefined;
if(xsltLink === undefined){
    xsltPath = 'https://unpkg.com/xtal-link-preview/xtal-link-preview.xsl';
}else{
    xsltPath = xsltLink.href;
}
let fallbackCSS = "https://unpkg.com/xtal-link-preview/xtal-link-preview.css";
const mainTemplate = html`
<style hidden be-loaded='{
    "stylesheets": [
        {
            "preloadRef": "xtal-link-preview/xtal-link-preview.css",
            "fallback": "${fallbackCSS}"
        }
    ]
}'>
    :host{
        display: block;
    }
</style>
    <slot be-ferried='{
        "xslt": ".xslt"
    }'
    ></slot>
    <div part=container class=container></div>
    <be-hive></be-hive>
`;

const beDefinitiveProps: DefineArgs = {
    config:{
        tagName: 'xtal-link-preview-view',
        propDefaults: {
            xslt: xsltPath
        }
    }
};

mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);