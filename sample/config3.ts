import { MyCustomLog } from "./custom_log";
export = [
    {
        type: "custom",
        custom: c=>{return new MyCustomLog(c);},
        label: "1",
    },
    {
        type: "custom",
        custom: new MyCustomLog({label: "2"}),
    }
]