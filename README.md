## Summary

This is the guide to the Adjust Smart Banner SDK for web sites or web apps. You can read more about Adjust™ at [adjust.com].

## Table of contents

* [Installation](#installation)
* [Initialization](#initialization)
* [Hide and show](#visibility)
* [Localisation](#localisation)
* [Deeplinks](#dynamic-deeplinks)
* [License](#license)

## <a id="installation">Installation</a>

The recommended way to install the SDK is npm:
```
npm install @adjustcom/smart-banner-sdk --save
```

But the sdk is also available through CDN and then access it through global `AdjustSmartBanner`.

To <a id="loading-snippet">load Smart Banner SDK through CDN</a> paste the following snippet into the `<head>` tag:
```html
<script type="application/javascript">
!function(n,t,e,a,r,o,s,c,i){var d=r+"_q";n[r]=n[r]||{},n[d]=n[d]||[];for(var u=0;u<o.length;u++)s(n[r],n[d],o[u]);c=t.createElement(e),i=t.getElementsByTagName(e)[0],c.async=!0,c.src="https://cdn.adjust.com/adjust-smart-banner-latest.min.js",c.onload=function(){for(var t=0;t<n[d].length;t++)n[r][n[d][t][0]].apply(n[r],n[d][t][1]);n[d]=[]},i.parentNode.insertBefore(c,i)}(window,document,"script",0,"AdjustSmartBanner",["init","show","hide"],(function(n,t,e){n[e]=function(){t.push([e,arguments])}}));
</script>
```

When loading the sdk through CDN we suggest using minified version. You can target specific version like `https://cdn.adjust.com/adjust-smart-banner-0.0.2.min.js`, or you can target latest version `https://cdn.adjust.com/adjust-smart-banner-latest.min.js` if you want automatic updates without need to change the target file. The sdk files are cached so they are served as fast as possible, and the cache is refreshed every half an hour. If you want updates immediately make sure to target specific version.


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

#### <a id="init-schema">**androidAppSchema**</a> `string`
#### <a id="init-deeplinkpath">**deepLinkPath**</a> `string`
#### <a id="init-context">**context**</a> `object`

These parameters allow you to specify where your user land in your app when they click on banner. For further information see [Deeplinks](#deeplinks).

Example:
```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  androidAppSchema: "myapp",
  deepLinkPath: "products/promotion",
})
```

```js
AdjustSmartBanner.init({
  // other initialisation parameters including mandatory ones
  androidAppSchema: "myapp",
  deepLinkPath: "products/promo={promotion_id}",
  context: {
    promotion_id: "new_user"
  }
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

**Important**: If your web application is a single page application (SPA) you should call this method after navigation happens and current page URL changes. This forces the SDK to read the updated URL of the page and the SDK can find suitable banners for the current page or use updated GET parameters when it builds a tracker link with a [dynamic deeplink](#dynamic-deeplinks).

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

Deeplink is a link which allows to direct user to a certain events or pages in your mobile application, offering a seamless user experience.
Smart banner sdk supports plain string deeplinks and deeplink templates which contain placeholders to be filled out by the sdk using provided deeplink context or GET parameters of the web page URL.

There are two ways to set a deeplink:
 - pass [deeplink path parameters](#init-deeplink) to `AdjustSmartBanner.init`
 - call `setDeepLinkPath` and `setAndroidAppSchema` setters as shown below

There are ways to provide context to interpolate deeplink template:
 - pass it as a [deeplink context parameter](#init-context) to `AdjustSmartBanner.init`
 - call `setContext` setter as shown below
 - [use GET parameters](#deeplink-context-url-params)

 ### <a id="deeplink-setters">**Deeplink path and context setters**</a>

There are several functions to set custom deeplink path and context.

#### <a id="deeplinks-setters-schema">**setAndroidAppSchema**</a>

Accepts a string representing Android scheme name of your mobile app. Android scheme name is required to build a deeplink for Android.

Note that the sdk preserves the scheme name, so it is not needed to call this method every time you update a deeplink path.

Example:
```js
AdjustSmartBanner.setAndroidAppSchema("adjustExample")
```

#### <a id="deeplinks-setters-deeplinkpath">**setDeepLinkPath**</a>

Accepts a deep link path which is an event or a screen in your mobile app.

**Important**: On Android app scheme name is required, you can provide it with [`androidAppSchema`](#init-schema) parameter within initialisation or with [`setAndroidAppSchema`](#dynamic-deeplinks-schema) function.

Example:
```js
AdjustSmartBanner.setDeepLinkPath("products/jeans/?product=cool-jeans&promo=spring_10")
```

A deeplink template could contain any number of parameters enclosed in curly brackets.

Example:
```js
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}&promo={promo}")
```

The sdk will replace these parameters with values from [context](#init-context) provided within initialisation or with [setContext](#deeplinks-setters-context) function, or from [URL parameters](#deeplink-context-urlparams).

#### <a id="deeplinks-setters-context">**setContext**</a>

An object with data to fill placeholders in deeplink template.

Example:
```js
AdjustSmartBanner.setContext({
  category: "jeans",
  product_id: "cool-jeans",
  promo: "spring_10"
})
```

The sdk searches a placeholder among the keys of passed context and replaces the placeholder with according value.

Example:
```js
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}&promo={promo}");
AdjustSmartBanner.setContext({
  category: "jeans",
  product_id: "cool-jeans",
  promo: "spring_10"
});

// Resulting deeplink path is "products/jeans/?product=cool-jeans&promo=spring_10"
```

 **Important**: if there is no such key in `context` found the sdk will try to get value from GET parameters of current URL address. Then if it's unable to find a value to be filled in, placeholder is replaced with an empty string.

Example:
```js
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}&promo={promo}");
AdjustSmartBanner.setContext({ category: "jeans" });

// Resulting deeplink path is "products/jeans/?product=&promo="
```

 **Important**: Note that `setContext` overrides the last preserved context, instead of sequential calls you should combine all needed parameters in a single object and then call `setContext` with it.

 Example:
```js
// Wrong
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}");
AdjustSmartBanner.setContext({ category: "jeans" });
AdjustSmartBanner.setContext({ product_id: "blue-jeans" }); // Previous context is lost

// Resulting deeplink path is "products//?product=blue-jeans&promo="

// Correct
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}");
AdjustSmartBanner.setContext({
  category: "shoes",
  product_id: "red-sneakers"
});

// Resulting deeplink path is "products/shoes/?product=red-sneakers"
```

### <a id="deeplink-context-urlparams">**Using GET parameters as context**</a>

If some of the parameters present in the deeplink template are missing in the `context`, the sdk tries to find them among the GET parameters of the current URL.

Example:
```js
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}&promo={promo}");
AdjustSmartBanner.setContext({ category: "jeans" });

// Let's say the current URL is "my-shop.com/spring-promo?product_id=cool-jeans&promo=spring_10"

// Then resulting deeplink path is "products/jeans/?product=cool-jeans&promo=spring_10"
```

**Important**: if your web app is a single page applications (SPA) you should call `AdjustSmartBanner.show()` when page address changes since the sdk on its own is unable to track navigation events and retrieve an updated URL.

**Important**: the `context` passed to the sdk is a prior choice to fill in placeholders, and GET parameters with the same keys are ignored in favor of the `context`.

Example:
```js
AdjustSmartBanner.setDeepLinkPath("products/{category}/?product={product_id}&promo={promo}");
AdjustSmartBanner.setContext({ product_id: "floral-jeans" });

// Let's say the current URL is "my-shop.com/spring-promo?product_id=cool-jeans&promo=spring_10",
// so we have product_id parameter in the URL and in the context

// Then resulting deeplink is "products/jeans/?product=floral-jeans&promo=spring_10"
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

