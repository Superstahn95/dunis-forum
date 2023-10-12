import SyntaxHighlighter from "react-syntax-highlighter";
import { docco, darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiOutlineCopy } from "react-icons/ai";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

function CodeHighlighter({ code, language }) {
  //a user will need to pick the language and then upload the code string
  const [copy, setCopy] = useState(false);
  const codeString = `function toCelsius(f) {
    return (5/9) * (f-32);
  }
  let value = toCelsius(77);
  document.getElementById("demo").innerHTML = value;`;
  return (
    <div className="w-full overflow-scroll">
      <div className="flex items-center justify-between bg-slate-500 p-2 font-montserrat">
        <span>Code base</span>
        {!copy ? (
          <div
            onClick={() => {
              setCopy(true);
              navigator.clipboard.writeText(codeString);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }}
            className="flex items-center space-x-1 cursor-pointer "
          >
            <AiOutlineCopy />
            <span>Copy</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 cursor-pointer ">
            <MdOutlineDone />
            <span>Copied</span>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        wrapLongLines={true}
        language="javascript"
        style={darcula}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeHighlighter;
