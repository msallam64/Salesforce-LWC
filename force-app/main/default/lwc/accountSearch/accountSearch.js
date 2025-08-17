import { LightningElement,wire } from 'lwc';

import queryAccountsByEmployeeNumber from '@salesforce/apex/AccountListControllerLwc.queryAccountsByEmployeeNumber';
import queryAccountsByRevenue from '@salesforce/apex/AccountListControllerLwc.queryAccountsByRevenue';



export default class AccountSearch extends LightningElement {


    numberOfEmployees = null;
    handleChange(event) {
        this.numberOfEmployees = event.detail.value;
    }
    reset() {
        this.numberOfEmployees = null;
    }
    
    @wire(queryAccountsByEmployeeNumber, { numberOfEmployees: '$numberOfEmployees' })
    accounts;

    annualRevenue = null;
    @wire (queryAccountsByRevenue, { annualRevenue: '$annualRevenue' })
    accountsByRevenue;
}