import { XtalLinkPreviewBase } from "./xtal-link-preview-base.js";
import { define } from "xtal-element/xtal-latx.js";
import { RenderContext, RenderOptions } from "trans-render/types2.d.js";

const template = document.createElement('template');
template.innerHTML = /* html */`
<style>
:host{
    display: block;
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

main>div {
    display: flex;
    flex-direction:column;
    place-items: center;
    height: 100%;
    padding: 5px;
}
main img {
    object-fit: scale-down;
}
/* @media (min-width: 800px) {
    main>div {
        flex-direction: row-reverse;
        justify-content: space-around;
    }
    main img {
        align-self: stretch;
        filter: drop-shadow(0px 0px 1px rgba(0,0,0,.3))
        drop-shadow(0px 0px 10px rgba(0,0,0,.3));
    }

}

@media (max-width: 800px) {
    main>div {
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
    }
    main img {
        border: 1px solid #ccc;
    }

} */

main>div>details>summary{
    list-style:none;
}

main>div>details > summary::-webkit-details-marker {
    display: none;
}


main>div>details>summary {
    margin-top: 5px;
    font-weight: 800;
}

main>div>details p {
    text-align: left;
    margin-left: 5px;
}
</style>
`;
export class XtalLinkPreview extends XtalLinkPreviewBase {
    static is = 'xtal-link-preview'; 

    noShadow = false;

    afterInitRenderCallback(ctx: RenderContext, target: HTMLElement | DocumentFragment, renderOptions: RenderOptions | undefined){
        //this.root.querySelector('slot').style.display = 'none';
        console.log('afterInitRenderCallback');
        this.root.appendChild(template.content.cloneNode(true));
    }

    // setInnerHTML(html) {
    //     this.shadowRoot!.querySelector('main').innerHTML = html;
    //     this.shadowRoot!.querySelector('slot').style.display = 'none';
    // }
}
define(XtalLinkPreview);