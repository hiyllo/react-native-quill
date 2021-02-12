export const editor_js = `
<script>
(function (doc) {

  var sendMessage = function (message) {
    if (window.ReactNativeWebView)
      window.ReactNativeWebView.postMessage(message);
      else console.log(message)
  }

  var getSelectedFormats = function () {
    var formats = quill.getFormat();
      var contentChanged = JSON.stringify({
                type: 'format-change',
                data: formats });
      sendMessage(contentChanged);
  }
  //Format text at user’s current selection
  var formatSelection = function (name, value) {
    var range = quill.getSelection();
    if (!range) quill.focus();
    quill.format(name, value);
    getSelectedFormats();
  }

  var hasFocus = function (key) {
    var hs = quill.hasFocus();
 
    var hsJson = JSON.stringify({
                type: 'has-focus',
                key: key,
                data: hs });
      sendMessage(hsJson);
  }

  var getContents = function (key, index, length) {
    var getContentsData = quill.getContents(index, length);
    var getContentsDataJson = JSON.stringify({
      type: 'get-contents',
      key: key,
      data: getContentsData });
      sendMessage(getContentsDataJson);
  }

  var getText = function (key, index, length) {
    var getTextData = quill.getText(index, length);
    var getTextDataJson = JSON.stringify({
      type: 'get-text',
      key: key,
      data: getTextData });
      sendMessage(getTextDataJson);
  }

  var getLength = function (key) {
    var getLengthData = quill.getLength();
    var getLengthDataJson = JSON.stringify({
      type: 'get-length',
      key: key,
      data: getLengthData });
      sendMessage(getLengthDataJson);
  }

  var getHtml = function (key) {
    var html = quill.root.innerHTML;
    var getHtmlJson = JSON.stringify({
      type: 'get-html',
      key: key,
      data: html });
      sendMessage(getHtmlJson);
  }

  var insertEmbed = function (index, type, value) {
    quill.insertEmbed(index, type, value);
  }

  var insertText = function (index, text, formats={}) {
    quill.insertText(index, text, formats);
  }

  var setContents = function (delta) {
    quill.setContents(delta);
  }

  var setText = function (text) {
    quill.setText(text);
  }

  var updateContents = function (delta) {
    quill.updateContents(delta);
  }

  var getRequest = function (event) {

    var msg = JSON.parse(event.data);
    
    switch (msg.command) {
      case 'format':
        formatSelection(msg.name, msg.value);
        break;
      case 'focus':
        quill.focus();
        break;
      case 'blur':
        quill.blur();
        break;
      case 'enable':
        alert(msg.value);
        if(msg.value == true) {
          quill.enable();
        } else if(msg.value == false) quill.disable();
        break;
        case 'hasFocus':
          hasFocus(msg.key);
        break;
        case 'deleteText':
          quill.deleteText(msg.index, msg.length);
          break;
        case 'getContents':
          getContents(msg.key, msg.index, msg.length);
          break;
        case 'getText':
          getText(msg.key, msg.index, msg.length);
          break;
        case 'getHtml':
          getHtml(msg.key);
          break;
        case 'getLength':
          getLength(msg.key);
          break;
        case 'insertEmbed':
          insertEmbed(msg.index, msg.type, msg.value);
          break;
        case 'insertText':
          insertText(msg.index, msg.text, msg.formats);
          break;
        case 'setContents':
          setContents(msg.delta);
          break;
        case 'setText':
          setText(msg.text);
          break;
        case 'updateContents':
          updateContents(msg.delta);
          break;
      default:
        break;
    }
  };

  document.addEventListener("message", getRequest, false);
  window.addEventListener("message", getRequest, false);

  quill.on('editor-change', function(eventName, ...args) {
    if (eventName === 'text-change') {
      getSelectedFormats();
    } else if (eventName === 'selection-change') {
      var range = quill.getSelection();
      if (range) {
        getSelectedFormats();
      } 
    }
  });

})(document)
</script>
`;