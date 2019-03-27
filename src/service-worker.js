// /// Predefine code taken from workbox in 'GenerateSW' mode
/* eslint-disable */
workbox.core.setCacheNameDetails({ prefix: 'sync-incoming-calls' });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


const notificationClickHandler = event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];

      if (client.url.includes('vsp') && 'focus' in client) {
        if(!client.focused)
          return client.focus();
        }
      }
    }

  ));
};

self.addEventListener('notificationclick', notificationClickHandler);

/* eslint-enable */
