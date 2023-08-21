'use strict';

const a119_0x21aa20 = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a119_0x21aa20);

function dataURItoFile(_0x57dcbd, _0x29ae6a = "image") {
  if (!_0x57dcbd) {
    return undefined;
  }

  function _0x1dd34d(_0x421fd7) {
    const _0x171deb = _0x421fd7["match"](/^data:([A-Za-z-+/]+);base64/);

    if (_0x171deb && _0x171deb["length"] > 1) {
      return _0x171deb[1];
    }

    return null;
  }

  const [_0x2af4f4, _0x77db26] = _0x57dcbd["split"](','),
        _0x2b68d2 = _0x1dd34d(_0x2af4f4) || "image/png",
        [, _0x4f4abe] = _0x2b68d2["split"]('/'),
        _0x4e239a = Buffer["from"](_0x77db26, "base64"),
        _0x441c8b = {
    "buffer": _0x4e239a,
    'fieldname': _0x29ae6a,
    "originalname": _0x29ae6a + '.' + _0x4f4abe,
    'mimetype': _0x2b68d2
  };

  return _0x441c8b;
}

exports["default"] = dataURItoFile;