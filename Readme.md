# Communication between React Native & Native

## In iOS

1. Open xcworkspace file in Xcode.
2. Create a new header file with name RCTCalendarModule.h within the same folder as AppDelegate.
3. Add these lines in header file

```
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end
```
4. Create a new implementation file with name RCTCalendarModule.m within the same folder as AppDelegate and include the following content.

```
#import "RCTCalendarModule.h"
@implementation RCTCalendarModule
// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();
@end
```

## Add the module-name in above code

```
RCT_EXPORT_MODULE(CalendarModuleFoo);
```

## Export a native method in implementation file which have two params name and location with type string.

```
#import <React/RCTLog.h>
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
```

## Final look of Implementation file is:

```
// RCTCalendarModule.m
#import "RCTCalendarModule.h"
#import <React/RCTLog.h>
@implementation RCTCalendarModule
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(CalendarModuleFoo)
@end

```

### Add in React Native project
1. import NativeModules from 'react-native';
2. Access the CalendarModuleFoo native module off of NativeModules.
```
const {CalendarModuleFoo} = NativeModules;
```

3. onPress event pass the values of name and location to native.
```
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```

#### React Native Code
```
import React from 'react';
import {Button, NativeModules, StyleSheet, View} from 'react-native';

const App = () => {
  const {CalendarModuleFoo} = NativeModules;
  const onPress = () => {
   CalendarModuleFoo.createCalendarEvent(' Muhammad Imran Shafqat', 'Pakistan');
  };

  return (
    <View style={styles.container}>
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  }
})
```


## In Android

1. Open android folder in android studio.
2. Create the CalendarModuleFoo.java Java file inside android/app/src/main/java/com/your-app-name/ folder then add following content.
```
package com.convert_react_native;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class CalendarModuleFoo extends ReactContextBaseJavaModule {

    CalendarModuleFoo(ReactApplicationContext context) {
        super(context);
    }
}

```
3. Add the Module name in CalendarModuleFoo.java file.
```
public String getName() {
        return "CalendarModuleFoo";
    }
```
4. Add createCalendarEvent in CalendarModuleFoo.java file. 
```
import android.util.Log;
@ReactMethod
public void createCalendarEvent(String name, String location) {
   Log.d("CalendarModule", "Create event called with name: " + name
   + " and location: " + location);
}
```
5. Create a new Java Class named MyAppPackage.java that implements ReactPackage inside the android/app/src/main/java/com/your-app-name/ folder and add this content
```
package com.convert_react_native;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new CalendarModuleFoo(reactContext));

        return modules;
    }

}

```

6. Open MainApplication.java  file, which can be found in the following path: android/app/src/main/java/com/your-app-name/ then add the package name
```
packages.add(new MyAppPackage());
``` 

### Test what you have built
1. import NativeModules from 'react-native';
2. Access the CalendarModuleFoo native module off of NativeModules.

```
const {CalendarModuleFoo} = NativeModules;
```
3. onPress event pass the values of name and location to native.

```
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```



