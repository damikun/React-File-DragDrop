import React, { useState } from 'react';
import './App.css';
import clsx from "clsx";
import FileDragDrop from "./Components/FileDragDrop/FileDragDrop"

function App() {

  //@ts-ignore
  const [state, setstate] = useState("")

  return (
    <div className="flex App h-screen w-screen bg-gray-50">
      <div className=" mx-auto my-auto w-md">
        <div
          className={clsx(
            "border-2 border-dotted hover items-center",
            "hover:bg-gray-50  p-2 h-36"
          )}
        >
          <FileDragDrop
            accept="image/png"
            api_url="https://localhost:5001/api/Data/UploadFile"
            onSuccess={(token, response) => {
              setstate(token);
            }}
            onError={(type, message, object) => {

              window.alert(`Type: ${type}, Messagbe: ${type}, Object: ${object}`)

              if (type === "Exception") {
                console.log(object);
              }

              setstate("");
            }}
            multiple={false}
          />
        </div>
        </div>
    </div>
  );
}

export default App;
