public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccount(Id accountId) {
        if (accountId == null) return new List<Contact>();
        return [
            SELECT Id, Name, Title, Email, Phone
            FROM Contact
            WHERE AccountId = :accountId
            ORDER BY LastModifiedDate DESC
            LIMIT 200
        ];
    }


    @AuraEnabled(cacheable=true)
    public static void getContacts() {

        // test errors 
        throw new AuraHandledException('Forced error');
        // return [
        //     SELECT Id, FirstName, LastName, Title, Email, Phone
        //     FROM Contact
        // ];
    }
}
