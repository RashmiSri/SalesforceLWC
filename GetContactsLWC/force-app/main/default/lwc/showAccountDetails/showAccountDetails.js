import {LightningElement,api,track,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getAccounts from'@salesforce/apex/AccountsOfOwner.getAccounts';
export default class ShowAccountDetails extends LightningElement {
    @api id;
    aname;
    @track accList;
    @track errors;
    @api selectedList;
    @api isRendered = false;
    columns = [{label:'id',fieldName:'Id',type:'text'},{label:'Name',fieldName:'Name',type:'text'}];
    /*@wire(getRecord,{recordId:'$id',fields:[aname]})
    wireAccount({data,error}){
        if(data) {
            this.id = data.id;
            this.aname = data.name;
        }
    }*/
    
    connectedCallback(){
        getAccounts().then((result)=>{
            console.log('result====='+JSON.stringify(result));
            this.accList=result;
            this.selectedList = result;
            
        }).catch((error)=>{this.errors=error});
    }
    fetchContactRecords(event){
      // this.selectedList = event.target.value;
       this.selectedList = event.detail.selectedRows;
       this.isRendered = true;
    
       console.debug('selected list====='+JSON.stringify(this.selectedList));
       // if(this.selectedList.size()>0)
        isRendered = true;
    }
    renderedCallback(){
        console.debug('acc rendered callback');
    }
    handlefeedback(){
        console.log('contacts retrieved');
    }
}