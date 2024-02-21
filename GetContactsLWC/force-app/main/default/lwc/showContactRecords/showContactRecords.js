import {LightningElement,api,wire,track} from 'lwc';
import getContacts from'@salesforce/apex/AccountsOfOwner.getContacts';
export default class ShowContactRecords extends LightningElement {
    @api alist;
    @api result;
    @track error;
    columns = [{label:'Id',fieldName:'Id',type:'text'},{label:'Contact Name',fieldName:'Name',type:'text'}];
    connectedCallback(){
        console.log('alist===='+JSON.stringify(this.alist));
        getContacts({a:this.alist}).then((result)=>{
            this.result=result;
            console.log(JSON.stringify(this.result));
            this.dispatchEvent(new CustomEvent('success'));
        }).catch((error)=>{
            this.error=error;
            console.log(JSON.stringify(this.error));
        });
    }
    renderedCallback(){
        console.log('alist===='+this.alist);
    }
}