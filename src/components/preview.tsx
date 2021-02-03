import { useRef, useEffect } from "react";
interface PreviewProps {
  code: string;
}

const html = `
  <html><body>
    <div id="root"></div>
    <script>window.addEventListener('message', (event) => {
       try {
         eval(event.data);
       } catch (error) {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4> Runtime error: </h4>' + error + '</div>'
       }
    }, false)</script>
  </body></html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <div>
      <iframe
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
        title="iframe-result"
      ></iframe>
    </div>
  );
};

export default Preview;