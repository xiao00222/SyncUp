import { makeAutoObservable } from "mobx";

export class UiStore{
    isloading=false;
    constructor()
    {
        makeAutoObservable(this)
    }
    isBusy()
    {
        this.isloading=true;
    }
    isIdle()
    {
        this.isloading=false;
    }
}