import('./xtal-link-preview-view.js');
import { html } from 'trans-render/lib/html.js';
import('be-definitive/be-definitive.js');
import 'be-observant/be-observant.js';
import('be-reformable/be-reformable.js');
import('be-hive/be-hive.js');
const mainTemplate = html `
<style hidden>
    :host{
        display: block;
    }
</style>
<form be-reformable='{
    "autoSubmit": true,
    "as": "html"
}'
action=https://corslet.bahrus.workers.dev/
target=xtal-link-preview-view[-innerHTML]
>
    <input hidden required type=text name=href be-observant='{
        "value": {"onSet": "href", "vft": "href", "fire":{"type":"input", "init": {"bubbles": true}}}
    }'/>
    <textarea hidden name=lhs><head></textarea>
    <textarea hidden name=rhs></head></textarea>
    <textarea hidden name="wrapper"><template><header href="[href]">|</header></template></textarea>
</form>
<xtal-link-preview-view -innerHTML ></xtal-link-preview-view>
<be-hive></be-hive>
`;
const beDefinitiveProps = {
    config: {
        tagName: 'xtal-link-preview',
        propDefaults: {
            href: '',
        }
    }
};
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);
