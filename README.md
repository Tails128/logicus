# Logicus

A multi-level log for your html applications!

### How to use it:

- Import the css in your files
- create a new Logicus item on application start (see the configuration section)
- use logicus.log / .warn /.error instead of your console.log / .warn / .error to let it override the console!
- (optional) set a linting rule to ensure you are not using console.log anywhere

### How to configure it:

Logicus accepts three parameters, the first of which is required:

- logLevels: an array of LogLevels. These are needed to define the log types you want to use.
  Log levels are structured as follows:
  ```LogLevel<T> {
  name: string;
  id: T;
  associatedEmoji?: string;
  color: [number, number, number];
  logImportance: number;
  }
  ```
- DisplayAll: a boolean stating if the logs must be shown. Default: true
- KeyCombination: a combination of keys needed to trigger the console. It is structured as follows:
  ```export interface keyCombination {
    shift?: boolean;
    alt?: boolean;
    ctrl?: boolean;
    key: string;
  }
  ```

### How to test it:

`npm run example` then open a browser on port 3000

- You'll see 3 buttons, each will log something
- By pressing CTRL + L you can toggle the log filter, have fun!

```

```
