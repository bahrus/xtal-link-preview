import { XtalLinkPreviewBase } from "./xtal-link-preview-base.js";
import { define } from "xtal-element/xtal-latx.js";
import { RenderContext, RenderOptions } from "trans-render/types.d.js";

const template = document.createElement('template');
template.innerHTML = /* html */`
<style>
:host{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;    
}
slot {
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
}
main {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
}

/* On mouse-over, add a deeper shadow */
main:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

[part="linkContainer"] {
    display: flex;
    flex-direction:row;
    align-self:self-start;
}

main img {
    object-fit: scale-down;
}


main details>summary{
    list-style:none;
}

main details>summary::-webkit-details-marker {
    display: none;
}

a:link{
    text-decoration:none;
}


main details>summary {
    margin-top: 5px;
    font-weight: 800;
}

main details p {
    text-align: left;
    margin-left: 5px;
}
</style>
`;
export class XtalLinkPreview extends XtalLinkPreviewBase {
    static is = 'xtal-link-preview'; 

    noShadow = false;

    afterInitRenderCallback(ctx: RenderContext, target: HTMLElement | DocumentFragment, renderOptions: RenderOptions | undefined){
        this.root.appendChild(template.content.cloneNode(true));
    }

}
define(XtalLinkPreview);