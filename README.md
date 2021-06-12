# 待辦清單 todo-mysql version 4.0

一個基於 Node.js 的 Express 框架練習專案，包含實作 MySQL、Sequalize、cookie-session、Middleware、Passport.js、Facebook API串接等

## 專案畫面 Demo
[<img align="center" src="https://github.com/MOMOJMOGG/todo-mysql/blob/master/public/images/login.png" height="380" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/todo-mysql/blob/master/public/images/home.png" height="380" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/todo-mysql/blob/master/public/images/create.png" height="50" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/todo-mysql/blob/master/public/images/delete.png" height="50" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/todo-mysql/blob/master/public/images/logout.png" height="380" width="500" />]()

## 功能描述 - Features
- 使用者登入
  - 含使用者驗證
  - cookie-session 識別
  - 提示/錯誤訊息顯示
- 使用者註冊
  - 含註冊資訊驗證
  - 密碼加密儲存
  - 提示/錯誤訊息顯示
- 待辦清單 CRUD
  - 按 **CREATE** 可新增一筆待辦清單
  - 按 **Detail** 可顯示一筆待辦清單資訊
  - 按 **Edit** 可編輯一筆待辦清單
  - 按 **Delete** 可刪除一筆待辦清單
  - 提示/錯誤訊息顯示
 
 ## 環境建置需求與套件版本 - Prerequisies & Package Version
- 開發平台: [Visual Studio Code](https://code.visualstudio.com/download)
- 開發環境: [Node.js](https://nodejs.org/en/) - v10.15.0
- 開發框架: [Express](https://expressjs.com/en/starter/installing.html) - v4.17.1
- 開發套件: [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - v5.3.0
- 開發套件: [Express-session]() - v1.17.2
- 開發套件: [Nodemon](https://www.npmjs.com/package/nodemon) - v2.0.7
- 開發套件: [method-override](https://www.npmjs.com/package/method-override) - v3.0.0
- 開發套件: [bcryptjs](https://www.npmjs.com/package/bcryptjs) -v2.4.3
- 開發套件: [connect-flash](https://www.npmjs.com/package/connect-flash) -v0.1.1
- 開發套件: [passport](https://www.npmjs.com/package/passport) -v0.4.1
- 開發套件: [passport-local](https://www.npmjs.com/package/passport-local) -v1.0.0
- 開發套件: [passport-facebook](https://www.npmjs.com/package/passport-facebook) -v3.0.0
- 開發資料庫: [MySQL](https://www.mysql.com/) - v8.0.16
- 開發資料庫套件: [sequelize](https://www.npmjs.com/package/sequelize) - (MySQL 的 ORM) v6.6.2
- 開發資料庫套件: [sequelize-cli](https://www.npmjs.com/package/sequelize-cli) - v6.2.0 (sequelize提供之任務腳本集合)

## 安裝與執行步驟 - Installation & Execution
1. 打開你的終端機(Terminal)，git clone 此專案至本機電腦，或直接從 github 下載並解壓縮此專案

```
git clone https://github.com/MOMOJMOGG/todo-mysql.git
```

2. 在終端機下指令，進入存放此專案的資料夾，Ex: 放置此專案位置 D://todo-mysql

```
cd D://todo-mysql
```

3. 在終端機下指令，安裝此專案需要的 npm 套件

```
npm install
```

4. 在終端機下指令，匯入資料種子使用者與資料

```
npx sequelize db:seed:all
```

5. 運行 start 腳本指令，啟動專案伺服器

```
npm run start
```

6. 當終端機出現以下字樣，表示伺服器已啟動成功

```
App is running on http://localhost:3000.
```

7. 可使用下列種子使用者帳號密碼，進行登入操作

```
帳號: root@example.com
密碼: 12345678
```

8. 在終端機下指令 Ctrl+C 兩次，關閉伺服器

9. (Option) 若想在此專案使用開發者模式，在終端機下指令，安裝 nodemon 套件，幫助自動重啟伺服器。在第四步驟，改運行 dev 腳本指令，啟動專案伺服器

```
npm install -g nodemon

npm run dev
```


## 專案開發人員 - Contributor

> [MOMOJ](https://github.com/MOMOJMOGG)
