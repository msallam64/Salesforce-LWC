import { LightningElement, api, wire } from 'lwc';
import getContactsByAccount from '@salesforce/apex/ContactController.getContactsByAccount';

const COLUMNS = [
    {
        label: 'Name',
        fieldName: 'recordLink',
        type: 'url',
        typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
    },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class AccountContactsTable extends LightningElement {
    @api recordId; // auto-provided on Account record page

    columns = COLUMNS;
    rows = [];
    isLoading = true;

    @wire(getContactsByAccount, { accountId: '$recordId' })
    wiredContacts({ data, error }) {
        this.isLoading = false;

        if (data) {
            // Add a URL field for the clickable Name column
            this.rows = data.map(c => ({
                ...c,
                recordLink: '/' + c.Id
            }));
        } else if (error) {
            // Basic error surfacing in UI; in real apps consider toasts
            // eslint-disable-next-line no-console
            console.error('Error loading contacts', error);
            this.rows = [];
        }
    }
}
