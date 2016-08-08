# nodejs megalogger client

##Installation:
```
 npm install megalogger
```


##Usage:

```javascript
var Megalogger = require('megalogger');

 // your apiKey
 var apiKey = 'asefas_efjhj-afsd64sf';
 var source = 'Your source';
 var initData = {
            apiKey: apiKey,
            source: source
        };
 // Log
 var dataLog = [{data: "Message test"}];

 // level for log include: info, debug, warning, error, critical 
 var level = 'info';
 
 // init instance of class Megalogger
 var logger = new Megalogger(initData);

 // push log
 logger.log(dataLog, level);
 
```



