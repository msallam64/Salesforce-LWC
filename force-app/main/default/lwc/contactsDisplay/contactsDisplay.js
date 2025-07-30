import { LightningElement,api,wire } from 'lwc';

import getContacts from '@salesforce/apex/DisplayContactsController.getContacts';
import getNameLable from '@salesforce/apex/DisplayContactsController.getNameLable';
import searchContacts from '@salesforce/apex/DisplayContactsController.searchContacts';

// const columnss =[
//     {
//         label: 'Name',
//         fieldName: 'Name',
//         type: 'text'
//     },
//     {
//         label: 'Phone',
//         fieldName: 'Phone',
//         type: 'phone'
//     },
//     {
//         label: 'Email',
//         fieldName: 'Email',
//         type: 'email'
//     }
// ]
export default class ContactsDisplay extends LightningElement {



    @api recordId;
    //columns = columnss;
    columns = [];
    contacts=[];

    searchKey = '';

    handleKeyChange(event){
        this.searchKey = event.target.value;
    }

    @wire(searchContacts,{searchKey: '$searchKey'})
    wiredData({data,error})
    {
        if(data){
            this.contacts = data;
        }else if(error){
            console.error('Error',error);
        }
    }

    @wire(getNameLable)
    labelHandler({data,error}){
        if(data){
            this.columns = [
                { label: data.Name, fieldName: 'Name', type: 'text' },
                { label: data.Phone, fieldName: 'Phone', type: 'phone' },
                { label: data.Email, fieldName: 'Email', type: 'email' }
            ];
        }else if(error){
            console.error('Label Error',error);
        }
    }

    connectedCallback(){
        this.fetchContacts();
    }

    fetchContacts(){
        getContacts({accountId: this.recordId}).then((result)=>{
            console.log(result);
            this.contacts = result;
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}