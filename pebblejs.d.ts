declare module pebblejs {
    export module Clock {
        export function weekday(weekday : number | string, hour : number, minute : number, seconds : number) : number;
    }

    export module Settings {
        interface ISettingsOptions {
            url : string;
            autoSave? : boolean;
        }

        interface ISettingsOpenEvent {
            originalEvent : Event;
            options : any;
            url : string;
        }

        interface ISettingsOpenHandler {
            (e : ISettingsOpenEvent) : void;
        }

        interface ISettingsCloseEvent {
            originalEvent : Event;
            response : any;
            originalOptions : any;
            options: any;
            url : string;
            failed : boolean;
        }

        interface ISettingsCloseHandler {
            (e : ISettingsCloseEvent) : void;
        }

        export function config(opt : ISettingsOptions, close : ISettingsCloseHandler) : void;
        export function config(opt : ISettingsOptions, open : ISettingsOpenHandler, close? : ISettingsCloseHandler) : void;
        export function option() : any;
        export function option(field : boolean | number | string) : any;
        export function option(field : boolean | number | string, value : any) : void;
        export function option(data : any) : void;
        export function data() : any;
        export function data(field : boolean | number | string) : any;
        export function data(field : boolean | number | string, value : any) : void;
        export function data(data : any) : void;
    }

    export module UI {
        export module Accel {
            interface IAccelOptions {
                rate? : number;
                samples? : number;
                subscribe? : boolean;
            }

            interface IAccelEvent {
                axis : string;
                direction : number;
                samples : number;
                accel : IAccelDataPoint;
                accels : IAccelDataPoint[];
            }

            interface IAccelDataPoint {
                x : number;
                y : number;
                z : number;
                vibe : boolean;
                time : number;
            }

            interface IAccelEventCallback {
                (e : IAccelEvent) : void;
            }

            export function init() : void;
            export function config(opt : IAccelOptions) : void;
            export function peek(callback : IAccelEventCallback) : void;
            export function on(event : string, callback : IAccelEventCallback) : void;
        }

        interface IWindowDefinition {
            action? : IWindowActionDefinition;
            backgroundColor? : string;
            fullscreen? : boolean;
            scrollable? : boolean;
        }

        interface IWindowActionDefinition {
            up? : string;
            select? : string;
            down? : string;
            backgroundColor? : string;
        }

        interface IWindowState {
            backgroundColor : string;
            fullscreen : boolean;
            scrollable : boolean;
            id : number;
        }

        interface IWindow {
            state : IWindowState;
        }

        interface IWindowEvent {
            button : string;
            window : IWindow;
            type : string;
            subtype : string;
        }

        interface IWindowEventHandler {
            (e : IWindowEvent) : void;
        }

        interface IWindowEachCallback {
            (element : IElement) : void;
        }

        export class Window {
            constructor(windowDef? : IWindowDefinition);

            show() : Window;
            hide() : Window;
            on(event : string, handler : IWindowEventHandler) : void;
            on(event : string, button : string, handler : IWindowEventHandler) : void;
            action() : IWindowActionDefinition;
            action(field : string) : string;
            action(actionDef : IWindowActionDefinition) : Window;
            action(field : string, value? : string) : Window;
            fullscreen() : boolean;
            fullscreen(fullscreen : boolean) : Window;
            scrollable() : boolean;
            scrollable(scrollable : boolean) : Window;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Window;

            add(element : IElement) : Window;
            insert(index : number, element : IElement) : Window;
            remove(element : IElement) : Window;
            at(index : number) : IElement;
            index(element : IElement) : number;
            each(callback : IWindowEachCallback) : Window;
        }

        interface ICardDefinition extends IWindowDefinition {
            title? : string;
            subtitle? : string;
            body? : string;
            titleColor? : string;
            subtitleColor? : string;
            bodyColor? : string;
            icon? : string;
            subicon? : string;
            banner? : string;
            //scrollable? : boolean;
            style? : string;
        }

        /*interface ICardActionDefinition {
            up? : string;
            select? : string;
            back? : string;
        }*/

        interface ICardState extends IWindowState {
        }

        interface ICard {
            state : ICardState;
            configMode : string;
        }

        interface ICardEvent extends IWindowEvent {
            card : ICard;
        }

        interface ICardEventHandler {
            (e : ICardEvent) : void;
        }

        export class Card {
            constructor(cardDef? : ICardDefinition);

            show() : Card;
            hide() : Card;
            on(event : string, handler : ICardEventHandler) : void;
            on(event : string, button : string, handler : ICardEventHandler) : void;
            action() : IWindowActionDefinition;
            action(field : string) : string;
            action(actionDef : IWindowActionDefinition) : Card;
            action(field : string, value? : string) : Card;
            fullscreen() : boolean;
            fullscreen(fullscreen : boolean) : Card;
            scrollable() : boolean;
            scrollable(scrollable : boolean) : Card;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Card;

            title() : string;
            title(title : string) : Card;
            subtitle() : string;
            subtitle(subtitle : string) : Card;
            body() : string;
            body(body : string) : Card;
            titleColor() : string;
            titleColor(titleColor : string) : Card;
            subtitleColor() : string;
            subtitleColor(subtitleColor : string) : Card;
            bodyColor() : string;
            bodyColor(bodyColor : string) : Card;
            icon() : string;
            icon(titleColor : string) : Card;
            subicon() : string;
            subicon(subtitleColor : string) : Card;
            banner() : string;
            banner(bodyColor : string) : Card;
            style() : string;
            style(style : string) : Card;
        }

        interface IMenuSection {
            title? : string;
            items : IMenuItem[];
        }

        interface IMenuItem {
            title? : string;
            subtitle? : string;
            icon? : string;
        }

        interface IMenuDefinition extends IWindowDefinition {
            sections? : IMenuSection[];
            //backgroundColor? : string;
            textColor? : string;
            highlightBackgroundColor? : string;
            highlightTextColor? : string;
        }

        interface IMenuWindowState extends IWindowState {
            highlightBackgroundColor : string;
            highlightTextColor : string;
            sections : IMenuSection[];
        }

        interface IMenuWindow {
            state : IMenuWindowState;
        }

        interface IMenuState extends IWindowState {
            highlightBackgroundColor : string;
            highlightTextColor : string;
            sections : IMenuSection[];
        }

        interface IMenu {
            state : IMenuState;
            configMode : string;
        }

        interface IMenuEvent extends IWindowEvent {
            menu : IMenu;
        }

        interface IMenuEventHandler {
            (e : IMenuEvent) : void;
        }

        interface IMenuSelectEvent {
            menu : Menu;
            section : IMenuSection;
            sectionIndex : number;
            item : IMenuItem;
            itemIndex : number;
        }

        interface IMenuSelectCallback {
            (e : IMenuSelectEvent) : void;
        }

        export class Menu {
            constructor(menuDef? : IMenuDefinition);

            show() : Menu;
            hide() : Menu;
            on(event : string, handler : IMenuEventHandler) : void;
            on(event : string, button : string, handler : IMenuEventHandler) : void;
            fullscreen() : boolean;
            fullscreen(fullscreen : boolean) : Menu;
            scrollable() : boolean;
            scrollable(scrollable : boolean) : Menu;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Menu;

            sections(sections : IMenuSection[]) : Menu;
            section(sectionIndex : number, section : IMenuSection) : Menu;
            section(sectionIndex : number) : IMenuSection;
            items(sectionIndex : number, items : IMenuItem[]) : Menu;
            items(sectionIndex : number) : IMenuItem[];
            item(sectionIndex : number, itemIndex : number, item : IMenuItem);
            item(sectionIndex : number, itemIndex : number) : IMenuItem;
            on(event : string, callback : IMenuSelectCallback)
        }

        interface IAnimationDefinition {
            position? : Vector2;
            size? : Vector2;
        }

        interface IAnimationCallback {
            (next : () => void) : void;
        }

        interface IElement {
            position() : Vector2;
            position(position : Vector2) : IElement;
            size() : Vector2;
            size(size : Vector2) : IElement;
            borderColor() : string;
            borderColor(borderColor : string) : IElement;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : IElement;

            index() : number;
            remove() : IElement;
            animate(animateDef : IAnimationDefinition, duration? : number) : IElement;
            animate(field : string, value : string, duration? : number) : IElement;
            queue(callback : IAnimationCallback) : void;
            dequeue() : void;
        }

        interface IElementDefinition {
            position? : Vector2;
            size? : Vector2;
            borderColor? : string;
            backgroundColor? : string;
        }

        interface CircleDefinition extends IElementDefinition {
            radius? : number;
        }

        export class Circle implements IElement {
            constructor(elementDef? : CircleDefinition);

            position() : Vector2;
            position(position : Vector2) : Circle;
            size() : Vector2;
            size(size : Vector2) : Circle;
            borderColor() : string;
            borderColor(borderColor : string) : Circle;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Circle;

            radius() : number;
            radius(radius : number) : Circle;

            index() : number;
            remove() : Circle;
            animate(animateDef : IAnimationDefinition, duration? : number) : Circle;
            animate(field : string, value : string, duration? : number) : Circle;
            queue(callback : IAnimationCallback) : void;
            dequeue() : void;
        }

        export class Rect implements IElement {
            constructor(elementDef? : IElementDefinition);

            position() : Vector2;
            position(position : Vector2) : Rect;
            size() : Vector2;
            size(size : Vector2) : Rect;
            borderColor() : string;
            borderColor(borderColor : string) : Rect;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Rect;

            index() : number;
            remove() : Rect;
            animate(animateDef : IAnimationDefinition, duration? : number) : Rect;
            animate(field : string, value : string, duration? : number) : Rect;
            queue(callback : IAnimationCallback) : void;
            dequeue() : void;
        }

        interface ITextDefinition extends IElementDefinition {
            text? : string;
            font? : string;
            color? : string;
            textOverflow? : string;
            textAlign? : string;
        }

        interface IUpdateTimeUnits {
            [unit : string] : boolean;
        }

        export class Text implements IElement {
            constructor(elementDef? : ITextDefinition);

            position() : Vector2;
            position(position : Vector2) : Text;
            size() : Vector2;
            size(size : Vector2) : Text;
            borderColor() : string;
            borderColor(borderColor : string) : Text;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Text;

            text() : string;
            text(text : string) : Text;
            font() : string;
            font(font : string) : Text;
            color() : string;
            color(color : string) : Text;
            textOverflow() : string;
            textOverflow(overflow : string) : Text;
            textAlign() : string;
            textAlign(align : string) : Text;
            updateTimeUnits() : IUpdateTimeUnits;
            updateTimeUnits(timeUnits : IUpdateTimeUnits) : Text;

            index() : number;
            remove() : Text;
            animate(animateDef : IAnimationDefinition, duration? : number) : Text;
            animate(field : string, value : string, duration? : number) : Rect;
            queue(callback : IAnimationCallback) : void;
            dequeue() : void;
        }

        export class TimeText extends Text {
        }

        interface IImageDefinition extends IElementDefinition {
            image? : string;
            compositing? : string;
        }

        export class Image extends Element {
            constructor(elementDef? : IImageDefinition);

            position() : Vector2;
            position(position : Vector2) : Image;
            size() : Vector2;
            size(size : Vector2) : Image;
            borderColor() : string;
            borderColor(borderColor : string) : Image;
            backgroundColor() : string;
            backgroundColor(backgroundColor : string) : Image;

            image() : string;
            image(image : string) : Image;
            compositing() : string;
            compositing(compop : string) : Image;
        }

        export module Vibe {
            export function vibrate(type? : string) : void;
        }

        export module Light {
            export function on() : void;
            export function auto() : void;
            export function trigger() : void;
        }
    }

    export module Timeline {
        interface ITimelineEvent {
            action : boolean;
            launchCode : number;
        }

        interface ITimelineCallback {
            (e : ITimelineEvent) : void;
        }

        export function launch(callback : ITimelineCallback) : void;
    }

    export module Wakeup {
        interface IWakeupScheduleOptions {
            time : number;
            data? : any;
            cookie? : number;
            notifyIfMissed? : boolean;
        }

        interface IWakeupSetResultEvent {
            id : number;
            error : string;
            failed : boolean;
            data : number;
            cookie : number;
        }

        interface IWakeupScheduleCallback {
            (e : IWakeupSetResultEvent) : void;
        }

        export function schedule(options : IWakeupScheduleOptions, callback : IWakeupScheduleCallback);

        interface IWakeupLaunchEvent {
            id : number;
            wakeup : boolean;
            data : number;
            cookie : number;
        }

        interface IWakeupLaunchCallback {
            (e : IWakeupLaunchEvent) : void;
        }

        export function launch(callback : IWakeupLaunchCallback);

        interface IWakeupState {
            id : number;
            time : number;
            data : number;
            cookie : number;
            notifyIfMissed : boolean;
        }

        interface IWakeupEachCallback {
            (e : IWakeupState) : void;
        }

        export function get(id : number) : IWakeupState;
        export function each(callback : IWakeupEachCallback);
        export function cancel(id : number);
        export function cancel(all : string);
    }

    interface IAjaxHeaders {
        [header : string] : string;
    }

    interface IAjaxOptions {
        method? : string;
        url : string;
        type? : string;
        data? : any;
        headers? : IAjaxHeaders;
        async? : boolean;
        cache? : boolean;
    }

    interface IAjaxCallback {
        (body : string, status : number, req : XMLHttpRequest) : void;
    }

    export function ajax(
        opt : IAjaxOptions,
        success? : IAjaxCallback,
        failure? : IAjaxCallback
    ) : void;

    export module ajax {
        export function formify(data : any) : string;
        export function deformify(form : string) : any;
    }

    export class Vector2 {
        constructor(x? : number, y? : number);

        x : number;
        y : number;

        set(x : number, y : number) : Vector2;
        copy(v : Vector2) : Vector2;
        clone() : Vector2;
        add(v1 : Vector2, v2 : Vector2) : Vector2;
        addSelf(v : Vector2) : Vector2;
        sub(v1 : Vector2, v2 : Vector2) : Vector2;
        subSelf(v : Vector2) : Vector2;
        multiplyScalar(s : number) : Vector2;
        divideScalar(s : number) : Vector2;
        negate() : Vector2;
        dot(v : Vector2) : Vector2;
        lengthSq() : Vector2;
        length() : Vector2;
        normalize() : Vector2
        distanceTo(v : Vector2) : Vector2;
        distanceToSquared(v : Vector2) : Vector2;
        setLength(l : number) : Vector2;
        equals(v : Vector2) : boolean;
    }
}

declare module "clock" {
    export = pebblejs.Clock;
}

declare module "settings" {
    export = pebblejs.Settings;
}

declare module "ui/accel" {
    export = pebblejs.UI.Accel;
}

declare module "ui/window" {
    export = pebblejs.UI.Window;
}

declare module "ui/card" {
    export = pebblejs.UI.Card;
}

declare module "ui/menu" {
    export = pebblejs.UI.Menu;
}

declare module "ui/circle" {
    export = pebblejs.UI.Circle;
}

declare module "ui/rect" {
    export = pebblejs.UI.Rect;
}

declare module "ui/text" {
    export = pebblejs.UI.Text;
}

declare module "ui/timetext" {
    export = pebblejs.UI.TimeText;
}

declare module "ui/image" {
    export = pebblejs.UI.Image;
}

declare module "ui/vibe" {
    export = pebblejs.UI.Vibe;
}

declare module "ui/light" {
    export = pebblejs.UI.Light;
}

declare module "ui" {
    export = pebblejs.UI;
}

declare module "timeline" {
    export = pebblejs.Timeline;
}

declare module "wakeup" {
    export = pebblejs.Wakeup;
}

// Libraries

declare module "ajax" {
    export = pebblejs.ajax;
}

declare module "vector2" {
    export = pebblejs.Vector2;
}
