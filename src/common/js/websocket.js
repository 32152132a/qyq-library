import global from "./global.js";

export default {
  WS_HOST: process.env.VUE_APP_WS_DOMAIN,
  WS_PORT: 7099,
  timeoutObj: null,
  serverTimeoutObj: null,
  timeout: 5 * 60 * 1000,
  websocket: null,
  reConnect: "",
  callback: null,
  setCallback: function(callback) {
    if (typeof callback == "function") {
      this.callback = callback;
    } else {
      this.callback = null;
    }
  },
  heart() {
    this.resetHeart();
    this.startHeart();
  },

  resetHeart() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
  },
  startHeart() {
    let that = this;
    that.timeoutObj = setTimeout(function() {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      that.websocketSend(
        JSON.stringify({
          channel: "heart",
          info: {
            session_id: global.session_id,
            uid: localStorage.getItem("uid"),
            subId:
              localStorage.getItem("isMasterAccount") == 2
                ? localStorage.getItem("sub_id")
                : "",
          },
        })
      );

      that.serverTimeoutObj = setTimeout(function() {
        that.websocket.close();
      }, that.timeout);
    }, that.timeout);
  },

  initWebSocket() {
    //初始化weosocket
    const wsuri = this.WS_HOST; //ws地址
    this.websocket = new WebSocket(wsuri);

    this.websocket.onopen = this.websocketOnOpen.bind(this);

    this.websocket.onerror = this.websocketOnError.bind(this);

    this.websocket.onmessage = this.websocketOnMessage.bind(this);

    this.websocket.onclose = this.websocketClose.bind(this);
  },

  websocketOnOpen() {
    this.heart();

    this.websocketSend(
      JSON.stringify({
        channel: "bind",
        info: {
          session_id: global.session_id,
          uid: localStorage.getItem("uid"),
          subId:
            localStorage.getItem("isMasterAccount") == 2
              ? localStorage.getItem("sub_id")
              : "",
        },
      })
    );
    console.log("WebSocket连接成功");
  },
  websocketOnError(e) {
    //错误
    console.log(e);
    console.log("WebSocket连接发生错误");

    this.websocket.close();
  },

  websocketOnMessage(e) {
    this.heart();

    //数据接收
    const redata = JSON.parse(e.data);
    console.log("websocket", redata);

    this.sendNotification(redata);

    if (typeof this.callback == "function") {
      this.callback(redata);
    }

    if (
      typeof redata.type != "undefined" &&
      redata.type == "export_customer" &&
      typeof redata.url != "undefined" &&
      typeof redata.url != ""
    ) {
      sessionStorage.setItem("externalDownLoadUrl", redata.url);
    }
  },

  websocketSend(agentData, tryNum = 1) {
    if (tryNum < 11) {
      if (this.websocket.readyState == 1) {
        //数据发送
        this.websocket.send(agentData);
      } else {
        setTimeout(() => {
          tryNum++;
          this.websocketSend(agentData, tryNum);
        }, 100);
      }
    }
  },

  websocketClose(e) {
    //关闭
    console.log("connection closed (" + e.code + ")");

    let that = this;
    clearTimeout(that.reConnect);
    that.reConnect = setTimeout(function() {
      that.initWebSocket();
    }, 1000);
  },

  sendNotification(msgData) {
    let msgBody = "";
    let msgTag = "";
    if (typeof msgData.message != "undefined") {
      console.info(msgData.message);
    } else {
      if (msgData.type == "chat") {
        msgTag =
          typeof msgData.fans_info !== "undefined"
            ? msgData.fans_info.fans_id
            : msgData.mini_info.mini_id;

        switch (msgData.msg_list.type) {
          case 1:
            msgBody = msgData.msg_list.content;

            break;
          case 2:
            msgBody = "新的【图片】消息";

            break;
          case 3:
            msgBody = "新的【音频】消息";

            break;
          case 4:
            msgBody = "新的【视频】消息";

            break;
          case 5:
            msgBody = "新的【图文】消息";

            break;
          case 6:
            msgBody = "新的【音乐】消息";

            break;
          case 7:
            msgBody = "新的【视频】消息";

            break;
          case 8:
            msgBody = "新的【位置】消息";

            break;
          case 9:
            msgBody = "新的【链接】消息";

            break;
          default:
            msgBody = "您有新消息";

            break;
        }
      } else if (msgData.type == "login") {
        msgTag = "logout";
        msgBody = msgData.message;
      }
    }

    if (msgBody) {
      let newNotice = new Notification("新消息：", {
        body: msgBody, //弹窗内容
        icon: "../../assets/login-swiper.png", //通知图标
        renotify: true, //是否过滤(即相同通知只显示一次，但必须要使用tag标记)
        tag: msgTag,
        silent: true, //是否显示通知声音(默认不显示)
        // sound: './2.mp3'//通知的声音文件路径(有些浏览器没有此属性)
      });

      //过一段时间自动关闭通知
      setTimeout(function() {
        newNotice.close();
      }, 5000);
    }
  },
};
