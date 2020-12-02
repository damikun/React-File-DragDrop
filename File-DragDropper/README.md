

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/damikun/React-File-DragDrop">
  <img src="images/Upload.gif" alt="Example demo" >
  </a>

  <h3 align="center">File Drag-Drop</h3>

  <p align="center">
   Preview of file drag drop react component
  </p>
    <p align="center">
   This is frontend file dropper include axios to send file and get its token
  </p>
</p>


<!-- ABOUT -->
## About

<p align="center">
  <a href="https://github.com/damikun/React-File-DragDrop">
    <img src="images/fileProcess.png" alt="Example demo" >
  </a>
  
  <p align="center">
   Internal project file upload process
  </p>
</p>

The image describe simplified version of file upload handling for custom system...

This componnent helps to push file over API to backend to get tmp file token which is used to push file using form...


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/damikun/React-File-DragDrop.git
   ```
2. CD to project dir
   ```sh
   cd .\File-DragDropper\
   ```
3. Restore packages
   ```
   yarn install
   ```
4. Build and run demo
   ```
   yarn run start
   ```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

<!-- USAGE EXAMPLES -->
## Configuration API

   ```js
    <FileDragDrop
      className="text-gray-600"
      accept="image/png"
      multiple={false}
      api_url="https://localhost:5001/api/Data/UploadFile"

      onSuccess={(token, response) => {
        setstate(token);
      }}

      onError={(type, message, object) => {
        window.alert(`Type: ${type}, Messagbe: ${type}, Object: ${object}`)   
        if (type === "Exception") console.log(object);
        setstate("");
      }}
    />
   ```
