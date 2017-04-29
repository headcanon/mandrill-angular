// by jussi-kalliokoski


// This test is asynchronous. Watch out.

// The test will potentially add garbage to console.

((() => {
  try {
    // we're avoiding using Modernizr._domPrefixes as the prefix capitalization on
    // these guys are notoriously peculiar.
    var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.OBlobBuilder || window.BlobBuilder;

    var URL         = window.MozURL || window.webkitURL || window.MSURL || window.OURL || window.URL;
    var data    = 'Modernizr';
    var bb      = new BlobBuilder();

    bb.append('this.onmessage=function(e){postMessage(e.data)}');

    var url     = URL.createObjectURL(bb.getBlob());
    var worker  = new Worker(url);

    bb = null;

    worker.onmessage = e => {
      worker.terminate();
      URL.revokeObjectURL(url);
      Modernizr.addTest('blobworkers', data === e.data);
      worker = null;
    };

    // Just in case...
    worker.onerror = () => {
      Modernizr.addTest('blobworkers', false);
      worker = null;
    };

    setTimeout(() => {
        Modernizr.addTest('blobworkers', false);
    }, 200);

    worker.postMessage(data);
  } catch (e) {
    Modernizr.addTest('blobworkers', false);
  }
})());
