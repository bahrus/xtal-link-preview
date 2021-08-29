import { XE } from 'xtal-element/src/XE.js';
import { tm } from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
const mainTemplate = tm.html `
    <main part=main></main>
    <a -href part="outerLink" target=_blank></a>
`;
const setHref = ({ href }) => ({
    href
});
export class XtalLinkPreviewBase extends HTMLElement {
    setHref = setHref;
}
const isRef = {
    isRef: true,
};
const xe = new XE({
    config: {
        tagName: 'xtal-link-preview-base',
        propDefaults: {
            href: ''
        },
        propInfo: {
            hrefProps: isRef,
        },
        actions: {
            ...tm.doInitTransform,
            setHref: {
                ifAllOf: ['href'],
                target: 'hrefProps'
            }
        }
    },
    complexPropDefaults: {
        mainTemplate: mainTemplate,
    },
    superclass: XtalLinkPreviewBase,
    mixins: [tm.TemplMgmtMixin]
});
