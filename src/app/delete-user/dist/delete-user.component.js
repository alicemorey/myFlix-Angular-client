"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DeleteUserComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var DeleteUserComponent = /** @class */ (function () {
    function DeleteUserComponent(dialogRef, FetchApiDataService, data // Receive user data
    ) {
        this.dialogRef = dialogRef;
        this.FetchApiDataService = FetchApiDataService;
        this.data = data;
        this.confirmDelete = new core_1.EventEmitter();
    }
    DeleteUserComponent.prototype.onConfirmDelete = function () {
        var _this = this;
        var Username = this.data.Username;
        //process the deleted data herer
        this.FetchApiDataService.deleteUser(Username).subscribe({
            next: function () {
                console.log('User deleted successfully');
                _this.confirmDelete.emit();
                _this.dialogRef.close();
            },
            error: function (err) {
                console.error('Error deleting user:', err);
            }
        });
    };
    DeleteUserComponent.prototype.onCancelDelete = function () {
        this.dialogRef.close(false);
    };
    __decorate([
        core_1.Output()
    ], DeleteUserComponent.prototype, "confirmDelete");
    DeleteUserComponent = __decorate([
        core_1.Component({
            selector: 'app-delete-user',
            templateUrl: './delete-user.component.html',
            styleUrl: './delete-user.component.scss'
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DeleteUserComponent);
    return DeleteUserComponent;
}());
exports.DeleteUserComponent = DeleteUserComponent;
