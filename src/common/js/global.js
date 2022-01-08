import editor from "vue2-medium-editor";

let sessionKey = "session_id";
let lsWhiteList = [sessionKey, "showAIPhoneGuide"];
export default {
  sessionKey: sessionKey,
  session_id: localStorage.getItem(sessionKey)
    ? localStorage.getItem(sessionKey)
    : "",
  setSessionId: function(sessionId) {
    this.session_id = sessionId;
    localStorage.setItem("session_id", this.session_id);
  },
  clearLocalStorage(flag = false) {
    if (flag) {
      localStorage.clear();
    } else {
      if (localStorage.length > 0) {
        let keyIndex = 0;
        const localLength = localStorage.length;
        for (let i = 0; i < localLength; i++) {
          let localKey = localStorage.key(keyIndex);

          console.log(localKey, "localKey");
          // if (localKey !== this.sessionKey) {
          //   localStorage.removeItem(localKey);
          // } else {
          //   keyIndex++;
          // }

          if (lsWhiteList.indexOf(localKey) === -1) {
            localStorage.removeItem(localKey);
          } else {
            keyIndex++;
          }
        }
      }
    }
  },

  getRangeInfo(
    node = {},
    textLimit = 0,
    textLength = 0,
    startNode = {},
    startOffset = 0,
    endNode = {},
    endOffset = 0,
    hasGotStart = false
  ) {
    if (typeof node.childNodes !== "undefined" && node.childNodes.length > 0) {
      for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeName == "#text") {
          if (!/[^\n]/g.test(node.childNodes[i].nodeValue)) {
            node.removeChild(node.childNodes[i]);
            i = i - 1;
          } else {
            if (!hasGotStart) {
              if (
                textLength + node.childNodes[i].textContent.length >
                textLimit
              ) {
                startNode = node.childNodes[i];
                startOffset =
                  node.childNodes[i].textContent.length -
                  (textLength +
                    node.childNodes[i].textContent.length -
                    textLimit);
                hasGotStart = true;
              } else {
                textLength += node.childNodes[i].textContent.length;
              }
            }
            endNode = node.childNodes[i];
            endOffset = node.childNodes[i].textContent.length;
          }
        } else {
          const data = this.getRangeInfo(
            node.childNodes[i],
            textLimit,
            textLength,
            startNode,
            startOffset,
            endNode,
            endOffset,
            hasGotStart
          );
          startNode = data.startNode;
          startOffset = data.startOffset;
          endNode = data.endNode;
          endOffset = data.endOffset;
          textLength = data.textLength;
          hasGotStart = data.hasGotStart;
        }
      }
    }

    return {
      startNode: startNode,
      startOffset: startOffset,
      endNode: endNode,
      endOffset: endOffset,
      textLength: textLength,
      hasGotStart: hasGotStart,
    };
  },

  createLink(document, textNodes, href, data) {
    let miniLinkDom = document.createElement("a");
    editor.MediumEditor.util.moveTextRangeIntoElement(
      textNodes[0],
      textNodes[textNodes.length - 1],
      miniLinkDom
    );
    miniLinkDom.setAttribute("href", href);
    if (data) {
      for (let dataKey in data) {
        miniLinkDom.setAttribute("data-" + dataKey, data[dataKey]);
      }
    }
    return miniLinkDom;
  },

  setMiniData(el, anchorUrl, data) {
    let i,
      url = anchorUrl || false;
    if (el.nodeName.toLowerCase() === "a") {
      for (let dataKey in data) {
        el.dataset[dataKey] = data[dataKey];
      }
    } else {
      el = el.getElementsByTagName("a");

      for (i = 0; i < el.length; i += 1) {
        if (false === url || url === el[i].attributes.href.value) {
          for (let dataKey in data) {
            el[i].dataset[dataKey] = data[dataKey];
          }
        }
      }
    }
  },

  createMiniPLink(opts, currentMediumEditor) {
    let MediumEditor = editor.MediumEditor;
    // let currentMediumEditor = window._mediumEditors[editorId]
    let currentEditor = MediumEditor.selection.getSelectionElement(
        currentMediumEditor.options.contentWindow
      ),
      customEvent = {},
      targetUrl;

    // Make sure the selection is within an element this editor is tracking
    if (currentMediumEditor.elements.indexOf(currentEditor) === -1) {
      return;
    }

    try {
      currentMediumEditor.events.disableCustomEvent("editableInput");
      // TODO: Deprecate support for opts.url in 6.0.0
      if (opts.url) {
        MediumEditor.util.deprecated(
          ".url option for createLink",
          ".value",
          "6.0.0"
        );
      }
      targetUrl = opts.url || opts.value;
      if (targetUrl && targetUrl.trim().length > 0) {
        var currentSelection = currentMediumEditor.options.contentWindow.getSelection();
        if (currentSelection) {
          var currRange = currentSelection.getRangeAt(0),
            commonAncestorContainer = currRange.commonAncestorContainer,
            exportedSelection,
            startContainerParentElement,
            endContainerParentElement,
            textNodes;

          // If the selection is contained within a single text node
          // and the selection starts at the beginning of the text node,
          // MSIE still says the startContainer is the parent of the text node.
          // If the selection is contained within a single text node, we
          // want to just use the default browser 'createLink', so we need
          // to account for this case and adjust the commonAncestorContainer accordingly
          if (
            currRange.endContainer.nodeType === 3 &&
            currRange.startContainer.nodeType !== 3 &&
            currRange.startOffset === 0 &&
            currRange.startContainer.firstChild === currRange.endContainer
          ) {
            commonAncestorContainer = currRange.endContainer;
          }

          startContainerParentElement = MediumEditor.util.getClosestBlockContainer(
            currRange.startContainer
          );
          endContainerParentElement = MediumEditor.util.getClosestBlockContainer(
            currRange.endContainer
          );

          // If the selection is not contained within a single text node
          // but the selection is contained within the same block element
          // we want to make sure we create a single link, and not multiple links
          // which can happen with the built in browser functionality
          if (
            commonAncestorContainer.nodeType !== 3 &&
            commonAncestorContainer.textContent.length !== 0 &&
            startContainerParentElement === endContainerParentElement
          ) {
            var parentElement = startContainerParentElement || currentEditor,
              fragment = currentMediumEditor.options.ownerDocument.createDocumentFragment();

            // since we are going to create a link from an extracted text,
            // be sure that if we are updating a link, we won't let an empty link behind (see #754)
            // (Workaroung for Chrome)
            currentMediumEditor.execAction("unlink");

            exportedSelection = currentMediumEditor.exportSelection();
            fragment.appendChild(parentElement.cloneNode(true));

            if (currentEditor === parentElement) {
              // We have to avoid the editor itself being wiped out when it's the only block element,
              // as our reference inside this.elements gets detached from the page when insertHTML runs.
              // If we just use [parentElement, 0] and [parentElement, parentElement.childNodes.length]
              // as the range boundaries, this happens whenever parentElement === currentEditor.
              // The tradeoff to this workaround is that a orphaned tag can sometimes be left behind at
              // the end of the editor's content.
              // In Gecko:
              // as an empty <strong></strong> if parentElement.lastChild is a <strong> tag.
              // In WebKit:
              // an invented <br /> tag at the end in the same situation
              MediumEditor.selection.select(
                currentMediumEditor.options.ownerDocument,
                parentElement.firstChild,
                0,
                parentElement.lastChild,
                parentElement.lastChild.nodeType === 3
                  ? parentElement.lastChild.nodeValue.length
                  : parentElement.lastChild.childNodes.length
              );
            } else {
              MediumEditor.selection.select(
                currentMediumEditor.options.ownerDocument,
                parentElement,
                0,
                parentElement,
                parentElement.childNodes.length
              );
            }

            var modifiedExportedSelection = currentMediumEditor.exportSelection();

            textNodes = MediumEditor.util.findOrCreateMatchingTextNodes(
              currentMediumEditor.options.ownerDocument,
              fragment,
              {
                start:
                  exportedSelection.start - modifiedExportedSelection.start,
                end: exportedSelection.end - modifiedExportedSelection.start,
                editableElementIndex: exportedSelection.editableElementIndex,
              }
            );
            // If textNodes are not present, when changing link on images
            // ex: <a><img src="http://image.test.com"></a>, change fragment to currRange.startContainer
            // and set textNodes array to [imageElement, imageElement]
            if (textNodes.length === 0) {
              fragment = currentMediumEditor.options.ownerDocument.createDocumentFragment();
              fragment.appendChild(commonAncestorContainer.cloneNode(true));
              textNodes = [
                fragment.firstChild.firstChild,
                fragment.firstChild.lastChild,
              ];
            }

            // Creates the link in the document fragment
            this.createLink(
              currentMediumEditor.options.ownerDocument,
              textNodes,
              targetUrl.trim(),
              opts.data
            );

            // Chrome trims the leading whitespaces when inserting HTML, which messes up restoring the selection.
            let leadingWhitespacesCount = (fragment.firstChild.innerHTML.match(
              /^\s+/
            ) || [""])[0].length;

            // Now move the created link back into the original document in a way to preserve undo/redo history
            MediumEditor.util.insertHTMLCommand(
              currentMediumEditor.options.ownerDocument,
              fragment.firstChild.innerHTML.replace(/^\s+/, "")
            );
            exportedSelection.start -= leadingWhitespacesCount;
            exportedSelection.end -= leadingWhitespacesCount;

            currentMediumEditor.importSelection(exportedSelection);
          } else {
            currentMediumEditor.options.ownerDocument.execCommand(
              "createLink",
              false,
              targetUrl
            );
          }

          if (typeof opts.data !== "undefined") {
            this.setMiniData(
              MediumEditor.selection.getSelectionStart(
                currentMediumEditor.options.ownerDocument
              ),
              targetUrl,
              opts.data
            );
          }
        }
      }
    } finally {
      currentMediumEditor.events.enableCustomEvent("editableInput");
    }
    // Fire our custom editableInput event
    currentMediumEditor.events.triggerCustomEvent(
      "editableInput",
      customEvent,
      currentEditor
    );
  },

  //登录成功给官网localstorage发送phoneNumber
  sendPhoneNumber(flag) {
    // var value = ''
    // if(typeof flag == 'undefined'){
    // 	var a = localStorage.getItem('uid')
    // 	value = 16800000 + parseInt(a)
    // }else {
    // 	value = flag
    // }
    // window.frames[0].postMessage(value,'https://www.fastwhale.cn/');
    // window.frames[1].postMessage(value,'http://crm.fastwhale.cn/');
  },
};
