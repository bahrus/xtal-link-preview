[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-link-preview)

<a href="https://nodei.co/npm/xtal-link-preview/"><img src="https://nodei.co/npm/xtal-link-preview.png"></a>

# \<xtal-link-preview\>

Provide preview of URL. 

## [Demo](https://codepen.io/bahrus/pen/qBjbvPb)

xtal-link-preview provides the ability to provide your own styling, and event HTML layout.

## Syntax

```html
<xtal-link-preview href="https://onsen.io"></xtal-link-preview>
```

Try altering the href attribute below

<!--
```
<custom-element-demo>
  <template>

    <xtal-link-preview href=https://onsen.io></xtal-link-preview>
    <script src=https://cdn.skypack.dev/xtal-link-preview type=module crossorigin></script>
    </template>
</custom-element-demo>
```
-->

## Ways to Minimize Layout Shift (WIP)

By its very nature, the content within the xtal-link-preview element will be dynamically added to the page.  This includes unpredictable amounts of text, variable sized images, and other elements.  This can cause a layout shift.

One way to reduce this effect is to lazy load the content, with the help of the be-intersectional decorator, and specify heights ahead of time, [as demonstrated in this example](https://github.com/bahrus/xtal-link-preview/blob/baseline/demo/dev.html).

This is a bit clunky, as the content could change over time, resulting in inaccurate heights.





## Running locally

1.  Do a git clone or a git fork of repository https://github.com/bahrus/xtal-link-preview
2.  Install node.js
3.  Run "npm install" from location of folder created in step 1.
4.  Run npm run serve.  Open browser to http://localhost:3030/demo/single.html
