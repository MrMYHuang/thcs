# 醫診進度 (Taiwan Hospital Clinic Status)

## <a id='feature'>特色</a>

書籤功能、網址分享、佈景主題切換、字型調整、app 更新、跨平台、無廣告、開放原始碼。

## 說明

醫診進度 (Taiwan Hospital Clinic Status)，簡寫 thcs，支援以下功能

  1. 此app設計主要目的為改善各醫院"即時看診號"網頁的內容呈現，如存取方便性、字型大小...。但對內容正確性、即時性一律不負任何責任。若不接受，請勿使用此app。
  2. 因為各醫院的"即時看診號"網頁格式不一致，再加上人力有限的情形，所以此app預計只支援有提供以下特定格式"即時看診號"網頁：
    * 所有診間的看診號列於一張網頁。
    * 以表格形式呈現。
    * 可由單一網址公開存取。(不可要求輸入任何登入資訊)
  其餘網頁格式未來可能會以網頁瀏器開啟原網頁的方式呈現。
  3. 若想建議本app支援更多醫院，請先查明第2點所述之限制。若符合其要求，請來信至作者信箱，就有機會加入此app。

* <a id='bookmark'>書籤</a>
  1. 在診間列表頁面，點擊右上角書籤圖示，即可加入書籤頁。
  2. 刪除：至書籤頁，按右上角切換順序鈕，會出現書籤列表。左滑項目即出現刪除鈕，再點擊即可。

* <a id='shareAppLink'>網址分享</a>
  1. 用瀏覽器開啟此 app 的診間列表頁面，點擊右上角分享鈕，可複製此頁連結至作業系統剪貼簿或產生QR code，可分享給其他人。
  2. 分享網址可帶上部分 app 設定參數。

* 佈景主題切換
* 字型調整
  1. 考量視力不佳的使用者，提供最大64 px的字型設定。

* <a id='update'>App 更新</a>

  此app不定期發佈更新，包含新功能或bug修正。注意!App檔案更新後，要關閉、重啟1次app或所有瀏覧器app分頁才會載入新版程式。目前支援2種更新方式:

  1. App啟動: app啟動後，會自動檢查一次有無新版。
  2. 手動: 至設定頁，按"PWA版本"文字。

* <a id='report'>App異常回報</a>

  App設定頁的異常回報鈕使用方法為：執行會造成app異常的步驟後，再至設定頁按下異常回報鈕，即會自動產生一封E-mail，包含異常的記錄，發送此E-mail給我們即可。

程式碼為開放(MIT License)，可自由下載修改、重新發佈。

## 支援平台
已在這些環境作過安裝、測試:
* Windows 10 +  Chrome
* Android 9 + Chrome
* macOS 11 + Chrome
* iPad 7 + Safari
* iPhone 8 + Safari
* Debian Linux 10 + Chrome

非上述環境仍可嘗試使用此app。若有<a href='#knownIssues'>已知問題</a>未描述的問題，可用<a href='#report'>異常回報</a>功能。

建議OS與Chrome、Safari保持在最新版，以取得最佳app體驗。

## <a id='install'>安裝</a>

此app目前有1種取得、安裝方式：

  1. Chrome、Safari網頁瀏覽器。

### <a id='web-app'>從瀏覽器開啟/安裝</a>
請用Chrome (Windows, macOS, Linux, Android作業系統使用者)、Safari (iOS (iPhone, iPad)使用者)瀏覽器開啟以下網址：

https://myhpwa.github.io/thcs

或：

<a href='https://myhpwa.github.io/thcs' target='_blank'>
<img width="auto" height='60px' src='https://user-images.githubusercontent.com/9122190/28998409-c5bf7362-7a00-11e7-9b63-db56694522e7.png'/>
</a>

此 progressive web app (PWA)，可不安裝直接在網頁瀏覽器執行，或安裝至手機、平板、筆電、桌機。建議安裝，以避免瀏覽器定期清除快取，導致書籤資料不見！

#### Windows, macOS, Linux, Android - 使用Chrome安裝
使用 Chrome 瀏覧器（建議最新版）開啟上述 PWA 網址後，網址列會出現一個加號，如圖所示：

<img src='https://github.com/MrMYHuang/thcs/raw/master/docs/images/ChromeInstall.png' width='50%' />

點擊它，以完成安裝。安裝完後會在桌面出現"醫診進度" app 圖示。

#### iOS - 使用Safari安裝
1. 使用Safari開啟web app網址，再點擊下方中間的"分享"圖示：

<img src='https://github.com/MrMYHuang/thcs/raw/master/docs/images/Safari/OpenAppUrl.png' width='50%' />

2. 滑動頁面至下方，點選"加入主畫面"(Add to Home Screen)：

<img src='https://github.com/MrMYHuang/thcs/raw/master/docs/images/Safari/AddToHomeScreen.png' width='50%' />

3. App安裝完，出現在主畫面的圖示：

<img src='https://github.com/MrMYHuang/thcs/raw/master/docs/images/Safari/AppIcon.png' width='50%' />

## <a id='knownIssues'>已知問題</a>
1. iOS Safari 13.4以上才支援"分享此頁"功能。

## <a id='history'>版本歷史</a>
* 2.0.0:
  * 改寫為 PWA。
* 1.5.1 (JS), 1.4.0 (native):
  * 變更"詳細資訊"頁欄位順序。

  1.5.0 (JS), 1.4.0 (native):
  * 看診室進度列表頁新增"原網頁"按鈕。

* 1.4.0 (JS), 1.4.0 (native):
  * 修正react-native-code-push 5.2.1 bug，使UWP只能CodePush成功一次。
  * 首頁底部顯示CodePush更新狀態。
  * 新增"亞東紀念醫院"、"中國醫藥大學附設醫院"、"中山醫學大學附設醫院"、"彰化基督教醫院"、"奇美醫院"、"高醫醫院"、"慈濟醫院"。

* 1.3.0 (JS), 1.2.0 (native):
  * 新增"三軍總醫院台北門診中心"、"萬芳醫院"、"新光吳火獅紀念醫院"。

* 1.2.0:
  * 支援更多醫院。
  * 修正首頁選單切換縣市造成app閃退的問題。

* 1.1.0:
  * 新增"上次更新"時間。
  * 首頁選單支援記憶功能。
  * 改善UI排版。

* 1.0.0:
  * 改善UI。
  * 新增"設定"頁。

* 0.2.0:
  * 支援CodePush方式更新app。

* 0.1.0：
  * 第一版。

## <a href='https://github.com/MrMYHuang/thcs/blob/master/PrivacyPolicy.md'>隱私政策</a>
