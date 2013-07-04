interface MQuery
{
    (selector: string, context?: any): MQueryResultSet;
    (element: Element): MQueryResultSet;
    (object: MQueryResultSet): MQueryResultSet;
    (object: {}): MQueryResultSet;    
    (elementArray: Element[]): MQueryResultSet;
    (array: any[]): MQueryResultSet;
    (): MQueryResultSet;

    throttle(fn: Function, interval: number, shouldOverrideThrottle: boolean): Function;

    extend(target: any, ...objs: any[]): Object;
    extend(deep: boolean, target: any, ...objs: any[]): Object;

    makeArray(obj: any): any[];

    isDefined(obj: any): boolean;
    isNotNull(obj: any): boolean;
    isUndefined(obj: any): boolean;
    isNull(obj: any): boolean;
    isUndefinedOrNull(obj: any): boolean;
    isDefinedAndNotNull(obj: any): boolean;
    isString(obj: any): boolean;
    isBoolean(obj: any): boolean;
    isFunction(obj: any): boolean;
    isArray(obj: any): boolean;
    isNode(obj: any): boolean;
    isElement(obj: any): boolean;
    isMQueryResultSet(obj: any): boolean;
    isNumber(obj: any): boolean;
    isObject(obj: any): boolean;
    isEmptyObject(obj: any): boolean;

    ready(callback: () => void ): void;
    contains(container: Element, contained: Element): boolean;

    proxy(fn: (...args: any[]) => any, context: any, ...args: any[]): Function;
    proxy(context: any, name: string, ...args: any[]): any;

    every<T>(obj: T[], fn: (elementOfArray: T, indexInArray: number) => boolean, context?: any): boolean;
    every(obj: any, fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): boolean;

    some<T>(obj: T[], fn: (elementOfArray: T, indexInArray: number) => boolean, context?: any): boolean;
    some(obj: any, fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): boolean;

    filter<T>(obj: T[], fn: (elementOfArray: T, indexInArray: number) => boolean, context?: any): T[];
    filter(obj: any, fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): any;

    forEach<T>(obj: T[], fn: (elementOfArray: T, indexInArray: number) => boolean, context?: any): void;
    forEach(obj: any, fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): void;

    map<T, U>(array: T[], callback: (elementOfArray: T, indexInArray: number) => U): U[];
    map(array: any, callback: (elementOfArray: any, indexInArray: number) => any): any;

    indexOf<T>(obj: T[], object: T, startIndex?: number): number;
    lastIndexOf<T>(obj: T[], object: T, startIndex?: number): number;

    data(element: Element, key: string, value: any): any;
    data(element: Element, key: string): any;
    data(element: Element): any;

    removeData(element: Element, name?: string): MQueryResultSet;
    hasData(element: Element): boolean;
}

interface MQueryResultSet {    
    append(node: Element): MQueryResultSet;
    append(mQuerySet: MQueryResultSet): MQueryResultSet;
    append(html: string): MQueryResultSet;

    bind(eventType: string, handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    unbind(eventType: string, handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    trigger(eventType: string): MQueryResultSet;
    one(eventType: string, handler: (eventObject: MQueryEvent) => any): MQueryResultSet;

    contains(contained: Element): boolean;
    detach(): MQueryResultSet;

    find(selector: string): MQueryResultSet;
    closest(selector: string, context?: any): MQueryResultSet;
    offset(): { left: number; top: number; };
    offset(coordinates: { left: any; top: any; }): MQueryResultSet;
    
    filter(selector: string): MQueryResultSet;
    filter(fn:(elementOfArray: any, indexInArray: number) => boolean, context?: any): MQueryResultSet;
    
    not(selector: string): MQueryResultSet;

    parent(selector?: string): MQueryResultSet;

    offsetParent(selector?: string): MQueryResultSet;

    parents(selector?: string): MQueryResultSet;
    parentsUntil(selector?: string, filter?: string): MQueryResultSet;
    parentsUntil(element?: Element, filter?: string): MQueryResultSet;

    position(): { top: number; left: number; };
    
    attr(attributeName: string): string;
    attr(attributeName: string, value: any): MQueryResultSet;
    attr(map: { [key: string]: any; }): MQueryResultSet;
    attr(attributeName: string, func: (index: number, attr: any) => any): MQueryResultSet;

    addClass(classNames: string): MQueryResultSet;
    removeClass(classNames: string): MQueryResultSet;
    
    css(propertyName: string): string;
    css(propertyNames: string[]): string;
    css(properties: any): MQueryResultSet;
    css(propertyName: string, value: any): MQueryResultSet;
    css(propertyName: any, value: any): MQueryResultSet;

    remove(selector?: string): MQueryResultSet; 
    children(selector?: string): MQueryResultSet; 
    empty(): MQueryResultSet; 
    first(): MQueryResultSet; 

    data(key: string, value: any): MQueryResultSet;
    data(obj: { [key: string]: any; }): MQueryResultSet;
    data(key: string): any;

    removeData(key: string): MQueryResultSet;

    every(fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): boolean;
    some(fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): boolean;
    map(callback: (elementOfArray: any, indexInArray: number) => any): any;
    forEach(fn: (elementOfArray: any, indexInArray: number) => boolean, context?: any): void;
    indexOf(object: any, startIndex?: number): number;
    lastIndexOf(object: any, startIndex?: number): number;

    blur(): MQueryResultSet;
    blur(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    change(): MQueryResultSet; 
    change(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    click(): MQueryResultSet; 
    click(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    dblclick(): MQueryResultSet;
    dblclick(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    error(): MQueryResultSet; 
    error(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    focus(): MQueryResultSet;
    focus(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    focusin(): MQueryResultSet;
    focusin(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    focusout(): MQueryResultSet;
    focusout(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    keydown(): MQueryResultSet;
    keydown(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;  
    keypress(): MQueryResultSet;
    keypress(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    keyup(): MQueryResultSet;
    keyup(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    load(): MQueryResultSet;
    load(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    mousedown(): MQueryResultSet;
    mousedown(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    mouseenter(): MQueryResultSet;
    mouseenter(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    mouseleave(): MQueryResultSet;
    mouseleave(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;
    mousemove(): MQueryResultSet;
    mousemove(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    mouseout(): MQueryResultSet;
    mouseout(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    mouseover(): MQueryResultSet;
    mouseover(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;  
    mouseup(): MQueryResultSet;
    mouseup(handler: (eventObject: MQueryEvent) => any): MQueryResultSet;  
    resize(): MQueryResultSet;
    resize(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    scroll(): MQueryResultSet;
    scroll(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    select(): MQueryResultSet;
    select(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    submit(): MQueryResultSet;
    submit(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
    unload(): MQueryResultSet;
    unload(handler: (eventObject: MQueryEvent) => any): MQueryResultSet; 
}

interface MQueryEvent extends Event {
    altKey: boolean;
    attrChange: number;
    attrName: string;
    bubbles: boolean;
    button: number;
    cancelable: boolean;
    ctrlKey: boolean;
    defaultPrevented: boolean;
    detail: number;
    eventPhase: number;
    newValue: string;
    prevValue: string;
    relatedNode: Element;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
    view: any;
}

declare var m$: MQuery;