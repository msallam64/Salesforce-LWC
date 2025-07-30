/**
 * @auther:                 Mohamed Sallam
 * @createDate:             10/04/2025
 * @lastModified:           10/04/2025
 * @lastModified By:        Mohamed Sallam
 * @description:            Controller class for the DisplayContacts LWC
 */

public class DisplayContactsController {
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(String accountId){
        //List<Contact> accounts = new List<Account>();
        List<Contact> contacts = new List<Contact>();
        contacts = [Select Id, Name, Email,Phone, AccountId FROM Contact WHERE AccountId =: accountId];
        return contacts;
        //accounts = [Select Id, Name FROM Account ];

        //return accounts;
    }


    @AuraEnabled(cacheable=true)
    public static Map<String, String> getNameLable() {
        Map<String, String> col = new Map<String, String>();
        col.put('Name', Contact.Name.getDescribe().getLabel());
        col.put('Phone', Contact.Phone.getDescribe().getLabel());
        col.put('Email', Contact.Email.getDescribe().getLabel());
        return col;
    }

    
    @AuraEnabled(cacheable = true)
    public static List<Contact> searchContacts(String searchKey){
        List<Contact> contacts = new List<Contact>();
        String searchTerm = '%'+searchKey+'%';
        return [Select Id, Name, Email, Phone FROM Contact WHERE Name LIKE :searchTerm];
    }
}