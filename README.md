## Summary

This is the guide to the Adjust Smart Banner SDK for web sites or web apps. You can read more about Adjust™ at [adjust.com].

TBD: what is this and why?

## Table of contents

* [Installation](#installation)
* [Initialization](#initialization)
* [Hide and show](#hide-and-show)
* [Localisation](#localisation)
* [Dynamic deeplinks](#dynamic-deeplinks)
* [License](#license)

## <a id="installation">Installation</a>

The recommended way to install the SDK is npm:
```
npm install @adjustcom/smart-banner-sdk --save
```

But it's also available to loaded the SDK through CDN and then access it through global `AdjustSmartBanner`.

To <a id="loading-snippet">load Smart Banner SDK through CDN</a> paste the following snippet into the `<head>` tag:
```html
<script type="application/javascript">
!function(n,t,e,a,r,o,s,c,i){var d=r+"_q";n[r]=n[r]||{},n[d]=n[d]||[];for(var u=0;u<o.length;u++)s(n[r],n[d],o[u]);c=t.createElement(e),i=t.getElementsByTagName(e)[0],c.async=!0,c.src="https://cdn.adjust.com/adjust-smart-banner-latest.min.js",c.onload=function(){for(var t=0;t<n[d].length;t++)n[r][n[d][t][0]].apply(n[r],n[d][t][1]);n[d]=[]},i.parentNode.insertBefore(c,i)}(window,document,"script",0,"AdjustSmartBanner",["init","show","hide"],(function(n,t,e){n[e]=function(){t.push([e,arguments])}}));
</script>
```

When loading the sdk through CDN we suggest using minified version. You can target specific version like `https://cdn.adjust.com/adjust-smart-banner-1.0.0.min.js.min.js`, or you can target latest version `https://cdn.adjust.com/adjust-smart-banner-latest.min.js` if you want automatic updates without need to change the target file. The sdk files are cached so they are served as fast as possible, and the cache is refreshed every half an hour. If you want updates immediately make sure to target specific version.


## <a id="initialization">Initialization</a>

In order to initialize the Smart Banner SDK you should call the `AdjustSmartBanner.init` method:

```js
AdjustSmartBanner.init({
    "appToken": "APP_TOKEN",
})
```

When you call this method Smart Banner SDK detects device platform, and if it's a mobile platform then the SDK loads available smart banners. If a banner for current page exists, it would be shown right after initialisation finished.
 
Here is the full list of available parameters for the `init` method:

### Mandatory params

<a id="app-token">**appToken**</a> `string | object`

Depending on what apps you have in your space you provide one or multiple app tokens.

For single app pass its app token to initialise the SDK:
```js
AdjustSmartBanner.init({
    "appToken": "APP_TOKEN",
})
```

For multiple apps pass app tokens for each platform:
```js
AdjustSmartBanner.init({
    "appToken": {
        "ios": "IOS_APP_TOKEN",
        "android": "ANDROID_APP_TOKEN"
    }
})
```

### Optional params

<a id="log-level">**logLevel**</a> `string`

By default this param is set to `error`. Possible values are `none`, `error`, `warning`, `info`, `verbose`. We highly recommend that you use `verbose` when testing in order to see precise logs and to make sure integration is done properly.
Here are more details about each log level:
- `verbose` - will print detailed messages in case of certain actions
- `info` - will print only basic info messages, warnings and errors
- `warning` - will print only warning and error messages
- `error` - will print only error message
- `none` - won't print anything

<a id="init-data-residency">**dataResidency**</a> `string`

The data residency feature allows you to choose the country in which Adjust stores your data. This is useful if you are operating in a country with strict privacy requirements. When you set up data residency, Adjust stores your data in a data center located in the region your have chosen.

To set your country of data residency, pass a `dataResidency` argument in your `init` call.

```js
AdjustSmartBanner.init({
  "appToken": "YOUR_APP_TOKEN",
  "dataResidency": "EU"
})
```

The following values are accepted:

- `EU` – sets the data residency region to the EU.
- `TR` – sets the data residency region to Turkey.
- `US` – sets the data residency region to the USA.

<a id="init-language">**language**</a> `string`

See [Localisation](#localisation).

Example:
```js
AdjustSmartBanner.init({
   // other initialisation parameters including mandatory ones
    "language": "fr"
})
```

<a id="init-deeplink">**deeplink**</a> `string`

See [Dynamic deeplinks](#dynamic-deeplinks).

```js
AdjustSmartBanner.init({
   // other initialisation parameters including mandatory ones
    "deeplink": "myapp://promotion/"
})
```

<a id="init-context">**context**</a> `string`

See [Dynamic deeplinks](#dynamic-deeplinks).

```js
AdjustSmartBanner.init({
   // other initialisation parameters including mandatory ones
    deeplink: "myapp://promotion/{promotion_id}"
    context: {
      promotion_id: "new_user"
    }
})
```

<a id="init-oncreated">**onCreated**</a> `function`

A function to be called after banner displayed.

```js
AdjustSmartBanner.init({
    // other initialisation parameters including mandatory ones
    onCreated: () => console.log('Smart banner shown')
})
```

<a id="init-ondismissed">**onDismissed**</a> `function`

A function to be called when dismiss button of the banner was clicked.

```js
AdjustSmartBanner.init({
   // other initialisation parameters including mandatory ones
    onDismissed: () => console.log('Smart banner dismissed')
})
```

## <a id="hide-and-show">Hide and show</a>

It's possible to hide smart banner after initialisation and show it again when needed.

<a id="hide">**hide**</a>

Hides smart banner. Note: this function does not remove the banner from the DOM.

```js
AdjustSmartBanner.hide();
``` 

<a id="show">**show**</a>

This will show smart banner.

**Important**: if your web application is a single page application (SPA) you should call this method after navigation happen and current URL changed to force the SDK read the updated URL in order to allow SDK properly find suitable banners for current page and use fresh GET parameters when it builds a tracker link with a [dynamic deeplink](#dynamic-deeplinks).

```js
AdjustSmartBanner.show();
``` 

## <a id="localisation">Localisation</a>

```js
AdjustSmartBanner.setLanguage();
``` 

## <a id="dynamic-deeplinks">Dynamic deeplinks</a>
```js
AdjustSmartBanner.setCustomContext({deeplink, context});
``` 
<a id="dynamic-deeplinks-deeplink">**deeplink**</a> `string`

<a id="dynamic-deeplinks-context">**context**</a> `object`

## <a id="license">License</a>

The Adjust SDK is licensed under the MIT License.

Copyright (c) 2023 Adjust GmbH, https://www.adjust.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



[adjust.com]:   https://adjust.com

