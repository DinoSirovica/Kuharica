import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-ZFJM2MRN.js";
import {
  CommonModule,
  NgClass,
  NgForOf
} from "./chunk-JANDANUA.js";
import {
  Component,
  Directive,
  ElementRef,
  Injectable,
  InputFlags,
  NgModule,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstylePropInterpolate1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-G4OB5AUJ.js";
import {
  Subject,
  takeUntil
} from "./chunk-35OFVTRP.js";
import "./chunk-WDMUDEB6.js";

// node_modules/ng-angular-popup/fesm2022/ng-angular-popup.mjs
function NgToastComponent_div_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const message_r2 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(message_r2.title);
  }
}
function NgToastComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "div", 4);
    ɵɵelement(3, "div", 5);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 6);
    ɵɵtemplate(5, NgToastComponent_div_1_Conditional_5_Template, 2, 1, "span", 7);
    ɵɵelementStart(6, "span", 8);
    ɵɵtext(7);
    ɵɵelementEnd()()();
    ɵɵelementStart(8, "button", 9);
    ɵɵlistener("click", function NgToastComponent_div_1_Template_button_click_8_listener() {
      const message_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.remove(message_r2));
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(9, "svg", 10);
    ɵɵelement(10, "path", 11);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const message_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngClass", message_r2.type)("@showHide", void 0);
    ɵɵadvance(2);
    ɵɵproperty("ngClass", message_r2.type);
    ɵɵadvance();
    ɵɵproperty("toastIcon", message_r2.type);
    ɵɵadvance(2);
    ɵɵconditional(5, message_r2.title && message_r2.title !== "" ? 5 : -1);
    ɵɵadvance();
    ɵɵstylePropInterpolate1("max-width", "", ctx_r2.width() - 30, "px");
    ɵɵadvance();
    ɵɵtextInterpolate(message_r2.message);
    ɵɵadvance();
    ɵɵproperty("ngClass", message_r2.type);
  }
}
var ToastMessage = class {
  constructor(message, type, title, duration = 2e3) {
    this.message = message;
    this.type = type;
    this.title = title;
    this.duration = duration;
    this.id = (/* @__PURE__ */ new Date()).getTime();
  }
};
var ToastType;
(function(ToastType2) {
  ToastType2["PRIMARY"] = "toast-primary";
  ToastType2["SECONDARY"] = "toast-secondary";
  ToastType2["SUCCESS"] = "toast-success";
  ToastType2["INFO"] = "toast-info";
  ToastType2["WARNING"] = "toast-warning";
  ToastType2["DANGER"] = "toast-danger";
})(ToastType || (ToastType = {}));
var NgToastService = class _NgToastService {
  #defaultDuration;
  #toastMessageSource;
  /**
   * Constructs a new NgToastService instance.
   */
  constructor() {
    this.#defaultDuration = 2e3;
    this.#toastMessageSource = new Subject();
  }
  /**
   * Displays a toast message.
   * @param message The message to display.
   * @param type The type of the toast message.
   * @param title The optional title of the toast message.
   * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
   */
  toast(message, type, title, duration = this.#defaultDuration) {
    this.#toastMessageSource.next(new ToastMessage(message, type, title, duration));
  }
  /**
   * Displays a success toast message.
   * @param message The message to display.
   * @param title The optional title of the toast message.
   * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
   */
  success(message, title, duration = this.#defaultDuration) {
    this.toast(message, ToastType.SUCCESS, title, duration);
  }
  /**
   * Displays an info toast message.
   * @param message The message to display.
   * @param title The optional title of the toast message.
   * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
   */
  info(message, title, duration = this.#defaultDuration) {
    this.toast(message, ToastType.INFO, title, duration);
  }
  /**
   * Displays a warning toast message.
   * @param message The message to display.
   * @param title The optional title of the toast message.
   * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
   */
  warning(message, title, duration = this.#defaultDuration) {
    this.toast(message, ToastType.WARNING, title, duration);
  }
  /**
   * Displays a danger/error toast message.
   * @param message The message to display.
   * @param title The optional title of the toast message.
   * @param duration The duration in milliseconds for which the toast message should be displayed. Defaults to the default duration.
   */
  danger(message, title, duration = this.#defaultDuration) {
    this.toast(message, ToastType.DANGER, title, duration);
  }
  /**
   * Returns an observable that emits the toast messages.
   * @returns An observable that emits the toast messages.
   */
  onToastMessage() {
    return this.#toastMessageSource.asObservable();
  }
  static {
    this.ɵfac = function NgToastService_Factory(t) {
      return new (t || _NgToastService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgToastService,
      factory: _NgToastService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgToastService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var ToasterPosition;
(function(ToasterPosition2) {
  ToasterPosition2["TOP_LEFT"] = "toaster-top-left";
  ToasterPosition2["TOP_CENTER"] = "toaster-top-center";
  ToasterPosition2["TOP_RIGHT"] = "toaster-top-right";
  ToasterPosition2["BOTTOM_LEFT"] = "toaster-bottom-left";
  ToasterPosition2["BOTTOM_CENTER"] = "toaster-bottom-center";
  ToasterPosition2["BOTTOM_RIGHT"] = "toaster-bottom-right";
})(ToasterPosition || (ToasterPosition = {}));
var ToastIconDirective = class _ToastIconDirective {
  constructor() {
    this.type = input.required({
      alias: "toastIcon"
    });
    this.#el = inject(ElementRef);
  }
  #el;
  ngOnInit() {
    this.setIcon();
  }
  setIcon() {
    let svgContent;
    switch (this.type()) {
      case "toast-success":
        svgContent = `
          <svg width="14" height="14" viewBox="0 0 448 512">
            <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
          </svg>`;
        break;
      case "toast-danger":
        svgContent = `
          <svg width="14" height="14" viewBox="0 0 384 512">
            <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>`;
        break;
      case "toast-info":
        svgContent = `
          <svg width="14" height="14" viewBox="0 0 192 512">
            <path fill="#ffffff" d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/>
          </svg>`;
        break;
      case "toast-warning":
        svgContent = `
          <svg width="14" height="14" viewBox="0 0 64 512">
            <path fill="#ffffff" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
          </svg>`;
        break;
      default:
        svgContent = "";
    }
    this.#el.nativeElement.innerHTML = svgContent;
  }
  static {
    this.ɵfac = function ToastIconDirective_Factory(t) {
      return new (t || _ToastIconDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ToastIconDirective,
      selectors: [["", "toastIcon", ""]],
      inputs: {
        type: [InputFlags.SignalBased, "toastIcon", "type"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastIconDirective, [{
    type: Directive,
    args: [{
      selector: "[toastIcon]",
      standalone: false
    }]
  }], null, null);
})();
var NgToastComponent = class _NgToastComponent {
  constructor(toastService) {
    this.toastService = toastService;
    this.position = input(ToasterPosition.BOTTOM_RIGHT);
    this.width = input(350);
    this.messages = signal([]);
    this._toasterSubject$ = new Subject();
  }
  ngOnInit() {
    this.toastService.onToastMessage().pipe(takeUntil(this._toasterSubject$)).subscribe((message) => this._handleToastMessage(message));
  }
  _handleToastMessage(message) {
    if (this._isToasterPositionTop()) {
      const messages = this.messages();
      messages.unshift(message);
      this.messages.set(messages);
    } else {
      const messages = this.messages();
      messages.push(message);
      this.messages.set(messages);
    }
    setTimeout(() => this._removeMessage(message), message.duration);
  }
  _isToasterPositionTop() {
    return this.position() === ToasterPosition.TOP_LEFT || this.position() === ToasterPosition.TOP_CENTER || this.position() === ToasterPosition.TOP_RIGHT;
  }
  _removeMessage(message) {
    const index = this.messages().findIndex((e) => e.id === message.id);
    if (index > -1) {
      const messages = this.messages();
      messages.splice(index, 1);
      this.messages.set(messages);
    }
  }
  remove(message) {
    this._removeMessage(message);
  }
  ngOnDestroy() {
    this._toasterSubject$.next();
    this._toasterSubject$.complete();
  }
  static {
    this.ɵfac = function NgToastComponent_Factory(t) {
      return new (t || _NgToastComponent)(ɵɵdirectiveInject(NgToastService));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgToastComponent,
      selectors: [["ng-toast"]],
      inputs: {
        position: [InputFlags.SignalBased, "position"],
        width: [InputFlags.SignalBased, "width"]
      },
      decls: 2,
      vars: 8,
      consts: [[1, "toaster", 3, "ngClass"], ["class", "toast-message", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "toast-message", 3, "ngClass"], [1, "flex-start-center", "gap-3"], [1, "toast-icon", 3, "ngClass"], [1, "toast-icon", 3, "toastIcon"], [1, "flex-col"], [1, "msg-title"], [1, "msg-summary"], [1, "cross-icon", 3, "click", "ngClass"], ["width", "10", "height", "10", "viewBox", "0 0 14 14", "fill", "none", "aria-hidden", "true", 1, "p-icon", "p-toast-icon-close-icon"], ["d", "M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z", "fill", "currentColor"]],
      template: function NgToastComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtemplate(1, NgToastComponent_div_1_Template, 11, 10, "div", 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵstylePropInterpolate1("min-width", "", ctx.width(), "px")("max-width", "", ctx.width(), "px");
          ɵɵproperty("ngClass", ctx.position());
          ɵɵadvance();
          ɵɵproperty("ngForOf", ctx.messages());
        }
      },
      dependencies: [NgClass, NgForOf, ToastIconDirective],
      styles: [".toaster[_ngcontent-%COMP%]{position:fixed;z-index:9999;min-width:300px;max-width:400px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.toaster[_ngcontent-%COMP%]   .toast-message[_ngcontent-%COMP%]{padding:.75rem 1rem;margin-bottom:.75rem;border-radius:6px;background:#fff;box-shadow:0 1px 3px #0000001a;display:flex;justify-content:space-between;align-items:flex-start;word-break:break-word;animation:_ngcontent-%COMP%_slideIn .2s ease-out;border:1px solid rgba(0,0,0,.05)}.toaster[_ngcontent-%COMP%]   .toast-message.toast-primary[_ngcontent-%COMP%]{border-left:3px solid #3b82f6}.toaster[_ngcontent-%COMP%]   .toast-message.toast-secondary[_ngcontent-%COMP%]{border-left:3px solid #475569}.toaster[_ngcontent-%COMP%]   .toast-message.toast-success[_ngcontent-%COMP%]{border-left:3px solid #22c55e}.toaster[_ngcontent-%COMP%]   .toast-message.toast-info[_ngcontent-%COMP%]{border-left:3px solid #0ea5e9}.toaster[_ngcontent-%COMP%]   .toast-message.toast-warning[_ngcontent-%COMP%]{border-left:3px solid #eab308}.toaster[_ngcontent-%COMP%]   .toast-message.toast-danger[_ngcontent-%COMP%]{border-left:3px solid #ef4444}.toaster[_ngcontent-%COMP%]   .toast-message[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]{flex:1;margin-right:.75rem}.toaster[_ngcontent-%COMP%]   .toast-message[_ngcontent-%COMP%]   .msg-title[_ngcontent-%COMP%]{font-size:.875rem;color:#1e293b;font-weight:500;margin-bottom:.125rem;line-height:1.25}.toaster[_ngcontent-%COMP%]   .toast-message[_ngcontent-%COMP%]   .msg-summary[_ngcontent-%COMP%]{font-size:.8125rem;color:#64748b;font-weight:400;line-height:1.25}.toaster[_ngcontent-%COMP%]   .toast-message[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:#94a3b8;cursor:pointer;padding:2px;margin:-2px;display:flex;align-items:center;justify-content:center}.toaster.toaster-top-left[_ngcontent-%COMP%]{margin:1rem;top:0;left:0}.toaster.toaster-top-center[_ngcontent-%COMP%]{margin-top:1rem;top:0;left:50%;transform:translate(-50%)}.toaster.toaster-top-right[_ngcontent-%COMP%]{margin:1rem;top:0;right:0}.toaster.toaster-bottom-left[_ngcontent-%COMP%]{margin:1rem;bottom:0;left:0}.toaster.toaster-bottom-center[_ngcontent-%COMP%]{margin-bottom:1rem;bottom:0;left:50%;transform:translate(-50%)}.toaster.toaster-bottom-right[_ngcontent-%COMP%]{margin:1rem;bottom:0;right:0}@keyframes _ngcontent-%COMP%_slideIn{0%{transform:translateY(-8px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes _ngcontent-%COMP%_fadeOut{to{opacity:0}}.toast-message.fade-out[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeOut .15s ease forwards}@media (max-width: 480px){.toaster[_ngcontent-%COMP%]{min-width:calc(100vw - 2rem);max-width:calc(100vw - 2rem);margin:.75rem}.toaster[_ngcontent-%COMP%]   .toast-message[_ngcontent-%COMP%]{padding:.625rem .875rem}}.flex-start-center[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:center}.gap-3[_ngcontent-%COMP%]{gap:10px}.p-icon[_ngcontent-%COMP%]{width:1rem;height:1rem}.toast-icon[_ngcontent-%COMP%]{border-radius:50%;color:#fff;padding:2px;display:flex;justify-content:center;align-items:center}.toast-icon.toast-success[_ngcontent-%COMP%], .toast-icon.toast-primary[_ngcontent-%COMP%], .toast-icon.toast-secondary[_ngcontent-%COMP%]{background:#34b189}.toast-icon.toast-info[_ngcontent-%COMP%]{background:#3b82f6}.toast-icon.toast-warning[_ngcontent-%COMP%]{background:#f59e0b}.toast-icon.toast-danger[_ngcontent-%COMP%]{background:#ff6767}.cross-icon[_ngcontent-%COMP%]{background:transparent;outline:none;border:none;cursor:pointer}.cross-icon.toast-success[_ngcontent-%COMP%], .cross-icon.toast-primary[_ngcontent-%COMP%], .cross-icon.toast-secondary[_ngcontent-%COMP%]{color:#34b189}.cross-icon.toast-info[_ngcontent-%COMP%]{color:#3b82f6}.cross-icon.toast-warning[_ngcontent-%COMP%]{color:#f59e0b}.cross-icon.toast-danger[_ngcontent-%COMP%]{color:#ff6767}.flex-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.375rem}"],
      data: {
        animation: [trigger("showHide", [transition(":enter", [style({
          opacity: 0,
          transform: "scaleX(0.98) scaleY(0)",
          position: "relative"
        }), animate("250ms", style({
          opacity: 1,
          transform: "scale(1)"
        }))]), transition(":leave", [style({
          opacity: 1,
          transform: "scale(1)"
        }), animate("250ms", style({
          opacity: 0,
          transform: "scaleX(0.98) scaleY(0)"
        }))])])]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgToastComponent, [{
    type: Component,
    args: [{
      selector: "ng-toast",
      animations: [trigger("showHide", [transition(":enter", [style({
        opacity: 0,
        transform: "scaleX(0.98) scaleY(0)",
        position: "relative"
      }), animate("250ms", style({
        opacity: 1,
        transform: "scale(1)"
      }))]), transition(":leave", [style({
        opacity: 1,
        transform: "scale(1)"
      }), animate("250ms", style({
        opacity: 0,
        transform: "scaleX(0.98) scaleY(0)"
      }))])])],
      standalone: false,
      template: `<div style.min-width="{{width()}}px" style.max-width="{{width()}}px" class="toaster" [ngClass]="position()">

  <div class="toast-message" *ngFor="let message of messages()" [ngClass]="message.type" [@showHide]>
    <div class="flex-start-center gap-3">
      <div [ngClass]="message.type" class="toast-icon">
        <div [toastIcon]="message.type" class="toast-icon"></div>
      </div>
      <div class="flex-col">
        @if (message.title && message.title !== '') {
          <span class="msg-title">{{message.title}}</span>
        }
        <span style.max-width="{{width() - 30}}px" class="msg-summary">{{message.message}}</span>
      </div>
    </div>
    <button (click)="remove(message)" [ngClass]="message.type" class="cross-icon">
      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" class="p-icon p-toast-icon-close-icon"
        aria-hidden="true">
        <path
          d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z"
          fill="currentColor"></path>
      </svg></button>
  </div>
</div>
`,
      styles: [".toaster{position:fixed;z-index:9999;min-width:300px;max-width:400px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.toaster .toast-message{padding:.75rem 1rem;margin-bottom:.75rem;border-radius:6px;background:#fff;box-shadow:0 1px 3px #0000001a;display:flex;justify-content:space-between;align-items:flex-start;word-break:break-word;animation:slideIn .2s ease-out;border:1px solid rgba(0,0,0,.05)}.toaster .toast-message.toast-primary{border-left:3px solid #3b82f6}.toaster .toast-message.toast-secondary{border-left:3px solid #475569}.toaster .toast-message.toast-success{border-left:3px solid #22c55e}.toaster .toast-message.toast-info{border-left:3px solid #0ea5e9}.toaster .toast-message.toast-warning{border-left:3px solid #eab308}.toaster .toast-message.toast-danger{border-left:3px solid #ef4444}.toaster .toast-message .content-wrapper{flex:1;margin-right:.75rem}.toaster .toast-message .msg-title{font-size:.875rem;color:#1e293b;font-weight:500;margin-bottom:.125rem;line-height:1.25}.toaster .toast-message .msg-summary{font-size:.8125rem;color:#64748b;font-weight:400;line-height:1.25}.toaster .toast-message .close-btn{background:transparent;border:none;color:#94a3b8;cursor:pointer;padding:2px;margin:-2px;display:flex;align-items:center;justify-content:center}.toaster.toaster-top-left{margin:1rem;top:0;left:0}.toaster.toaster-top-center{margin-top:1rem;top:0;left:50%;transform:translate(-50%)}.toaster.toaster-top-right{margin:1rem;top:0;right:0}.toaster.toaster-bottom-left{margin:1rem;bottom:0;left:0}.toaster.toaster-bottom-center{margin-bottom:1rem;bottom:0;left:50%;transform:translate(-50%)}.toaster.toaster-bottom-right{margin:1rem;bottom:0;right:0}@keyframes slideIn{0%{transform:translateY(-8px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes fadeOut{to{opacity:0}}.toast-message.fade-out{animation:fadeOut .15s ease forwards}@media (max-width: 480px){.toaster{min-width:calc(100vw - 2rem);max-width:calc(100vw - 2rem);margin:.75rem}.toaster .toast-message{padding:.625rem .875rem}}.flex-start-center{display:flex;justify-content:flex-start;align-items:center}.gap-3{gap:10px}.p-icon{width:1rem;height:1rem}.toast-icon{border-radius:50%;color:#fff;padding:2px;display:flex;justify-content:center;align-items:center}.toast-icon.toast-success,.toast-icon.toast-primary,.toast-icon.toast-secondary{background:#34b189}.toast-icon.toast-info{background:#3b82f6}.toast-icon.toast-warning{background:#f59e0b}.toast-icon.toast-danger{background:#ff6767}.cross-icon{background:transparent;outline:none;border:none;cursor:pointer}.cross-icon.toast-success,.cross-icon.toast-primary,.cross-icon.toast-secondary{color:#34b189}.cross-icon.toast-info{color:#3b82f6}.cross-icon.toast-warning{color:#f59e0b}.cross-icon.toast-danger{color:#ff6767}.flex-col{display:flex;flex-direction:column;gap:.375rem}\n"]
    }]
  }], () => [{
    type: NgToastService
  }], null);
})();
var NgToastModule = class _NgToastModule {
  static {
    this.ɵfac = function NgToastModule_Factory(t) {
      return new (t || _NgToastModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgToastModule,
      declarations: [NgToastComponent, ToastIconDirective],
      imports: [CommonModule],
      exports: [NgToastComponent, ToastIconDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgToastModule, [{
    type: NgModule,
    args: [{
      declarations: [NgToastComponent, ToastIconDirective],
      imports: [CommonModule],
      exports: [NgToastComponent, ToastIconDirective]
    }]
  }], null, null);
})();
export {
  NgToastComponent,
  NgToastModule,
  NgToastService,
  ToastIconDirective,
  ToastMessage,
  ToastType,
  ToasterPosition
};
//# sourceMappingURL=ng-angular-popup.js.map
