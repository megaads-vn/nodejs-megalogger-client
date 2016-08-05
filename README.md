# nodejs megalogger client

##Installation:
```
 npm install megalogger
```


##Usage:

```javascript
var megalogger = require('megalogger');

 // your apiKey
 var apiKey = 'asefas_efjhj-afsd64sf';

 // Log
 var dataLog = [{data: "Message test"}];

 // level for log include: info, debug, warning, error, critical 
 var level = 'info';
 // push log
megalogger.log(apiKey, dataLog, level, 'source');
 
```



