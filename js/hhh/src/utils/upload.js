function fileToDataURL (file, callback) {
  const reader = new window.FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

function compressDataURL (dataURL, ratio, callback) {
  const img = new window.Image();
  img.src = dataURL;
  // onload
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100 * ratio.width;
    canvas.height = 100 * ratio.height;
    const RATIO = canvas.width / canvas.height;
    let cutx = 0;
    let cuty = 0;
    let cutw = img.width;
    let cuth = img.height;
    if (cutw / cuth > RATIO) {
      // 宽超过比例了]]
      let realw = cuth * RATIO;
      cutx = (cutw - realw) / 2;
      cutw = realw;
    } else if (cutw / cuth < RATIO) {
      // 长超过比例了]]
      let realh = cutw / RATIO;
      cuty = (cuth - realh) / 2;
      cuth = realh;
    }
    ctx.drawImage(img, cutx, cuty, cutw, cuth, 0, 0, canvas.width, canvas.height);
    const ndata = canvas.toDataURL('image/jpeg', 1);
    callback(ndata);
  };
}

function dataURLtoBlob (dataURL) {
  let binaryString = atob(dataURL.split(',')[1]);
  let arrayBuffer = new ArrayBuffer(binaryString.length);
  let intArray = new Uint8Array(arrayBuffer);
  let mime = dataURL.split(',')[0].match(/:(.*?);/)[1]

  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i);
  }

  let data = [intArray];

  let result;

  try {
    result = new Blob(data, { type: mime })
  } catch (error) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (error.name === 'TypeError' && window.BlobBuilder) {
      var builder = new window.BlobBuilder()
      builder.append(arrayBuffer)
      result = builder.getBlob(builder)
    } else {
      throw new Error('没救了');
    }
  }

  return result;
}

// Android上的AppleWebKit 534以前的内核存在一个Bug，
// 导致FormData加入一个Blob对象后，上传的文件是0字节
// QQ X5浏览器也有这个BUG
var needsFormDataShim = (function () {
  var bCheck = ~navigator.userAgent.indexOf('Android') &&
               ~navigator.vendor.indexOf('Google') &&
              !~navigator.userAgent.indexOf('Chrome');

  return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534 || /MQQBrowser/g.test(navigator.userAgent);
})();

// 重写 Blob 构造函数，在 XMLHttpRequest.prototype.send 中会使用到
var BlobConstructor = ((function () {
  try {
    new Blob();
    return true;
  } catch (e) {
    return false;
  }
})()) ? window.Blob : function (parts, opts) {
  let bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.MozBlobBuilder)()
  parts.forEach(function (p) {
    bb.append(p);
  });
  return bb.getBlob(opts ? opts.type : undefined);
};

// 手动包装 FormData 同时重写 XMLHttpRequest.prototype.send
var FormDataShim = (function () {
  var formDataShimNums = 0;
  return function FormDataShim () {
    var o = this;

    // Data to be sent
    let parts = [];

    // Boundary parameter for separating the multipart values
    let boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36);

    // Store the current XHR send method so we can safely override it
    let oldSend = XMLHttpRequest.prototype.send;
    this.getParts = function () {
      return parts.toString();
    };
    this.append = function (name, value, filename) {
      parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

      if (value instanceof Blob) {
        parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
        parts.push(value);
      } else {
        parts.push('\r\n\r\n' + value);
      }
      parts.push('\r\n');
    };

    formDataShimNums++;
    XMLHttpRequest.prototype.send = function (val) {
      let fr;
      let data;
      let oXHR = this;
      if (val === o) {
        // Append the final boundary string
        parts.push('--' + boundary + '--\r\n');
        // Create the blob
        data = new BlobConstructor(parts);

        // Set up and read the blob into an array to be sent
        fr = new FileReader();
        fr.onload = function () {
          oldSend.call(oXHR, fr.result);
        };
        fr.onerror = function (err) {
          throw err;
        };
        fr.readAsArrayBuffer(data);

        // Set the multipart content type and boudary
        this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        formDataShimNums--;
        if (formDataShimNums === 0) {
          XMLHttpRequest.prototype.send = oldSend;
        }
      } else {
        oldSend.call(this, val);
      }
    };
  };
})();

/**
 * 压缩图片
 * @param file 图片文件
 * @param ratio 比例
 * @param callback 回调，得到一个 包含文件的 FormData 实例
 */
function compressImage (file, ratio, callback) {
  fileToDataURL(file, (dataURL) => {
    compressDataURL(dataURL, ratio, (newDataURL) => {
      const newBlob = dataURLtoBlob(newDataURL);
      // 判断是否需要我们之前的重写
      let NFormData = needsFormDataShim() ? FormDataShim : window.FormData;
      const oData = new NFormData();
      oData.append('file', newBlob);
      callback(oData);
    });
  });
}
export default compressImage
