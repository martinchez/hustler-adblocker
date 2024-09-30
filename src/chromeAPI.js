const isChromeExtension = typeof chrome !== 'undefined' && !!chrome.runtime && !!chrome.runtime.id;

const mockStorage = {
  whitelist: []
};

export const chromeAPI = {
  tabs: {
    query: isChromeExtension
      ? chrome.tabs.query
      : (queryInfo, callback) => {
          setTimeout(() => {
            callback([{ url: 'http://example.com' }]);
          }, 0);
        },
  },
  storage: {
    sync: {
      get: isChromeExtension
        ? chrome.storage.sync.get
        : (keys, callback) => {
            setTimeout(() => {
              if (typeof keys === 'string') {
                callback({ [keys]: mockStorage[keys] });
              } else if (Array.isArray(keys)) {
                const result = {};
                keys.forEach(key => {
                  result[key] = mockStorage[key];
                });
                callback(result);
              } else {
                callback(mockStorage);
              }
            }, 0);
          },
      set: isChromeExtension
        ? chrome.storage.sync.set
        : (items, callback) => {
            setTimeout(() => {
              Object.assign(mockStorage, items);
              if (callback) callback();
            }, 0);
          },
    },
  },
};
