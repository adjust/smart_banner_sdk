(function (window, document, tag, url, sdkName, methods, placeholder, script, first) {

  var queueName = sdkName + '_q';

  window[sdkName] = window[sdkName] || {};
  window[queueName] = window[queueName] || [];

  for (var i = 0; i < methods.length; i++) {
    placeholder(window[sdkName], window[queueName], methods[i]);
  }

  script = document.createElement(tag);
  first = document.getElementsByTagName(tag)[0];
  script.async = true;
  script.src = url;

  script.onload = function () {
    window[sdkName] = window[sdkName].default; // I can't make Webpack to export library as I want :\

    for (var i = 0; i < window[queueName].length; i++) {
      if (!window[sdkName][window[queueName][i][0]]) {
        console.error('No such function found in ' + sdkName + ': ' + window[queueName][i][0])
      } else {
        window[sdkName][window[queueName][i][0]].apply(window[sdkName], window[queueName][i][1]);
      }
    }
    window[queueName] = [];
  };
  first.parentNode.insertBefore(script, first);
})(
  window,
  document,
  'script',
  'https://cdn.adjust.com/adjust-smart-banner-latest.min.js',
  'AdjustSmartBanner',
  [
    'init',
    'show',
    'hide',
    'setLanguage',
    'setIosDeepLinkPath',
    'setAndroidAppSchema',
    'setAndroidAppScheme',
    'setAndroidDeepLinkPath',
    'setContext'
  ],
  function (context, queue, methodName) {
    context[methodName] = function () {
      queue.push([methodName, arguments]);
    };
  }
);
