(function(){function a(){class a extends HTMLElement{constructor(){super(),this._serviceUrl='https://cors-anywhere.herokuapp.com/http://playground.ajaxtown.com/link_preview/class.linkpreview.php?url=',this._preview=!1;const a=document.createElement('template');a.innerHTML=`
          <style>
            :host {
              display: block;
            }
            ${c}
          </style>
          <div id="slot">
          <slot>
           
          </slot>
          </slot>
        `,this.attachShadow({mode:'open'}),this.shadowRoot.appendChild(a.content.cloneNode(!0)),this.style.display='block'}connectedCallback(){this.addEventListener('click',this.handleClick)}handleClick(a){'A'!==a.target.tagName&&(location.href=this.href)}get serviceUrl(){return this._serviceUrl}set serviceUrl(a){this.setAttribute('service-url',a)}set href(a){this.setAttribute('href',a)}get href(){return this._href}set preview(a){a?this.setAttribute('preview',''):this.removeAttribute('preview')}get preview(){return this._preview}static get observedAttributes(){return['href','preview','service-url']}loadHref(){this._preview&&this._href&&this._serviceUrl&&fetch(this._serviceUrl+this._href+'&image_no=1&css=true').then((a)=>{a.text().then((a)=>{let b=a;[['html','div'],['head','header'],['body','main']].forEach((a)=>{b=b.replace('<'+a[0]+'>','<'+a[1]+' id="root">').replace('</'+a[0]+'>','</'+a[1]+'>')}),b=b.replace('<a href="','<a target="_blank" href="'),b=b.replace('<div id="toolbar" class="clearfix"><button id="changeimg">></button></div>','');const c=document.createElement('div');c.innerHTML=b,this.shadowRoot.appendChild(c),this.shadowRoot.querySelector('div#slot').innerHTML=''})})}attributeChangedCallback(a,b,c){'href'===a?(this._href=c,this.loadHref()):'preview'===a?(this._preview=null!==c,this.loadHref()):'service-url'===a?(this._serviceUrl=c,this.loadHref()):void 0}}customElements.define('xtal-link-preview',a)}if(customElements.get('xtal-link-preview'))return;const b=document.currentScript;let c='';b&&b.dataset.cssPath?fetch(b.dataset.cssPath).then((b)=>{b.text().then((b)=>{c=b,a()})}):a()})();