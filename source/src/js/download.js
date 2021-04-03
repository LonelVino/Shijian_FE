/**
 * 来源
 * https://www.jb51.net/article/118559.htm
 */
/**
 * 触发单击事件
 * @param elem 需要触发事件的DOM对象
 */
export function fireClickEvent(elem) {
  var event;
  if (window.MouseEvent) {
    event = new MouseEvent('click');
  } else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  elem.dispatchEvent(event);
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 */
export function openDownloadDialog(url) {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  fireClickEvent(aLink);
}