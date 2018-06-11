class MailReader {
    getHeader = (message, headerName) => {
        let arr = message.result.payload.headers.filter((header) => header.name === headerName);
        let val = null;
        if (arr.length > 0) {
            val = arr[0].value;
        }
        return val;
    }
    getBody = (message) => {
        var encodedBody = '';
        if(typeof message.parts === 'undefined')
        {
          encodedBody = message.body.data;
        }
        else
        {
          encodedBody = this.getHTMLPart(message.parts);
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(encodedBody)));
      }
    getHTMLPart = (arr) => {
        for(var x = 0; x <= arr.length; x++)
        {
          if(typeof arr[x].parts === 'undefined')
          {
            if(arr[x].mimeType === 'text/html')
            {
              return arr[x].body.data;
            }
          }
          else
          {
            return this.getHTMLPart(arr[x].parts);
          }
        }
        return '';
      }
}

export default MailReader;