var url=window.location.href,id=parseInt(url.match(/\?id=(.*)/)[1]),Bg=chrome.extension.getBackgroundPage(),youtube_prefix="ba9b_",google_prefix="c822_",urlBase="https://preview.diigo.com/api/v3/awe/video/",currentRecord=null,file=null;function updateProgress(e,t){$("#"+e+"-upload").find(".progress-bar-inner").show().css("width",t+"%")}function updateYoutubeProgress(e){return updateProgress("youtube",e)}function updateGDriveProgress(e){return updateProgress("gDrive",e)}function buildYoutubeUrl(e){return"https://youtu.be/"+e}function beginUpload(e){$("#"+e+"-upload").addClass("uploading").find(".progress-bar").show()}function afterUpload(e,t,n){var o=$("#"+e+"-upload");o.removeClass("uploading").addClass("uploaded"),o.find(".progress-bar").hide().find(".progress-bar-inner").css("width",0),o.find(".url-area").show().find("input").val(t),n||(currentRecord.detail[e+"Url"]=t,DB.update(id,currentRecord))}function init(){function e(e){chrome.downloads.download(e,(function(t){if(void 0===t||chrome.runtime.lastError){var n=document.createElement("a"),o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,0,null),n.setAttribute("href",e.url),n.setAttribute("download",e.filename),n.dispatchEvent(o)}}))}$("#uploadToYoutube").on("click",(function(){getFile($("#video").attr("src")).then((function(e){return beginUpload("youtube"),file||(file=new File([e],"AwesomeScreenshot-"+(new Date).toISOString().replace(/:|\./g,"-")+".webm",{type:"video/webm"})),uploadVideo.uploadToYoutube(file,updateYoutubeProgress)})).then((function(e){afterUpload("youtube",buildYoutubeUrl(e.id))})).catch((function(e){}))})),$("#uploadToGdrive").on("click",(function(){getFile($("#video").attr("src")).then((function(e){return beginUpload("gDrive"),file||(file=new File([e],"AwesomeScreenshot-"+(new Date).toISOString().replace(/:|\./g,"-")+".webm",{type:"video/webm"})),uploadVideo.uploadToGoogleDrive(file,updateGDriveProgress)})).then((function(e){afterUpload("gDrive",e.alternateLink)})).catch((function(e){}))})),$("#delete-record").on("click",(function(){confirm("Are you sure to delete this recording?")&&DB.delete(id).then((function(e){window.close()}))})),document.getElementById("video").addEventListener("canplay",(function(){makeThumbnail()})),$("#manage-record").on("click",(function(){window.location.href="/video-list.html"})),$("#download-record, .download-btn").on("click",(function(){chrome.permissions.request({permissions:["downloads"]},(function(t){t&&getFile(currentRecord.fileUrl).then((function(t){t.size<1442116762?getSeekableBlob(t,(function(t){e({url:URL.createObjectURL(t),filename:currentRecord.detail.title+".webm",saveAs:!0})})):e({url:URL.createObjectURL(t),filename:currentRecord.detail.title+".webm",saveAs:!0})}))}))})),$("#display-text").on("click",(function(){var e=$("#video-title");e.addClass("editing"),e.find("input").css("width",e.width()-200).focus()})),$("#video-title").find("input").on("blur",(function(){var e=$("#display-text").find(".text").text().trim(),t=$(this).val().trim();""!=t.replace(" ","")?($("#video-title").removeClass("editing"),e!==t&&($("#display-text").find(".text").text(t),currentRecord.detail.title=t,DB.update(id,currentRecord))):alert("Title can not be empty!")})),$(".upload-item-detail").find("input").on("focus",(function(){$(this).select(),document.execCommand("copy"),$(this).parents(".upload-item").find(".copy-tip").fadeIn("fast").delay(1e3).fadeOut("fast")})),DB.init().then((function(){DB.get(id).then((function(e){currentRecord=e,buildRecord(e)}))})),Bg.getPremium().then((function(e){e&&$(".tip").hide()})),$("#upgrade-btn").on("click",(function(){Bg.googleEvent("upgrade from video page","upgrade"),Bg.goToUpgrade()}))}function buildRecord(e){var t=e.detail;$("#video").attr("src",e.fileUrl),$("#video")[0].currentTime=9999999999,document.title=t.title,$(".video-title").find("input").val(t.title),$("#display-text").find(".text").text(t.title),$("#info-time").text(formatDate(new Date(t.timeStamp))),$("#info-duration").text(t.duration),$("#info-size").text(t.size),t.youtubeUrl&&afterUpload("youtube",t.youtubeUrl,!0),t.gDriveUrl&&afterUpload("gDrive",t.gDriveUrl,!0)}function makeThumbnail(){var e=document.createElement("canvas");e.width=320,e.height=180;var t=e.getContext("2d"),n=document.getElementById("video");t.drawImage(n,0,0,e.width,e.height);var o=e.toDataURL(),i=b64toBlob(o.split(",")[1],o.split(",")[0].split(":")[1].split(";")[0]);fileSaver.save(i,currentRecord.id+"_thumbnail.png").then((function(e){currentRecord.detail.thumbnailUrl=e,DB.update(id,currentRecord)}))}function formatDate(e){var t=e.getDate(),n=e.getMonth(),o=e.getFullYear();return["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"][n]+" "+t+", "+o}function getSeekableBlob(e,t){if("undefined"==typeof EBML)throw new Error("Please link: https://cdn.webrtc-experiment.com/EBML.js");var n=new EBML.Reader,o=new EBML.Decoder,i=EBML.tools,r=new FileReader;r.onload=function(e){o.decode(this.result).forEach((function(e){n.read(e)})),n.stop();var r=i.makeMetadataSeekable(n.metadatas,n.duration,n.cues),a=this.result.slice(n.metadataSize),u=new Blob([r,a],{type:"video/webm"});t(u)},r.readAsArrayBuffer(e)}function b64toBlob(e,t,n){function o(e){return e.charCodeAt(0)}t=t||"",n=n||1024;for(var i=atob(e),r=[],a=0;a<i.length;a+=n){var u=i.slice(a,a+n),d=Array.prototype.map.call(u,o),l=new Uint8Array(d);r.push(l)}return new Blob(r,{type:t})}function getFile(e){return new Promise((function(t,n){var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="blob",o.onload=function(e){if(200==this.status){var n=this.response;t(n)}},o.send()}))}function isShareLinkReady(){setTimeout((function(){var e=$.get(urlBase+name,(function(t){t.code?(e.abort(),isShareLinkReady()):($("#share").removeClass("disabled"),$("#share-input").find("input").val(urlBase+name))}))}),1e3)}Bg.googleOAuth.getAccount().accessToken&&($("#current-account").show(),$("#c-email").find("span").text(Bg.googleOAuth.getAccount().email)),localStorage.temp_camera_url&&(document.getElementById("video2").style.display="block",document.getElementById("video2").setAttribute("src",localStorage.temp_camera_url)),$("#share").on("click",(function(){$(this).hasClass("disabled")||$("#share-input").show()})),$("#c-email").on("click",(function(){$("#notice").toggle()})),$("#gdrive-signout").on("click",(function(){Bg.googleOAuth.clearAccount(),$("#current-account").hide(),$("#notice").hide()})),init();