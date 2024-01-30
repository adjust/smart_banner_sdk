## Summary

This is the guide to the Adjust Smart Banner SDK for web sites or web apps. You can read more about Adjust™ at [adjust.com].

## Table of contents

* [Installation](#installation)
* [Initialization](#initialization)
* [Hide and show](#visibility)
* [Localisation](#localisation)
* [Deeplinks](#deeplinks)
* [License](#license)

## <a id="installation">Installation</a>

The recommended way to install the SDK is npm:
```
npm install @adjustcom/smart-banner-sdk --save
```

And then import it into your code:
```
import AdjustSmartBanner from '@adjustcom/smart-banner-sdk'
```

The sdk is also available through CDN and then accessible through global `AdjustSmartBanner`.

To <a id="loading-snippet">load Smart Banner SDK through CDN</a> paste the following snippet into the `<head>` tag:
```html
<script type="application/javascript">
!function(n,t,e,o,a,s,r,i,c){var u=a+"_q";n[a]=n[a]||{},n[u]=n[u]||[];for(var d=0;d<s.length;d++)r(n[a],n[u],s[d]);i=t.createElement(e),c=t.getElementsByTagName(e)[0],i.async=!0,i.src="https://cdn.adjust.com/adjust-smart-banner-latest.min.js",i.onload=function(){n[a]=n[a].default;for(var t=0;t<n[u].length;t++)n[a][n[u][t][0]]?n[a][n[u][t][0]].apply(n[a],n[u][t][1]):console.error("No such function found in "+a+": "+n[u][t][0]);n[u]=[]},c.parentNode.insertBefore(i,c)}(window,document,"script",0,"AdjustSmartBanner",["init","show","hide","setLanguage","setIosDeepLinkPath","setAndroidDeepLinkPath","setContext"],(function(n,t,e){n[e]=function(){t.push([e,arguments])}}));
</script>
```

When loading the sdk through CDN we suggest using minified version. You can target specific version like `https://cdn.adjust.com/adjust-smart-banner-1.1.1.min.js`, or you can target latest version `https://cdn.adjust.com/adjust-smart-banner-latest.min.js` if you want automatic updates without need to change the target file. The sdk files are cached so they are served as fast as possible, and the cache is refreshed every half an hour. If you want updates immediately make sure to target specific version.


## <a id="initialization">Initialization</a>

In order to initialize the Smart Banner SDK you should call the `AdjustSmartBanner.init` method:

```js
AdjustSmartBanner.init({
  appToken: "APP_TOKEN",
})
```

When you call this method Smart Banner SDK detects device platform, and if it's a mobile platform then the SDK loads available smart banners. If a banner for current page exists, it would be shown right after initialisation finished.
 
Here is the full list of available parameters for the `init` method:

### Mandatory params

#### <a id="init-apptoken">**appToken**</a> `string | object`

Depending on what apps you have in your space you provide one or multiple app tokens.

For multiplatform app pass its app token to initialise the SDK:
```js
AdjustSmartBanner.init({
  appToken: "APP_TOKEN",
})
```

For single-platform apps pass app tokens for each platform:
```js
AdjustSmartBanner.init({
  appToken: {
    ios: "IOS_APP_TOKEN",
    android: "ANDROID_APP_TOKEN"
  }
})
```

### Optional params

#### <a id="init-loglevel">**logLevel**</a> `string`

By default this param is set to `error`. Possible values are `none`, `error`, `warning`, `info`, `verbose`. We highly recommend that you use `verbose` when testing in order to see precise logs and to make sure integration is done properly.
Here are more details about each log level:
- `verbose` - will print detailed messages in case of certain actions
- `info` - will print only basic info messages, warnings and errors
- `warning` - will print only warning and error messages
- `error` - will print only error message
- `none` - won't print anything

#### <a id="init-language">**language**</a> `string`

You can instruct the sdk what localisation it should use to display the banner. For further information see [Localisation](#localisation).

Example:
```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  language: "fr"
})
```

#### <a id="init-deeplink">**Deeplink path parameters**</a>

These parameters allow you to specify where your user lands in your app when they click on banner. For further information see [Deeplinks](#deeplinks).

##### <a id="init-androiddeeplinkpath">**androidDeepLinkPath**</a> `string`

Overrides Android deeplink path, which allows you to change user destination in your mobile app when they click on banner.

Example:
```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  androidDeepLinkPath: "android/path/to/screen"
})
```

Please find [more examples below](#init-context-examples). For further templates and context explanation see [Deeplinks](#deeplinks) chapter.

##### <a id="init-iosdeeplinkpath">**iosDeepLinkPath**</a> `string`
Overrides iOS deeplink path, which allows you to change user destination in your mobile app when they click on banner.

Example:
```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  iosDeepLinkPath: "ios/path-to-screen"
})
```

Please find [more examples below](#init-context-examples). For further templates and context explanation see [Deeplinks](#deeplinks) chapter.

##### <a id="init-context">**context**</a> `object`
Sets context for deeplink path template. The context is an object where the SDK searches values to interpolate a deeplink path template. For further information see [Deeplinks](#deeplinks).

<a id="init-context-examples">Examples:</a>
```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  iosDeepLinkPath: "products/product={item_id}",
  context: {
    item_id: "cool_jeans_123"
  }
})

AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  androidDeepLinkPath: "products/{item_id}",
  context: {
    item_id: "cool_jeans_123"
  }
})

AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  androidDeepLinkPath: "products/{item_id}",
  iosDeepLinkPath: "products/product={item_id}",
  context: {
    item_id: "cool_jeans_123"
  }
})
```

You can use different paths for iOS and Android and set different context variables:

Example:
```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  androidDeepLinkPath: "promo/{android_promo}",
  iosDeepLinkPath: "main/{ios_promo}",
  context: {
    android_promo: "new_user",
    ios_promo: "registrationFinished",
    unused_variable: "this will be ignored"
  }
})
```

#### <a id="init-bannerparent">**bannerParent**</a> `HTMLElement`

By default banner is attached to `document.body`. To change this behaviour you could specify the parent for the banner. It should be an existing `HTMLElement`.

```js
const element = document.querySelector('#root-for-banner');

AdjustSmartBanner.init({
    // other initialisation parameters including mandatory ones
    bannerParent: element
})
```

#### <a id="init-oncreated">**onCreated**</a> `function`

A function to be called after banner displayed.

```js
AdjustSmartBanner.init({
    // other initialisation parameters including mandatory ones
    onCreated: () => console.log('Smart banner shown')
})
```

#### <a id="init-ondismissed">**onDismissed**</a> `function`

A function to be called when dismiss button of the banner was clicked.

```js
AdjustSmartBanner.init({
   // other initialisation parameters including mandatory ones
    onDismissed: () => console.log('Smart banner dismissed')
})
```

## <a id="visibility">Hide and show</a>

It's possible to hide smart banner after initialisation and show it again when needed.

#### <a id="visibility-hide">**hide**</a>

Hides smart banner. Note: this function does not remove the banner from the DOM.

```js
AdjustSmartBanner.hide();
``` 

#### <a id="visibility-show">**show**</a>

Shows smart banner.

**Important**: If your web application is a single page application (SPA) you should call this method after navigation happens and current page URL changes. This forces the SDK to read the updated URL of the page and the SDK can find suitable banners for the current page or use updated GET parameters when it builds a tracker link with a [dynamic deeplink](#deeplinks).

```js
AdjustSmartBanner.show();
``` 

## <a id="localisation">Localisation</a>

For better user experience you could localise your smart banners. Smart Banner SDK reads language used in browser, and if there is such localisation of banner, the banner will be displayed in proper language. But default choice might be not the best one, most likely you know better what language your user prefers. In this case you can instruct the sdk what language it should use.

There are two ways to set preferred language
 - pass it as [a parameter](#init-language) to `AdjustSmartBanner.init`
 - call `setLanguage` setter as shown below:

```js
AdjustSmartBanner.setLanguage("fr");
``` 

The setter accepts a two-letters language code, i.e. `en`, `de`, etc.

## <a id="deeplinks">Deeplinks</a>

Deeplink is a link which allows to direct user to a certain events or pages in your mobile application, offering a seamless user experience. Smart banner sdk supports [**plain string deeplink paths**](#deeplinks-plain-path) and [**deeplink path templates**](#deeplinks-path-template).

There are two ways to set a deeplink path or deeplink path template:
 - pass [deeplink path parameters](#init-deeplink) to `AdjustSmartBanner.init` method
 - call [`setAndroidDeepLinkPath`](#deeplinks-setters-androidDeeplinkpath) and [`setIosDeepLinkPath`](#deeplinks-setters-iosDeeplinkpath) setters

### <a id="deeplinks-plain-path">Plain string deeplink path</a>

Plain string deeplink path is just a string to be used as a user destination in your mobile app.

Example:
```js
// Plain string deeplink path

const deeplinkPath = "products/jeans/?product=cool_jeans_123"
```

### <a id="deeplinks-path-template">Deeplink path template</a>

Deeplink path template is a string which contains placeholders in curly bracets. The sdk replaces the placeholders by the [context values](#deeplinks-setting-context), i.e. interpolates the template. A result of the interpolation is a plain string, which is used as a user destination in your mobile app.

Example:
```js
// Deeplink path template

const template = "products/{category}/?product={product_id}"

// Substrings {category} and {product_id} are the placeholders, which are replaced by values found in the context
```

**Important**: Placeholders in a deeplink template are filled out by the sdk using [provided context](#deeplinks-setting-context) or [GET parameters](#deeplink-context-urlparams) of the current web page URL.

#### <a id="deeplinks-setting-context">Context for deeplink path template</a>

Context is used to interpolate [deeplink path templates](deeplinks-path-template).

There are two ways to provide context programmatically:
 - pass context as a [deeplink context parameter](#init-context) to `AdjustSmartBanner.init`
 - call [`setContext` setter](#deeplinks-setters-context)

Another way to setup context is to use [GET parameters](#deeplink-context-urlparams).

Before deeplink path template interpolation the sdk reads GET parameters of current URL address and combines them with the programmatically passed context. If there are a GET parameter and a context property with the same name, the sdk prefers and stores the value appeared in the context.

Then the sdk looks through the deeplink path template and replaces the placeholders enclosed in curly brackets with the properties from the combined context. If there is no such property in the combined context, then an empty string inserted instead of a placeholder.

#### <a id="deeplink-context-urlparams">**Using GET parameters as context**</a>

To interpolate deeplink path templates, the sdk reads the GET parameters of the current URL address and combines them with the programmatically set context.

Example:
```js
// Let's say the current URL is "https://my-shop.com/?product_id=111222&promo=spring_10"

AdjustSmartBanner.setIosDeepLinkPath("products/{product_id}/?promo={promo}");

// Then resulting deeplink path is "products/111222/?promo=spring_10"
```

You could combine the methods to setup the context:
```js
// Let's say the current URL is "https://my-shop.com/?product_id=111222&promo=spring_10"

AdjustSmartBanner.setIosDeepLinkPath("products/{category}/{product_id}/?promo={promo}");

// But wait, there is no value for {category} in the GET parameters

AdjustSmartBanner.setContext({ category: "jeans" });

// Then resulting deeplink path is "products/jeans/111222/?promo=spring_10"
```

**Important**: if your web app is a single page applications (SPA) you should call `AdjustSmartBanner.show()` when page address changes since the sdk on its own is unable to track navigation events and retrieve an updated URL.

**Important**: the [context](#deeplinks-setting-context) passed programmatically to the sdk is a prior choice to fill in the placeholders, and GET parameters with the same keys are ignored in favor of the context.

Example:
```js
// Let's say the current URL is "my-shop.com/?product_id=111222", so we have product_id parameter in the GET parameters

AdjustSmartBanner.setIosDeepLinkPath("products/{product_id}/");

// And then setContext function is called, which overrides a value of product_id
AdjustSmartBanner.setContext({ product_id: "999888" });

// Then resulting deeplink path is "products/999888/"
```

### <a id="deeplink-setters">**Deeplink path and context setters**</a>

There are several functions to set custom deeplink path or deeplink path template and its context.

#### <a id="deeplinks-setters-androidDeeplinkpath">**setAndroidDeepLinkPath**</a>

Accepts a string representing deep link path or deeplint path template.

Example:
```js
AdjustSmartBanner.setAndroidDeepLinkPath("products/jeans/?product=111222&promo=spring_10")
```

A deeplink path template could contain any number of placeholders enclosed in curly brackets.

Example:
```js
AdjustSmartBanner.setAndroidDeepLinkPath("products/jeans/?product={product_id}&promo={promo_id}")
```

The sdk will replace these parameters with values from [context](#init-context) provided within initialisation or with [setContext](#deeplinks-setters-context) function, or from [URL parameters](#deeplink-context-urlparams).

#### <a id="deeplinks-setters-iosDeeplinkpath">**setIosDeepLinkPath**</a>

Accepts a string representing deep link path or deeplint path template.

Example:
```js
AdjustSmartBanner.setIosDeepLinkPath("products/jeans/?product=111222&promo=spring_10")
```

A deeplink path template could contain any number of placeholders enclosed in curly brackets.

Example:
```js
AdjustSmartBanner.setIosDeepLinkPath("products/jeans/?product={product_id}&promo={promo_id}")
```

The sdk will replace these parameters with values from [context](#init-context) provided within initialisation or with [setContext](#deeplinks-setters-context) function, or from [URL parameters](#deeplink-context-urlparams).


#### <a id="deeplinks-setters-context">**setContext**</a>

An object with data to fill placeholders in deeplink template. The sdk searches a placeholder among the keys of passed context and replaces the placeholder with according value.

Example:
```js
AdjustSmartBanner.setAndroidDeepLinkPath("products/{category}/{product_id}/?promo={promo}");
AdjustSmartBanner.setContext({
  category: "jeans",
  product_id: "111222",
  promo: "spring_10"
});

// Resulting deeplink path is "products/jeans/111222/?promo=spring_10"
```

 **Important**: if there is no such key in `context` found the sdk will try to get value from GET parameters of current URL address. Then if it's unable to find a value to be filled in, placeholder is replaced with an empty string.

Example:
```js
AdjustSmartBanner.setIosDeepLinkPath("products/{category}/{product_id}/?promo={promo}");
AdjustSmartBanner.setContext({ category: "jeans" });

// Resulting deeplink path is "products/jeans//?promo="
```

 **Important**: Note that `setContext` overrides the last preserved context, instead of sequential calls you should combine all needed parameters in a single object and then call `setContext` with it.

 Example:
```js
// Wrong
AdjustSmartBanner.setIosDeepLinkPath("products/{category}/{product_id}");
AdjustSmartBanner.setContext({ category: "jeans" });
AdjustSmartBanner.setContext({ product_id: "111222" }); // Previous context is lost

// Resulting deeplink path is "products//111222", {category} is replaced with an empty string

// Correct
AdjustSmartBanner.setIosDeepLinkPath("products/{category}/{product_id}");
AdjustSmartBanner.setContext({
  category: "jeans",
  product_id: "111222"
});

// Resulting deeplink path is "products/jeans/111222"
```

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

