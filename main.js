(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".full-width {\r\n    width: 100%;\r\n}\r\n\r\n.tag-cloud {\r\n    overflow: auto; \r\n    height: 100%; \r\n    width: 100%;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsWUFBWTtJQUNaLFdBQVc7QUFDZiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtd2lkdGgge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi50YWctY2xvdWQge1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87IFxyXG4gICAgaGVpZ2h0OiAxMDAlOyBcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n      <span>Tag Cloud</span>\n    </mat-toolbar-row>\n  </mat-toolbar>\n  <div class=\"container\">\n    <mat-card>\n      <mat-grid-list cols=\"2\" rowHeight=\"100px\">\n        <mat-grid-tile\n            colspan=\"1\"\n            rowspan=\"5\"\n        >\n          <form class=\"full-width\">\n              <mat-form-field class=\"full-width\">\n                  <textarea \n                    #textarea\n                    [(ngModel)]='text'\n                    [ngModelOptions]=\"{standalone: true}\"\n                    matInput \n                    placeholder=\"Leave a text to generate Tag Cloud from its words\"\n                    rows=\"20\"\n                  ></textarea>\n              </mat-form-field>\n          </form>\n        </mat-grid-tile>\n        <mat-grid-tile\n            colspan=\"1\"\n            rowspan=\"5\"\n        >\n          <div class=\"tag-cloud\" #tagCloud></div>\n        </mat-grid-tile>\n      </mat-grid-list>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ui_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.service */ "./src/app/ui.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _tag_cloud_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tag-cloud.service */ "./src/app/tag-cloud.service.ts");





var AppComponent = /** @class */ (function () {
    function AppComponent(ui, tagCloudService) {
        this.ui = ui;
        this.tagCloudService = tagCloudService;
        this.title = 'mc3-tag-cloud';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initTimer();
        this.initInputEvent();
        this.tagCloudFinishedSubscription = this.tagCloudService.finished.subscribe(function (tagCloud) {
            _this.afterTagCloudGeneration(tagCloud);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.timerSubscription ? this.timerSubscription.unsubscribe() : null;
        this.inputSubscription ? this.inputSubscription.unsubscribe() : null;
    };
    AppComponent.prototype.initTimer = function () {
        this.timer = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(1500);
    };
    AppComponent.prototype.initInputEvent = function () {
        var _this = this;
        this.input$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this.input.nativeElement, 'input');
        this.inputSubscription = this.input$.subscribe(function (_) {
            _this.timerSubscription ? _this.timerSubscription.unsubscribe() : null;
            _this.timerSubscription = _this.timer.subscribe(function (_) {
                _this.triggerTagCloudGeneration();
            });
        });
    };
    AppComponent.prototype.triggerTagCloudGeneration = function () {
        this.ui.spin$.next(true);
        this.tagCloudService.generate(this.text.toString());
    };
    AppComponent.prototype.afterTagCloudGeneration = function (tagCloud) {
        this.tagCloudService.processToShow(tagCloud);
        this.showTagCloud(tagCloud);
        this.ui.spin$.next(false);
    };
    AppComponent.prototype.showTagCloud = function (tagCloud) {
        this.tags.nativeElement.innerHTML = "";
        var colors = ['red', 'green', 'blue', 'pink', 'orange'];
        var counter = 0;
        for (var _i = 0, _a = tagCloud['tags']; _i < _a.length; _i++) {
            var tag = _a[_i];
            var colorIndex = counter % colors.length;
            this.tags.nativeElement.innerHTML += " <a href=\"" + tag['url'] + "\" style=\"font-size: " + tag['fontSize'] + "px; color: " + colors[colorIndex] + ";\">" + tag['tag'] + "</a> ";
            counter++;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('textarea'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AppComponent.prototype, "input", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('tagCloud'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AppComponent.prototype, "tags", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            providers: [
                _tag_cloud_service__WEBPACK_IMPORTED_MODULE_4__["TagCloudService"]
            ],
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ui_service__WEBPACK_IMPORTED_MODULE_2__["UiService"],
            _tag_cloud_service__WEBPACK_IMPORTED_MODULE_4__["TagCloudService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/locales/pl */ "./node_modules/@angular/common/locales/pl.js");
/* harmony import */ var _angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ui_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui.service */ "./src/app/ui.service.ts");












Object(_angular_common__WEBPACK_IMPORTED_MODULE_6__["registerLocaleData"])(_angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_7___default.a, 'pl');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__["MatProgressSpinnerModule"],
                _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_9__["OverlayModule"]
            ],
            providers: [
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_4__["LOCALE_ID"], useValue: 'pl' },
                _ui_service__WEBPACK_IMPORTED_MODULE_11__["UiService"]
            ],
            entryComponents: [_angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__["MatSpinner"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/tag-cloud.service.ts":
/*!**************************************!*\
  !*** ./src/app/tag-cloud.service.ts ***!
  \**************************************/
/*! exports provided: TagCloudService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagCloudService", function() { return TagCloudService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var TagCloudService = /** @class */ (function () {
    function TagCloudService() {
        this.finished = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    TagCloudService.prototype.generateTagCloudFromText = function (text) {
        text = text.replace(/[^A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9]/g, ' ');
        var helper = { tags: null, stats: { countMax: 0, countMin: 0 } };
        var items = {};
        var initialValue = [];
        var tags = text.split(' ').filter(function (value) { return value.length; }).sort().reduce(function (pV, cV, cI, arr) {
            cV = cV.toLocaleLowerCase();
            if (!items[cV]) {
                items[cV] = initialValue.length;
            }
            !initialValue[items[cV]]
                ? (initialValue.push({ tag: cV, count: 1, url: "#" + cV }))
                : initialValue[items[cV]].count++;
            helper.stats.countMax < initialValue[items[cV]].count
                ? (helper.stats.countMax = initialValue[items[cV]].count)
                : null;
            helper.stats.countMin > initialValue[items[cV]].count || helper.stats.countMin === 0
                ? (helper.stats.countMin = initialValue[items[cV]].count)
                : null;
            return initialValue;
        }, initialValue);
        helper.tags = tags;
        return helper;
    };
    TagCloudService.prototype.generate = function (data) {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(1500).subscribe(function (_) {
            _this.finished.next(_this.generateTagCloudFromText(data));
        });
    };
    TagCloudService.prototype.processToShow = function (tagCloud, minFontSize, maxFontSize) {
        if (minFontSize === void 0) { minFontSize = 12; }
        if (maxFontSize === void 0) { maxFontSize = 56; }
        var _a = tagCloud['stats'], countMax = _a.countMax, countMin = _a.countMin;
        var calcFontSize = function (count) {
            return Math.floor(((count - countMin) / (countMax - countMin) * (maxFontSize - minFontSize)) + minFontSize);
        };
        for (var _i = 0, _b = tagCloud['tags']; _i < _b.length; _i++) {
            var tag = _b[_i];
            tag['fontSize'] = calcFontSize(tag['count']);
        }
    };
    TagCloudService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TagCloudService);
    return TagCloudService;
}());



/***/ }),

/***/ "./src/app/ui.service.ts":
/*!*******************************!*\
  !*** ./src/app/ui.service.ts ***!
  \*******************************/
/*! exports provided: UiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiService", function() { return UiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");







var UiService = /** @class */ (function () {
    function UiService(overlay) {
        var _this = this;
        this.overlay = overlay;
        this.spinnerRef = this.cdkSpinnerCreate();
        this.spin$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.spin$
            .asObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (val) { return val ? 1 : -1; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["scan"])(function (acc, one) { return (acc + one) >= 0 ? acc + one : 0; }, 0))
            .subscribe(function (res) {
            if (res === 1) {
                _this.showSpinner();
            }
            else if (res == 0) {
                _this.spinnerRef.hasAttached() ? _this.stopSpinner() : null;
            }
        });
    }
    UiService.prototype.cdkSpinnerCreate = function () {
        return this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        });
    };
    UiService.prototype.showSpinner = function () {
        this.spinnerRef.attach(new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__["ComponentPortal"](_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSpinner"]));
    };
    UiService.prototype.stopSpinner = function () {
        this.spinnerRef.detach();
    };
    UiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["Overlay"]])
    ], UiService);
    return UiService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\www\nodejs\angular\master-class\mc3-tag-cloud\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map