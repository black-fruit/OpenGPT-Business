'use strict';

const a5_0x557061 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a5_0x557061);
exports['stabilityImageToImage'] = exports['stabilityTextToImage'] = exports["stability"] = void 0;

const tslib_1 = require("tslib"),
      jimp_1 = tslib_1['__importDefault'](require("jimp")),
      node_fetch_1 = tslib_1['__importDefault'](require("node-fetch")),
      form_data_1 = tslib_1['__importDefault'](require("form-data")),
      utils_1 = require("../../utils"),
      textToImageUrl = "/v1/generation/stable-diffusion-v1-5/text-to-image",
      ImageToImageUrl = "/v1/generation/stable-diffusion-v1-5/image-to-image";

async function stability(_0xbfa0e9) {
  if (_0xbfa0e9["request"]["init_image"]) {
    const _0x4e4cc9 = { ..._0xbfa0e9
    };
    return stabilityImageToImage(_0x4e4cc9);
  } else {
    const _0x25821b = { ..._0xbfa0e9
    };
    return stabilityTextToImage(_0x25821b);
  }
}

exports['stability'] = stability;

async function stabilityTextToImage(_0xdf421c) {
  const {
    "prompt": _0x5b0e27,
    "cfg_scale": cfg_scale = 7,
    "style_preset": _0x5033ba,
    "steps": steps = 30,
    "samples": samples = 1,
    "height": height = 512,
    "width": width = 512
  } = _0xdf421c["request"],
        _0x4d37ca = {
    "text": _0x5b0e27
  };

  const _0x98de51 = (0, utils_1["filterObjectNull"])({
    'text_prompts': [_0x4d37ca],
    'cfg_scale': Number(cfg_scale),
    'clip_guidance_preset': "FAST_BLUE",
    'height': Number(height),
    'width': Number(width),
    'samples': Number(samples),
    'steps': Number(steps),
    'style_preset': _0x5033ba ? _0x5033ba : null
  }),
        {
    "key": _0x497444,
    "host": _0x2f2ba7
  } = _0xdf421c["aikeyInfo"],
        _0x524ee0 = await (0, node_fetch_1["default"])(_0x2f2ba7 + textToImageUrl, {
    'method': "POST",
    'body': JSON["stringify"](_0x98de51),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x497444
    }
  });

  if (_0x524ee0["status"] !== 200) {
    return (0, utils_1["httpBody"])(-1, [], '生成失败');
  }

  const _0x17e4c4 = await _0x524ee0["json"](),
        _0x1b07c6 = _0x17e4c4["artifacts"]["map"](_0x1c243a => {
    return { ..._0x1c243a,
      'url': "data:image/png;base64," + _0x1c243a['base64']
    };
  });

  return (0, utils_1['httpBody'])(0, [..._0x1b07c6], "生成成功");
}

exports['stabilityTextToImage'] = stabilityTextToImage;

async function stabilityImageToImage(_0x4de950) {
  const {
    "init_image_mode": init_image_mode = "IMAGE_STRENGTH",
    "image_strength": image_strength = 0.35,
    "prompt": _0x4835c3,
    "cfg_scale": cfg_scale = 7,
    "style_preset": _0x3409ff,
    "steps": steps = 30,
    "samples": samples = 1,
    "height": height = 512,
    "width": width = 512,
    "init_image": init_image = ''
  } = _0x4de950["request"],
        _0xc63165 = new form_data_1['default'](),
        _0x18b7f5 = await jimp_1["default"]["read"](init_image)["then"](_0x28aae4 => {
    return _0x28aae4["resize"](Number(width), Number(height))['getBufferAsync'](jimp_1['default']["MIME_PNG"]);
  });

  _0xc63165["append"]("init_image", _0x18b7f5);

  const _0x2091d1 = (0, utils_1['filterObjectNull'])({
    'cfg_scale': Number(cfg_scale),
    'clip_guidance_preset': "FAST_BLUE",
    'samples': Number(samples),
    'steps': Number(steps),
    'style_preset': _0x3409ff ? _0x3409ff : null,
    'init_image_mode': init_image_mode,
    'image_strength': image_strength
  });

  _0xc63165["append"]("text_prompts[0][text]", _0x4835c3);

  Object['keys'](_0x2091d1)["forEach"](_0x3e964f => {
    _0xc63165['append'](_0x3e964f, _0x2091d1[_0x3e964f]);
  });
  const {
    "key": _0x117b75,
    "host": _0x139d65
  } = _0x4de950["aikeyInfo"],
        _0x2d1b81 = {
    "Authorization": "Bearer " + _0x117b75
  };

  const _0x5d7223 = await (0, node_fetch_1["default"])(_0x139d65 + ImageToImageUrl, {
    'method': "POST",
    'body': _0xc63165,
    'headers': _0x2d1b81
  }),
        _0x2ba8a3 = await _0x5d7223["json"]();

  if (_0x5d7223['status'] !== 200) {
    return (0, utils_1["httpBody"])(-1, [], "生成失败");
  }

  const _0x540891 = _0x2ba8a3["artifacts"]["map"](_0x4d6272 => {
    return { ..._0x4d6272,
      'url': "data:image/png;base64," + _0x4d6272["base64"]
    };
  });

  return (0, utils_1["httpBody"])(0, [..._0x540891], "生成成功");
}

exports["stabilityImageToImage"] = stabilityImageToImage;